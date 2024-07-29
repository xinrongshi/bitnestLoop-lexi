import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WeekComparison = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  const [thisWeekTotal, setThisWeekTotal] = useState(0);
  const [lastWeekTotal, setLastWeekTotal] = useState(0);
  const [percentageChange, setPercentageChange] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch('/api/records/getWeeklyTransactions');
        const data = await response.json();

        const thisWeek = data.thisWeekTotal;
        const lastWeek = data.lastWeekTotal;

        setThisWeekTotal(thisWeek);
        setLastWeekTotal(lastWeek);

        const change = ((thisWeek - lastWeek) / lastWeek) * 100;
        setPercentageChange(change.toFixed(2));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weekly transactions:', error);
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  const options:any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  const series = [thisWeekTotal, lastWeekTotal];

  return (
    <DashboardCard title="存款变化">
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {loading ? 'Loading...' : `$${thisWeekTotal}`}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {percentageChange}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {loading ? 'Loading...' : '本周 vs 上周'}
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                本周
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                上周
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Chart
            options={options}
            series={series}
            type="donut"
            height={150} width={"100%"}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default WeekComparison;
