import React, { useEffect, useState } from 'react'
import Account from '../Account/Account'
import { useDispatch } from 'react-redux'
import { fetchAccountMe, fetchAccountMeEdit } from '../../../redux/slices/user.slice'
import axios from '../../../actions/requests'

function AccountMy({ songRange, setSongRange, checkWidth }) {
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState(false)
    const [accountData, setData] = useState(null)
    const [editAbout, setEditAbout] = useState(false)

    const getMyAccount = async () => {
        const data = await dispatch(fetchAccountMe())
        setData(data.payload)
    }
    const editMyAccount = async () => {
        const editValue = {
            name: myName,
            about: myAbout,
            icon: iconURL
        }
        const data = await dispatch(fetchAccountMeEdit(editValue))
        setData(data.payload)
    }

    const limit = 430
    const [myAbout, setMyAbout] = useState(''.slice(0, limit))
    const [myName, setMyName] = useState(''.slice(0, 16))
    const [iconURL, setIconURL] = useState(accountData?.icon)

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

    useEffect(() => {
        getMyAccount()
    }, [])
    
    useEffect(() => {
        if (accountData != null) {
            setMyName(`${accountData.name}`)
            if (accountData.about != null) {
                setMyAbout(`${accountData.about}`)
            }
        }
    }, [accountData])

    return (
        accountData != null ?
        <Account itsMyAccount={true} modalActive={modalActive} setModalActive={setModalActive} accountData={accountData} setMyName={setMyName} myName={myName} editMyAccount={editMyAccount} setEditAbout={setEditAbout} editAbout={editAbout} setMyAbout={setMyAbout} myAbout={myAbout} onIconChange={onIconChange} songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth}/>
        :
        null
    )
}

export default AccountMy