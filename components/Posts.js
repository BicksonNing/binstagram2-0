import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./Post";
import { db } from "../firebase";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className='pt-8'>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          timestamp={post.data().timestamp?.toDate()}
        />
      ))}
    </div>
  );
}

export default Posts;
