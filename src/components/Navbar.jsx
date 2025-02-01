import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
//context
import { LoginContext } from '../context/AuthContext';


//styles
import "../styles/Navbar.css"


const Navbar = () => {
    const {handleLogin, handleLogout, isAuth} = useContext(LoginContext)
    
    return (
    <div className="navbar">
      <NavLink to="/" className="nav-links"   >Home</NavLink>
      <NavLink to="/books" className="nav-links" >Books</NavLink>

      {isAuth?(<button onClick= {()=> handleLogout()} >Log Out</button>) :
       (<button onClick={()=> handleLogin()}>Log In</button>)}
    </div>
  )
}

export default Navbar
