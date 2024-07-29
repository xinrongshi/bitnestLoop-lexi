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
          {t('join_title0')}
        </Typography>
        <Box className="main pcInfoList">
          <Box>
            <Typography>{t('join_text0')}</Typography>
          </Box>

          <Typography variant="h5" className="simpleH2" sx={{ margin: '20px 0', color: '#c99722' }}>
            <b className="textGradient">{t('join_title1')}</b>
          </Typography>
          <Box>
            <Typography>{t('join_text1')}</Typography>
          </Box>
          <img src="/join.png" alt="Logo" style={{ width: '100%',borderRadius:'8px',margin:'20px 0' }} />
          <Box>
            <Typography>{t('join_text2')}</Typography>
          </Box>

          <Typography variant="h5" className="simpleH2" sx={{ margin: '20px 0', color: '#c99722' }}>
            <b className="textGradient">{t('join_title2')}</b>
          </Typography>
          <Box>
            <Typography>{t('join_text3')}</Typography>
          </Box>
          <Box>
            <Typography>{t('join_text4')}</Typography>
          </Box>

          <div dangerouslySetInnerHTML = {{ __html : t('join_liru') }}></div>
          <div dangerouslySetInnerHTML = {{ __html : t('join_table') }}></div>
          <Box>
            <Typography>{t('join_text5')}</Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default BecomePartnerPage;
