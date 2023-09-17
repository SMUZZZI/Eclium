import React, { useEffect, useRef, useState } from 'react'
import './mainplayer.css'
import { useDispatch, useSelector } from 'react-redux'
import { audioNext, audioPlayPause, audioPrew } from '../../redux/slices/audioControl.slice'
import useWindowDimensions from '../../hooks/useWindowDimensions'

function MainPlayer({ checkWidth, songRange, setSongRange, volumeRange, setVolumeRange }) {
    const dispatch = useDispatch()
    const clickRef = useRef()
    const { data } = useSelector(state => state.songId)
    const isPlaying = useSelector(state => state.audioControl)

    const onPlayHandler = () => {
        dispatch(audioPlayPause(!isPlaying))
    }
    const onNextHandler = () => {
        dispatch(audioNext(true))
    }
    const onPrewHandler = () => {
        dispatch(audioPrew(true))
    }


    const [isVolumeOpen, setIsVolumeOpen] = useState(false)
    const screenWidth = useWindowDimensions()

    const [playLineWidth, setPlayLineWidth] = useState(0)

    useEffect(() => {
        if (screenWidth.width <= 1440 && screenWidth.width > 1200) {
            setPlayLineWidth(10.8)
        }
        else if (screenWidth.width <= 1200 && screenWidth.width > 1024) {
            setPlayLineWidth(9)
        }
        else if (screenWidth.width <= 1024) {
            setPlayLineWidth(screenWidth.width / 100)
        }
        else {
            setPlayLineWidth(13.2)
        }
    }, [screenWidth])

    return (
        <div className="main-player-container">
            <section className='mainplayer'>
                {
                    data != null ?
                        <div className='mainplayer-controls-container'>
                            <div className='mainplayer-play-line-block' onClick={e => checkWidth(e, clickRef)} ref={clickRef}>
                                <div className='mainplayer-play-line-progress-bar' style={{
                                    width: `${songRange * playLineWidth}px`
                                }} />
                                <input type="range" value={songRange} onChange={e => setSongRange(e.target.value)} />
                            </div>
                            <div className='mainplayer-controls'>
                                <button className="prew" onClick={onPrewHandler}>
                                    <svg width="22" height="18" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.1139 7.08137L16.8419 11.8871C16.9081 11.9343 17 11.887 17 11.8057V2.19432C17 2.11298 16.9081 2.06567 16.8419 2.11295L10.1139 6.91863C10.0581 6.95851 10.0581 7.04149 10.1139 7.08137Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M2.11392 7.08137L8.84188 11.8871C8.90806 11.9343 9 11.887 9 11.8057L9 2.19432C9 2.11298 8.90806 2.06567 8.84188 2.11295L2.11392 6.91863C2.05809 6.95851 2.05809 7.04149 2.11392 7.08137Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M1 13L1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>

                                </button>
                                <button className="play-pause" onClick={onPlayHandler}>
                                    {
                                        isPlaying ?
                                            <svg className='play-btn-pause' width="14" height="18" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 11V1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                                <path d="M9 11V1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                            :
                                            <svg width="14" height="17" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.88014 6.4176L1.15665 1.1077C1.0903 1.06208 1 1.10958 1 1.1901V11.8099C1 11.8904 1.0903 11.9379 1.15665 11.8923L8.88014 6.5824C8.93794 6.54267 8.93794 6.45733 8.88014 6.4176Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                    }

                                </button>
                                <button className="next" onClick={onNextHandler}>
                                    <svg width="22" height="18" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.88608 6.91863L1.15812 2.11295C1.09194 2.06567 1 2.11298 1 2.19432V11.8057C1 11.887 1.09194 11.9343 1.15812 11.8871L7.88608 7.08137C7.94191 7.04149 7.94191 6.95851 7.88608 6.91863Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M15.8861 6.91863L9.15812 2.11295C9.09194 2.06567 9 2.11298 9 2.19432V11.8057C9 11.887 9.09194 11.9343 9.15812 11.8871L15.8861 7.08137C15.9419 7.04149 15.9419 6.95851 15.8861 6.91863Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M17 1V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>

                                </button>
                            </div>
                            <div className="volume">
                                <button className='volume-btn' onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
                                    <svg width="23" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5294 6.86667V6.86667C19.2994 9.25065 19.2994 14.7494 15.5294 17.1333V17.1333M16.8824 2.46667L17.271 2.63519C19.2163 3.47873 20.8432 4.91879 21.9166 6.74736L22.0283 6.93759C23.863 10.0632 23.863 13.9368 22.0283 17.0624L21.9166 17.2526C20.8432 19.0812 19.2163 20.5213 17.271 21.3648L16.8824 21.5333" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                                        <path d="M6.13367 6.94203L1.73842 8.13321C1.3026 8.25132 1 8.64685 1 9.09839V14.9016C1 15.3532 1.3026 15.7487 1.73842 15.8668L6.13367 17.058C6.31537 17.1072 6.47948 17.2067 6.60712 17.3451L11.65 22.8119C11.7118 22.8788 11.8235 22.8352 11.8235 22.7441V1.25589C11.8235 1.16484 11.7118 1.12116 11.65 1.18809L6.60712 6.65489C6.47948 6.79326 6.31537 6.89279 6.13367 6.94203Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <div className={`volume-container ${isVolumeOpen && 'volume-open'}`}>
                                    <div className='volume-range-planks'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <input type="range" step='0.01' min='0' max='1' value={volumeRange} onChange={e => setVolumeRange(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        :
                        <div className='mainplayer-controls-container'>
                            <div className='mainplayer-play-line-block'>
                            </div>
                            <div className='mainplayer-controls'>
                                <button className="prew">
                                    <svg width="22" height="18" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.1139 7.08137L16.8419 11.8871C16.9081 11.9343 17 11.887 17 11.8057V2.19432C17 2.11298 16.9081 2.06567 16.8419 2.11295L10.1139 6.91863C10.0581 6.95851 10.0581 7.04149 10.1139 7.08137Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M2.11392 7.08137L8.84188 11.8871C8.90806 11.9343 9 11.887 9 11.8057L9 2.19432C9 2.11298 8.90806 2.06567 8.84188 2.11295L2.11392 6.91863C2.05809 6.95851 2.05809 7.04149 2.11392 7.08137Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M1 13L1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>

                                </button>
                                <button className="play-pause">
                                    <svg width="14" height="17" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.88014 6.4176L1.15665 1.1077C1.0903 1.06208 1 1.10958 1 1.1901V11.8099C1 11.8904 1.0903 11.9379 1.15665 11.8923L8.88014 6.5824C8.93794 6.54267 8.93794 6.45733 8.88014 6.4176Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <button className="next">
                                    <svg width="22" height="18" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.88608 6.91863L1.15812 2.11295C1.09194 2.06567 1 2.11298 1 2.19432V11.8057C1 11.887 1.09194 11.9343 1.15812 11.8871L7.88608 7.08137C7.94191 7.04149 7.94191 6.95851 7.88608 6.91863Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M15.8861 6.91863L9.15812 2.11295C9.09194 2.06567 9 2.11298 9 2.19432V11.8057C9 11.887 9.09194 11.9343 9.15812 11.8871L15.8861 7.08137C15.9419 7.04149 15.9419 6.95851 15.8861 6.91863Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        <path d="M17 1V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    </svg>

                                </button>
                            </div>
                            <div className="volume">
                                <button className='volume-btn'>
                                    <svg width="23" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5294 6.86667V6.86667C19.2994 9.25065 19.2994 14.7494 15.5294 17.1333V17.1333M16.8824 2.46667L17.271 2.63519C19.2163 3.47873 20.8432 4.91879 21.9166 6.74736L22.0283 6.93759C23.863 10.0632 23.863 13.9368 22.0283 17.0624L21.9166 17.2526C20.8432 19.0812 19.2163 20.5213 17.271 21.3648L16.8824 21.5333" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                                        <path d="M6.13367 6.94203L1.73842 8.13321C1.3026 8.25132 1 8.64685 1 9.09839V14.9016C1 15.3532 1.3026 15.7487 1.73842 15.8668L6.13367 17.058C6.31537 17.1072 6.47948 17.2067 6.60712 17.3451L11.65 22.8119C11.7118 22.8788 11.8235 22.8352 11.8235 22.7441V1.25589C11.8235 1.16484 11.7118 1.12116 11.65 1.18809L6.60712 6.65489C6.47948 6.79326 6.31537 6.89279 6.13367 6.94203Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                }

            </section>
        </div>
    )
}

export default MainPlayer
