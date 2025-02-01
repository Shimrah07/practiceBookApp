import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const LoginContext = createContext();


const AuthContext = ({children}) => {

    //for login state
    const [isAuth, setIsAuth] = useState(() => localStorage.getItem("token")? true: false);
    
    //for token
    const [token, setToken] = useState(null);

    //navigation
    const navigation = useNavigate()
    
    //to display token on console
    useEffect(()=>{
        console.log(token)
    }, [token])
    


    //handle login
    const handleLogin = (newToken)=>{
        setIsAuth(true);
        setToken(newToken)
        navigation("/");
        localStorage.setItem("token", newToken)
    
    
    }
    
    //handle logout
    const handleLogout = ()=>{
        setIsAuth(false)
        setToken(null)
        navigation("/login")
        localStorage.removeItem("token")
    
    }




    return (
        <LoginContext.Provider value={{token, isAuth, handleLogin, handleLogout}} >
            {children}
        </LoginContext.Provider>
    )
}

export default AuthContext
