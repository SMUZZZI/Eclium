import React, { useEffect, useState } from 'react'
import Account from '../Account/Account'
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchAccountID, fetchAccountMe } from '../../../redux/slices/user.slice';
import axios from '../../../actions/requests'


function AccountUser({ songRange, setSongRange, checkWidth }) {

    const dispatch = useDispatch()
    const [accountData, setData] = useState(null)
    const { id } = useParams();

    const limit = 430
    const [myAbout, setMyAbout] = useState(''.slice(0, limit))
    const [myName, setMyName] = useState(''.slice(0, 16))

    const [myAccData, setMyAccData] = useState(null)
    const [isSub, setIsSub] = useState(false)
    
    const getAccountID = async () => {
        const data = await dispatch(fetchAccountID(`${id}`))
        setData(data.payload)
    }

    useEffect(() => {
        getAccountID()
    }, [id])

    useEffect(() => {
        if (accountData != null) {
            setMyName(`${accountData.name}`)
            if (accountData.about != null) {
                setMyAbout(`${accountData.about}`)
            }
        }
    }, [accountData])

    useEffect(() => {
        if (myAccData == null) {
            getMyData()
        }
        if (myAccData != null && accountData != null) {
            if (myAccData.subscribtions != null) {
                const res = myAccData.subscribtions.includes(accountData._id)
                setIsSub(res)
            }
        }
    }, [myAccData])

    const getMyData = async () => {
        const data = await dispatch(fetchAccountMe())
        setMyAccData(data.payload)
    }

    const subscribeAccount = async () => {
        if (accountData != null) {
            const _id = accountData._id
            await axios.put(`/api/subs/${_id}`)
            getMyData()
        }
    }
    const unsubscribeAccount = async () => {
        if (accountData != null) {
            const _id = accountData._id
            await axios.delete(`/api/subs/${_id}`)
            getMyData()
        }
    }

    if (accountData != null && myAccData != null) {
        if (accountData._id == myAccData._id) {
            return <Navigate to='/account/my' />
        }
    }

    return (
        accountData && myAccData != null ?
            <Account itsMyAccount={false} accountData={accountData} myName={myName} myAbout={myAbout} isSub={isSub} unsubscribeAccount={unsubscribeAccount} subscribeAccount={subscribeAccount} songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />
            :
            null
    )
}

export default AccountUser