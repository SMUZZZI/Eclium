import React, { useEffect, useState } from 'react'
import Account from '../Account/Account'
import { Navigate, useParams } from 'react-router-dom';
import { IAccount, fetchAccountID, fetchAccountMe } from '../../../redux/slices/user.slice';
import axios from '../../../actions/requests'
import { useAppDispatch } from '../../../redux/reduxHooks';

interface IProps {
    songRange: number
    setSongRange: (v: number) => void
    checkWidth: (e: React.MouseEvent<HTMLElement>, clickRef: React.RefObject<HTMLDivElement>) => void
}
function AccountUser(props: IProps) {

    const { songRange, setSongRange, checkWidth } = props

    const dispatch = useAppDispatch()
    const [accountData, setData] = useState<IAccount | null>(null)
    const { id } = useParams();

    const limit = 430
    const [myAbout, setMyAbout] = useState(''.slice(0, limit))
    const [myName, setMyName] = useState(''.slice(0, 16))

    const [myAccData, setMyAccData] = useState<IAccount | null>(null)
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
        accountData != null ?
            <Account itsMyAccount={false} accountData={accountData} myName={myName} myAbout={myAbout} isSub={isSub} unsubscribeAccount={unsubscribeAccount} subscribeAccount={subscribeAccount} songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} modalActive={false} setModalActive={function (v: boolean): void {
                throw new Error('Function not implemented.');
            } } setMyName={function (v: string): void {
                throw new Error('Function not implemented.');
            } } editMyAccount={function (): void {
                throw new Error('Function not implemented.');
            } } setEditAbout={function (v: boolean): void {
                throw new Error('Function not implemented.');
            } } editAbout={false} setMyAbout={function (v: string): void {
                throw new Error('Function not implemented.');
            } } onIconChange={function (e: React.FormEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            } } />
            :
            null
    )
}

export default AccountUser