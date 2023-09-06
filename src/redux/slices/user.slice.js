import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../actions/requests.js'

export const fetchAccountMe = createAsyncThunk('/account/me', async () => {
    const { data } = await axios.get('/api/me')
    return data
})
export const fetchAccountMeEdit = createAsyncThunk('/account/me', async (params) => {
    const { data } = await axios.put('/api/me', params)
    return data
})
export const fetchRegisterAccount = createAsyncThunk('/account/register', async (params) => {
    const { data } = await axios.post('/api/register', params)
    return data
})
export const fetchLoginAccount = createAsyncThunk('/account/login', async (params) => {
    const { data } = await axios.post('/api/login', params)
    return data
})
export const fetchAccountID = createAsyncThunk('/account/id', async (params) => {
    const { data } = await axios.get(`/api/account/${params}`)
    return data
})


const initialState = {
    data: null,
    status: "loading",
}

export const fetchAuthrSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [fetchAccountMe.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAccountMe.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchAccountMe.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
        [fetchRegisterAccount.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchRegisterAccount.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchRegisterAccount.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
        [fetchLoginAccount.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchLoginAccount.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchLoginAccount.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
        [fetchAccountMeEdit.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAccountMeEdit.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchAccountMeEdit.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
    }
})
export const fetchAccountIdSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [fetchAccountID.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAccountID.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchAccountID.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = fetchAuthrSlice.reducer
export const accountIdReducer = fetchAccountIdSlice.reducer