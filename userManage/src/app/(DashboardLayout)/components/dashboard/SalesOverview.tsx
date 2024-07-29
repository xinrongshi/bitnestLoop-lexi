"use client";
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Transaction {
  total_deposits: number;
  total_withdrawals: number;
  date: string;
}

const SalesOverview = () => {
  const [month, setMonth] = React.useState('1');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ deposits: number[], withdrawals: number[], dates: string[] }>({ deposits: [], withdrawals: [], dates: [] });

  const handleChange = (event:any) => {
    setMonth(event.target.value as string);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/records/getDailyTransactions');
        const result = await response.json();

        const deposits = result.transactions.map((t: Transaction) => t.total_deposits);
        const withdrawals = result.transactions.map((t: Transaction) => t.total_withdrawals);
        const dates = result.transactions.map((t: Transaction) => t.date);

        setData({ deposits, withdrawals, dates });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching daily transactions:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: data.dates,
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart: any = [
    {
      name: 'Deposits',
      data: data.deposits,
    },
    {
      name: 'Withdrawals',
      data: data.withdrawals,
    },
  ];

  return (
    <DashboardCard title="入金/出金" action={
      <Select
        labelId="month-dd"
        id="month-dd"
        value={month}
        size="small"
        onChange={handleChange}
      >
        <MenuItem value={1}>Last 7 Days</MenuItem>
      </Select>
    }>
      {loading ? (
        <CircularProgress />
      ) : (
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height={370} width={"100%"}
        />
      )}
    </DashboardCard>
  );
};

export default SalesOverview;
