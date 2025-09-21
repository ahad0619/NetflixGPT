
const VideoTitle = ({title , overview}) => {
  return (<>
   <div className="bg-gradient-to-b from-gray-500 to-gray-100">
    <div className="absolute text-white mt-80 ml-10">
      <h1 className='text-2xl font-bold mb-4 '>{title}</h1>
      <p className='text-lg w-1/4'>{overview}</p>
      <div className='mt-5'>
                <button className='border-1 bg-black p-2 rounded-full text-white '>▶  Play</button>
                <button className='border-1 bg-black p-2 rounded-full mx-2 text-white'>ℹ More Info</button>
            </div>
    </div>
    </div>
    </>
  )
}

export default VideoTitle
