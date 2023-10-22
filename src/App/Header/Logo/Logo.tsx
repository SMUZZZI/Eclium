import React from 'react'
import { Link } from 'react-router-dom'
import { audioGenre } from '../../../redux/slices/audioControl.slice'
import { motion } from 'framer-motion'
import { useAppDispatch } from '../../../redux/reduxHooks'


function Logo() {
    const dispatch = useAppDispatch()

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: .2, duration: .3, type: "spring" }}
        >
            <Link to='/' onClick={() => dispatch(audioGenre(''))} className='header-logo'>
                <motion.svg
                    initial={{ rotate: -8 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: .4 }}
                    width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.7996 26.7304L34.4485 19.6205C34.9454 18.6824 34.7673 17.4879 33.9393 16.7528L33.8068 16.6341C33.8151 15.9526 33.5667 15.2672 33.0492 14.7504C32.1632 13.8583 30.801 13.7472 29.795 14.4134L25.6838 9.81132C26.7892 8.51721 26.7644 6.63731 25.5306 5.37001L22.3882 2.14241C21.0095 0.725783 18.6537 0.610922 17.1219 1.88588C15.59 3.16084 15.4658 5.33938 16.8445 6.756L19.9869 9.98361C21.1379 11.1629 22.9678 11.4347 24.4293 10.757L28.6316 15.4587C28.586 15.5238 28.5364 15.5812 28.495 15.6501L28.2838 15.8607C27.2736 16.8791 27.2736 18.5331 28.2838 19.5516C28.3832 19.6511 28.4908 19.7392 28.6026 19.8196L23.2576 26.5275C22.3385 27.6837 21.2289 28.6907 19.991 29.4986C18.6786 30.2988 17.3661 31.1028 16.0537 31.903C15.4575 31.5507 14.8986 31.1564 14.3769 30.7276L14.5384 29.935C18.3225 29.4028 21.2372 26.1369 21.2372 22.1781C21.2372 17.8478 17.7512 14.333 13.4537 14.333C13.3212 14.333 13.1928 14.3445 13.0645 14.3522L14.0374 13.7051C14.5922 13.3337 14.7206 12.6178 14.319 12.1009C13.9174 11.5878 13.1432 11.4691 12.5842 11.8405L9.86413 13.6553C10.2823 12.2885 10.8743 10.9791 11.6444 9.78834C11.69 9.7156 11.6444 9.62371 11.5616 9.62371C10.688 9.62371 6.97015 9.62371 4.19208 9.62371C2.42422 9.62371 1 11.0671 1 12.8475V31.4282C1 36.7118 5.25197 41 10.4976 41H28.88C30.681 41 32.1383 39.5298 32.1383 37.715V31.5661C32.1383 31.432 31.9934 31.3555 31.8816 31.432C29.6956 32.9214 26.9465 33.8327 23.6137 33.8327C22.9099 33.8327 22.235 33.7905 21.5809 33.714C22.62 32.9482 23.6592 32.1786 24.6984 31.4129C25.4022 30.8539 26.1558 30.1762 26.901 29.3684C27.2736 28.9664 27.6048 28.572 27.9029 28.1891L33.1817 21.0026C33.2438 20.9146 33.2976 20.8265 33.3473 20.7385L39.6403 27.7833C39.926 28.1049 40.4187 28.1317 40.7416 27.8407C41.0604 27.5497 41.0894 27.0558 40.7996 26.7342V26.7304ZM17.6187 17.0706C20.1028 17.0706 20.1028 20.5164 17.6187 20.5164C15.1346 20.5164 15.1387 17.0706 17.6187 17.0706ZM12.489 23.3228C10.0049 23.3228 10.009 19.877 12.489 19.877C14.969 19.877 14.9731 23.3228 12.489 23.3228Z" fill="#EB7745" stroke="#EB7745" stroke-miterlimit="10" />
                </motion.svg>
                <h2>Eclium</h2>
            </Link>
        </motion.div>
    )
}

export default Logo