import React, { useState } from 'react'
import './loginregistermodal.css'
import { motion, AnimatePresence } from 'framer-motion'
import { IAuthValue, fetchLoginAccount, fetchRegisterAccount } from '../../redux/slices/user.slice'
import { useAppDispatch } from '../../redux/reduxHooks'

interface IState {
  modalActive: boolean
  setModalActive: (v: boolean) => void
}

function LoginRegisterModal(props: IState) {

  const { modalActive, setModalActive } = props

  const dispatch = useAppDispatch()

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const authValues: IAuthValue = {
    name: login,
    email,
    password
  }
  const [authorized, setAuthorized] = useState(false)

  const registerSubmit = async (value: IAuthValue) => {
    const isValue = login.length >= 3 && email.length > 3 && password.length >= 6
    const isCurrentPassword = password === passwordConfirm

    if (isValue && isCurrentPassword) {
      const data = await dispatch(fetchRegisterAccount(value))
      if (!data.payload) {
        alert("Не удалось авторизоваться")
      }

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token)
      }
    }
  }
  const loginSubmit = async (value: IAuthValue) => {
    const isValue = login.length > 3 && password.length >= 6

    if (isValue) {
      const data = await dispatch(fetchLoginAccount(value))
      if (!data.payload) {
        alert("Не удвлось авторизоваться")
      }

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token)
      }
    }

  }

  return (
    <AnimatePresence>
      {
        modalActive && (
          <motion.section className='modal' onClick={() => { setModalActive(false) }}
            initial={{ backgroundColor: 'transparent', opacity: 0 }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.500)', opacity: 1 }}
            exit={{ backgroundColor: 'transparent', opacity: 0 }}
          >
            <motion.div className='modal-content' onClick={e => { e.stopPropagation() }}
              initial={{ y: '-100vw' }}
              animate={{ y: 0 }}
              transition={{ duration: .4, type: 'spring' }}
              exit={{ y: '-100vw' }}
            >
              <article className={`login ${authorized && 'login-open'}`}>
                <form>
                  <input type="text" placeholder='User name' value={login} onChange={e => setLogin(e.target.value)} />
                  <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                  <div>
                    <button onClick={e => {
                      e.preventDefault()
                      setModalActive(false)
                      loginSubmit(authValues)
                    }}>Login</button>
                  </div>
                </form>
              </article>
              <article className={`register ${!authorized && 'register-open'}`}>
                <form>
                  <input type="text" placeholder='User name' value={login} onChange={e => setLogin(e.target.value)} />
                  <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                  <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                  <input type="password" placeholder='Password confirm' className={`pass-conf ${password.length >= 6 && 'pass-conf-open'}`} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                  <div>
                    <button onClick={e => {
                      e.preventDefault()
                      setModalActive(false)
                      registerSubmit(authValues)
                    }}>Register</button>
                  </div>
                </form>
              </article>
              <div className='authorized'>
                <p>Already authorized</p>
                <input type="checkbox" onChange={() => { setAuthorized(!authorized) }} />
              </div>
            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}

export default LoginRegisterModal
