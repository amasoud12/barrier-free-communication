import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import UICustomization from './components/UICustomization'
import VoiceCommand from './components/VoiceCommand'
import Help from './components/Help'
import FAQ from './components/FAQ'
import Dashboard from './components/Dashboard'
import {Route, Routes} from 'react-router-dom'
import ASL from './components/ASL'
import { Typography } from '@mui/material'
import YouTubeCaptionGenerator from './components/Youtube'
import Feedback from './components/Feedback'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { useTranslation } from 'react-i18next'
import Footer from './components/Footer/Footer'
import ASLVideoText from './components/ASLVideoText'

const App = () => {
  const [theme, setTheme] = useState('light');
  const { t } = useTranslation();

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className={`container ${theme}`}>
          <Navbar theme={theme} setTheme={setTheme}/>
          <Routes>
            <Route path='/' element={<Dashboard theme={theme} setTheme={setTheme}/>}/>
            <Route path='/ui' element={<UICustomization theme={theme} setTheme={setTheme}/>}/>
            <Route path='/voicecommand' element={<VoiceCommand theme={theme} setTheme={setTheme}/>}/>
            <Route path='/help' element={<Help theme={theme} setTheme={setTheme}/>}/>
            <Route path='/faqs' element={<FAQ theme={theme} setTheme={setTheme}/>}/>
            <Route path='/audioASL' element={<ASL theme={theme} setTheme={setTheme}/>}/>
            <Route path='/youtube' element={<YouTubeCaptionGenerator theme={theme} setTheme={setTheme}/>}/>
            <Route path='/feedback' element={<Feedback theme={theme} setTheme={setTheme}/>}/>
            <Route path='/aslText' element={<ASLVideoText theme={theme} setTheme={setTheme}/>}/>
          </Routes>

          <div className='feedback'>
            {theme == 'light' && <h4 className='feedback-fb' style={{color: 'black'}}>{t('feedback')}</h4>}
            {theme == 'dark' && <h4 className='feedback-fb' style={{color: 'white'}}>{t('feedback')}</h4>}
            <Link to="/feedback" className='feedback-ch'>{t('click_here')}</Link>
          </div>
          <Footer theme={theme} />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App