// pages/become-partner.js
'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import JobForm from '../../components/JobForm.js';
import '../job.css'

const BecomePartnerPage = () => {
  const { t } = useTranslation();
  return (
    <Box
      className="pagesjob"
      sx={{
        margin: '50px auto',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
      }}
    >
      <div dangerouslySetInnerHTML = {{ __html : t('job2_content') }}></div>
      <JobForm />
    </Box>
  );
};

export default BecomePartnerPage;
