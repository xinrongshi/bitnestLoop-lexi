"use client";
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { People, Group, MonetizationOn, Work, Movie, Gavel, SwapHoriz,VideogameAsset,CardGiftcard } from '@mui/icons-material';

import styles from "./IconButtons.module.css";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
// a row have 4 icons
const IconContainer = styled('div')({
  // display: 'flex',
  // flexWrap: 'wrap',
  // justifyContent: 'space-between',
  // maxHeight: '400px',
  // marginTop: '30px',
  // marginBottom:"30px"
  display:"grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: '30px',
  marginBottom:"30px"
});

const IconButtonWrapper = styled('div')({
  textAlign: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover .MuiSvgIcon-root': {
    color: '#00cc00',
  },
});

const iconStyles = {
  fontSize: '60px',
  color: '#ffffff',
  background: 'linear-gradient(270deg, #f9ec56, #c99722)',
  borderRadius: '50%',
  padding: '10px',
  marginBottom: '10px',
};

const ToggleButton = styled(Button)({
  background: 'linear-gradient(270deg, #f9ec56, #c99722);',
  boxShadow: "0 5px 10px #2dfe4f33,inset 0 5px 13px #ffffffeb",
  color: '#000',
  padding: '5px 10px',
  marginLeft: '10px',
  borderRadius: '20px',
  fontWeight: "600",
  fontSize: "14px",
  '&:hover': {
    backgroundColor: '#00cc00',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    boxShadow: "none",
    background: 'linear-gradient(270deg, #f9ec56, #c99722);',
    color: '#000',
  },
});

const IconButtonComponent = ({ Icon, title, onClick }) => {
  return (
    <IconButtonWrapper onClick={onClick}>
      <Icon style={iconStyles} />
      <Typography variant="subtitle1" className={styles['item-title']}>{title}</Typography>
    </IconButtonWrapper>
  );
};

export default function IconButtons() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const icons = [
    { Icon: People, title: t('buttons_my_team'), link: "/" },
    { Icon: Group, title: t('buttons_community'), link: "/" },
    { Icon: MonetizationOn, title: t('buttons_earn_daily'), link: "/" },
    { Icon: Work, title: t('buttons_partner'), link: "/partners" },
    { Icon: VideogameAsset, title: t('buttons_game_zone'), link: "/learn_and_earn" },
    { Icon: Movie, title: t('buttons_video_zone'), link: "/" },
    { Icon: SwapHoriz, title: t('buttons_swap'), link: "/" },
    { Icon: Gavel, title: t('buttons_apply_job'), link: "/applyJob" },
    { Icon: CardGiftcard, title: t('buttons_gift'), link: "/activity" },
  ];

  return (
    <>
      <Box  display="flex" alignItems="center" justifyContent="space-between" marginBottom="0px">
        <Typography variant="h5" className={styles['zone-title']}>
          {t('buttons_bitpower_zone')}
        </Typography>
        <ToggleButton onClick={() => setShowMore(!showMore)}>
          {showMore ? t('buttons_show_less') : t('buttons_show_more')}
        </ToggleButton>
      </Box>
      <IconContainer>
        {icons.slice(0, showMore ? icons.length : 3).map((icon, index) => (
          <Link href={icon.link} key={index}  >
            <IconButtonComponent key={index} Icon={icon.Icon} title={icon.title} onClick={() => {}} />
          </Link>
        ))}
      </IconContainer>
    </>
  );
}
