import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import AudiotoASL from '/assets/AudiotoASL.png';
import ASLtoText from '/assets/ASLtoText.png';
import Captioning from '/assets/Captioning.png';
import './Dashboard.css';
import { Box, Stack } from "@mui/material";
import Joyride from 'react-joyride';
import { useTranslation } from 'react-i18next';

const Dashboard = ({ theme, setTheme }) => {
  const { t } = useTranslation();

  const [run, setRun] = useState(false); // Don't start immediately
  const [steps, setSteps] = useState([
    {
      target: '.card-audio-asl',
      content: 'Use this to convert audio input (live recordings and .WAV file uploads) into ASL animations, text, and transcriptions to other languages.',
    },
    {
      target: '.card-asl-text',
      content: 'Use this to turn ASL videos into written text.',
    },
    {
      target: '.card-captioning',
      content: 'Use this to create captions for a YouTube video.',
    },{
      target: '.language-select',  
      content: 'Use this dropdown to select your preferred language for the app. The website will update automatically to match the selected language.',
    },
    {
      target: '.theme-switch',
      content: 'Use this switch to toggle between dark and light mode.',
    },
    {
      target: '.feedback-ch',
      content: 'Click here to provide feedback about the app.',
    },
  ]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([status.FINISHED, status.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  // Start tutorial after slight delay to ensure DOM elements are loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setRun(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Tutorial Onboarding */}
      <Joyride
        steps={steps}
        run={run}
        callback={handleJoyrideCallback}
        showSkipButton
        showProgress
        continuous
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#1976d2',
          },
        }}
      />

      {/* Dashboard Cards */}
      <Stack direction="row" spacing={1} justifyContent="center" margin={1}>
        <Box className="card-audio-asl" sx={{ padding: 2, textAlign: "center", flex: 1 }}>
          <Card
            theme={theme}
            setTheme={setTheme}
            text={t('audio_asl_desc')}
            image={AudiotoASL}
            buttonText={t('audio_to_asl')}
            link="audioASL"
          />
        </Box>
        <Box className="card-asl-text" sx={{ padding: 2, textAlign: "center", flex: 1 }}>
          <Card
            theme={theme}
            setTheme={setTheme}
            text={t('asl_text_desc')}
            image={ASLtoText}
            buttonText={t('asl_to_text')}
            link="aslText"
          />
        </Box>
        <Box className="card-captioning" sx={{ padding: 2, textAlign: "center", flex: 1 }}>
          <Card
            theme={theme}
            setTheme={setTheme}
            text={t('captioning_desc')}
            image={Captioning}
            buttonText={t('captioning')}
            link="youtube"
          />
        </Box>
      </Stack>
    </div>
  );
};

export default Dashboard; 