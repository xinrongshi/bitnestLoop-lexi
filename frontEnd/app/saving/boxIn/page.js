"use client";
import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Container, Typography, InputBase } from '@mui/material';
import { styled } from '@mui/system';
import { TransactionContext } from "../../context/TransactionContext";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const SavingBox = styled(Box)({
  background: '#38383a',
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
  margin: '10px',
  marginTop:"30px",
  borderRadius: '30px',
  width: '200px',
  height: '40px',
  fontWeight: '600',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#00cc00',
  },
});

const InputBox = styled(InputBase)({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '10px',
  marginTop: '10px',
  width: '100%',
  color: 'white',
  fontSize: '16px',
  '& input': {
    textAlign: 'center',
    color: 'white',
  }
});

const BoxInPage = () => {
  const { connectWallet, currentAccount,deposit,getUserTotalDeposits,disconnectWallet } = useContext(TransactionContext);
  const [balance, setBalance] = useState(0);
  const [maxSavingLimit, setMaxSavingLimit] = useState(8724969);
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    if (!amount) return alert('Please enter an amount');
    await deposit(amount, 30, currentAccount);
  };

  useEffect(() => {
    // 这里可以调用合约方法来获取余额和最大存储限制
    if (currentAccount) {
      // 假设获取余额和最大存储限制的代码
    //   setBalance(0);
       
    }
  }, [currentAccount]);

  return (
    <>
    
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '80px' }}>
        <SavingBox>
          {/* <Typography variant="h5" style={{color: '#fff'}}>Saving</Typography> */}
          <InputBox placeholder={`<=${maxSavingLimit}USDT`}  color='#000' value={amount}
            onChange={(e) => setAmount(e.target.value)}/>
          {/* <Typography variant="body1" style={{color: '#000'}}>Maximum Saving Limit {maxSavingLimit} USDT</Typography>
          <Typography variant="body1" style={{color: '#000'}}>Payment Addresses</Typography>
          <Typography variant="body1" style={{color: '#000'}}>0xb657eca76d9cf5b2875534c1102d66f15565472d</Typography>
          <Typography variant="body1" style={{color: '#000'}}>Balance</Typography>
          <Typography variant="h6" style={{color: '#000'}}>0 USDT</Typography> */}
          {currentAccount ? (
            <StyledButton onClick={handleDeposit}>Confirm Deposit</StyledButton>
          ) : (
            <StyledButton onClick={connectWallet}>
              <AccountBalanceWalletIcon /> Connect Wallet
            </StyledButton>
          )}
        </SavingBox>
      </Container>
    </>
  );
}

export default BoxInPage;
