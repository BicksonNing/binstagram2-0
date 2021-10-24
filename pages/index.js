import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const onClickPageChange = () => {
    router.push("/auth/signin");
  };

  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Binstagram</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {session ? (
        <>
          <Header />
          <Feed />
        </>
      ) : (
        <div className='flex flex-col justify-center items-center space-y-10 min-h-screen'>
          <img
            className='w-80 -mt-40'
            src='https://links.papareact.com/ocw'
            alt=''
          />

          <h2 className='text-2xl '>
            Sign In to my <strong> Instagram Clone</strong>{" "}
          </h2>
          <button
            className='bg-black rounded-lg px-8 py-2 text-white '
            onClick={onClickPageChange}
          >
            Sign In
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal />
    </div>
  );
}
