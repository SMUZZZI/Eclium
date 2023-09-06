import React, { useState } from 'react'
import './addsong.css'
import axios from '../../../../actions/requests'

function AddSong({ authorData, modalActive, setModalActive }) {

    const [audioURL, setAudioURL] = useState('')
    const [iconURL, setIconURL] = useState('')
    const [title, setTitle] = useState('')
    const [genres, setGenres] = useState([])
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
    }
    const onAudioChange = async (event) => {
        try {
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
    const onIconChange = async (event) => {
        try {
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

    const onGenreSet = (value) => {
        genres.includes(value) ?
            setGenres(genres.filter(item => item != value))
            :
            setGenres([...genres, value])
    }

    return (
        <section className={`addsong ${modalActive && 'addsong-open'}`} onClick={() => { setModalActive(false) }}>
            <article onClick={e => { e.stopPropagation() }}>
                <form>
                    {
                        warn ?
                            <p className='warn-p'>Не выбран файл или не введен тайтл</p>
                            :
                            null
                    }
                    <input type="file" id='file-input' accept='audio/*' onChange={onAudioChange} />
                    <label for="file-input">Chose Song
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
                    <label for="file-input-icon">Chose Icon
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
                        window.location.reload(false);
                    }
                    else {
                        setWarn(true)
                    }
                }}>Add Song</button>
            </article>
        </section>
    )
}

export default AddSong
