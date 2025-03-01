import React from 'react'
import './Navbar.css'
import logo from '../../assets/logoo.png'
import {LiaToggleOffSolid} from 'react-icons/lia'

const Navbar = () => {
  return (
    <div className='navbar'>

        <img src={logo} alt="" className='logo'/>

        <ul>
            <li>Dashboard</li>
            <li>UI Customization</li>
            <li>Voice Command Activation</li>
            <li>Help</li>
            <li>FAQs</li>
            
        </ul>

        <LiaToggleOffSolid  className = 'toggle' />
    </div>
  )
}

export default Navbar