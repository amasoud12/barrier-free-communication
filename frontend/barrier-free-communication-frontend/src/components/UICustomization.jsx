import React from 'react';
import { Box, Container, Stack, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const UICustomization = () => {
  const { fontStyle, fontSize, buttonSize, updateFontStyle, updateFontSize, updateButtonSize } = useTheme();
  const [selectedValue, setSelectedValue] = useState("a"); // Tracks Radio Selection
  
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
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>General UI Customization</h1>
      <Stack direction="row" spacing={3} justifyContent="center" margin={5}>
        <Box sx={{ border: 1, padding: 2, textAlign: "center", flex: 1 }}>
          <h3 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px"  }}>Font Style</h3>
          <FormControl>
            <InputLabel id="demo-simple-select-autowidth-label">Select Font Style</InputLabel>
            <Select
              sx = {{ width: 300}}
              id="demo-simple-select-autowidth"
              autoWidth
              label="FontStyle"
              value={fontStyle}
              onChange={handleFontChange}
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ border: 1, padding: 2, textAlign: "center", flex: 1 }}>
          <h3 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px"  }}>Font Size</h3>
          <FormControl>
            <InputLabel id="demo-simple-select-autowidth-label">Select Font Size</InputLabel>
            <Select
              sx = {{ width: 300}}
              id="demo-simple-select-autowidth"
              autoWidth
              label="FontSize"
              value={fontSize}
              onChange={handleSizeChange}
            >
              <MenuItem value="14">14</MenuItem>
              <MenuItem value="16">16</MenuItem>
              <MenuItem value="18">18</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="22">22</MenuItem>
              <MenuItem value="24">24</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ border: 1, padding: 2, textAlign: "center", flex: 1 }}>
          <h3 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px"  }}>Button & Icon Size</h3>
          <FormControl>
            <InputLabel id="button-size-label">Select Button Size</InputLabel>
            <Select
              sx = {{ width: 300}}
              id="button-size-select"
              autoWidth
              label="ButtonSize"
              value={buttonSize}
              onChange={handleButtonSizeChange}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ border: 1, padding: 2, textAlign: "center", flex: 1 }}>
          <h3 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px"  }}>Dark/Light Mode</h3>
          <Typography>Switch to enable dark/light mode is placed on the top right corner</Typography>
        </Box>
      </Stack>
    </div>
  )
}

export default UICustomization;