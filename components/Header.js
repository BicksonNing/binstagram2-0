import {
  ChatIcon,
  ExternalLinkIcon,
  HeartIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  const goToHome = () => {
    router.push("/");
  };

  return (
    <div className='py-4 md:py-0 transition duration-300 shadow-sm border-b bg-white sticky top-0 z-50'>
      <div className='flex justify-between max-w-5xl mx-5 lg:mx-auto'>
        {/* Left */}
        <div
          onClick={goToHome}
          className='relative hidden lg:inline-grid w-24 cursor-pointer'
        >
          <Image
            src='https://links.papareact.com/ocw'
            alt='instagram text logo'
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div className='relative w-10 flex-shrink-0 lg:hidden cursor-pointer'>
          <Image
            src='https://links.papareact.com/jjm'
            alt='instagram icon logo'
            layout='fill'
            objectFit='contain'
          />
        </div>
        {/* Middle - Search input field*/}

        <div className='hidden md:inline-flex max-w-xs'>
          <div className='mt-1 relative p-3 rounded-md'>
            <div className='absolute pl-3 inset-y-0 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              className='bg-gray-50 pl-10 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black'
              type='text'
              placeholder='Search'
            />
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center justify-end space-x-4'>
          {session && (
            <>
              <PlusCircleIcon
                className='navBtn'
                onClick={() => setOpen(true)}
              />
              <div className='relative navBtn'>
                <ChatIcon className='navBtn' />
                <div className='absolute -top-1 -right-1 z-10 rounded-full w-4 h-4 bg-red-500 flex items-center justify-center text-sm font-semibold animate-pulse'>
                  3
                </div>
              </div>

              <ExternalLinkIcon className='navBtn' />
              <HeartIcon className='navBtn' />

              <img
                onClick={signOut}
                src={session.user.image}
                alt='profile pic'
                className='h-8 w-8 rounded-full cursor-pointer'
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
