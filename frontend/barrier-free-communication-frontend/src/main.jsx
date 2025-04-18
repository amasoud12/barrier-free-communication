import { StrictMode, Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import i18next from 'i18next'

// Set document title based on language
i18next.on('languageChanged', (lng) => {
  const titles = {
    'en': 'Barrier Free Communication',
    'ar': 'تواصل بدون حواجز',
    'hi': 'बाधा मुक्त संचार'
  };
  document.title = titles[lng] || titles['en'];
});

createRoot(document.getElementById('root')).render(
  <Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Fragment>
)
