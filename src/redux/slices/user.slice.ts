import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../actions/requests'

export interface IAuthValue {
    name: string
    email: string
    password: string
}

export const fetchAccountMe = createAsyncThunk('/account/me', async () => {
    const { data } = await axios.get('/api/me')
    return data
})

interface IEditData {
    name: string
    about: string
    icon: string | undefined
}
export const fetchAccountMeEdit = createAsyncThunk('/account/me/edit', async (params: IEditData) => {
    const { data } = await axios.put('/api/me', params)
    return data
})
export const fetchRegisterAccount = createAsyncThunk('/account/register', async (params: IAuthValue) => {
    const { data } = await axios.post('/api/register', params)
    return data
})
export const fetchLoginAccount = createAsyncThunk('/account/login', async (params: IAuthValue) => {
    const { data } = await axios.post('/api/login', params)
    return data
})
export const fetchAccountID = createAsyncThunk('/account/id', async (params: string) => {
    const { data } = await axios.get(`/api/account/${params}`)
    return data
})

export interface IAccount {
    email: string
    passwordHash: string
    name: string
    subscribtions: string[]
    songs: string[]
    about: string
    icon: string
    _id: string
}

interface IAccountState {
    data: IAccount | null
    status: "loading" | "loaded" | "error"
}

const initialState: IAccountState = {
    data: null,
    status: "loading",
}

export const fetchAuthrSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccountMe.pending, (state: IAccountState) => {
            state.data = null
            state.status = "loading"
        })
        builder.addCase(fetchAccountMe.fulfilled, (state: IAccountState, action: PayloadAction<IAccount>) => {
            state.data = action.payload
            state.status = "loaded"
        })
        builder.addCase(fetchAccountMe.rejected, (state: IAccountState) => {
            state.data = null
            state.status = "error"
        })

        builder.addCase(fetchRegisterAccount.pending, (state: IAccountState) => {
            state.data = null
            state.status = "loading"
        })
        builder.addCase(fetchRegisterAccount.fulfilled, (state: IAccountState, action: PayloadAction<IAccount>) => {
            state.data = action.payload
            state.status = "loaded"
        })
        builder.addCase(fetchRegisterAccount.rejected, (state: IAccountState) => {
            state.data = null
            state.status = "error"
        })

        builder.addCase(fetchLoginAccount.pending, (state: IAccountState) => {
            state.data = null
            state.status = "loading"
        })
        builder.addCase(fetchLoginAccount.fulfilled, (state: IAccountState, action: PayloadAction<IAccount>) => {
            state.data = action.payload
            state.status = "loaded"
        })
        builder.addCase(fetchLoginAccount.rejected, (state: IAccountState) => {
            state.data = null
            state.status = "error"
        })

        builder.addCase(fetchAccountMeEdit.pending, (state: IAccountState) => {
            state.data = null
            state.status = "loading"
        })
        builder.addCase(fetchAccountMeEdit.fulfilled, (state: IAccountState, action: PayloadAction<IAccount>) => {
            state.data = action.payload
            state.status = "loaded"
        })
        builder.addCase(fetchAccountMeEdit.rejected, (state: IAccountState) => {
            state.data = null
            state.status = "error"
        })
    }
})
export const fetchAccountIdSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAccountID.pending, (state: IAccountState) => {
            state.data = null
            state.status = "loading"
        })
        builder.addCase(fetchAccountID.fulfilled, (state: IAccountState, action: PayloadAction<IAccount>) => {
            state.data = action.payload
            state.status = "loaded"
        })
        builder.addCase(fetchAccountID.rejected, (state: IAccountState) => {
            state.data = null
            state.status = "error"
        })
    }
})

export const selectIsAuth = (state: any) => Boolean(state.auth.data);

export const authReducer = fetchAuthrSlice.reducer
export const accountIdReducer = fetchAccountIdSlice.reducer