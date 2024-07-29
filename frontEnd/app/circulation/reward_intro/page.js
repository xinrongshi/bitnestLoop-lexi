// pages/become-partner.js
'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BecomePartnerPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        margin: '50px auto',
        padding: '20px',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
      }}
    >
      <Box className="pages">
        <Typography variant="h4" className="BitPower" sx={{ color: '#c99722' }}>
          {t('reward_intro_title0')}
        </Typography>
        <Box className="main pcInfoList">
          <div dangerouslySetInnerHTML = {{ __html : t('reward_intro_content') }}></div>
        </Box>
      </Box>
    </Box>
  );
};

export default BecomePartnerPage;
