import React, { useEffect, useState } from 'react'
import './main.css'
import { motion } from 'framer-motion'
import SongList from '../../components/SongList/SongList'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { audioGenre } from '../../../redux/slices/audioControl.slice'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

function Main({ songRange, setSongRange, checkWidth }) {
  const dispatch = useDispatch()
  const title = 'Latest songs'

  const { data } = useSelector(state => state.songId)

  const [downloadSong, setDownloadSong] = useState('')

  useEffect(() => {
    if (data != null)
      setDownloadSong(`http://45.84.226.30:5000${data.audio}`)
  }, [data])

  const windowWidth = useWindowDimensions()
  const [asideHeight, setAsideHeight] = useState(0)

  useEffect(() => {
    if (windowWidth.width > 1200) {
      setAsideHeight(236)
    }
    else if (windowWidth.width <= 1200 && windowWidth.width > 768) {
      setAsideHeight(180)
    }
    else if (windowWidth.width <= 768) {
      setAsideHeight(windowWidth.height)
    }

  }, [windowWidth.width])

  return (
    <section className='main'>
      <SongList title={title} songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />
      {
        data != null ?
          <motion.aside style={{
            minHeight: windowWidth.height - asideHeight
          }}
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, type: "tween" }}
          >

            <section className='main-aside'>
              <div className='main-aside-author'>
                <section>
                  <div className='main-aside-img'>
                    <img src={`http://45.84.226.30:5000${data?.icon}`} />
                  </div>
                  <div>
                    <h3>{data.title.slice(0, 32)}{data.title.length >= 32 ? <p>...</p> : null}</h3>
                    <Link to={`/account/${data.authorLink}`}>{data.author.slice(0, 40)}{data.author.length >= 40 ? <p>...</p> : null}</Link>
                  </div>
                </section>
              </div>
              <div className='main-aside-download'>
                <div>
                  <Link className='download-btn' target="_blank" download={downloadSong}>Download
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0V11.1648M7 11.1648L11.5 6.5M7 11.1648L2.5 6.5M0 14H14" stroke="white" stroke-width="2" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className='main-aside-genres'>
                <h3>Genres</h3>
                <ul>
                  {
                    data.genres.map((item, index) => (
                      <motion.li
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: `.${index + 2}` }}
                      ><Link onClick={() => dispatch(audioGenre(item))}>{item}</Link></motion.li>
                    ))
                  }
                </ul>
              </div>
            </section>
          </motion.aside>
          :
          null
      }
    </section>
  )
}

export default Main
