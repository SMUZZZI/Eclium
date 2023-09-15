import React, { useEffect, useState } from 'react'
import './search.css'
import axios from '../../../actions/requests'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchSongID } from '../../../redux/slices/song.slice'

function searchData(searchWord, data) {
    if (!searchWord) {
        return
    }
    const result = []
    for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if (item?.title) {
            if (item.title.toLowerCase().includes(searchWord.toLowerCase()))
                result.push(item)
        }
        if (item?.name) {
            if (item.name.toLowerCase().includes(searchWord.toLowerCase()))
                result.push(item)
        }
    }
    return result
}

function Search() {
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [songs, setSongs] = useState(null)
    const [users, setUsers] = useState(null)

    const [searchResult, setSearchResult] = useState(null)

    const searchHandler = async () => {
        if (songs == null || users == null) {
            const songsData = await axios.get('/api/songs')
            const accountsData = await axios.get('/api/accounts')

            setSongs(songsData)
            setUsers(accountsData)
        }
    }

    useEffect(() => {
        if (songs != null && users != null) {
            const timeOut = setTimeout(() => {
                const filtredData = searchData(search, [...songs.data, ...users.data])
                setSearchResult(filtredData)
            }, 300)
            return () => clearTimeout(timeOut)
        }
    }, [search])

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .25, duration: .3, type: "spring" }}
        >
            <div className='search'>
                <form>
                    <input type="search" placeholder='Search' value={search} onClick={() => searchHandler()} onChange={e => { setSearch(e.target.value) }} />
                    <span></span>
                </form>
                <button onClick={e => {
                    e.preventDefault()
                }}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99063 9.65376C8.14822 10.3268 7.08007 10.6518 6.00556 10.5619C4.93104 10.472 3.93172 9.97413 3.21284 9.17046C2.49397 8.36679 2.11011 7.31836 2.1401 6.24051C2.17009 5.16266 2.61166 4.1372 3.37411 3.37474C4.13656 2.61229 5.16202 2.17072 6.23988 2.14073C7.31773 2.11074 8.36616 2.4946 9.16983 3.21348C9.9735 3.93235 10.4714 4.93167 10.5613 6.00619C10.6512 7.08071 10.3262 8.14886 9.65312 8.99126L12.8756 12.2131C12.9217 12.256 12.9586 12.3078 12.9842 12.3653C13.0099 12.4228 13.0236 12.4849 13.0247 12.5478C13.0259 12.6107 13.0143 12.6733 12.9907 12.7316C12.9671 12.79 12.932 12.843 12.8875 12.8875C12.843 12.932 12.79 12.9671 12.7316 12.9907C12.6733 13.0143 12.6107 13.0259 12.5478 13.0248C12.4849 13.0236 12.4228 13.0099 12.3653 12.9842C12.3078 12.9586 12.256 12.9217 12.2131 12.8756L8.99063 9.65376ZM4.03688 8.67751C3.57815 8.21874 3.26572 7.63428 3.13907 6.99799C3.01242 6.36171 3.07723 5.70216 3.32532 5.1027C3.57341 4.50324 3.99363 3.99077 4.53288 3.63007C5.07214 3.26937 5.70621 3.07662 6.35498 3.07619C7.00375 3.07575 7.63809 3.26765 8.17782 3.62762C8.71756 3.98759 9.13848 4.49949 9.38737 5.09862C9.63626 5.69774 9.70196 6.3572 9.57617 6.99366C9.45037 7.63011 9.13873 8.215 8.68063 8.67438L8.6775 8.67751L8.67438 8.68001C8.05881 9.29415 7.22464 9.63884 6.35511 9.63837C5.48557 9.6379 4.65178 9.29231 4.03688 8.67751Z" fill="white" />
                    </svg>
                </button>
            </div>
            <section className={`search-result ${searchResult != null && 'search-result-open'}`}>
                <ul>
                    {
                        searchResult != null ?
                            searchResult.map(item => (
                                <li key={item._id}>
                                    {
                                        item?.title ?
                                            <Link onClick={() => dispatch(fetchSongID(item._id))}>{item.title}</Link>
                                            :
                                            <Link to={`/account/${item._id}`}>{item.name}</Link>
                                    }
                                </li>
                            ))
                            :
                            null
                    }
                </ul>
            </section>
        </motion.div>
    )
}

export default Search
