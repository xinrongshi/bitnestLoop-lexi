"use client";
import React, { useState, useContext, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Modal, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TransactionContext } from "../context/TransactionContext";
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function shortenAddress(address) {
  if (!address || typeof address !== 'string') return '';
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
}

const AccountInfo = ({ currentAccount, onClick }) => {
  return <>
    {currentAccount ?
      <Box display={'flex'} alignItems={'center'} onClick={onClick}>
        <AccountBalanceWalletIcon></AccountBalanceWalletIcon>
        {shortenAddress(currentAccount)}
      </Box>
      :
      "Connect Wallet"
    }
  </>
}

const DisconnectWalletModal = ({ open, handleClose, currentAccount, disconnectWallet }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="wallet-modal-title"
      aria-describedby="wallet-modal-description"
    >
      <Box sx={style}>
        <AccountInfo currentAccount={currentAccount} />
        <Button
          variant="outlined"
          startIcon={<PowerSettingsNewIcon />}
          onClick={() => {
            disconnectWallet();
            handleClose();
          }}
          sx={{ mt: 2 }}
        >
          Disconnect
        </Button>
      </Box>
    </Modal>
  );
};

const CustomAppBar = () => {
  const { connectWallet, currentAccount, disconnectWallet } = useContext(TransactionContext);
  const [showDisconnect, setShowDisconnect] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isHomePage = pathname === "/";

  return (
    <AppBar sx={{
      width: "100%",
      [theme.breakpoints.up('md')]: {
        width: '395px',
        left: "calc(50% - 395px / 2)"
      },
    }} position="fixed" color="default" >
      <Toolbar style={{ paddingLeft: "0px" }}>
        {isHomePage ? (
          <Link href="/introduce" style={{
            display: "flex",
            alignItems: "center"
          }}>
            <img src="logowithname.png" alt="Logo" style={{ height: '60px' }} />
          </Link>
        ) : (
          <IconButton style={{ marginLeft: "12px" }} edge="start" color="inherit" onClick={() => router.back() }>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={connectWallet} color="inherit" style={{ minWidth: '98px', height: '24px', backgroundColor: '#f9ed56', color: "#000", fontSize: "12px" }}>
          <AccountInfo currentAccount={currentAccount} onClick={() => {
            setShowDisconnect(true);
          }} />
        </Button>
      </Toolbar>
      {currentAccount && <DisconnectWalletModal disconnectWallet={disconnectWallet} currentAccount={currentAccount} open={showDisconnect} handleClose={() => {
        setShowDisconnect(false)
      }} />}
    </AppBar>
  );
};

export default CustomAppBar;
