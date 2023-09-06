import React, { useState } from 'react'
import './loginregistermodal.css'
import { fetchLoginAccount, fetchRegisterAccount } from '../../redux/slices/user.slice'
import { useDispatch } from 'react-redux'

function LoginRegisterModal({ modalActive, setModalActive }) {

  const dispatch = useDispatch()

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const authValues = {
    name: login,
    email,
    password
  }
  const [authorized, setAuthorized] = useState(false)

  const registerSubmit = async ( value ) => {
    const isValue = login.length >= 3 && email.length > 3 && password >= 6
    const isCurrentPassword = password === passwordConfirm

    if (isValue && isCurrentPassword) {
      const data = await dispatch(fetchRegisterAccount(value))
      if (!data.payload) {
        alert("Не удвлось авторизоваться")
      }

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token)
    }
    }
  }
  const loginSubmit = async ( value ) => {
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
    <section className={`modal ${modalActive && 'modal-open'}`} onClick={() => { setModalActive(false) }}>
      <div className='modal-content' onClick={e => { e.stopPropagation() }}>
        <article className={`login ${authorized && 'login-open'}`}>
          <form>
            <input type="text" placeholder='User name' value={login}  onChange={e => setLogin(e.target.value)}/>
            <input type="password" placeholder='Password' value={password}  onChange={e => setPassword(e.target.value)}/>
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
            <input type="text" placeholder='User name' value={login} onChange={e => setLogin(e.target.value)}/>
            <input type="email" placeholder='Email'value={email}  onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
            <input type="password" placeholder='Password confirm' className={`pass-conf ${password.length >= 6 && 'pass-conf-open'}`} value={passwordConfirm}  onChange={e => setPasswordConfirm(e.target.value)}/>
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
      </div>
    </section>
  )
}

export default LoginRegisterModal