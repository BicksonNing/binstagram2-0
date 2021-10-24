function Story({ img, username }) {
  return (
    <div>
      <div>
        <div className='p-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full '>
          <div className='p-[1.8px] bg-white rounded-full h-14 w-14'>
            <img
              className='object-contain rounded-full cursor-pointer'
              src={img}
              alt='story'
            />
          </div>
        </div>
      </div>
      <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  );
}

export default Story;
