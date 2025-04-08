import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [fontStyle, setFontStyle] = useState('Times New Roman');
  const [fontSize, setFontSize] = useState('20');
  const [buttonSize, setButtonSize] = useState('medium');

  const updateFontStyle = (newStyle) => {
    setFontStyle(newStyle);
    document.body.style.fontFamily = newStyle;
  };

  const updateFontSize = (newSize) => {
    setFontSize(newSize);
    document.body.style.fontSize = `${newSize}px`;
  };

  const updateButtonSize = (newSize) => {
    setButtonSize(newSize);
    const style = document.createElement('style');
    let buttonStyles = '';
    
    switch(newSize) {
      case 'small':
        buttonStyles = `
          .custom-button {
            padding: 5px 10px !important;
            font-size: 14px !important;
          }
        `;
        break;
      case 'medium':
        buttonStyles = `
          .custom-button {
            padding: 10px 20px !important;
            font-size: 16px !important;
          }
        `;
        break;
      case 'large':
        buttonStyles = `
          .custom-button {
            padding: 15px 30px !important;
            font-size: 18px !important;
          }
        `;
        break;
    }
    
    // Remove any existing button size styles
    const existingStyle = document.getElementById('button-size-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'button-size-styles';
    style.textContent = buttonStyles;
    document.head.appendChild(style);
  };

  // Apply initial button size
  useEffect(() => {
    updateButtonSize(buttonSize);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      fontStyle, 
      fontSize, 
      buttonSize,
      updateFontStyle, 
      updateFontSize,
      updateButtonSize 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
