"use client";
import Image from 'next/image';
import * as React from 'react';
import { useState, useContext } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import { TransactionContext } from "./context/TransactionContext";
import styles from "./page.module.css";
import ThreeBackground from './components/ThreeBackground.js';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import IconButtons from './components/IconButtons';
import { usePathname, useRouter } from 'next/navigation';
import Description from './components/Description';
import Carousel from './components/Carousel'
import Partners from './components/Partners';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const BannerImage = styled('div')({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '24px',
  flexDirection: 'column',
  marginTop: "60px"
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(270deg, #f9ec56, #c99722);',
  boxShadow: "0 5px 10px #2dfe4f33,inset 0 5px 13px #ffffffeb",
  color: '#000',
  padding: '10px 20px',
  margin: '20px 0px 0',
  borderRadius: '30px',
  width: "182px",
  height: "48px",
  fontWeight: "600",
  fontSize: "18px",
  '&:hover': {
    backgroundColor: '#00cc00',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    boxShadow: "none",
    background: 'linear-gradient(270deg, #f9ec56, #c99722);',
    color: '#000',
  }
});

const FeatureCard = ({ children, title, content }) => {
  return (
    <Box className={styles.card}>
      <Box className={styles["card-wrapper"]}>
        <Image
          priority={true}
          src="/logo2.png"
          width="48"
          height="48"
          alt=""
        />
        <Box
          style={{
            padding: "0 18px",
            lineHeight: "33px",
            fontSize: "18px"
          }}
        >
          {title}
        </Box>
      </Box>
      <Box className={styles["card-content"]}>
        {content}
      </Box>
      <Box style={{ marginBottom: "30px", display: "flex", justifyContent: "flex-start", marginLeft: "30px" }}>
        {children}
      </Box>
      <Image
        priority={true}
        src="back.svg"
        width="287"
        height="108"
        className={styles["card-image"]}
        alt=""
      />
    </Box>
  );
}

function shortenAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
}

export default function Home() {
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation();
  const { currentAccount, connectWallet, disconnectWallet } = useContext(TransactionContext);

  const router = useRouter();
  const pathname = usePathname();
  const handleLanguageChange = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'zh' : 'en'));
  };

  return (
    <>
      <BannerImage>
        <Typography variant="h5" className={styles["banner-typography"]}>20,753,887</Typography>
        <Box className={styles["liquidity-label"]}>{t('liquidity')}</Box>
        <ThreeBackground />
        <Box className={styles["logo-text"]}>
          <b>{t('joinBitPower')}</b>
        </Box>
      </BannerImage>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <Link href="/invite">
          <Button className={styles["invite-button"]}>{t('inviteFriends')}<AutoAwesomeMotionIcon /></Button>
        </Link>
        <IconButtons />
        <FeatureCard
          title={t('bitPowerLoop')}
          content={t('bitPowerLoopContent')}
        >
          <Link href="/circulation">
            <StyledButton fullWidth>{t('joinNow')}</StyledButton>
          </Link>
        </FeatureCard>
        <FeatureCard
          title={t('savingBox')}
          content={t('savingBoxContent')}
        >
          <Link href="/saving">
            <StyledButton fullWidth>{t('joinNow')}</StyledButton>
          </Link>
        </FeatureCard>
        <FeatureCard
          title={t('bitPowerSavings')}
          content={t('bitPowerSavingsContent')}
        >
          <StyledButton disabled fullWidth>{t('comingSoon')}</StyledButton>
        </FeatureCard>
        <FeatureCard
          title={t('bitPowerDAO')}
          content={t('bitPowerDAOContent')}
        >
          <StyledButton disabled fullWidth>{t('comingSoon')}</StyledButton>
        </FeatureCard>
        <Description />
        <Carousel />
        <Partners />
      </Container>
    </>
  );
}
