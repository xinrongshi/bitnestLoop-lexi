import { Button, Snackbar } from '@mui/material';
import { useState, useContext } from 'react';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { TransactionContext } from '../context/TransactionContext';
import { useTheme } from '@mui/material/styles';
import styles from './InviteButton.module.css';
const InviteButton = () => {
  const [open, setOpen] = useState(false);
  const { currentAccount } = useContext(TransactionContext);
  const theme = useTheme();

  const handleInviteClick = () => {
    const inviteUrl = `${window.location.origin}?invite=${currentAccount}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={styles.inviteButton}
        sx={{
          cursor: 'pointer',
          height: '50px',
          background: 'linear-gradient(270deg, #f9ec56, #c99722)',
          borderRadius: '24px',
          margin: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '290px',
          color: '#000',
          fontSize: '18px',
          marginBottom: '28px',
          '&:hover': {
            background: 'linear-gradient(270deg, #c99722, #f9ec56)',
          },
        }}
        onClick={handleInviteClick}
      >
        Invite friends
        <AutoAwesomeMotionIcon />
      </Button>
      <Snackbar
        sx={{
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '395px',
            left: 'calc(50% - 140px)',
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invite link copied to clipboard"
      />
    </div>
  );
};

export default InviteButton;
