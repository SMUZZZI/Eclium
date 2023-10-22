import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAction, createReducer } from '@reduxjs/toolkit'

import axios from '../../actions/requests'

export const fetchSongID = createAsyncThunk('/song/id', async (params: string) => {
    const { data } = await axios.get(`/api/songs/${params}`)
    return data
})
export const fetchSongAccount = createAsyncThunk('/song/account', async (params: string) => {
    const { data } = await axios.get(`/api/song/${params}`)
    return data
})
export const fetchSongGenres = createAsyncThunk('/song/genre', async (params: string) => {
    const { data } = await axios.get(`/api/songs-genre/${params}`)
    return data
})

export interface ISong {
    audio: string
    title: string
    author: string
    authorLink: string[]
    icon: string
    genres: string[]
    _id: string
}

interface ISongState {
    data: ISong | null,
    status: "loading" | "error" | "loaded"
}
interface ISongsState {
    data: ISong[] | null,
    status: "loading" | "error" | "loaded"
}

const songInitialState: ISongState = {
    data: null,
    status: "loading",
}
const songsInitialState: ISongsState = {
    data: null,
    status: "loading",
}

export const fetchSongIDSlice = createSlice({
    name: "song",
    initialState: songInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSongID.pending, (state: ISongState) => {
            state.status = "loading";
            state.data = null;
        })
        builder.addCase(fetchSongID.fulfilled, (state: ISongState, action: PayloadAction<ISong>) => {
            state.status = "loaded";
            state.data = action.payload;
        })
        builder.addCase(fetchSongID.rejected, (state: ISongState) => {
            state.status = "error";
            state.data = null;
        })
    }
})
export const fetchSongAccountSlice = createSlice({
    name: "song",
    initialState: songsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSongAccount.pending, (state: ISongsState) => {
            state.status = "loading";
            state.data = null;
        })
        builder.addCase(fetchSongAccount.fulfilled, (state: ISongsState, action: PayloadAction<ISong[]>) => {
            state.status = "loaded";
            state.data = action.payload;
        })
        builder.addCase(fetchSongAccount.rejected, (state: ISongsState) => {
            state.status = "error";
            state.data = null;
        })
    }
})
export const fetchSongGenreSlice = createSlice({
    name: "song",
    initialState: songsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSongGenres.pending, (state: ISongsState) => {
            state.status = "loading";
            state.data = null;
        })
        builder.addCase(fetchSongGenres.fulfilled, (state: ISongsState, action: PayloadAction<ISong[]>) => {
            state.status = "loaded";
            state.data = action.payload;
        })
        builder.addCase(fetchSongGenres.rejected, (state: ISongsState) => {
            state.status = "error";
            state.data = null;
        })
    }
})

export const fetchSongReload = createAction<boolean>("/song/reload")
export const SongReloadReducer = createReducer(true, (builder) => {
    builder.addCase(fetchSongReload, (state, action) => state = Boolean(action.payload))
})

export const songIdReducer = fetchSongIDSlice.reducer
export const songAccountReducer = fetchSongAccountSlice.reducer
export const songGenresReducer = fetchSongGenreSlice.reducer