import { useSelector } from "react-redux"
import { Card } from "./Card"

const GptMovieDisplay = () => {
    const movieInfoFromStore =(useSelector(store => store.gpt.gptMovies) || [])
   
        const movieArray = (movieInfoFromStore.flatMap(movie => movie.results) || []) 

    // console.log(movieArray)
    return (
        <>
           { (movieArray.length > 0) &&
            <div className='p-2 bg-white/50 w-[95vw] h-50 absolute z-30 mt-72 ml-5 '>
                <Card movies={movieArray} title={"Search Result"} className="!text-black"/>
            </div>}
        </>

    )
}

export default GptMovieDisplay
