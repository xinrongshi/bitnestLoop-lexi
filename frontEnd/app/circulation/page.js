"use client";
import { useEffect, useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Box, Button, Typography, InputAdornment, FilledInput } from '@mui/material';
import styles from './page.module.css';
import { usePathname, useSearchParams,useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import Link from 'next/link';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Countdown from "./countdown"
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function CirculationPage() {
  const { connectWallet, currentAccount, getUSDTBalance, deposit, getUserOrders, getUserInvitees, calculateInterest } = useContext(TransactionContext);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState(1);
  const [calculatedInterest, setCalculatedInterest] = useState(0);
  const [orders, setOrders] = useState([]);
  const [invitees, setInvitees] = useState([]);
  const [generationCounts, setGenerationCounts] = useState({
    first: 0,
    second: 0,
    thirdToSeventh: 0,
    eighthToTenth: 0,
    eleventhToSeventeenth: 0,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [invite, setInvite] = useState(null);

  const fetchUserOrders = async () => {
    const userOrders = await getUserOrders();
    setOrders(userOrders);
  };

  useEffect(() => {
    const inviteParam = searchParams.get('invite');
    if (inviteParam && ethers.isAddress(inviteParam)) {
      setInvite(inviteParam);
    }
  }, [searchParams]);

  const fetchUserInvitees = async () => {
    const userResult = await getUserInvitees();
    if (!userResult) return;
    const { invitees, generations } = userResult;
    if (!invitees.length || !generations.length) {
      return null;
    }
    const counts = {
      first: 0,
      second: 0,
      thirdToSeventh: 0,
      eighthToTenth: 0,
      eleventhToSeventeenth: 0,
    };

    generations.forEach((gen) => {
      if (Number(gen) === 1) counts.first += 1;
      else if (Number(gen) === 2) counts.second += 1;
      else if (Number(gen) >= 3 && Number(gen) <= 7) counts.thirdToSeventh += 1;
      else if (Number(gen) >= 8 && Number(gen) <= 10) counts.eighthToTenth += 1;
      else if (Number(gen) >= 11 && Number(gen) <= 17) counts.eleventhToSeventeenth += 1;
    });

    setGenerationCounts(counts);
  };

  useEffect(() => {
    if (currentAccount) {
      fetchUSDTBalance();
      fetchUserOrders();
      fetchUserInvitees();
    }
  }, [currentAccount]);

  const fetchUSDTBalance = async () => {
    const balance = await getUSDTBalance();
    setUsdtBalance(parseFloat(balance).toFixed(3) | 0);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    const interest = calculateInterest(e.target.value, period);
    setCalculatedInterest(interest);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    const interest = calculateInterest(amount, newPeriod);
    setCalculatedInterest(interest);
  };

  const handleDeposit = async () => {
    const referrer = invite ? invite : currentAccount;
    const depositTx = await deposit(amount, period, referrer);
    await depositTx.wait(); // Wait for the transaction to be confirmed
    
    fetchUSDTBalance();
    fetchUserOrders();
  };

  const parseDateString = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString);
    return date.getTime();
  };

  const router = useRouter();
  const { t } = useTranslation();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Suspense>
    <Box className={styles.container}>
      <Box
        sx={{
          margin: 'auto',
          padding: '20px 0 0',
          textAlign: 'center',
        }}
      >
          <img src="logowithname.png" alt="Logo" style={{ height: '60px' }} />
      </Box>
     
    <Box
        sx={{
          margin: '0 auto 50px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#121212',
          color: '#ffffff',
          borderRadius: '10px',
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginTop: '20px', width: '100%' }}
          onClick={() => handleNavigation("/circulation/join")}
        >
          {t('circulation_join_title')}
        </Button>

        <Box sx={{ marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginBottom: '10px', width: '100%' }}
            onClick={() => handleNavigation('/circulation/reward_intro')}
          >
            {t('circulation_reward_intro_title')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginBottom: '10px', width: '100%' }}
            onClick={() => handleNavigation('/circulation/intro')}
          >
            {t('circulation_intro_title')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginBottom: '10px', width: '100%' }}
            onClick={() => handleNavigation('/circulation/safe')}
          >
            {t('circulation_safe_title')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginBottom: '10px', width: '100%' }}
            onClick={() => handleNavigation('/circulation/safe')}
          >
            {t('circulation_code_title')}
          </Button>
        </Box>
      </Box>

      <Typography variant="h4">Circulation</Typography>

      <Box className={styles.form}>
        <Typography variant="h6">Balance: {usdtBalance} USDT</Typography>
        <Box className={styles.inputGroup}>
          <FilledInput
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={() => setAmount(usdtBalance)}>Max</Button>
              </InputAdornment>
            }
          />
        </Box>
        <Box className={styles.duration}>
          <Typography variant="h6">Duration</Typography>
          <Box className={styles.buttons}>
            {[ 1, 7, 14,28].map((day) => (
              <Button
                sx={{ borderRadius: "20px" }}
                key={day}
                variant={period === day ? 'contained' : 'outlined'}
                onClick={() => handlePeriodChange(day)}
              >
                {day} Day{day > 1 && 's'}
              </Button>
            ))}
          </Box>
        </Box>
        <Typography variant="h6" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {period} Day{period > 1 && 's'}
          </Box>
          <Box>
            {Number(calculatedInterest) + Number(amount)} USDT
          </Box>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeposit}
          sx={{
            marginTop: "12px",
            width: "100%",
            background: "linear-gradient(270deg, #f9ec56, #c99722)",
            borderRadius: "20px",
            height: "40px",
          }}
        >
          Circulation
        </Button>
        <Box className={styles.orders}>
          <Typography variant="h6">Orders</Typography>
          {orders?.length > 0 ? (
            <Box>
              {orders.map((order, index) => (
                <Link href={`/order-detail?orderId=${index}`} key={index}>
                  <Box key={index} className={styles.order}>
                    <Typography>Amount: {order.amount} USDT</Typography>
                    {/* <Typography>Start Time: {order.startTime}</Typography> */}
                    <Typography>Period: {order.period / (24 * 60 * 60)} days</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>
                        Time Left: <Countdown endTime={parseDateString(order.startTime) + order.period * 1000} />
                      </Typography>
                      <ArrowRightAltIcon color="primary" />
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>
          ) : (
            <Typography>No Order</Typography>
          )}
        </Box>
        <Box className={styles.invitees}>
          <Typography variant="h6">Friend Address</Typography>
          <Typography className={styles.generation}>
            <span>1st generation</span> <span style={{ color: "#e7bb41" }}>{generationCounts.first}</span>
          </Typography>
          <Typography className={styles.generation}>
            <span>2nd generation</span><span style={{ color: "#e7bb41" }}> {generationCounts.second}</span>
          </Typography>
          <Typography className={styles.generation}>
            <span>3rd-7th generation</span><span> {generationCounts.thirdToSeventh}</span>
          </Typography>
          <Typography className={styles.generation}>
            <span>8th-10th generation</span><span> {generationCounts.eighthToTenth}</span>
          </Typography>
          <Typography className={styles.generation}>
            <span>11th-17th generation</span> <span>{generationCounts.eleventhToSeventeenth}</span>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={t('circulation_tuandui')} {...a11yProps(0)} />
          <Tab label={t('circulation_geren')} {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <div className="block_9 flex-col animate__animated animate__slideInRight">
            <div className="toCenter">
              <div className="image-text_77">
              <div className="group_7 flex-col">
                <img className="image_5" referrerPolicy="no-referrer" src="/b443c6d4ca56427a9457d6c0f5ba6170_mergeImage-Y1YsSgtW.png" />
              </div>
              <div className="text-group_74">
                <span className="text_50">0</span>
                <span className="text_51">{t('circulation_tuandui1')}</span>
              </div>
              </div>
              <div className="image-text_77">
              <div className="group_7 flex-col">
                <img className="image_5" referrerPolicy="no-referrer" src="/SketchPng1ace32856a596f89ab30185df7d91d7418a4fcd8e65d7a510a141c7bf7670f8c-BiJ7BdS2.png" />
              </div>
              <div className="text-group_74">
                <span className="text_50">0</span>
                <span className="text_51">{t('circulation_tuandui2')}</span>
              </div>
              </div>
              <div className="image-text_77">
              <div className="group_7 flex-col">
                <img className="image_5" referrerPolicy="no-referrer" src="/SketchPng0cf317a4a8fd7d8beb319a5a75653c9b8c61cfe1a780d5049a91e5a3e7acc78d-BeI7tpKg.png" />
              </div>
              <div className="text-group_74">
                <span className="text_50">0</span>
                <span className="text_51">{t('circulation_tuandui3')}</span>
              </div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="block_9 flex-col animate__animated animate__slideInLeft">
            <div className="toCenter">
              <div className="image-text_77">
              <div className="group_7 flex-col">
                <img className="image_5" referrerPolicy="no-referrer" src="/icon-PPAd@2x-BA0WKA0H.png" />
              </div>
              <div className="text-group_74">
                <span className="text_50">0</span>
                <span className="text_51">{t('circulation_geren1')}</span>
              </div>
              </div>
              <div className="image-text_77">
              <div className="group_7 flex-col">
                <img className="image_5" referrerPolicy="no-referrer" src="/icon-PPAm@2x-O9MfsFjM.png" />
              </div>
              <div className="text-group_74">
                <span className="text_50">0</span>
                <span className="text_51">{t('circulation_geren2')}</span>
              </div>
              </div>
              <div className="image-text_77">
              <div className="group_7 flex-col">
                <img className="image_5" referrerPolicy="no-referrer" src="/icon-FP@2x-CcDLp3B3.png" />
              </div>
              <div className="text-group_74">
                <span className="text_50">0</span>
                <span className="text_51">{t('circulation_geren3')}</span>
              </div>
              </div>
            </div>
          </div>
        </CustomTabPanel>
      </Box>

      <div dangerouslySetInnerHTML = {{ __html : t('circulation_text') }}></div>
      <div dangerouslySetInnerHTML = {{ __html : t('circulation_gif') }}></div>

      <div>
      <Typography className={styles.text_63} variant="h4">FAQ</Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {t('circulation_li_title1')}
          </AccordionSummary>
          <AccordionDetails>
          {t('circulation_li_conent1')}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
           {t('circulation_li_title2')}
          </AccordionSummary>
          <AccordionDetails>
          {t('circulation_li_conent2')}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {t('circulation_li_title3')}
          </AccordionSummary>
          <AccordionDetails>
          {t('circulation_li_conent3')}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {t('circulation_li_title4')}
          </AccordionSummary>
          <AccordionDetails>
            {t('circulation_li_conent4')}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {t('circulation_li_title5')}
          </AccordionSummary>
          <AccordionDetails>
            {t('circulation_li_conent5')}
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
    </Suspense>
  );
}
