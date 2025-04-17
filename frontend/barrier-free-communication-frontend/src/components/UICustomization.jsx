import React from 'react';
import { Box, Container, Stack, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import './UICustomization.css';

const UICustomization = ({ theme }) => {
  const { fontStyle, fontSize, buttonSize, updateFontStyle, updateFontSize, updateButtonSize } = useTheme();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedValue, setSelectedValue] = useState("a"); // Tracks Radio Selection
  
  // Set text direction based on language
  const isRTL = language === 'ar';
  const textDirection = isRTL ? 'rtl' : 'ltr';
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const handleFontChange = (event) => {
    updateFontStyle(event.target.value);
  };
  
  const handleSizeChange = (event) => {
    updateFontSize(event.target.value);
  };

  const handleButtonSizeChange = (event) => {
    updateButtonSize(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div style={{ direction: textDirection }} className={theme === 'dark' ? 'dark' : ''}>
      <h1 style={{ 
        textAlign: "center", 
        marginTop: "20px",
        color: theme === 'dark' ? '#fff' : '#000'
      }}>
        {t('general_ui_customization')}
      </h1>
      <Stack direction={isRTL ? "row-reverse" : "row"} spacing={3} justifyContent="center" margin={5}>
        <Box sx={{ border: 1, padding: 2, textAlign: isRTL ? "right" : "center", flex: 1 }} className="ui-box">
          <h3 style={{ textAlign: isRTL ? "right" : "center", marginTop: "20px", marginBottom: "20px" }}>{t('font_style')}</h3>
          <FormControl fullWidth>
            <InputLabel id="font-style-label">{t('select_font_style')}</InputLabel>
            <Select
              sx={{ width: 300, textAlign: isRTL ? "right" : "left" }}
              id="font-style-select"
              labelId="font-style-label"
              autoWidth
              label={t('select_font_style')}
              value={fontStyle}
              onChange={handleFontChange}
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
              {isRTL && <MenuItem value="Noto Sans Arabic">Noto Sans Arabic</MenuItem>}
              {language === 'hi' && <MenuItem value="Noto Sans Devanagari">Noto Sans Devanagari</MenuItem>}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ border: 1, padding: 2, textAlign: isRTL ? "right" : "center", flex: 1 }} className="ui-box">
          <h3 style={{ textAlign: isRTL ? "right" : "center", marginTop: "20px", marginBottom: "20px" }}>{t('font_size')}</h3>
          <FormControl fullWidth>
            <InputLabel id="font-size-label">{t('select_font_size')}</InputLabel>
            <Select
              sx={{ width: 300, textAlign: isRTL ? "right" : "left" }}
              id="font-size-select"
              labelId="font-size-label"
              autoWidth
              label={t('select_font_size')}
              value={fontSize}
              onChange={handleSizeChange}
            >
              <MenuItem value="14">14</MenuItem>
              <MenuItem value="16">16</MenuItem>
              <MenuItem value="18">18</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="22">22</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ border: 1, padding: 2, textAlign: isRTL ? "right" : "center", flex: 1 }} className="ui-box">
          <h3 style={{ textAlign: isRTL ? "right" : "center", marginTop: "20px", marginBottom: "20px" }}>{t('button_icon_size')}</h3>
          <FormControl fullWidth>
            <InputLabel id="button-size-label">{t('select_button_size')}</InputLabel>
            <Select
              sx={{ width: 300, textAlign: isRTL ? "right" : "left" }}
              id="button-size-select"
              labelId="button-size-label"
              autoWidth
              label={t('select_button_size')}
              value={buttonSize}
              onChange={handleButtonSizeChange}
            >
              <MenuItem value="small">{t('small')}</MenuItem>
              <MenuItem value="medium">{t('medium')}</MenuItem>
              <MenuItem value="large">{t('large')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ border: 1, padding: 2, textAlign: isRTL ? "right" : "center", flex: 1 }} className="ui-box">
          <h3 style={{ textAlign: isRTL ? "right" : "center", marginTop: "20px", marginBottom: "20px" }}>{t('dark_light_mode')}</h3>
          <Typography style={{ textAlign: isRTL ? "right" : "center" }}>{t('mode_switch_info')}</Typography>
        </Box>
      </Stack>
    </div>
  )
}

export default UICustomization;