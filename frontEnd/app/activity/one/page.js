// pages/become-partner.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './one.css'

const BecomePartnerPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <Box
      sx={{
        margin: '50px auto',
        color: '#ffffff',
        borderRadius: '10px',
        textAlign: 'left',
      }}
    >
      <div className="pcDetail pagesone">
        <div className="head">
          <div className="oneStr">
          {t('activity_one_hy')}
          </div>
          <div className="money">
          <h2 className="">250USDT</h2>
          </div>
        </div>
        <div className="listAll">
          <div className="list">
          <div className="one textGradient">
          {t('activity_one_syyq')}
          </div>
          <div className="two">
          {t('activity_one_zs')}
          </div>
          </div>
          <div className="list lists">
          <div className="one textGradient">
          {t('activity_one_syyq')}
          </div>
          <div className="two">
            <div className="simplePGray">
            <p>{t('activity_one_yq1')}</p>
            <p>{t('activity_one_yq2')}</p>
            <p>{t('activity_one_yq3')}</p>
            <p>{t('activity_one_yq4')}</p>
            </div>
          </div>
          </div>
          <div className="main">
          <div className="simpleColor">
          {t('activity_one_zy')}
          </div>
          <div className="simplePGray">
            <p>{t('activity_one_zy1')}</p>
            <p>{t('activity_one_zy2')}</p>
            <p>{t('activity_one_zy3')}</p>
          </div>
          <div className="borderInlint simpleBtn" onClick={() => handleNavigation("/activity/one/how")}>
            <p>{t('activity_one_rhzz')}</p> 
            <img src="data:image/png;base64,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" />
          </div>
          <div className="teleBtn dis">
            <img src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16%200C11.7575%200%207.685%201.68675%204.6875%204.68625C1.6875%207.68575%200%2011.7583%200%2016C0%2020.2417%201.6875%2024.3142%204.6875%2027.3137C7.685%2030.3132%2011.7575%2032%2016%2032C20.2425%2032%2024.315%2030.3132%2027.3125%2027.3137C30.3125%2024.3142%2032%2020.2417%2032%2016C32%2011.7583%2030.3125%207.68575%2027.3125%204.68625C24.315%201.68675%2020.2425%200%2016%200Z'%20fill='white'/%3e%3cpath%20d='M7.24268%2015.8309C11.9077%2013.7989%2015.0176%2012.4592%2016.5726%2011.8119C21.0176%209.96369%2021.9401%209.64269%2022.5426%209.63194C22.6751%209.62969%2022.9701%209.66244%2023.1626%209.81819C23.3226%209.94944%2023.3676%2010.1269%2023.3901%2010.2514C23.4101%2010.3759%2023.4377%2010.6597%2023.4152%2010.8812C23.1752%2013.4112%2022.1327%2019.5507%2021.6027%2022.3844C21.3802%2023.5835%2020.9376%2023.9855%2020.5101%2024.0247C19.5801%2024.1102%2018.8751%2023.4107%2017.9751%2022.8209C16.5676%2021.8977%2015.7727%2021.3232%2014.4052%2020.4224C12.8252%2019.3814%2013.8501%2018.8092%2014.7501%2017.8742C14.9851%2017.6294%2019.0801%2013.9057%2019.1576%2013.5679C19.1676%2013.5257%2019.1777%2013.3682%2019.0827%2013.2852C18.9902%2013.2019%2018.8526%2013.2304%2018.7526%2013.2529C18.6101%2013.2849%2016.3626%2014.7719%2012.0026%2017.7137C11.3651%2018.1522%2010.7876%2018.3659%2010.2676%2018.3547C9.69759%2018.3424%208.59766%2018.0317%207.78016%2017.7662C6.78016%2017.4404%205.98262%2017.2682%206.05262%2016.7149C6.08762%2016.4269%206.48518%2016.1322%207.24268%2015.8309Z'%20fill='%2332ABDF'/%3e%3c/svg%3e" />
            <p>{t('activity_one_lx')}</p>
          </div>
          </div>
      
        </div>
        </div>
    </Box>
  );
};

export default BecomePartnerPage;
