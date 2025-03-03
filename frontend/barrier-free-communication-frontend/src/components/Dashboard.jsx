import React from 'react'
import Card from './Card/Card'
import AudiotoASL from '../assets/AudiotoASL.png'
import ASLtoText from '../assets/ASLtoText.png'
import Captioning from '../assets/Captioning.png'
import './Dashboard.css'

const Dashboard = ({theme, setTheme}) => {

  return (
    <div>

          <Card theme={theme} setTheme={setTheme} text={'Provide the audio input to view the ASL animation and to transcribe the audio into multiple languages.'} image={AudiotoASL}/>
          <Card theme={theme} setTheme={setTheme} text={'Provide the American Sign Language video to view the text output and transcription to other languages.'} image={ASLtoText}/>
          <Card theme={theme} setTheme={setTheme} text={'Provide the social media URL(Youtube) to view the suitable caption.'} image={Captioning}/>

        <div className='feedback'>


          {theme == 'light' &&
          <div className='analytics' >
              <h3 className='analytics-header'> Analytics </h3>
              <div className='analytics-numbers'>
                <div>
                  <h4>View Count</h4>
                  <h4 className='analytics-nn'>200</h4>
                </div>

                <div>
                  <h4>Watch Time</h4>
                  <h4 className='analytics-nn'>200</h4>
                </div>

                <div>
                  <h4>Total Translation</h4>
                  <h4 className='analytics-nn'>200</h4>
                </div>

              </div>
          </div>
    }



    {theme == 'dark' &&
          <div className='analytics-dark' >
              <h3 className='analytics-header' style={{color: 'white'}}> Analytics </h3>
              <div className='analytics-numbers'>
                <div>
                  <h4 style={{color: 'white'}}>View Count</h4>
                  <h4 className='analytics-nn' style={{color: 'white'}}>200</h4>
                </div>

                <div>
                  <h4 style={{color: 'white'}}>Watch Time</h4>
                  <h4 className='analytics-nn' style={{color: 'white'}}>200</h4>
                </div>

                <div>
                  <h4 style={{color: 'white'}}>Total Translation</h4>
                  <h4 className='analytics-nn' style={{color: 'white'}}>200</h4>
                </div>

              </div>
          </div>
    }


{theme == 'light' && <h4 className='feedback-fb' style={{color: 'black'}}>Want to Provide feedback?</h4>}
{theme == 'dark' && <h4 className='feedback-fb' style={{color: 'white'}}>Want to Provide feedback?</h4>}


<h4 className='feedback-ch'> Click Here</h4>

</div>



    </div>
    
  )
}

export default Dashboard