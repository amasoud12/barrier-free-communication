import React from 'react'
import './Navbar.css'
import logo from '/assets/logoo.png'
import {LiaToggleOffSolid, LiaToggleOnSolid} from 'react-icons/lia'
import {NavLink} from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import { Box } from '@mui/material'

const Navbar = ({theme, setTheme}) => {
    const { t } = useTranslation();
    const { language, changeLanguage } = useLanguage();

    const toggle_mode = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light')
    }

    const handleLanguageChange = (event) => {
        changeLanguage(event.target.value);
    };

    return (
        <div className='navbar'>
            <img src={logo} alt="" className='logo'/>

            <ul>
                <li>
                    <NavLink to='/'>{t('dashboard')}</NavLink>
                </li>
                <li>
                    <NavLink to='/ui'>{t('ui_customization')}</NavLink>
                </li>
                <li>
                    <NavLink to='/VoiceCommand'>{t('voice_command')}</NavLink>
                </li>
                <li>
                    <NavLink to='/Help'>{t('help')}</NavLink>
                </li>
                <li>
                    <NavLink to='/FAQs'>{t('faqs')}</NavLink>
                </li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select
                        value={language}
                        onChange={handleLanguageChange}
                        className="language-select"
                        sx={{
                            height: '35px',
                            color: theme === 'dark' ? 'white' : 'black',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.87)',
                            },
                            '& .MuiSvgIcon-root': {
                                color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.54)',
                            }
                        }}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="ar">العربية</MenuItem>
                        <MenuItem value="hi">हिन्दी</MenuItem>
                    </Select>
                    </FormControl>
                        <div className="theme-switch" onClick={toggle_mode}>
                        {theme === 'light' ? <LiaToggleOffSolid className='toggle' /> : <LiaToggleOnSolid className='toggle' />}
                        </div>
            </div>
        </div>
    );
};
export default Navbar