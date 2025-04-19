// src/components/Youtube.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Stack, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import captioningImage from '/assets/Captioning.png';
import jsPDF from 'jspdf';
import './Youtube.css';
import Joyride from 'react-joyride';
import { useTranslation } from 'react-i18next';

function YouTubeCaptionGenerator({ theme }) {
  const { t } = useTranslation();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('txt');
  const [runTutorial, setRunTutorial] = useState(true);
  const [run, setRun] = useState(true);

  const [steps, setSteps] = useState([
    {
      target: '#youtube-url',
      content: 'Paste the YouTube video URL here.',
    },
    {
      target: '#generate-btn',
      content: 'Click this button to generate captions for the video.',
    },
  ]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (['finished', 'skipped'].includes(status)) {
      setRun(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCaptions('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://precious-books-production.up.railway.app/generate-captions', {
        youtube_url: youtubeUrl,
      });
      setCaptions(response.data.captions);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleSaveCaptions = () => {
    if (!captions) return;

    const header =
      "Barrier Free Communication - YouTube Captions\n" +
      "===============================================\n" +
      `Video URL: ${youtubeUrl}\n` +
      `Generated on: ${new Date().toLocaleString()}\n\n`;

    const contentWithHeader = header + captions;

    switch (fileType) {
      case 'txt':
        downloadTextFile(contentWithHeader);
        break;
      case 'pdf':
        downloadPdfFile(contentWithHeader);
        break;
      case 'docx':
        alert('DOCX format support requires additional libraries. Downloading as TXT instead.');
        downloadTextFile(contentWithHeader);
        break;
      default:
        downloadTextFile(contentWithHeader);
    }
  };

  const downloadTextFile = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "barrier-free-communication-captions.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPdfFile = (content) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Barrier Free Communication - YouTube Captions", 20, 20);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Video URL: ${youtubeUrl}`, 20, 35);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 45);
    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(captions, 170);
    doc.text(splitText, 20, 60);
    doc.save("barrier-free-communication-captions.pdf");
  };

  return (
    <div className={`youtube-container ${theme}`}>
      {runTutorial && (
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
      )}

      <h1 style={{ textAlign: "center", marginTop: "20px", color: theme === 'dark' ? '#fff' : '#000' }}>
        {t('Social Media Captioning')}
      </h1>

      <Stack direction="row" spacing={1} justifyContent="center" margin={2}>
        <Box sx={{ padding: 1, flex: 0.3 }}>
          <img src={captioningImage} alt='no image' style={{ height: "300px", width: "400px" }} />
        </Box>

        <Box sx={{ padding: 1, flex: 0.7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="youtube-form-container">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label htmlFor="youtube-url" className="youtube-label">
                {t('youtube_label')}
              </label>

              <input
                id="youtube-url"
                type="text"
                placeholder={t('enter_youtube_url')}
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="youtube-input"
              />

              <button 
                id="generate-btn"
                type="submit" 
                className="card-button custom-button youtube-button"
                disabled={isLoading}
              >
                {isLoading ? t('generating') : t('generate_caption')}
              </button>
            </form>
          </div>

          {error && <p className="youtube-error">{error}</p>}

          {captions && (
            <div className="youtube-captions-container">
              <h2 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                {t('generated_captions')}
              </h2>
              <div className="youtube-captions" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                {captions}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', gap: '10px' }}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="file-type-label">{t('file_type')}</InputLabel>
                  <Select
                    labelId="file-type-label"
                    id="file-type-select"
                    value={fileType}
                    label={t('file_type')}
                    onChange={handleFileTypeChange}
                    className={theme === 'dark' ? 'dark-select' : ''}
                  >
                    <MenuItem value="txt">TXT</MenuItem>
                    <MenuItem value="pdf">PDF</MenuItem>
                    <MenuItem value="docx">DOCX</MenuItem>
                  </Select>
                </FormControl>

                <button 
                  id="save-btn"
                  onClick={handleSaveCaptions}
                  className="youtube-button"
                >
                  {t('save_captions')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Stack>
    </div>
  );
}

export default YouTubeCaptionGenerator;
