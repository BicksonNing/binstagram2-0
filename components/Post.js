import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";

import HeartIconFill from "@heroicons/react/solid/HeartIcon";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

function Post({ id, username, userImg, img, caption, timestamp }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session.user.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className='mb-8 border-gray bg-white border rounded-sm '>
      {/* Headers */}
      <div className='p-3 flex items-center space-x-4'>
        <img
          src={userImg}
          className='rounded-full h-14 w-14 object-contain'
          alt='profile pic'
        />
        <h5 className='font-semibold flex-1'>{username}</h5>
        <DotsHorizontalIcon className='h-6 w-6 hover:scale-125 transform transition duration-200 ease-out cursor-pointer' />
      </div>
      {/* Image content */}
      <img src={img} alt='upload pic' className='w-full' />

      <div className='flex items-center p-3 space-x-3 text-gray-700'>
        {hasLiked ? (
          <HeartIconFill
            onClick={likePost}
            className='h-6 w-6 cursor-pointer text-red-500'
          />
        ) : (
          <HeartIcon onClick={likePost} className='h-6 w-6 cursor-pointer' />
        )}

        <ChatIcon className='h-6 w-6 cursor-pointer' />
        <PaperAirplaneIcon className='h-6 w-6 rotate-45 cursor-pointer' />
        <div className='flex-grow' />
        <BookmarkIcon className='h-6 w-6 cursor-pointer' />
      </div>
      {/* Likes */}
      {likes.length > 0 && (
        <div className='flex items-center px-3 py-2 space-x-3'>
          <p className='text-sm'>
            <strong>{likes.length}</strong>{" "}
            {likes.length > 1 ? "likes" : "like"}
          </p>
        </div>
      )}

      {/* captions */}
      <div className='px-3 py-1'>
        <p className='text-sm'>
          <strong>{username}</strong> {caption}
        </p>
      </div>
      {/* Comments */}
      {comments.length > 0 && (
        <div className='px-3 py-1 text-sm'>
          <p className='text-gray-400'>Comments</p>
          {comments.map((comment) => (
            <div key={comment.id} className='flex justify-between items-center'>
              <p>
                <strong>{comment.data().username}</strong>{" "}
                {comment.data().comment}
              </p>
              <HeartIcon className='text-gray-500 h-4 w-4 cursor-pointer' />
            </div>
          ))}
        </div>
      )}

      {/* Input Comments */}

      <form className='px-3 py-1 flex items-center space-x-1'>
        <EmojiHappyIcon className='h-7' />
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='border-none flex-1 focus:ring-0 outline-none text-sm'
          placeholder='Add a comment...'
        />
        <button
          type='submit'
          disabled={!comment.trim()}
          onClick={sendComment}
          className='text-blue-400 font-semibold'
        >
          Post
        </button>
      </form>

      {/* Time */}
      <div className='px-3 py-2'>
        <p className='uppercase text-xs text-gray-500'>
          <Moment fromNow>{timestamp}</Moment>
        </p>
      </div>
    </div>
  );
}

export default Post;
