import { configureStore } from '@reduxjs/toolkit'

import { accountIdReducer, authReducer } from './slices/user.slice'
import { songGenresReducer, songIdReducer } from './slices/song.slice'
import { audioCountReducer, audioNextReducer, audioPlayPauseReducer, audioPrewReducer, genreReducer } from './slices/audioControl.slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        accountId: accountIdReducer,
        songId: songIdReducer,
        songGenre: songGenresReducer,
        audioControl: audioPlayPauseReducer,
        audioNext: audioNextReducer,
        audioPrew: audioPrewReducer,
        audioCount: audioCountReducer,
        audioGenre: genreReducer
    },
})

export default store