import React from 'react'
import Card from './Card/Card'
import AudiotoASL from '../assets/AudiotoASL.png'
import ASLtoText from '../assets/ASLtoText.png'
import Captioning from '../assets/Captioning.png'

const Dashboard = ({theme, setTheme}) => {

  return (
    <div>

          <Card theme={theme} setTheme={setTheme} text={'Provide the audio input to view the ASL animation and to transcribe the audio into multiple languages.'} image={AudiotoASL}/>
          <Card theme={theme} setTheme={setTheme} text={'Provide the American Sign Language video to view the text output and transcription to other languages.'} image={ASLtoText}/>
          <Card theme={theme} setTheme={setTheme} text={'Provide the social media URL(Youtube) to view the suitable caption.'} image={Captioning}/>

    </div>
    
  )
}

export default Dashboard