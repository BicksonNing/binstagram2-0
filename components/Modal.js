import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import CameraIcon from "@heroicons/react/outline/CameraIcon";
import { XCircleIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);
    // Create a post and add to firestore 'post' collection

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    //  get the post ID for the newly created post
    console.log("New doc added with ID", docRef.id);

    // upload the image to firebase storage with the post ID

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // get a download URL from firebase storage and update the original post with image
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  function closeModal() {
    setOpen(false);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overscroll-y-auto'
        onClose={closeModal}
      >
        <div className='flex items-center justify-center min-h-[800px] sm:min-h-screen px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <div>
                {selectedFile ? (
                  <div className='relative'>
                    <img
                      src={selectedFile}
                      alt='selected images'
                      className='w-full object-contain cursor-pointer'
                    />
                    <XCircleIcon
                      className='absolute top-0 right-0 cursor-pointer h-7 text-red-600'
                      onClick={() => setSelectedFile(null)}
                    />
                  </div>
                ) : (
                  <div
                    className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon
                      className='h-6 w-6 text-red-600'
                      aria-hidden='true'
                    />
                  </div>
                )}

                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        type='file'
                        ref={filePickerRef}
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className='mt-2'>
                      <input
                        type='text'
                        className='border-none focus:ring-0 w-full text-center'
                        placeholder='Please enter a caption...'
                        ref={captionRef}
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={!selectedFile}
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed '
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
