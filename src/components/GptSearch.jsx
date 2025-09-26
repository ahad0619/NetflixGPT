import { useDispatch, useSelector } from 'react-redux'
import myCover from '../../public/my_cover.jpg'
import { lang } from '../utils/langConstants'
import { useRef } from 'react'
import OpenAI from 'openai'
import tmbdSearchApi from '../hooks/tmbdSearchApi'
import { addGptMovies } from '../utils/gptSlice'
import GptMovieDisplay from './GptMovieDisplay'


const GptSearch = () => {

  const languageKey = useSelector((store) => store.config.lang)
  const dispatch = useDispatch()

  const search = useRef(null)

  const captureSearch = async () => {
    // console.log(search.current.value)
    const client = new OpenAI({
      apiKey: import.meta.env.VITE_OPEN_AI,
      dangerouslyAllowBrowser : true
    
    })
    const response = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: `Return exactly 5 movie names as a valid JSON array.
          Example: ["3 Idiots", "Raaz", "Andaaz Apna Apna", "Mohabbatein", "Aashiqui 2"]
          Related to: ${search.current.value}`
    });

    const raw = response.output_text;
    const moviesArray = JSON.parse(raw);
    const result = moviesArray.map((movie) => { return tmbdSearchApi(movie) })
    const finalResult = await Promise.all(result)
    // console.log(finalResult)
    // console.log(finalResult[0].results[0].title)
    dispatch(addGptMovies(finalResult))

  }
  return (
    <>
      <img
        src={myCover}
        alt="cover page"
        className='absolute' />
      <div className='mt-40 mx-70 w-full h-20 absolute'>
        <input className='border-1 bg-black text-white w-180 h-10 mx-2 p-2 rounded-lg'
          type="text"
          placeholder={lang[languageKey].gptSearchPlaceholder}
          ref={search}
        />
        <button type="button"
          class="btn btn-danger" onClick={captureSearch}>{lang[languageKey].search}
        </button>

      </div>
     <div><GptMovieDisplay/></div>
    </>
  )
}


export default GptSearch
