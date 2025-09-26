import { useBackgroundVideo } from "../hooks/useBackgroundVideo"


const VideoBackground = ({ id }) => {
    const trailerKey = useBackgroundVideo(id)
    // console.log(trailerKey)

    return (
        <div className="mb-5 ">
            <iframe
            className="aspect-video w-screen"
                // width="300"
                // height="315"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&loop=1&playlist=${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default VideoBackground
