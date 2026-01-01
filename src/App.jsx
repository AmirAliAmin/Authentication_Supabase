import React from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/home/Home'
import ForgetPassword from './pages/auth/ForgetPassword'
import ChangePassword from './pages/auth/ChangePassword'

function App() {
  return (
    <div className=''>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/update-password' element={<ChangePassword/>} />
      </Routes>
    </div>
  )
}

export default App