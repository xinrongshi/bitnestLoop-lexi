"use client";
import Image from 'next/image';
import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Box, Typography, Button, Container, Link } from '@mui/material';
import { styled } from '@mui/system';
import { TransactionContext } from "../context/TransactionContext";
import styles from "./InvitePage.module.css";
import InviteButton from '../components/InviteButton';


const DescriptionBox = styled('div')({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  flexDirection: 'column',
  padding: '20px',
  textAlign:"left",
  fontSize:"16px",overflowWrap:'break-word',lineHeight:"20px"
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(270deg, #f9ec56, #c99722);',
  color: '#000',
  padding: '10px 20px',
  margin: '20px 0px 0',
  borderRadius: '30px',
  width: "290px",
  height: "48px",
  fontWeight: "600",
  fontSize: "18px",
  '&:hover': {
    backgroundColor: '#00cc00',
  },
});

export default function InvitePage() {
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  return (
    <>
      <DescriptionBox style={{marginTop:"60px"}}>
        <Typography variant="p" 
        >
        In BitPower, your share rewards come from your partners. A unique personal link is created for you when you register. When someone clicks and signs up, they are tied to you forever as your downline partner.</Typography>
      </DescriptionBox>
      <DescriptionBox>
        <Typography variant="p" 
       >
         * All individual partners you invite will be permanently assigned to you and cannot be changed as they are recorded in the smart contract.
        </Typography>
      </DescriptionBox>
      
      <Container  style={{ textAlign: 'center' }}>
        {currentAccount ? (
            <InviteButton></InviteButton>
            
        ) : (
          <StyledButton onClick={connectWallet}>Connect Wallet</StyledButton>
        )}
      </Container>
    </>
  );
}
