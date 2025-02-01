import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Home.css"



const Home = () => {

const navigate = useNavigate()


  return (
    <div>
      <h1>Welcome To The Books Abode!!</h1>
      <h2>Explore our wide range of books!!</h2>
      <button onClick={()=> navigate("/books")} >Shop Now!</button>
    </div>
  )
}

export default Home
