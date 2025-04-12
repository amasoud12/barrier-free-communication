import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

const Card = ({theme, setTheme, text, image, buttonText, link}) => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    
    // Set text direction based on language
    const textDirection = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <div className="card">
            {theme == 'light' && 
            <div >
                <img src={image} alt="" className="card-image"></img>
                <p style={{
                    color: 'black', 
                    direction: textDirection,
                    textAlign: language === 'ar' ? 'right' : 'center'
                }} className='card-title'>{text}
                </p>
                <button onClick={()=>navigate(`${link}`)} className='card-button custom-button'>{buttonText}</button>
            </div>
            }

            {theme == 'dark' && 
            <div >
                <img src={image} alt="" className="card-image"></img>
                <p style={{
                    color: 'white', 
                    direction: textDirection,
                    textAlign: language === 'ar' ? 'right' : 'center'
                }} className='card-title'>{text}
                </p>
                <button onClick={()=>navigate(`${link}`)} className='card-button custom-button'>{buttonText}</button>
            </div>
            }
        </div>
    )
}

export default Card