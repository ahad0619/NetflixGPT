
const VideoTitle = ({ title, overview }) => {
  return (<>
    <div className="bg-gradient-to-b from-gray-500 to-gray-100">
      <div className="absolute text-white mt-80 ml-10">
        <h1 className='text-lg w-lg font-bold mb-4 '>
          {title}
        </h1>
        <p className='text-lg w-1/4'>
          {overview}
        </p>
        <div className='mt-2 flex gap-2'>
          <button className='border-1 bg-white p-2 px-3 !rounded-lg text-black flex'>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
            </svg>
            Play
          </button>
          <button className='border-1 bg-black p-2 !rounded-lg mx-2 text-white flex'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-lg" viewBox="0 0 16 16">
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0" />
            </svg>
            More Info</button>

        </div>
      </div>
    </div>
  </>
  )
}

export default VideoTitle
