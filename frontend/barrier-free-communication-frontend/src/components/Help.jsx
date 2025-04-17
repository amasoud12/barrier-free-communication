import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from '@mui/material';
import {
  Mic,
  Language,
  Videocam,
  UploadFile,
  Translate,
  Gesture,
  TextFields,
  OndemandVideo,
  Article,
} from '@mui/icons-material';

const helpItems = [
  {
    icon: <Videocam fontSize="large" />,
    title: 'YouTube Captioning',
    description: 'Generate captions from YouTube videos using the video URL.',
  },
  {
    icon: <Gesture fontSize="large" />,
    title: 'ASL Gesture Input',
    description: 'Capture sign language input from webcam in real-time.',
  },
  {
    icon: <OndemandVideo fontSize="large" />,
    title: 'ASL Output',
    description: 'Convert audio/text into American Sign Language gestures.',
  },
  {
    icon: <TextFields fontSize="large" />,
    title: 'Text Output',
    description: 'Generate readable text from various inputs like audio or sign.',
  },
  {
    icon: <Mic fontSize="large" />,
    title: 'Live Audio Input',
    description: 'Record live microphone audio for transcription.',
  },
  {
    icon: <UploadFile fontSize="large" />,
    title: 'WAV File Upload',
    description: 'Upload a WAV file and generate transcript or captions.',
  },
  {
    icon: <Translate fontSize="large" />,
    title: 'Translate to Other Languages',
    description: 'Transcribe output and convert it to multiple languages.',
  },
  {
    icon: <Language fontSize="large" />,
    title: 'Accessibility Tools',
    description: 'Assistive tools for enhanced accessibility across devices.',
  },
  {
    icon: <Article fontSize="large" />,
    title: 'Save Transcripts',
    description: 'Export your captions in .txt, .pdf, or other formats.',
  },
];

const Help = () => {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#61a9bd', fontWeight: 'bold' }}
      >
        Help & Feature Overview
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {helpItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: '#e0f5fb',
                borderLeft: '5px solid #61a9bd',
                borderRadius: 2,
                height: '100%',
                '& .MuiTypography-root': {
                  color: (theme) => theme.palette.mode === 'dark' ? '#000000' : 'inherit'
                }
              }}
              elevation={3}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Box
                    mr={1}
                    sx={{ color: '#61a9bd', display: 'flex', alignItems: 'center' }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: '#333' }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Help;