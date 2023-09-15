import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit'

import axios from '../../actions/requests.js'

export const fetchSongID = createAsyncThunk('/song/id', async (params) => {
    const { data } = await axios.get(`/api/songs/${params}`)
    return data
})
export const fetchSongAccount = createAsyncThunk('/song/account', async (params) => {
    const { data } = await axios.get(`/api/song/${params}`)
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
export const fetchSongAccountSlice = createSlice({
    name: "song",
    initialState,
    extraReducers: {
        [fetchSongAccount.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchSongAccount.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchSongAccount.rejected]: (state) => {
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

export const fetchSongReload = createAction("/song/reload")
export const SongReloadReducer = createReducer(true, (builder) => {
    builder.addCase(fetchSongReload, (state, action) => state = Boolean(action.payload))
})

export const songIdReducer = fetchSongIDSlice.reducer
export const songAccountReducer = fetchSongAccountSlice.reducer
export const songGenresReducer = fetchSongGenreSlice.reducer