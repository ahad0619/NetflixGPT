import Header from './Header.jsx'
import { useNowPlaingMovies } from '../hooks/useNowPlayingMovies.jsx'
import MainContainer from './MainContainer.jsx'
import SecondaryContainer from './SecondaryContainer.jsx'

const Browse = () => {

  useNowPlaingMovies()

  return (<>

    <Header />
    <MainContainer />
    <SecondaryContainer />

  </>)
}

export default Browse
