import React, {  useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { audioPlayPause } from '../../../redux/slices/audioControl.slice'

function SongItem({ item, count, itsMyAccount, deleteSong, songRange, setSongRange, getSongID, checkWidth }) {
    const dispatch = useDispatch()
    const isPlaying = useSelector(state => state.audioControl)

    const onPlayHandler = () => {
        if (count != item._id) {
            getSongID(item._id)
            dispatch(audioPlayPause(true))

        }
        else
            dispatch(audioPlayPause(!isPlaying))
    }

    const clickRef = useRef()
    return (
        item != null ?
        <li key={item._id} className={`${count == item._id && 'item-open'}`}>
            <button onClick={onPlayHandler}>
                {
                    isPlaying && count == item._id ?
                        <svg className='play-btn-pause' width="12" height="16" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11V1" stroke="white" stroke-width="2" stroke-linecap="round" />
                            <path d="M9 11V1" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        :
                        <svg className='play-btn' width="11" height="14" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.88608 5.91863L1.15812 1.11295C1.09194 1.06567 1 1.11298 1 1.19432V10.8057C1 10.887 1.09194 10.9343 1.15812 10.8871L7.88608 6.08137C7.94191 6.04149 7.94191 5.95851 7.88608 5.91863Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                }

            </button>
            <div className='play-text'>
                <h3>{item.title.slice(0, 24)}{item.title.length >= 24 ? <p>...</p> : <p></p>}</h3>
                <Link to={`/account/${item.authorLink}`} className={`${count == item._id && 'author-open'}`}><p>{item.author.slice(0, 30)}{item.author.length >= 30 ? <p>...</p> : null}</p></Link>
            </div>
            <div className={`play-line-block ${count == item._id && 'play-line-block-open'}`} onClick={e => checkWidth(e, clickRef)} ref={clickRef}>
                <div className='play-line-progress-bar' style={{
                    width: `${songRange * 6.2}px`
                }} />
                <input type="range" step='0.01' value={songRange} onChange={e => setSongRange(e.target.value)} className='play-line' />
            </div>
            {
                itsMyAccount ?
                    <button className='delete-song-btn' onClick={() => deleteSong(item._id)}>X</button>
                    :
                    null
            }
        </li>
        :
        null
    )
}

export default SongItem