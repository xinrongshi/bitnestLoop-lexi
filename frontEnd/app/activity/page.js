// pages/activity-zone.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './activity.css'

const ActivityZonePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <Box
      sx={{
        margin: '50px auto',
        backgroundColor: '#121212',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
        maxWidth: '800px',
      }}
    >
      <div className="pages pcDetail">
        <div className="head">
        <img src="/assets/activity_index_pic1-2TTs9uvb.png" className="logo1" />
        <img src="/assets/activity_index_pic2-BJ9y-cpt.png" className="logo2" />
        <div className="money">
          <h2 className="textGradient">{t('activity_zone_title')}</h2>
        </div>
        </div>
        <div className="main">
        <div className="list" onClick={() => handleNavigation("/activity/one")}>
          <div className="one commonRight20">
          {t('activity_one')}
          </div>
          <div className="two">
          {t('activity_one_desc')}
          </div>
          <img src="/assets/activity_index_pic3-DwmmsZId.png" />
        </div>
        <div className="list" onClick={() => handleNavigation("/activity/two")}>
          <div className="one commonRight20">
          {t('activity_two')}
          </div>
          <div className="two">
          {t('activity_two_desc')}
          </div>
          <img src="/assets/activity_index_pic3-DwmmsZId.png" />
        </div>
        <div className="list">
          <div className="one commonRight20">
          {t('activity_three')}
          </div>
          <div className="two">
          {t('activity_three_desc')}
          </div>
          <img src="/assets/activity_index_pic3-DwmmsZId.png" />
        </div>
        </div>
      </div>
    </Box>
  );
};

export default ActivityZonePage;
