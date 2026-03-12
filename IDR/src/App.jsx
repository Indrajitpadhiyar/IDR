import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import About from './components/Pages/About'
import AdminMessages from './components/Pages/AdminMessages'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-messages-panel-locked" element={<AdminMessages />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
