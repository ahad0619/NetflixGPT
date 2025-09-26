
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {
    const movies = useSelector((store) => store.movies.nowPlayingMovies)
    if (!movies) return
    const mainMovie = movies[0]
    
    return (
        <div className=' '>
            <VideoTitle title={mainMovie.original_title} overview={mainMovie.overview} />
            <VideoBackground id={mainMovie.id} />
        </div>
    )
}

export default MainContainer
