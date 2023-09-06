import { createAction, createReducer } from '@reduxjs/toolkit'

export const audioPlayPause = createAction("audio/play")
export const audioNext = createAction("audio/next")
export const audioPrew = createAction("audio/prew")

export const audioCount = createAction("audio/count")

export const audioGenre = createAction("audio/genre")

export const audioPlayPauseReducer = createReducer(true, (builder) => {
    builder.addCase(audioPlayPause, (state, action) => state = Boolean(action.payload))
})
export const audioNextReducer = createReducer(false, (builder) => {
    builder.addCase(audioNext, (state, action) => state = Boolean(action.payload))
})
export const audioPrewReducer = createReducer(false, (builder) => {
    builder.addCase(audioPrew, (state, action) => state = Boolean(action.payload))
})

export const audioCountReducer = createReducer(1, (builder) => {
    builder.addCase(audioCount, (state, action) => state = (action.payload))
})
export const genreReducer = createReducer('', (builder) => {
    builder.addCase(audioGenre, (state, action) => state = String(action.payload))
})