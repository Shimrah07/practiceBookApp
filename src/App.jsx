import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Books from './pages/Books'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import BookDetail from './pages/BookDetail'
import EditBook from './pages/EditBook'
import AddBook from './pages/AddBook'

const App = () => {
  return (
    <div>
      {/* <h1>Books App</h1> */}
      {/* navbar component */}
      <Navbar/>

      {/* all routes */}
      <Routes>
        <Route path="/" element={<Home/>} />

      {/* book page */}
        <Route path="/books" element={
          <PrivateRoute>
            <Books/>  
          </PrivateRoute> }/>

      {/* books detail page */}

      <Route path="/books/:id" element={
          <PrivateRoute>
            <BookDetail/>  
          </PrivateRoute> }/>

        {/* edit book */}

        <Route path="/edit-book/:id" element={
          <PrivateRoute>
            <EditBook/>  
          </PrivateRoute> }/>

          {/* edit book */}

        <Route path="/add-book" element={
        <PrivateRoute>
          <AddBook/>  
        </PrivateRoute> }/>

        <Route path="/login" element={<Login/>} />

      </Routes>
      
    </div>
  )
}

export default App

