import React from 'react'
import English from '../imgs/english.png'
import Polish from '../imgs/polish.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href='/'>
        <img src={Polish} width='25px' />
      </a>
      <a href='/english'>
        <img src={English} width='25px' />
      </a>
    </div>
  )
}

export default Navbar
