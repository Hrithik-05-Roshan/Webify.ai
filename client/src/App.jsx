import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home';

import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import WebsiteEditor from './pages/Editor';
import LiveSite from './pages/LiveSite';
import Pricing from './pages/Pricing';
export const serverUrl = import.meta.env.VITE_SERVER_URL || "https://webify-ai-orpy.onrender.com"


const App = () => {
  useGetCurrentUser()
  const {userData, userLoading} = useSelector(state=>state.user)

  if(userLoading){
    return (
      <div className='h-screen flex items-center justify-center bg-[#040404] text-white'>
        <div className='text-lg text-zinc-400'>Loading...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/dashboard' element={ userData ? <Dashboard /> : <Home /> } />
        <Route path='/generate' element={ userData ? <Generate /> : <Home /> } />
        <Route path='/editor/:id' element={ userData ? <WebsiteEditor /> : <Home /> } />
        <Route path='/site/:slug' element={ <LiveSite/> } />
        <Route path='/pricing' element={ <Pricing/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
