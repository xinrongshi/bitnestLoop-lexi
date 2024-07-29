// app/saving/page.js
"use client";
import React from 'react';
import { useState, useContext,useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { TransactionContext } from "../context/TransactionContext";
import Link from 'next/link'
const YellowBox = styled('div')({
  background: 'linear-gradient(270deg, #f9ec56, #c99722)',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center',
  marginTop: '80px',
  color: 'white'
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(270deg, #f9ec56, #c99722)',
  color: '#000',
  padding: '10px 20px',
  // margin: '10px',
  borderRadius: '30px',
  width: '160px',
  height: '40px',
  fontWeight: '600',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#00cc00',
  },
});

const BlackButton = styled(Button)({
  background: 'black',
  color: 'white',
  padding: '10px 20px',
  margin: '10px 0',
  borderRadius: '30px',
  width: '350px',
  height: '40px',
  fontWeight: '600',
  fontSize: '16px',
  border:"1px solid #fff",
  '&:hover': {
    backgroundColor: '#333',
  },
});

const SavingPage = () => {
  const { connectWallet, currentAccount,getUserTotalDeposits,disconnectWallet } = useContext(TransactionContext);
  const [balance,setBalance] = useState(0)
  useEffect( () => {
    async function fetchData() {
      if (currentAccount) {
        // 假设获取余额和最大存储限制的代码
        let balance = await getUserTotalDeposits(currentAccount)
        console.log("balance",balance)
        setBalance(balance.toString());
      }
    }
    // 这里可以调用合约方法来获取余额和最大存储限制
    fetchData()
    
  }, [currentAccount]);

  return (
    <>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <YellowBox>
          <Typography variant="h5">Total Amount</Typography>
          <Typography variant="h3">{balance} USDT</Typography>
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Typography variant="body1">Yesterday's Earnings</Typography>
            <Typography variant="body1">Total Earnings</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">0 USDT</Typography>
            <Typography variant="h6">0 USDT</Typography>
          </Box>
        </YellowBox>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Link href="/saving/boxIn">
            <StyledButton>Saving</StyledButton>
          </Link>
          <StyledButton>Withdraw</StyledButton>
        </Box>
        <BlackButton>Claim Rewards</BlackButton>
        <BlackButton>Orders</BlackButton>
        <BlackButton>Withdrawal Records</BlackButton>
      </Container>
    </>
  );
}

export default SavingPage;
