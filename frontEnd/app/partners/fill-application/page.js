// pages/partner-application.js
'use client';
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ChatIcon from '@mui/icons-material/Chat';
import { useTranslation } from 'react-i18next';

const PartnerApplicationPage = () => {
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
          <Typography variant="h4">{t('application_title')}</Typography>
        </Box>
        <Box className="main pcInfoList">
          <Typography paragraph className="simplePGray">
            {t('application_bitpower_intro_application')}
          </Typography>
          <Typography variant="h5" className="textGradient simpleH2" sx={{ fontWeight: '600', marginBottom: '10px' }}>
            <b className="textGradient">{t('application_partner_requirements_title')}</b>
          </Typography>
          <Box className="rounds">
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <PeopleIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('application_step_one')}</Typography>
                <Typography>{t('application_step_one_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <LaptopMacIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('application_step_two')}</Typography>
                <Typography>{t('application_step_two_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <AccountBalanceWalletIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('application_step_three')}</Typography>
                <Typography>{t('application_step_three_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <LocalAtmIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('application_step_four')}</Typography>
                <Typography>{t('application_step_four_desc')}</Typography>
              </Box>
            </Box>
            <Box className="rlist flex-row" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <ChatIcon fontSize="large" sx={{ color: '#ffffff', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" className="textGradient">{t('application_step_five')}</Typography>
                <Typography>{t('application_step_five_desc')}</Typography>
              </Box>
            </Box>
          </Box>
          <Typography paragraph className="simplePGray">
            {t('application_instructions')}
          </Typography>
          <Box className="inputList">
            <Typography>{t('application_add_group_link')}</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={t('application_add_group_link_placeholder')}
              sx={{ marginBottom: '20px', backgroundColor: '#ffffff', borderRadius: '5px' }}
            />
          </Box>
          <Box className="inputList">
            <Typography>{t('application_add_support_account')}</Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={t('application_add_support_account_placeholder')}
              sx={{ marginBottom: '20px', backgroundColor: '#ffffff', borderRadius: '5px' }}
            />
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: '20px' }}>
            {t('application_link_wallet')}
          </Button>
          <Typography className="tip" sx={{ color: '#ff6f61' }}>
            {t('application_note')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PartnerApplicationPage;
