function Suggestion({ userImg, username }) {
  return (
    <div className='pl-1 py-2 flex items-center space-x-3'>
      <img
        src={userImg}
        alt='suggestion profile pic'
        className='rounded-full h-9'
      />
      <div className='flex-1'>
        <p className='text-sm font-semibold'>{username}</p>
        <p className='text-xs text-gray-400'>Followed by onvision</p>
      </div>
      <button className='font-bold text-xs text-blue-400'>Follow</button>
    </div>
  );
}

export default Suggestion;
