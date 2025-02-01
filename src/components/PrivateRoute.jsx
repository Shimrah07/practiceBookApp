import React, { useContext } from 'react'
import { LoginContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

const {isAuth} = useContext(LoginContext)


  return (
    <div>
        {isAuth? children : <Navigate to="/login" />}
    </div>
  )
}

export default PrivateRoute
