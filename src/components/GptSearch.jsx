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
      dangerouslyAllowBrowser: true

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

    dispatch(addGptMovies(finalResult))

  }
  return (
    <>
      <img
        src={myCover}
        alt="cover page"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row justify-center items-center gap-3 w-11/12 sm:w-2/3 md:w-1/2">
        <input
          className="border border-gray-300 bg-black/70 text-white w-full h-12 p-3 rounded-lg placeholder-gray-300"
          type="text"
          placeholder={lang[languageKey].gptSearchPlaceholder}
          ref={search}
        />
        <button
          type="button"
          className="bg-red-600 text-white font-semibold py-2 px-6 rounded hover:bg-red-700 w-full sm:w-auto"
          onClick={captureSearch}
        >
          {lang[languageKey].search}
        </button>
      </div>


      <div><GptMovieDisplay /></div>

    </>
  )
}


export default GptSearch
