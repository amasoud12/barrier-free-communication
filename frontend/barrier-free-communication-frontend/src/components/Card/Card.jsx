import React from 'react'

import './Card.css'

const Card = ({theme, setTheme, text, image}) => {
  return (
    <div className="card">
        {theme == 'light' &&
        <div >
            <img src={image} alt="" className="card-image"></img>
            <p style={{color: 'black'}} className='card-title'>{text}
            </p>
            <button className='card-button'>Audio to ASL</button>
        </div>}

        {theme == 'dark' &&
        <div >
            <img src={image} alt="" className="card-image"></img>
            <p style={{color: 'white'}} className='card-title'>{text}
            </p>
            <button className='card-button'>Audio to ASL</button>
        </div>}

    </div>

  )
}

export default Card