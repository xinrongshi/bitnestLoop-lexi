"use client";
import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Grid
} from '@mui/material';

const StatisticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState({
    totalDepositAmount: 0,
    totalWithdrawalAmount: 0,
    totalRetention: 0,
    activeInvestmentCount: 0,
    todayDepositAmount: 0,
    todayWithdrawalAmount: 0,
    todayNewOrderAmount: 0,
    todayNewOrderCount: 0,
    tomorrowWithdrawableAmount: 0,
    currentCycleWithdrawalAmount: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStatistics = async () => {
    const response = await fetch('/api/records/getStatistics');
    const data = await response.json();
    setStatistics(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          统计数据
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">总充值金额</Typography>
                <Typography variant="body1">{statistics.totalDepositAmount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">总提现金额</Typography>
                <Typography variant="body1">{statistics.totalWithdrawalAmount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">总留存</Typography>
                <Typography variant="body1">{statistics.totalRetention}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">正在参与数量</Typography>
                <Typography variant="body1">{statistics.activeInvestmentCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">当日入金</Typography>
                <Typography variant="body1">{statistics.todayDepositAmount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">当日提现</Typography>
                <Typography variant="body1">{statistics.todayWithdrawalAmount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">今日新单（金额）</Typography>
                <Typography variant="body1">{statistics.todayNewOrderAmount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">今日新单（数量）</Typography>
                <Typography variant="body1">{statistics.todayNewOrderCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">明日出金</Typography>
                <Typography variant="body1">{statistics.tomorrowWithdrawableAmount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">本周期出金</Typography>
                <Typography variant="body1">{statistics.currentCycleWithdrawalAmount}</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default StatisticsPage;
