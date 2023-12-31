import React, { useEffect, useState } from 'react'
import './account.css'
import { motion } from 'framer-motion'
import SongList from '../../components/SongList/SongList'
import { Link } from 'react-router-dom'
import AddSong from './AddSong/AddSong'
import axios from '../../../actions/requests'
import { IAccount } from '../../../redux/slices/user.slice'

interface IProps {
    itsMyAccount: boolean
    modalActive: boolean
    setModalActive: (v: boolean) => void
    accountData: IAccount
    setMyName: (v: string) => void
    myName: string
    editMyAccount: () => void
    setEditAbout: (v: boolean) => void
    editAbout: boolean
    setMyAbout: (v: string) => void
    myAbout: string
    onIconChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isSub: boolean
    unsubscribeAccount: () => void
    subscribeAccount: () => void
    songRange: number
    setSongRange: (v: number) => void
    checkWidth: (e: React.MouseEvent<HTMLElement>, clickRef: React.RefObject<HTMLDivElement>) => void
}

function Account(props: IProps) {

    const { itsMyAccount, modalActive, setModalActive, accountData, setMyName, myName, editMyAccount, setEditAbout, editAbout, setMyAbout, myAbout, onIconChange, isSub, unsubscribeAccount, subscribeAccount, songRange, setSongRange, checkWidth } = props

    const [subscribtion, setSubscribtion] = useState<IAccount[] | null>(null)
    const getSubscription = async () => {
        const { data } = await axios.get(`/api/account/${accountData._id}/subs`)
        setSubscribtion(data)
    }
    useEffect(() => {
        if (accountData.subscribtions != null) {
            if (accountData.subscribtions.length != 0) {
                getSubscription()
            }
        }
    }, [accountData])

    return (
        accountData != null ?
            <section className='account'>
                <article className='account-aside'>
                    <div className='container'>
                        <section className="account-aside-header">
                            <div>
                                {
                                    itsMyAccount ?
                                        <>
                                            <input type="file" id='icon-file-input' accept='image/*' onChange={onIconChange} className='account-icon-settings' />
                                            <label htmlFor='icon-file-input' className={`account-settings icon-file-input-label  ${editAbout && 'account-settings-open'}`}>
                                                <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.5 22V2M12.5 2L20.5357 11.6071M12.5 2L4.46429 11.6071M0 25H25" stroke="currentColor" stroke-width="2" />
                                                </svg>
                                            </label></>
                                        :
                                        null
                                }
                                <div className='account-img'>
                                    {
                                        accountData.icon != null ?
                                            <img src={`http://45.84.226.30:5000${accountData.icon}`} />
                                            :
                                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M40.7996 26.7304L34.4485 19.6205C34.9454 18.6824 34.7673 17.4879 33.9393 16.7528L33.8068 16.6341C33.8151 15.9526 33.5667 15.2672 33.0492 14.7504C32.1632 13.8583 30.801 13.7472 29.795 14.4134L25.6838 9.81132C26.7892 8.51721 26.7644 6.63731 25.5306 5.37001L22.3882 2.14241C21.0095 0.725783 18.6537 0.610922 17.1219 1.88588C15.59 3.16084 15.4658 5.33938 16.8445 6.756L19.9869 9.98361C21.1379 11.1629 22.9678 11.4347 24.4293 10.757L28.6316 15.4587C28.586 15.5238 28.5364 15.5812 28.495 15.6501L28.2838 15.8607C27.2736 16.8791 27.2736 18.5331 28.2838 19.5516C28.3832 19.6511 28.4908 19.7392 28.6026 19.8196L23.2576 26.5275C22.3385 27.6837 21.2289 28.6907 19.991 29.4986C18.6786 30.2988 17.3661 31.1028 16.0537 31.903C15.4575 31.5507 14.8986 31.1564 14.3769 30.7276L14.5384 29.935C18.3225 29.4028 21.2372 26.1369 21.2372 22.1781C21.2372 17.8478 17.7512 14.333 13.4537 14.333C13.3212 14.333 13.1928 14.3445 13.0645 14.3522L14.0374 13.7051C14.5922 13.3337 14.7206 12.6178 14.319 12.1009C13.9174 11.5878 13.1432 11.4691 12.5842 11.8405L9.86413 13.6553C10.2823 12.2885 10.8743 10.9791 11.6444 9.78834C11.69 9.7156 11.6444 9.62371 11.5616 9.62371C10.688 9.62371 6.97015 9.62371 4.19208 9.62371C2.42422 9.62371 1 11.0671 1 12.8475V31.4282C1 36.7118 5.25197 41 10.4976 41H28.88C30.681 41 32.1383 39.5298 32.1383 37.715V31.5661C32.1383 31.432 31.9934 31.3555 31.8816 31.432C29.6956 32.9214 26.9465 33.8327 23.6137 33.8327C22.9099 33.8327 22.235 33.7905 21.5809 33.714C22.62 32.9482 23.6592 32.1786 24.6984 31.4129C25.4022 30.8539 26.1558 30.1762 26.901 29.3684C27.2736 28.9664 27.6048 28.572 27.9029 28.1891L33.1817 21.0026C33.2438 20.9146 33.2976 20.8265 33.3473 20.7385L39.6403 27.7833C39.926 28.1049 40.4187 28.1317 40.7416 27.8407C41.0604 27.5497 41.0894 27.0558 40.7996 26.7342V26.7304ZM17.6187 17.0706C20.1028 17.0706 20.1028 20.5164 17.6187 20.5164C15.1346 20.5164 15.1387 17.0706 17.6187 17.0706ZM12.489 23.3228C10.0049 23.3228 10.009 19.877 12.489 19.877C14.969 19.877 14.9731 23.3228 12.489 23.3228Z" fill="#888" stroke="#888" stroke-miterlimit="10" />
                                            </svg>
                                    }
                                </div>
                                {
                                    itsMyAccount ?
                                        <form className={`account-settings account-settings-name ${editAbout && 'account-settings-open'}`}>
                                            <input maxLength={16} type="text" value={myName} onChange={e => setMyName(e.target.value)} />
                                        </form>
                                        :
                                        null
                                }
                                <h3>{myName.slice(0, 16)}{myName.length >= 16 ? <p>...</p> : null}</h3>
                                {
                                    itsMyAccount ?
                                        <>
                                            <button className='account-my-btn' onClick={() => {
                                                if (!editAbout)
                                                    setModalActive(true)
                                            }}>
                                                <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.5 22V2M12.5 2L20.5357 11.6071M12.5 2L4.46429 11.6071M0 25H25" stroke="currentColor" stroke-width="2" />
                                                </svg>
                                            </button>
                                            <AddSong authorData={accountData} modalActive={modalActive} setModalActive={setModalActive} />
                                        </>
                                        :
                                        <>
                                            {
                                                isSub ?
                                                    <button className='account-user-btn' onClick={() => unsubscribeAccount()}>
                                                        <svg width="25" height="22" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1.5 1.5L17.5 17.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                                                            <path d="M1.5 17.5L17.5 1.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                                                        </svg>

                                                    </button>
                                                    :
                                                    <button className='account-user-btn' onClick={() => subscribeAccount()}>
                                                        <svg width="25" height="22" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.08 12.7112L8 12.7929L7.912 12.7112C4.112 9.18801 1.6 6.85831 1.6 4.49591C1.6 2.86104 2.8 1.63488 4.4 1.63488C5.632 1.63488 6.832 2.45232 7.256 3.56403H8.744C9.168 2.45232 10.368 1.63488 11.6 1.63488C13.2 1.63488 14.4 2.86104 14.4 4.49591C14.4 6.85831 11.888 9.18801 8.08 12.7112ZM11.6 0C10.208 0 8.872 0.662125 8 1.70027C7.128 0.662125 5.792 0 4.4 0C1.936 0 0 1.97003 0 4.49591C0 7.57766 2.72 10.1035 6.84 13.921L8 15L9.16 13.921C13.28 10.1035 16 7.57766 16 4.49591C16 1.97003 14.064 0 11.6 0Z" fill="currentColor" />
                                                        </svg>
                                                    </button>
                                            }
                                        </>
                                }

                            </div>
                        </section>
                        <section className='account-about'>
                            {
                                itsMyAccount ?
                                    <div>
                                        <h3>About</h3>
                                        <button onClick={() => {
                                            if (editAbout) {
                                                editMyAccount()
                                            }
                                            setEditAbout(!editAbout)
                                        }}>
                                            <svg className={`about-settings-edit ${!editAbout && 'about-settings-edit-open'}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.99996 6.24981C8.96288 6.24981 7.96829 6.64492 7.23497 7.34822C6.50164 8.05151 6.08967 9.00539 6.08967 10C6.08967 10.9946 6.50164 11.9485 7.23497 12.6518C7.96829 13.3551 8.96288 13.7502 9.99996 13.7502C11.037 13.7502 12.0316 13.3551 12.7649 12.6518C13.4983 11.9485 13.9102 10.9946 13.9102 10C13.9102 9.00539 13.4983 8.05151 12.7649 7.34822C12.0316 6.64492 11.037 6.24981 9.99996 6.24981ZM7.3931 10C7.3931 9.33693 7.66775 8.70101 8.15663 8.23214C8.64551 7.76328 9.30857 7.49987 9.99996 7.49987C10.6913 7.49987 11.3544 7.76328 11.8433 8.23214C12.3322 8.70101 12.6068 9.33693 12.6068 10C12.6068 10.6631 12.3322 11.299 11.8433 11.7679C11.3544 12.2367 10.6913 12.5001 9.99996 12.5001C9.30857 12.5001 8.64551 12.2367 8.15663 11.7679C7.66775 11.299 7.3931 10.6631 7.3931 10ZM7.65065 19.7345C8.42176 19.911 9.21112 20 10.0036 20C10.7944 19.9992 11.5823 19.9096 12.3513 19.733C12.5535 19.6863 12.7358 19.581 12.8733 19.4314C13.0108 19.2818 13.0969 19.0952 13.1198 18.8969L13.2961 17.3614C13.3258 17.0868 13.4568 16.8314 13.6655 16.6412C13.8742 16.4509 14.1468 16.3384 14.4342 16.3238C14.6256 16.3158 14.8159 16.3503 14.991 16.4238L16.4545 17.0394C16.5818 17.0942 16.7196 17.123 16.8591 17.1239C16.9986 17.1247 17.1368 17.0977 17.2647 17.0444C17.3935 16.9918 17.5088 16.9138 17.6036 16.8153C18.6797 15.7029 19.4831 14.374 19.955 12.9256C20.0168 12.7335 20.0149 12.5277 19.9495 12.3367C19.8841 12.1456 19.7586 11.9788 19.5901 11.8591L18.2898 10.939C18.1349 10.8312 18.0088 10.6897 17.9219 10.5261C17.835 10.3625 17.7897 10.1816 17.7897 9.998C17.7897 9.81442 17.835 9.63346 17.9219 9.4699C18.0088 9.30634 18.1349 9.16483 18.2898 9.05695L19.5859 8.13891C19.7548 8.01903 19.8807 7.85173 19.9461 7.66019C20.0115 7.46865 20.0132 7.26234 19.9509 7.06985C19.4788 5.62132 18.6744 4.29257 17.5969 3.18116C17.4541 3.03481 17.2675 2.93456 17.0628 2.89426C16.8581 2.85395 16.6454 2.87558 16.454 2.95615L14.991 3.57418C14.8399 3.63968 14.6751 3.67418 14.5083 3.67418C14.2079 3.67362 13.9184 3.56675 13.6952 3.37408C13.472 3.18141 13.3308 2.91649 13.2987 2.63013L13.1214 1.10006C13.0987 0.899234 13.0111 0.71024 12.8709 0.559523C12.7307 0.408806 12.5448 0.30391 12.3394 0.259513C11.5742 0.095685 10.7933 0.00871176 10.0093 0C9.22002 0.00873695 8.43376 0.095873 7.66317 0.260013C7.45794 0.304157 7.27222 0.408716 7.132 0.559066C6.99178 0.709417 6.90406 0.89804 6.88111 1.09855L6.70384 2.62963C6.6704 2.91645 6.52783 3.18137 6.30343 3.37367C6.07442 3.56025 5.78578 3.66611 5.4854 3.67368C5.31972 3.67358 5.15587 3.64055 5.00417 3.57668L3.54433 2.95865C3.35236 2.87736 3.13874 2.85544 2.93318 2.89594C2.72762 2.93645 2.54032 3.03736 2.39731 3.18466C1.32123 4.29631 0.517852 5.6246 0.0459283 7.07235C-0.0164141 7.26476 -0.0147731 7.47101 0.0506238 7.66248C0.116021 7.85395 0.241931 8.02116 0.410888 8.14091L1.70806 9.05895C1.93979 9.2232 2.10355 9.4607 2.17042 9.7295C2.2373 9.99831 2.20298 10.2811 2.07354 10.528C1.98747 10.6917 1.86245 10.8337 1.70858 10.9425L0.410367 11.8621C0.241557 11.9817 0.115734 12.1488 0.0503409 12.34C-0.0150524 12.5313 -0.0167767 12.7374 0.045407 12.9296C0.516495 14.3788 1.31995 15.7084 2.39679 16.8208C2.53905 16.9681 2.72566 17.0691 2.93061 17.1098C3.13556 17.1505 3.34864 17.1288 3.54016 17.0479L5.00939 16.4293C5.16111 16.3653 5.32482 16.3323 5.49061 16.3323H5.49478C5.79397 16.3327 6.08256 16.4386 6.30561 16.6298C6.52866 16.821 6.67058 17.0843 6.70437 17.3694L6.88059 18.8979C6.90354 19.0964 6.98982 19.2833 7.12764 19.433C7.26547 19.5828 7.44812 19.688 7.65065 19.7345ZM11.855 18.5619C10.635 18.8119 9.37327 18.8119 8.15326 18.5619L7.99476 17.2309C7.92585 16.6402 7.63264 16.0946 7.17107 15.698C6.7095 15.3015 6.11187 15.0817 5.49218 15.0808H5.48696C5.14135 15.0794 4.79927 15.1475 4.4828 15.2808L3.20753 15.8173C2.38025 14.9224 1.74905 13.8772 1.35144 12.7436L2.48021 11.9436C2.79831 11.7186 3.05686 11.4252 3.23505 11.0869C3.41323 10.7485 3.50606 10.3748 3.50606 9.99575C3.50606 9.61671 3.41323 9.24297 3.23505 8.90464C3.05686 8.56631 2.79831 8.27285 2.48021 8.0479L1.35196 7.24786C1.75032 6.11561 2.38167 5.07159 3.20857 4.17771L4.47654 4.71374C4.79353 4.84856 5.13655 4.9179 5.48331 4.91725H5.48853C6.10969 4.91601 6.70865 4.69554 7.17118 4.29788C7.6337 3.90022 7.92742 3.3532 7.99632 2.76114L8.15274 1.43107C8.76439 1.31352 9.38609 1.25059 10.0099 1.24306C10.6287 1.25056 11.2455 1.31307 11.8524 1.43057L12.0088 2.76014C12.0757 3.35217 12.3681 3.89969 12.8299 4.29775C13.2917 4.69581 13.8905 4.9164 14.5114 4.91725C14.8616 4.92518 15.2089 4.855 15.526 4.71224L16.7929 4.17671C17.6203 5.07052 18.2519 6.11477 18.65 7.24736L17.5254 8.0439C17.2051 8.26784 16.9444 8.56121 16.7647 8.9001C16.585 9.23899 16.4913 9.6138 16.4913 9.994C16.4913 10.3742 16.585 10.749 16.7647 11.0879C16.9444 11.4268 17.2051 11.7202 17.5254 11.9441L18.6542 12.7441C18.2556 13.8762 17.6245 14.9201 16.7981 15.8143L15.526 15.2793C15.1638 15.1252 14.7688 15.0554 14.3731 15.0756C13.9775 15.0958 13.5924 15.2055 13.2494 15.3956C12.9064 15.5858 12.6151 15.851 12.3993 16.1697C12.1835 16.4884 12.0493 16.8515 12.0078 17.2294L11.855 18.5619Z" fill="currentColor" />
                                            </svg>
                                            <svg className={`about-settings-done ${editAbout && 'about-settings-done-open'}`} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0625 15.3913L6.46875 11.7968L7.48434 10.7812L10.0625 13.3587L15.5142 7.90625L16.5312 8.92328L10.0625 15.3913Z" fill="currentColor" />
                                                <path d="M11.5 1.4375C9.50983 1.4375 7.56435 2.02766 5.90958 3.13334C4.25481 4.23902 2.96507 5.81057 2.20347 7.64925C1.44186 9.48793 1.24259 11.5112 1.63085 13.4631C2.01912 15.415 2.97748 17.208 4.38474 18.6153C5.79201 20.0225 7.58497 20.9809 9.53691 21.3692C11.4888 21.7574 13.5121 21.5581 15.3508 20.7965C17.1894 20.0349 18.761 18.7452 19.8667 17.0904C20.9723 15.4357 21.5625 13.4902 21.5625 11.5C21.5625 8.83126 20.5024 6.27182 18.6153 4.38474C16.7282 2.49765 14.1687 1.4375 11.5 1.4375ZM11.5 20.125C9.79414 20.125 8.12659 19.6192 6.70821 18.6714C5.28984 17.7237 4.18435 16.3767 3.53154 14.8006C2.87874 13.2246 2.70793 11.4904 3.04073 9.81735C3.37353 8.14426 4.19498 6.60743 5.40121 5.4012C6.60744 4.19498 8.14426 3.37352 9.81735 3.04073C11.4904 2.70793 13.2246 2.87873 14.8006 3.53154C16.3767 4.18434 17.7237 5.28983 18.6714 6.70821C19.6192 8.12658 20.125 9.79414 20.125 11.5C20.125 13.7875 19.2163 15.9813 17.5988 17.5988C15.9813 19.2163 13.7875 20.125 11.5 20.125Z" fill="currentColor" />
                                            </svg>
                                        </button>
                                        <label className={`account-settings ${editAbout && 'account-settings-open'}`}>
                                            <textarea wrap='hard' value={myAbout} cols={30} rows={8} onChange={e => setMyAbout(e.target.value)} />
                                        </label>
                                    </div>
                                    :
                                    <h3>About</h3>
                            }
                            <p>{myAbout}</p>

                        </section>
                        <section className='account-subscriptions'>
                            {
                                subscribtion != null ?
                                    <ul>
                                        {
                                            subscribtion.map((item, index) => (
                                                <motion.li key={item._id}
                                                    initial={{ x: -10, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: Number(`0.${index}`) }}
                                                >
                                                    <Link to={`/account/${item._id}`}>
                                                        <div>
                                                            <img src={`http://45.84.226.30:5000${item?.icon}`} />
                                                        </div>
                                                        {item.name.slice(0, 9)}{item.name.length >= 9 ? <p>...</p> : null}
                                                    </Link>
                                                </motion.li>
                                            ))
                                        }
                                        {
                                            subscribtion.length >= 15 ?
                                                <li className='show-all'>
                                                    <Link to='/:accountid/subscriptions'>Show all
                                                        <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 8L4.5 4.5L1 1" stroke="#333333" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                                :
                                                null
                                        }
                                    </ul>
                                    :
                                    <p>Нет подписок</p>
                            }
                        </section>
                    </div>
                </article>
                <SongList id={accountData._id} title={accountData.name} itsMyAccount={itsMyAccount} songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />
            </section>
            :
            <p>loading...</p>
    )
}


export default Account