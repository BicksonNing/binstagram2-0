import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className='text-sm flex items-center space-x-3 mt-14 mb-5'>
      <img src={session?.user?.image} className='rounded-full h-16' alt='' />
      <div className='flex-1'>
        <p>
          <strong>{session?.user?.username}</strong>
        </p>
        <p>{session?.user?.name}</p>
      </div>
      <button onClick={signOut} className='text-blue-400 text-xs font-bold'>
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
