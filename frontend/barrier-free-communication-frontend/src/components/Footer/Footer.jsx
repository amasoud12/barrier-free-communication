import React from 'react';
import './Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = ({ theme }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <p>&copy; {currentYear} {t('Copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
