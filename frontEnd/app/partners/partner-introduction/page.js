// pages/partner-intro.js
'use client';
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ChatIcon from '@mui/icons-material/Chat';
import { useTranslation } from 'react-i18next';

const PartnerIntroPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#121212',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
        maxWidth: '800px',
      }}
    >
      <Box className="pages pcDetail">
        <Box className="base-title" sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4">{t('partner_intro_title')}</Typography>
        </Box>
        <Box className="main pcInfoList">
          <Typography paragraph className="simpleP">
            {t('dear_user')}
          </Typography>
          <Typography paragraph className="simpleP">
            {t('bitpower_intro1')}
          </Typography>
          <Box className="rounds">
            <Typography variant="h5" className="textGradient simpleH2" sx={{ fontWeight: '600', marginBottom: '10px' }}>
              <b className="textGradient">{t('partner_requirements_title')}</b>
            </Typography>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <PeopleIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('step_one')}</Typography>
                <Typography>{t('step_one_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <LaptopMacIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('step_two')}</Typography>
                <Typography>{t('step_two_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <AccountBalanceWalletIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('step_three')}</Typography>
                <Typography>{t('step_three_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <LocalAtmIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('step_four')}</Typography>
                <Typography>{t('step_four_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <ChatIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('step_five')}</Typography>
                <Typography>{t('step_five_desc')}</Typography>
              </Box>
            </Box>
          </Box>
          <Typography paragraph className="simplePGray">
            {t('ambassador_support')}
          </Typography>
          <Typography paragraph className="simplePGray">
            {t('guidance_and_support')}
          </Typography>
          <Typography paragraph className="simplePGray">
            {t('community_support')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PartnerIntroPage;
