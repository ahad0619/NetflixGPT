import { API_OPTIONS } from "../utils/constants"

const tmbdSearchApi = async (movie) => {

 const rawData=await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=true&language=en-US&page=1`, API_OPTIONS)
 const data = await rawData.json()

//  console.log(data)
  return data
}

export default tmbdSearchApi
