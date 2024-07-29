// components/Carousel.js
'use client';
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AutoAwesomeMotion, VerifiedUser, Visibility, AllInclusive, MonetizationOn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled(Box)({
  marginTop: '20px',
  marginBottom: "20px",
  padding: '20px',
  borderRadius: '10px',
  background: 'linear-gradient(180deg, #3a3a3c, #242526)',
  textAlign: 'left',
  wordBreak: 'break-word',
  maxWidth: '100%',
  width: '100%',
});

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#F0B90B',
  marginBottom: '10px',
});

const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'center',
});

const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  borderRadius: '50%',
  marginBottom: '10px',
});

const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
  color: theme.palette.text.primary,
}));

const Carousel = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const items = [
    {
      icon: <AutoAwesomeMotion fontSize="large" />,
      title: t('carousel.autonomy.title'),
      description: t('carousel.autonomy.description')
    },
    {
      icon: <VerifiedUser fontSize="large" />,
      title: t('carousel.immutability.title'),
      description: t('carousel.immutability.description')
    },
    {
      icon: <Visibility fontSize="large" />,
      title: t('carousel.transparency.title'),
      description: t('carousel.transparency.description')
    },
    {
      icon: <AllInclusive fontSize="large" />,
      title: t('carousel.fullAutomation.title'),
      description: t('carousel.fullAutomation.description')
    },
    {
      icon: <MonetizationOn fontSize="large" />,
      title: t('carousel.smartContract.title'),
      description: t('carousel.smartContract.description')
    },
    {
      icon: <AllInclusive fontSize="large" />,
      title: t('carousel.decentralization.title'),
      description: t('carousel.decentralization.description')
    }
  ];

  return (
    <Container>
      <Title>{t('carousel.features')}</Title>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} padding="10px" display="flex" flexDirection="column" alignItems="center">
            <IconBox>{item.icon}</IconBox>
            <TextContainer>
              <Typography variant="h6" color="primary">{item.title}</Typography>
              <DescriptionText>{item.description}</DescriptionText>
            </TextContainer>
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default Carousel;
