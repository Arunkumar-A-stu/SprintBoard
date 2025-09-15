import React,{ useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return(
    <>
      <div className='flex gap-2 h-screen w-screen'>
        <Sidebar />
        <Dashboard />
      </div>
    </>
  )

};

export default App