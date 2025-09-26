import { createSlice } from "@reduxjs/toolkit";

const gptSlice= createSlice({
    name : 'gpt',
    initialState : {
        showGptSearch : false,
        gptMovies : null
    },
    reducers : {
        toggleGptSearch : (state , action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovies : (state,action) => {
            state.gptMovies= action.payload
        }
    }
})

export default gptSlice.reducer
export const {toggleGptSearch , addGptMovies} = gptSlice.actions