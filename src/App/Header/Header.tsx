import React from 'react'
import './header.css'
import Logo from './Logo/Logo'
import Search from './Search/Search'
import HeaderLinks from './HeaderLinks/HeaderLinks'
import AccountHeader from './AccountHeader/AccountHeader'

function Header() {
  return (
    <header className='header'>
      <Logo />
      <nav>
        <Search />
        <HeaderLinks />
        <AccountHeader />
      </nav>
    </header>
  )
}

export default Header
