// components/Partners.js
'use client';
import React from 'react';
import { Box, Typography, Grid, ButtonBase, Link } from '@mui/material';
import { styled } from '@mui/system';

const PartnerContainer = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  borderRadius: '10px',
  background: 'linear-gradient(180deg, #3a3a3c, #242526)',
  textAlign: 'left',
  wordBreak: 'break-word',
  maxWidth: '395px', // 确保在大屏幕上有固定的最大宽度
  margin: '0 auto',  // 居中对齐
});

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#F0B90B',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PartnerButton = styled(ButtonBase)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '10px',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const PartnerIcon = styled('img')({
  width: '60px',
  height: '60px',
  marginBottom: '10px',
});

const PartnerText = styled(Typography)({
  color: '#F0B90B',
  fontWeight: 'bold',
  fontSize:"12px"
});

const partners = [
  { src: '/metamask.png', title: 'METAMASK', link: 'https://metamask.io' },
  { src: '/TokenPocket.png', title: 'TokenPocket', link: 'https://tokenpocket.pro' },
  { src: '/TrustWallet.png', title: 'Trust Wallet', link: 'https://trustwallet.com' },
  { src: '/coinbase.png', title: 'CoinBase', link: 'https://www.coinbase.com' },
  { src: '/aml.png', title: 'AML Bot', link: 'https://amlbot.com' },
  { src: '/ChainLink.png', title: 'ChainLink', link: 'https://chain.link' },
];

const Partners = () => {
  return (
    <PartnerContainer>
      <Title>Partner</Title>
      <Grid container spacing={1}>
        {partners.map((partner, index) => (
          <Grid item xs={4} key={index}>
            <Link href={partner.link} target="_blank" rel="noopener noreferrer" underline="none" sx={{ width: '100%', height: '100%' }}>
              <PartnerButton>
                <PartnerIcon src={partner.src} alt={partner.title} />
                <PartnerText>{partner.title}</PartnerText>
              </PartnerButton>
            </Link>
          </Grid>
        ))}
      </Grid>
    </PartnerContainer>
  );
};

export default Partners;
