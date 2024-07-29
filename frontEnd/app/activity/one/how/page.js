// pages/become-partner.js
'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './how.css'

const BecomePartnerPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        margin: '50px auto',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
      }}
    >
      <Box className="pageshow">
        {/* <Typography variant="h4" className="BitPower" sx={{ color: '#c99722' }}>
          {t('safe_title0')}
        </Typography>
        <Box className="main pcInfoList">
          <div dangerouslySetInnerHTML = {{ __html : t('activity_one_how_title') }}></div>
        </Box> */}
        <div className="pagehow pcDetail">
          <div className="pcInfoList">
            <div className="main">
              <div className="H2">
                <b className="textGradient">{t('activity_one_how_title')}</b>
              </div>
              <div className="simpleP" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds1') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds2') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds3') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds33') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds4') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds5') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds6') }}></div>
              <div className="rounds" dangerouslySetInnerHTML = {{ __html : t('activity_one_how_rounds7') }}></div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default BecomePartnerPage;
