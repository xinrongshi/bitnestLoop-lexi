// pages/bitpower-introduction.js
'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BitPowerIntroduction = () => {
  const { t } = useTranslation();

  const handleLearnMoreClick = () => {
    alert(t('learn_more'));
  };

  const roadmapItems = [
    { title: t('roadmap_idea'), date: t('roadmap_idea_date') },
    { title: t('roadmap_lending'), date: t('roadmap_lending_date') },
    { title: t('roadmap_loop'), date: t('roadmap_loop_date') },
    { title: t('roadmap_savings'), date: t('roadmap_savings_date') },
    { title: t('roadmap_community'), date: t('roadmap_community_date') },
    { title: t('roadmap_users'), date: t('roadmap_users_date') },
    { title: t('roadmap_commercial'), date: t('roadmap_commercial_date') },
    { title: t('roadmap_mellion'), date: t('roadmap_mellion_date') },
    { title: t('roadmap_circulation'), date: t('roadmap_circulation_date') },
    { title: t('roadmap_token_lending'), date: t('roadmap_token_lending_date') },
    { title: t('roadmap_wallet'), date: t('roadmap_wallet_date') },
    { title: t('roadmap_cross_chain'), date: t('roadmap_cross_chain_date') },
    { title: t('roadmap_mixing'), date: t('roadmap_mixing_date') },
    { title: t('roadmap_exchange'), date: t('roadmap_exchange_date') },
    { title: t('roadmap_market_management'), date: t('roadmap_market_management_date') },
  ];

  return (
    <Box
      sx={{
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#121212',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {t('bitpower_intro')}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        {t('bitpower_definition')}
      </Typography>
      <Typography paragraph>
        {t('bitpower_definition_1')}
      </Typography>
      <Typography paragraph>
        {t('bitpower_definition_2')}
      </Typography>
      <Typography paragraph>
        {t('bitpower_definition_3')}
      </Typography>
      <Typography paragraph>
        {t('bitpower_definition_4')}
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        sx={{ marginTop: '20px', width: '100%' }}
        onClick={handleLearnMoreClick}
      >
        {t('learn_more')}
      </Button>

      <Typography variant="h6" gutterBottom sx={{ marginTop: '40px' }}>
        {t('roadmap')}
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        {roadmapItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Box
              sx={{
                width: '10px',
                height: '10px',
                backgroundColor: '#4CAF50',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
              <Typography>{item.date}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Typography variant="h6" gutterBottom sx={{ marginTop: '30px' }}>
        {t('conclusion')}
      </Typography>
      <Typography paragraph>
        {t('conclusion_text')}
      </Typography>
    </Box>
  );
};

export default BitPowerIntroduction;
