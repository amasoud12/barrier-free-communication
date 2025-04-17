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
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Help = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { fontStyle, fontSize, theme } = useTheme();
  const isRTL = language === 'ar';

  const helpItems = [
    {
      icon: <Videocam fontSize="large" />,
      title: t('youtube_captioning'),
      description: t('youtube_captioning_desc'),
    },
    {
      icon: <Gesture fontSize="large" />,
      title: t('asl_gesture_input'),
      description: t('asl_gesture_input_desc'),
    },
    {
      icon: <OndemandVideo fontSize="large" />,
      title: t('asl_output'),
      description: t('asl_output_desc'),
    },
    {
      icon: <TextFields fontSize="large" />,
      title: t('text_output'),
      description: t('text_output_desc'),
    },
    {
      icon: <Mic fontSize="large" />,
      title: t('live_audio_input'),
      description: t('live_audio_input_desc'),
    },
    {
      icon: <UploadFile fontSize="large" />,
      title: t('wav_file_upload'),
      description: t('wav_file_upload_desc'),
    },
    {
      icon: <Translate fontSize="large" />,
      title: t('translate_languages'),
      description: t('translate_languages_desc'),
    },
    {
      icon: <Language fontSize="large" />,
      title: t('accessibility_tools'),
      description: t('accessibility_tools_desc'),
    },
    {
      icon: <Article fontSize="large" />,
      title: t('save_transcripts'),
      description: t('save_transcripts_desc'),
    },
  ];

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ 
          color: theme === 'dark' ? '#000000' : '#61a9bd', 
          fontWeight: 'bold',
          fontFamily: fontStyle,
          fontSize: `${fontSize}px`
        }}
      >
        {t('help_feature_overview')}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {helpItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              className={theme === 'dark' ? 'dark-mode-card' : ''}
              sx={{
                backgroundColor: '#e0f5fb',
                borderLeft: '5px solid #61a9bd',
                borderRadius: 2,
                height: '100%',
                '& .MuiTypography-root': {
                  color: theme === 'dark' ? '#000000 !important' : 'inherit'
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
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: theme === 'dark' ? '#000000' : '#333',
                      fontFamily: fontStyle,
                      fontSize: `${fontSize}px`
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: theme === 'dark' ? '#000000' : 'text.secondary',
                    fontFamily: fontStyle,
                    fontSize: `${parseInt(fontSize) - 4}px`
                  }}
                >
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