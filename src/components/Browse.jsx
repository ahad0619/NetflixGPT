import Header from './Header.jsx'
import { useNowPlaingMovies } from '../hooks/useNowPlayingMovies.jsx'
import MainContainer from './MainContainer.jsx'
import SecondaryContainer from './SecondaryContainer.jsx'
import GptSearch from './GptSearch.jsx'
import { useSelector } from 'react-redux'

const Browse = () => {
  const GptToggleValue = useSelector(store => store.gpt.showGptSearch)
  useNowPlaingMovies()

  return (<>

    <Header />
    {
      GptToggleValue ? <GptSearch /> : <>  <MainContainer /> <SecondaryContainer /> </>

    }

  </>)
}

export default Browse
