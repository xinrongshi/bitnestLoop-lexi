// pages/partners.js
'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const PartnerPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#121212',
        color: '#ffffff',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        {t('joinBitPower')}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        sx={{ marginTop: '20px', width: '100%' }}
        onClick={() => handleNavigation("/partners/learn-more")}
      >
        {t('moreInformation')}
      </Button>

      <Box sx={{ marginTop: '20px' }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginBottom: '10px', width: '100%' }}
          onClick={() => handleNavigation('/partners/partner-introduction')}
        >
          {t('partnerIntroduction')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginBottom: '10px', width: '100%' }}
          onClick={() => handleNavigation('/partners/become-partner')}
        >
          {t('becomePartner')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginBottom: '10px', width: '100%' }}
          onClick={() => handleNavigation('/partners/fill-application')}
        >
          {t('fillApplication')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginBottom: '10px', width: '100%' }}
          onClick={() => handleNavigation('/partner-dashboard')}
        >
          {t('partnerDashboard')}
        </Button>
      </Box>
    </Box>
  );
};

export default PartnerPage;
