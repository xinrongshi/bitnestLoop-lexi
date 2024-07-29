import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WeeklyWithdrawals = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  const [thisWeekTotal, setThisWeekTotal] = useState(0);
  const [lastWeekTotal, setLastWeekTotal] = useState(0);
  const [percentageChange, setPercentageChange] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch('/api/records/getWeeklyWithdrawals');
        const data = await response.json();

        const thisWeek = data.thisWeekTotal;
        const lastWeek = data.lastWeekTotal;

        setThisWeekTotal(thisWeek);
        setLastWeekTotal(lastWeek);

        const change = lastWeek === 0 ? 0 : ((thisWeek - lastWeek) / lastWeek) * 100;
        setPercentageChange(change.toFixed(2));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weekly withdrawals:', error);
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  const options:any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const series = [
    {
      name: '',
      color: secondary,
      data: [thisWeekTotal, lastWeekTotal],
    },
  ];

  return (
    <DashboardCard
      title="提取变化"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={options} series={series} type="area" height={60} width={"100%"} />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {loading ? 'Loading...' : `$${thisWeekTotal}`}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {percentageChange}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {loading ? 'Loading...' : '本周 vs 上周'}
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default WeeklyWithdrawals;
