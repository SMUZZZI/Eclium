import React, { useState } from 'react'
import './songlist.css'
import axios from '../../../actions/requests'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongAccount, fetchSongGenres, fetchSongID, fetchSongReload } from '../../../redux/slices/song.slice'
import SongItem from './SongItem'
import { audioCount, audioNext, audioPrew } from '../../../redux/slices/audioControl.slice'
import { useLocation } from 'react-router-dom'

function SongList({ id, title, itsMyAccount, songRange, setSongRange, checkWidth, }) {
    const dispatch = useDispatch()
    const _url = useLocation();
    const itsNotAccount = _url.pathname === "/" ? true : false
    const currentSong = useSelector(state => state.songId)

    const nextSong = useSelector(state => state.audioNext)
    const prewSong = useSelector(state => state.audioPrew)
    const currentGenre = useSelector(state => state.audioGenre)
    const reloadSong = useSelector(state => state.songReload)

    const count = useSelector(state => state.audioCount)
    const [songData, setSongData] = useState(null)
    const getSongsAccount = async () => {
        try {
            const data = await dispatch(fetchSongAccount(id))
            setSongData(data.payload)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(reloadSong)
        {
            getSongsAccount()
            dispatch(fetchSongReload(false))
        }
    }, [reloadSong])
    
    
    const getAllSongs = async () => {
        try {
            const { data } = await axios.get(`/api/songs`)
            setSongData(data)
            console.log('getAllSongs');
        } catch (error) {
            console.log(error);
        }
    }
    const getSongID = async (id) => {
        const data = await dispatch(fetchSongID(id))
        dispatch(audioCount(data.payload._id))
    }
    const deleteSong = async (id) => {
        await axios.delete(`/api/song/${id}`)
        getSongsAccount()
    }
    useEffect(() => {
        itsNotAccount ?
            getAllSongs()
            :
            getSongsAccount()
    }, [itsNotAccount])

    const getGenreSongs = async (genre) => {
        try {
            const data = await dispatch(fetchSongGenres(genre))
            setSongData(data.payload)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (itsNotAccount) {
            if (currentGenre.length != 0) {
                getGenreSongs(currentGenre)
            }
            else {
                getAllSongs()
            }
        }
    }, [currentGenre])

    useEffect(() => {
        if (songData != null && currentSong.data != null) {
            if (prewSong) {
                for (let i = 0; i < songData.length; i++) {
                    if (currentSong.data._id === songData[i]._id) {
                        if (i != 0) {
                            const prew = songData[i - 1]._id
                            getSongID(prew)
                            dispatch(audioPrew(false))
                        }
                        else {
                            dispatch(audioPrew(false))
                            break
                        }
                    }
                }
            }
        }
    }, [prewSong])

    useEffect(() => {
        if (songData != null && currentSong.data != null) {
            if (nextSong) {
                for (let i = 0; i < songData.length; i++) {
                    if (currentSong.data._id === songData[i]._id) {
                        if (i != songData.length - 1) {
                            const next = songData[i + 1]._id
                            getSongID(next)
                            dispatch(audioNext(false))
                        }
                        else {
                            dispatch(audioNext(false))
                            break
                        }
                    }
                }
            }
        }
    }, [nextSong])  


    return (
        <article className='songlist'>
            {
                songData != null ?
                    <ul>
                        <h2 className='title'>{title}</h2>
                        {
                            songData.map((item, index) => (
                                <SongItem item={item} index={index} count={count} deleteSong={deleteSong} getSongID={getSongID} itsMyAccount={itsMyAccount} songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />
                            ))
                        }
                    </ul >
                    :
                    <h2 className='title'>Тут пока ничего нет</h2>
            }
        </article >
    )
}

export default SongList
