import React, { useState } from 'react'
import './addsong.css'
import { motion, AnimatePresence } from 'framer-motion'
import axios from '../../../../actions/requests'
import { fetchSongReload } from '../../../../redux/slices/song.slice'
import { useAppDispatch } from '../../../../redux/reduxHooks'
import { IAccount } from '../../../../redux/slices/user.slice'

interface IProps {
    authorData: IAccount
    modalActive: boolean
    setModalActive: (v: boolean) => void
}

function AddSong(props: IProps) {

    const { authorData, modalActive, setModalActive } = props

    const dispatch = useAppDispatch()

    const [audioURL, setAudioURL] = useState('')
    const [iconURL, setIconURL] = useState('')
    const [title, setTitle] = useState('')
    const [genres, setGenres] = useState<string[]>([])
    const [warn, setWarn] = useState(false)

    const onSubmit = async () => {
        const postValue = {
            audio: audioURL,
            title,
            author: authorData.name,
            authorLink: authorData._id,
            icon: iconURL,
            genres
        }
        await axios.put("/api/add/song", postValue)
        dispatch(fetchSongReload(true))
    }
    const onAudioChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files) {
                return;
            }
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append("file", file)
            const { data } = await axios.post("/upload", formData)
            setAudioURL(data.url)
        } catch (error) {
            console.warn(error);
            alert("Ошибка при загрузке файла")
        }
    }
    const onIconChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files) {
                return;
            }
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append("file", file)
            const { data } = await axios.post("/upload", formData)
            setIconURL(data.url)
        } catch (error) {
            console.warn(error);
            alert("Ошибка при загрузке файла")
        }
    }

    const onGenreSet = (value: string) => {
        genres.includes(value) ?
            setGenres(genres.filter(item => item != value))
            :
            setGenres([...genres, value])
    }

    return (
        <AnimatePresence>
            {
                modalActive && (
                    <motion.section className='addsong' onClick={() => { setModalActive(false) }}
                        initial={{ backgroundColor: 'transparent', opacity: 0 }}
                        animate={{ backgroundColor: 'rgba(0, 0, 0, 0.500)', opacity: 1 }}
                        exit={{ backgroundColor: 'transparent', opacity: 0 }}
                    >
                        <motion.article onClick={e => { e.stopPropagation() }}
                            initial={{ y: '-100vw' }}
                            animate={{ y: 0 }}
                            transition={{ duration: .4, type: 'spring' }}
                            exit={{ y: '-100vw' }}
                        >
                            <form>
                                {
                                    warn ?
                                        <p className='warn-p'>Не выбран файл или не введен тайтл</p>
                                        :
                                        null
                                }
                                <input type="file" id='file-input' accept='audio/*' onChange={onAudioChange} />
                                <label htmlFor="file-input">Chose Song
                                    <svg width="15" height="16" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 22V2M12.5 2L20.5357 11.6071M12.5 2L4.46429 11.6071M0 25H25" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </label>
                                {
                                    audioURL.length != 0 ?
                                        <p className='addsong-loding-done'>Загрузка файла произошла успешно</p>
                                        :
                                        null
                                }
                                <input type="text" placeholder='Title' value={title} className='title-input' onChange={e => setTitle(e.target.value)} />

                                <input type="file" id='file-input-icon' accept='image/*' onChange={onIconChange} />
                                <label htmlFor="file-input-icon">Chose Icon
                                    <svg width="15" height="16" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 22V2M12.5 2L20.5357 11.6071M12.5 2L4.46429 11.6071M0 25H25" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </label>
                            </form>
                            <section className='addsong-genres'>
                                <ul>
                                    <li className={`addsong-genres-item ${genres.includes('Fantasy') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('Fantasy')} key='Fantasy'>Fantasy</li>
                                    <li className={`addsong-genres-item ${genres.includes('Sci-fi') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('Sci-fi')} key='Sci-fi'>Sci-fi</li>
                                    <li className={`addsong-genres-item ${genres.includes('Synthwave') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('Synthwave')} key='Synthwave'>Synthwave</li>
                                    <li className={`addsong-genres-item ${genres.includes('Jazz') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('Jazz')} key='Jazz'>Jazz</li>
                                    <li className={`addsong-genres-item ${genres.includes('Post-apocalyptic') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('Post-apocalyptic')} key='Post-apocalyptic'>Post-apocalyptic</li>
                                    <li className={`addsong-genres-item ${genres.includes('32-bit') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('32-bit')} key='32-bit'>32-bit</li>
                                    <li className={`addsong-genres-item ${genres.includes('16-bit') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('16-bit')} key='16-bit'>16-bit</li>
                                    <li className={`addsong-genres-item ${genres.includes('8-bit') && 'addsong-genres-item-get'}`} onClick={() => onGenreSet('8-bit')} key='8-bit'>8-bit</li>
                                </ul>
                            </section>
                            <button className='add-song-btn' onClick={e => {
                                if (audioURL.length != 0 && title.length != 0) {
                                    onSubmit()
                                    setModalActive(false)
                                }
                                else {
                                    setWarn(true)
                                }
                            }}>Add Song</button>
                        </motion.article>
                    </motion.section>
                )
            }
        </AnimatePresence>
    )
}

export default AddSong
