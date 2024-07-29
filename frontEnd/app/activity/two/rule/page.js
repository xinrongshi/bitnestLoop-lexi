// pages/become-partner.js
'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './rule.css'

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
      <Box className="">
        {/* <Typography variant="h4" className="BitPower" sx={{ color: '#c99722' }}>
          {t('safe_title0')}
        </Typography> */}
        <Box className="main pcInfoList">
          <div dangerouslySetInnerHTML = {{ __html : t('activity_two_rule_content') }}></div>
        </Box>
      </Box>
    </Box>
  );
};

export default BecomePartnerPage;
