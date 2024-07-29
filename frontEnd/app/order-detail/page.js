// OrderDetailPage.js
"use client";
import { useEffect, useState, useContext } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { TransactionContext } from '../context/TransactionContext';
import { Box, Typography, Button } from '@mui/material';
import styles from './page.module.css';
import { Suspense } from 'react'

export default function OrderDetailPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentAccount, withdraw, getUserOrder, calculateInterest } = useContext(TransactionContext);
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [interest, setInterest] = useState(0);
  const [endTime, setEndTime] = useState('');
  const [showWithdrawButton, setShowWithdrawButton] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const id = params.get('orderId');
    if (id) {
      setOrderId(id);
      fetchOrder(id);
    }
  }, [searchParams]);

  const fetchOrder = async (id) => {
    try {
      const orderDetails = await getUserOrder(currentAccount, id);
      console.log("orderDetails", orderDetails);
      setOrder(orderDetails);
      const calculatedInterest = calculateInterest(orderDetails.amount, orderDetails.period / (60*60*24));
      setInterest(calculatedInterest);
      console.log(" orderDetails.startTime", orderDetails.startTime)
      const endTimestamp = orderDetails.startTime + (orderDetails.period );
      setEndTime(new Date(endTimestamp * 1000).toLocaleString());
      checkEndTime(endTimestamp);
    } catch (error) {
      console.error(error);
    }
  };

  const checkEndTime = (endTimestamp) => {
    const currentTime = Date.now(); // Get current time in seconds
    console.log(currentTime,endTimestamp)
    if (currentTime > endTimestamp) {
      setShowWithdrawButton(true);
    }
  };


  const handleWithdraw = async () => {
    try {
      await withdraw(orderId);
      // Optionally refetch order details or update state to reflect the withdrawal
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) {
    return (
      <Box className={styles.container}>
        <Typography variant="h6">Loading order details...</Typography>
      </Box>
    );
  }

  return (
    <Suspense>
    <Box className={styles.container}>
      <Box className={styles.details}>
        <Typography >Amount: {order.amount} USDT</Typography>
        <Typography >Start Time: {new Date(order.startTime * 1000).toLocaleString()}</Typography>
        <Typography >End Time: {endTime}</Typography>
        <Typography >Period: {order.period / (24 * 60 * 60)} days</Typography>
        <Typography >Interest: {interest} USDT</Typography>
        <Typography>Completed: {order.completed ? 'Yes' : 'No'}</Typography>
      </Box>
      {!order.completed && showWithdrawButton && (
        <Button className={styles.withdrawButton} onClick={handleWithdraw}>
          Withdraw & claim
        </Button>
      )}
    </Box>
    </Suspense>
  );
}
