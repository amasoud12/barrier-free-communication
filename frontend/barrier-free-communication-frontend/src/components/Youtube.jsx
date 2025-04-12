// src/components/Youtube.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, Stack, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import captioningImage from '/assets/Captioning.png';
import jsPDF from 'jspdf';
import './Youtube.css';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

function YouTubeCaptionGenerator({ theme }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [captions, setCaptions] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('txt');
  
  // Set text direction based on language
  const isRTL = language === 'ar';
  const textDirection = isRTL ? 'rtl' : 'ltr';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCaptions('');
    setIsLoading(true);

    try {
      // Using the proxy configured in vite.config.js
      const response = await axios.post('http://127.0.0.1:5000/generate-captions', {
        youtube_url: youtubeUrl,
        target_lang: language // Send the current UI language to get captions in the same language
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
    
    const header = t('barrier_free_youtube') + "\n" +
                  "===============================================\n" +
                  `${t('video_url')} ${youtubeUrl}\n` +
                  `${t('generated_on')} ${new Date().toLocaleString()}\n\n`;
    
    const contentWithHeader = header + captions;
    
    switch (fileType) {
      case 'txt':
        downloadTextFile(contentWithHeader);
        break;
      case 'pdf':
        downloadPdfFile(contentWithHeader);
        break;
      case 'docx':
        // In a real application, you'd use a library like docx.js
        // For this demo, we'll just show a message that docx is not supported
        alert('DOCX format support requires additional libraries. Downloading as TXT instead.');
        downloadTextFile(contentWithHeader);
        break;
      default:
        downloadTextFile(contentWithHeader);
    }
  };

  const downloadTextFile = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "barrier-free-communication-captions.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPdfFile = (content) => {
    const doc = new jsPDF();
    
    // Handle RTL text in PDF if Arabic is selected
    if (language === 'ar') {
      doc.setR2L(true);
    }
    
    // Add title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(t('barrier_free_youtube'), 20, 20);
    
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Add video URL and date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`${t('video_url')} ${youtubeUrl}`, 20, 35);
    doc.text(`${t('generated_on')} ${new Date().toLocaleString()}`, 20, 45);
    
    // Add captions with word wrapping
    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(captions, 170);
    doc.text(splitText, 20, 60);
    
    // Save the PDF
    doc.save("barrier-free-communication-captions.pdf");
  };

  return (
    <div className={`youtube-container ${theme === 'dark' ? 'dark' : ''}`} style={{ direction: textDirection }}>
      <h1 className="youtube-title">{t('social_media_captioning')}</h1>
      
      <div>
        <Stack direction="row" spacing={1} justifyContent="center" margin={2}>
          <Box sx={{ padding: 1, flex: 0.3 }}>
            <img 
              src={captioningImage} 
              alt="Captioning illustration" 
              style={{ height: "300px", width: "400px" }}
            />
          </Box>
          
          <Box sx={{ padding: 1, flex: 0.7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="youtube-form-container">
              <form onSubmit={handleSubmit} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: isRTL ? 'flex-end' : 'flex-start', 
                textAlign: isRTL ? 'right' : 'left',
                width: '100%'
              }}>
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
                  style={{ 
                    textAlign: isRTL ? 'right' : 'left',
                    direction: textDirection,
                    width: '100%'
                  }}
                />
                
                <button 
                  type="submit" 
                  className="youtube-button custom-button"
                  disabled={isLoading}
                >
                  {isLoading ? t('generating') : t('generate_caption')}
                </button>
              </form>
            </div>
            
            {error && <p className="youtube-error">{error}</p>}
            
            {captions && (
              <div className="youtube-captions-container" style={{ 
                textAlign: isRTL ? 'right' : 'left',
                direction: textDirection
              }}>
                <h2>{t('generated_captions')}</h2>
                <div className="youtube-captions" style={{ 
                  textAlign: isRTL ? 'right' : 'left',
                  direction: textDirection
                }}>
                  {captions}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginTop: '15px', 
                  gap: '10px',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
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
                    onClick={handleSaveCaptions}
                    className="youtube-button custom-button"
                  >
                    {t('save_captions')}
                  </button>
                </div>
              </div>
            )}
          </Box>
        </Stack>
      </div>
    </div>
  );
}

export default YouTubeCaptionGenerator;
