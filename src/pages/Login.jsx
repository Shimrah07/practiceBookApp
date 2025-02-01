import axios from 'axios';
import React, { useContext, useState } from 'react';
import {LoginContext} from "../context/AuthContext";

//styles
import "../styles/Login.css"

const Login = () => {

//base url
// https://political-spot-nyala.glitch.me/login

//initial details
let initDetails = {username: "", password: ""};

const [details, setDetails] = useState(initDetails);
const [error, setError] = useState();

//context for handleLogin
const {handleLogin} = useContext(LoginContext)


//function to handle change

const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails({...details, [name]: value})

}

// console.log(details)

//function to handle submit

const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        let response = await axios({
            method: "POST",
            url: `https://political-spot-nyala.glitch.me/login`,
            data: {username: details.username, password: details.password}
        })
    
        if(response.data.success){
            console.log(response.data.token, "token");
            const {token} = response.data
            handleLogin(token)

        }

    }catch(err){
        setError(err.response.data.message);
        console.log(error)
    }

    
}


  return (
    <div className='login-container'>
      <h1>Please Login</h1>

        <form onSubmit={handleSubmit} >
            <input
            type="text"
            placeholder='Enter Username'
            value= {details.username}
            name="username"
            onChange = {handleChange}
            />

        <input
            type="password"
            placeholder='Enter Password'
            value= {details.password}
            name="password"
            onChange = {handleChange}
            />

        <input type='submit' value="Login" />

        </form>

        {error && <p style = {{color:"red"}}>{error}</p>}


    </div>
  )
}

export default Login
