'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const FooterContainer = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  wordBreak: 'break-word',
  maxWidth: '100%',
  width: '100%',
  marginBottom: "30px"
});

const Title = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
});

const FooterButton = styled(Button)({
  margin: '10px',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const FooterText = styled(Typography)({
  color: '#F0B90B',
  fontWeight: 'bold',
});

const Footer = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    console.log(`Language changed to ${lang}`);
    i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <FooterContainer>
      <Title>
        <Box display="flex" alignItems="center">
          <img src="/logowithname.png" alt="Logo" style={{ height: '60px' }} />
        </Box>
        <IconButton onClick={handleClick} color="inherit">
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'language-button',
          }}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>{t('footer.language.english')}</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('spanish')}>{t('footer.language.spanish')}</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('zh')}>{t('footer.language.chinese')}</MenuItem>
        </Menu>
      </Title>
      <Box display="flex" justifyContent="center" marginBottom="10px">
        <FooterButton startIcon={<TelegramIcon />} href="https://t.me/+U_Yt4SaseDliZjk1" target="_blank">
          <FooterText>{t('footer.telegramGroups')}</FooterText>
        </FooterButton>
        <FooterButton startIcon={<TelegramIcon />} href="https://t.me/BitPower_Channel" target="_blank">
          <FooterText>{t('footer.telegramNews')}</FooterText>
        </FooterButton>
      </Box>
      <Typography variant="body2" color="textSecondary">
        © 2022 BitPower Limited. {t('footer.rightsReserved')}
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
