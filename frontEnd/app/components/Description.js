'use client';
import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const Container = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  borderRadius: '10px',
  background: 'linear-gradient(180deg, #3a3a3c, #242526)',
  textAlign: 'left',
  wordBreak: 'break-word',
});

const TitleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '10px',
});

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#F0B90B',
});

const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
  color: theme.palette.text.primary,
}));

const FadedText = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)({
  background: 'linear-gradient(270deg, #f9ec56, #c99722);',
  boxShadow: '0 5px 10px #2dfe4f33, inset 0 5px 13px #ffffffeb',
  color: '#000',
  padding: '5px 10px',
  borderRadius: '20px',
  fontWeight: '600',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#00cc00',
  },
});

const Description = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <TitleContainer>
        <Title>
          {t('description.title')}
        </Title>
        <StyledButton>{t('description.button')}</StyledButton>
      </TitleContainer>
      <DescriptionText>
        {t('description.mainText')}
      </DescriptionText>
      <FadedText>
        {t('description.fadedText')}
      </FadedText>
    </Container>
  );
};

export default Description;
