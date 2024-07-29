'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LearnAndEarnPage = () => {
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
        maxWidth: '800px',
      }}
    >
      <Box className="pages pcDetail">
        <Box className="head">
          <Box className="money">
            <Typography variant="h4" className="textGradient">{t('learn_and_earn_daily_earnings')}</Typography>
          </Box>
        </Box>
        <Box className="mains">
          <Box className="mainsNb1">
            <Typography paragraph className="simpleP">
              {t('learn_and_earn_paragraph1')}
            </Typography>
            <Typography paragraph className="simpleP">
              {t('learn_and_earn_paragraph2')}
            </Typography>
            <Typography paragraph className="simpleP">
              {t('learn_and_earn_paragraph3')}
            </Typography>
            <Typography paragraph className="simpleP">
              {t('learn_and_earn_paragraph4')}
            </Typography>
          </Box>
          <Box className="mainsNb2">
            <Box className="rounds">
              <Typography variant="h5" className="textGradient">{t('learn_and_earn_activity_content')}</Typography>
              <Typography paragraph>
                {t('learn_and_earn_activity_content_desc')}
              </Typography>
              <Typography paragraph>
                {t('learn_and_earn_reward_desc')}
              </Typography>
            </Box>
            <Box className="rounds">
              <Typography variant="h5" className="textGradient">{t('learn_and_earn_activity_rules')}</Typography>
              <Typography paragraph>
                {t('learn_and_earn_rule1')}
              </Typography>
              <Typography paragraph>
                {t('learn_and_earn_rule2')}
              </Typography>
              <Typography paragraph>
                {t('learn_and_earn_rule3')}
              </Typography>
            </Box>
            <Box className="rounds">
              <Typography variant="h5" className="textGradient">{t('learn_and_earn_how_to_get_video_material')}</Typography>
              <Typography paragraph>
                {t('learn_and_earn_how_to_get_video_material1')}
              </Typography>
              <Typography paragraph>
                {t('learn_and_earn_how_to_get_video_material2')}
              </Typography>
              <Typography paragraph>
                {t('learn_and_earn_how_to_get_video_material3')}
              </Typography>
            </Box>
            <Typography variant="h5" className="textGradient simpleH2">
              {t('learn_and_earn_slogan')}
            </Typography>
            <Typography paragraph className="simplePGray">
              {t('learn_and_earn_slogan_desc')}
            </Typography>
            <Box className="section_7 flex-col">
              <Box className="box_7 flex-row justify-between">
                <Typography variant="body2" className="text_12">
                  {t('learn_and_earn_slogan1')}
                </Typography>
              </Box>
              <Box className="box_7 flex-row justify-between">
                <Typography variant="body2" className="text_12">
                  {t('learn_and_earn_slogan2')}
                </Typography>
              </Box>
              <Box className="box_7 flex-row justify-between">
                <Typography variant="body2" className="text_12">
                  {t('learn_and_earn_slogan3')}
                </Typography>
              </Box>
              <Box className="box_7 flex-row justify-between">
                <Typography variant="body2" className="text_12">
                  {t('learn_and_earn_slogan4')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LearnAndEarnPage;
