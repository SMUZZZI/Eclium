import React, { useEffect, useState } from 'react'
import './accountheader.css'
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
        <div>
            {
                isAuthorized ?
                    <Link to='/account/my' className='accountheader'>
                        <h3>{data.name.slice(0, 24)}{data.name.length >= 24 ? <p>...</p> : <p />}</h3>
                        <div>
                            <img src={`http://localhost:5000${data?.icon}`} />
                        </div>
                    </Link>
                    :
                    <button className='account-login' onClick={() => { setModalActive(true) }}>
                        Login
                    </button>
            }
            <LoginRegisterModal modalActive={modalActive} setModalActive={setModalActive} />
        </div>
    )
}

export default AccountHeader
