import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../actions/requests.js'

export const fetchSongID = createAsyncThunk('/song/id', async (params) => {
    const { data } = await axios.get(`/api/songs/${params}`)
    return data
})
export const fetchSongGenres = createAsyncThunk('/song/genre', async (params) => {
    const { data } = await axios.get(`/api/songs-genre/${params}`)
    return data
})

const initialState = {
    data: null,
    status: "loading",
}

export const fetchSongIDSlice = createSlice({
    name: "song",
    initialState,
    extraReducers: {
        [fetchSongID.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchSongID.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchSongID.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
    }
})
export const fetchSongGenreSlice = createSlice({
    name: "song",
    initialState,
    extraReducers: {
        [fetchSongGenres.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchSongGenres.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchSongGenres.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
    }
})

export const songIdReducer = fetchSongIDSlice.reducer
export const songGenresReducer = fetchSongGenreSlice.reducer