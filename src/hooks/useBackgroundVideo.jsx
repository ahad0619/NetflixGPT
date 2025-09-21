import { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constants'

export const useBackgroundVideo = (id) => {
  const [trailerKey, setTrailerKey] = useState(null)
  const videoTrailer = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS)
    const trailerList = await data.json()
    const result = trailerList.results.filter((trailer) =>
      trailer.type == "Trailer"

    )
    if (result.length > 0) {
      setTrailerKey(result[0].key)
   
    }
  }
  useEffect(() => {
    videoTrailer()
  }, [id])
     return trailerKey
}
