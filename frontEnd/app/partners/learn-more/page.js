// pages/learn-more.js
'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// import backIcon from '../public/back-icon.svg';
// import morepic from '../public/partner_more_pic01.png';
// import pic2 from '../public/partner_intro_pic2.svg';

const LearnMorePage = () => {
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
      }}
    >
      {/* <Image src={backIcon} alt="Back" className="pcBackIconOne PC" /> */}
      <Box className="head">
        <Image src={"/logowithname.png"} 
        alt="Logo" 
        width={192}
        height={60}
        style={{display: 'block', margin: 'auto'}}
        className="logo1"/>
        <Typography variant="h5" gutterBottom className="money">
          {t('bitpower_opportunity')}
        </Typography>
        <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
            <Image 
            layout="fill" 
            objectFit="contain"
            src={"/morepic.png"} alt="More Pic" className="morepic" />
        </Box>
        <Typography variant="h4" gutterBottom className="BitPower">
          BitPower
        </Typography>
      </Box>
      <Box className="main pcInfoList">
        <Typography variant="h6" gutterBottom className="H2 textGradient" sx={{ marginBottom: '20px' }}>
          {t('open_group')}
        </Typography>
        <Typography paragraph className="simpleP">
          {t('open_group_text')}
        </Typography>
        <Typography paragraph className="simpleP">
          {t('background_text')}
        </Typography>
        <Typography paragraph className="simpleColor">
          {t('commitment_text')}
        </Typography>
        <Box className="btnLast">
          <Typography paragraph className="textGradient">
            {t('easy_work')}
          </Typography>
          {/* <Image src={pic2} alt="Pic 2" className="pic2" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default LearnMorePage;
