import React, { useState } from 'react'
import './headerlinks.css'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { audioGenre } from '../../../redux/slices/audioControl.slice'

function HeaderLinks() {
    const dispatch = useDispatch()
    const [isGenresOpen, setIsGenresOpen] = useState(false)
    const _url = useLocation();

    const itsMyAccount = _url.pathname === "/account/my" ? true : false

    const setGenre = (genre) => {
        if (!itsMyAccount)
            dispatch(audioGenre(genre))
        setIsGenresOpen(false)
    }

    return (
        <motion.div className='headerlinks'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .3, duration: .3, type: "spring" }}
        >
            <ul className={`header-genres ${isGenresOpen && 'header-genres-open'}`}>
                <li><a onClick={() => setGenre('Fantasy')}>Fantasy</a></li>
                <li><a onClick={() => setGenre('Sci-fi')}>Sci-fi</a></li>
                <li><a onClick={() => setGenre('Synthwave')}>Synthwave</a></li>
                <li><a onClick={() => setGenre('Jazz')}>Jazz</a></li>
                <li><a onClick={() => setGenre('Post-apocalyptic')}>Post-apocalyptic</a></li>
                <li><a onClick={() => setGenre('32-bit')}>32-bit</a></li>
                <li><a onClick={() => setGenre('16-bit')}>16-bit</a></li>
                <li><a onClick={() => setGenre('8-bit')}>8-bit</a></li>
            </ul>
            <a onClick={() => setIsGenresOpen(!isGenresOpen)}>Genres
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5.93753 4.95002C5.97405 4.97924 6.02595 4.97924 6.06247 4.95002L11 1" stroke="currentColor" stroke-linecap="round" />
                </svg>
            </a>
            <Link to='/about'>About</Link>
            <Link to='/'>Change log</Link>
            <Link to='/'>Donate
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.08 12.7112L8 12.7929L7.912 12.7112C4.112 9.18801 1.6 6.85831 1.6 4.49591C1.6 2.86104 2.8 1.63488 4.4 1.63488C5.632 1.63488 6.832 2.45232 7.256 3.56403H8.744C9.168 2.45232 10.368 1.63488 11.6 1.63488C13.2 1.63488 14.4 2.86104 14.4 4.49591C14.4 6.85831 11.888 9.18801 8.08 12.7112ZM11.6 0C10.208 0 8.872 0.662125 8 1.70027C7.128 0.662125 5.792 0 4.4 0C1.936 0 0 1.97003 0 4.49591C0 7.57766 2.72 10.1035 6.84 13.921L8 15L9.16 13.921C13.28 10.1035 16 7.57766 16 4.49591C16 1.97003 14.064 0 11.6 0Z" fill="#F8F8F8" />
                </svg>
            </Link>
        </motion.div>
    )
}

export default HeaderLinks