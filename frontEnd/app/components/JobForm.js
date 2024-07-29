// components/JobForm.js
'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './jobForm.css'

const JobForm = () => {
  const { t } = useTranslation();
  return (
    <div className='jobForm'>
      <div className='inputList'>
      <p>{t('jobForm1')}</p>
      <div className='ints'>
        <input className='cominput' placeholder={t('jobForm1')} />
      </div>
      </div>
      <div className='inputList'>
      <p>{t('jobForm2')}</p>
      <div className='ints'>
        <input className='cominput' placeholder={t('jobForm2')} />
      </div>
      </div>
      <div className='inputList'>
      <p>{t('jobForm3')}</p>
      <div className='ints'>
        <input className='cominput' placeholder={t('jobForm3')} />
      </div>
      </div>
      <div className='inputList'>
      <p>{t('jobForm4')}</p>
      <div className='ints'>
        <input className='cominput' placeholder={t('jobForm4')} />
      </div>
      </div>
      <div className='commonBtn'>
      {t('jobForm5')}
      </div>
      <div className='tip'>
      {t('jobForm6')}
      </div>
   </div>
  );
};

export default JobForm;
