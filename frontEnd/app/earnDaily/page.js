// pages/apply-job.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import Link from 'next/link';
import './earnDaily.css'

const ApplyJobPage = () => {
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
      }}
    >
      {/* <div className="pagesapplyJob">
      <div className="head H5">
       <img src="/logowithname.png" className="logo1" />
       <div className="money">
        {t('apply_job_title')}
       </div>
       <div className="textGradient more">
        NEED YOU
       </div>
       <img src="/assets/applyjob_pic01-CE2NwlDl.png" className="pic01" />
      </div>
      <div className="pcInfoList">
       <div className="btn">
        <div className="borderInlint simpleBtn" onClick={() => handleNavigation("/applyJob/job1")}>
         <p>{t('apply_job_position_1')}</p> 
         <img src="/assets/right.png" />
        </div>
        <div className="borderInlint simpleBtn" onClick={() => handleNavigation("/applyJob/job2")}>
         <p>{t('apply_job_position_2')}</p> 
         <img src="/assets/right.png" />
        </div>
        <div className="borderInlint simpleBtn" onClick={() => handleNavigation("/applyJob/job3")}>
         <p>{t('apply_job_position_3')}</p> 
         <img src="/assets/right.png" />
        </div>
        <div className="borderInlint simpleBtn" onClick={() => handleNavigation("/applyJob/job4")}>
         <p>{t('apply_job_position_4')}</p> 
         <img src="/assets/right.png" />
        </div>
        <div className="borderInlint simpleBtn" onClick={() => handleNavigation("/applyJob/job5")}>
         <p>{t('apply_job_position_5')}</p> 
         <img src="/assets/right.png" />
        </div>
       </div>
      </div>
     </div> */}
    </Box>
  );
};

export default ApplyJobPage;
