import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Place from './pages/Place/Place'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {

  const[showlogin,setshowlogin] =useState(false)

  return (
    <>
    {showlogin?<LoginPopup setshowlogin={setshowlogin}/>:<></>}
     <div className='app'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='order' element={<Place/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
   
  )
}

export default App
