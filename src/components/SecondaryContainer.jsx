import { useSelector } from 'react-redux'
import { Card } from './Card'


const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)
  return (
    <>
      <div className='bg-black'>
        <div className='-mt-48'>
          <Card title={"Now Playing"} movies={movies.nowPlayingMovies} />
        </div>
        <Card title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <Card title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <Card title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <Card title={"Now Playing"} movies={movies.nowPlayingMovies} />
      </div>
    </>
  )
}

export default SecondaryContainer
