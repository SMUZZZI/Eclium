import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { accountIdReducer, authReducer } from './slices/user.slice'
import { SongReloadReducer, songAccountReducer, songGenresReducer, songIdReducer } from './slices/song.slice'
import { audioCountReducer, audioNextReducer, audioPlayPauseReducer, audioPrewReducer, genreReducer } from './slices/audioControl.slice'

const rootReducer = combineReducers({
    auth: authReducer,
    accountId: accountIdReducer,
    songId: songIdReducer,
    songAccount: songAccountReducer,
    songGenre: songGenresReducer,
    songReload: SongReloadReducer,
    audioControl: audioPlayPauseReducer,
    audioNext: audioNextReducer,
    audioPrew: audioPrewReducer,
    audioCount: audioCountReducer,
    audioGenre: genreReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']