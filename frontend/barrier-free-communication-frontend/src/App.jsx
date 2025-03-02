import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import UICustomization from './components/UICustomization'
import VoiceCommand from './components/VoiceCommand'
import Help from './components/Help'
import FAQ from './components/FAQ'
import Dashboard from './components/Dashboard'
import {Route, Routes} from 'react-router-dom'

const App = () => {

  const [theme, setTheme] = useState('light');

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path='/' element={<Dashboard theme={theme} setTheme={setTheme}/>}/>
        <Route path='/ui' element={<UICustomization theme={theme} setTheme={setTheme}/>}/>
        <Route path='/voicecommand' element={<VoiceCommand theme={theme} setTheme={setTheme}/>}/>
        <Route path='/help' element={<Help theme={theme} setTheme={setTheme}/>}/>
        <Route path='/faqs' element={<FAQ theme={theme} setTheme={setTheme}/>}/>
      </Routes>
    </div>
  )
}

export default App