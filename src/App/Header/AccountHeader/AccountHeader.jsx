import React, { useEffect, useState } from 'react'
import './accountheader.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LoginRegisterModal from '../../modal/LoginRegisterModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccountMe, selectIsAuth } from '../../../redux/slices/user.slice'

function AccountHeader() {

    const dispatch = useDispatch()
    const isAuthorized = useSelector(selectIsAuth)

    const { data } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(fetchAccountMe())
    }, [])

    const [modalActive, setModalActive] = useState(false)

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .35, duration: .3, type: "spring" }}
        >
            {
                isAuthorized ?
                    <Link to='/account/my' className='accountheader'>
                        <h3>{data.name.slice(0, 24)}{data.name.length >= 24 ? <p>...</p> : <p />}</h3>
                        <div>
                            <img src={`http://45.84.226.30:5000${data?.icon}`} />
                        </div>
                    </Link>
                    :
                    <button className='account-login' onClick={() => { setModalActive(true) }}>
                        Login
                    </button>
            }
            <LoginRegisterModal modalActive={modalActive} setModalActive={setModalActive} />
        </motion.div>
    )
}

export default AccountHeader
