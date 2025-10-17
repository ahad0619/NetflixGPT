import { useDispatch, useSelector } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice"
import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"


export const useNowPlaingMovies = () => {
  const nowPlayingMovies = useSelector(store => store.movies.nowPlaying)
  const dispatch = useDispatch()
  const nowPlaying = async () => {
    const raw = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
    const data = await raw.json()
    dispatch(addNowPlayingMovies(data.results))
  }
  useEffect(() => {
    !nowPlayingMovies && nowPlaying()
  }, [])
}