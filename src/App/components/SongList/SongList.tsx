import React, { useState } from 'react'
import './songlist.css'
import axios from '../../../actions/requests'
import { useEffect } from 'react'
import { ISong, fetchSongAccount, fetchSongGenres, fetchSongID, fetchSongReload } from '../../../redux/slices/song.slice'
import SongItem from './SongItem'
import { audioCount, audioNext, audioPrew } from '../../../redux/slices/audioControl.slice'
import { useLocation } from 'react-router-dom'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks'

interface IProps {
    id: string
    title: string
    itsMyAccount: boolean
    songRange: number
    setSongRange: (v: number) => void
    checkWidth: (e: React.MouseEvent<HTMLElement>, clickRef: React.RefObject<HTMLDivElement>) => void
}

function SongList(props: IProps) {
    const { id, title, itsMyAccount, songRange, setSongRange, checkWidth, } = props

    const dispatch = useAppDispatch()
    const _url = useLocation();
    const itsNotAccount = _url.pathname === "/" ? true : false
    const currentSong = useAppSelector(state => state.songId)

    const nextSong = useAppSelector(state => state.audioNext)
    const prewSong = useAppSelector(state => state.audioPrew)
    const currentGenre = useAppSelector(state => state.audioGenre)
    const reloadSong = useAppSelector(state => state.songReload)

    const count = useAppSelector(state => state.audioCount)
    const [songData, setSongData] = useState<ISong[] | null>(null)
    const getSongsAccount = async () => {
        try {
            const data = await dispatch(fetchSongAccount(id))
            setSongData(data.payload)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (reloadSong) {
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
    const getSongID = async (id: string) => {
        const data = await dispatch(fetchSongID(id))
        dispatch(audioCount(data.payload._id))
    }
    const deleteSong = async (id: string) => {
        await axios.delete(`/api/song/${id}`)
        getSongsAccount()
    }
    useEffect(() => {
        itsNotAccount ?
            getAllSongs()
            :
            getSongsAccount()
    }, [itsNotAccount])

    const getGenreSongs = async (genre: string) => {
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

    const windowWidth = useWindowDimensions()
    const [asideHeight, setAsideHeight] = useState(0)

    useEffect(() => {

        if (windowWidth.width > 1200) {
            setAsideHeight(236)
        }
        else if (windowWidth.width <= 1200 && windowWidth.width > 768) {
            setAsideHeight(180)
        }
        else if (windowWidth.width <= 768 && windowWidth.width > 400) {
            if (itsNotAccount) {
                setAsideHeight(160)
            }
            else
                setAsideHeight(354)
        }
        else if (windowWidth.width <= 400) {
            if (itsNotAccount) {
                setAsideHeight(140)
            }
            else
                setAsideHeight(334)
        }

    }, [windowWidth.width])

    return (
        <article className='songlist' style={{
            height: windowWidth.height - asideHeight
        }}>
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
