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
    // console.log(finalResult)
    // console.log(finalResult[0].results[0].title)
    dispatch(addGptMovies(finalResult))

  }
  return (
    <>
      {/* Cover Image */}
      <div className="relative w-full h-screen">
        <img
          src={myCover}
          alt="cover page"
          className="w-full h-full object-cover"
        />

        {/* Search Bar */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex flex-col sm:flex-row justify-center items-center px-4 gap-2">
          <input
            className="border border-gray-300 bg-black text-white w-full sm:w-1/3 h-12 p-2 rounded-lg"
            type="text"
            placeholder={lang[languageKey].gptSearchPlaceholder}
            ref={search}
          />
          <button
            type="button"
            className="bg-red-600 text-white font-semibold py-2 px-6 h-12 rounded hover:bg-red-700 w-full sm:w-auto"
            onClick={captureSearch}
          >
            {lang[languageKey].search}
          </button>
        </div>
      </div>

      {/* Display Section */}
      <div className="mt-8 px-4">
        <GptMovieDisplay />
      </div>
    </>
  );
}
export default GptSearch
