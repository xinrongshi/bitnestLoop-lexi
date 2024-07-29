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
          BitPower
        </Typography>
        <Box className="main pcInfoList">
          <Typography variant="h5" className="simpleH2" sx={{ marginBottom: '20px', color: '#c99722' }}>
            <b className="textGradient">1. {t('what_is_bitpower')}</b>
          </Typography>
          <Typography paragraph className="simplePGray">
            {t('bitpower_intro')}
          </Typography>
          <Typography variant="h5" className="textGradient simpleH2" sx={{ color: '#c99722' }}>
            <b className="textGradient">2. {t('significance_of_being_partner')}</b>
          </Typography>
          <Typography paragraph className="simplePGray">
            {t('significance_intro')}
          </Typography>
          <Box className="rounds">
            <Box className="rlist flex-row">
             
              <Box>
                <Typography variant="h6" className="pcH222" sx={{ color: '#c99722' }}>
                  <b className="textGradient">{t('entrepreneur_opportunity')}</b>
                </Typography>
                <Typography>{t('entrepreneur_opportunity_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row">
           
              <Box>
                <Typography variant="h6" className="pcH222" sx={{ color: '#c99722' }}>
                  <b className="textGradient">{t('increase_income')}</b>
                </Typography>
                <Typography>{t('increase_income_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row">
            
              <Box>
                <Typography variant="h6" className="pcH222" sx={{ color: '#c99722' }}>
                  <b className="textGradient">{t('development_opportunity')}</b>
                </Typography>
                <Typography>{t('development_opportunity_desc')}</Typography>
              </Box>
            </Box>
          </Box>
          <Typography paragraph className="simplePGray">
            {t('interested_partner')}
          </Typography>
          <Typography paragraph className="simplePGray">
            {t('training_and_support')}
          </Typography>
          <Typography variant="h5" className="textGradient simpleH2" sx={{ color: '#c99722' }}>
            <b className="textGradient">3. {t('bitpower_partner_benefits')}</b>
          </Typography>
          <Typography paragraph className="simplePGray">
            {t('partner_benefits_intro')}
          </Typography>
          <Box className="rounds">
            <Box className="rlist flex-row">
             
              <Box>
                <Typography variant="h6" className="pcH222" sx={{ color: '#c99722' }}>
                  <b className="textGradient">1. {t('bitpower_loop')}</b>
                </Typography>
                <Typography>{t('bitpower_loop_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row">
             
              <Box>
                <Typography variant="h6" className="pcH222" sx={{ color: '#c99722' }}>
                  <b className="textGradient">2. {t('bitpower_dao')}</b>
                </Typography>
                <Typography>{t('bitpower_dao_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row">
             
              <Box>
                <Typography variant="h6" className="pcH222" sx={{ color: '#c99722' }}>
                  <b className="textGradient">3. {t('bitsavings')}</b>
                </Typography>
                <Typography>{t('bitsavings_desc')}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BecomePartnerPage;
