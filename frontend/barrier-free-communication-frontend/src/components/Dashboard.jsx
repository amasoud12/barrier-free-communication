import React from 'react'
import Card from './Card/Card'
import AudiotoASL from '/assets/AudiotoASL.png'
import ASLtoText from '/assets/ASLtoText.png'
import Captioning from '/assets/Captioning.png'
import './Dashboard.css'
import { Box, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Dashboard = ({theme, setTheme}) => {
  const { t } = useTranslation();

  return (
    <div>
        <Stack direction="row" spacing={1} justifyContent="center" margin={1}>
          <Box sx={{ padding: 2, textAlign: "center", flex: 1 }}>
            <Card theme={theme} setTheme={setTheme} text={t('audio_asl_desc')} image={AudiotoASL} buttonText={t('audio_to_asl')} link={'audioASL'}/>
          </Box>
          <Box sx={{ padding: 2, textAlign: "center", flex: 1 }}>
            <Card theme={theme} setTheme={setTheme} text={t('asl_text_desc')} image={ASLtoText} buttonText={t('asl_to_text')} link={'aslText'}/>
          </Box>
          <Box sx={{ padding: 2, textAlign: "center", flex: 1 }}>
            <Card theme={theme} setTheme={setTheme} text={t('captioning_desc')} image={Captioning} buttonText={t('captioning')} link={'youtube'}/>
          </Box>
        </Stack>
    </div>
    
  )
}

export default Dashboard