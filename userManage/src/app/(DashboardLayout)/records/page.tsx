"use client";
import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Tooltip,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

interface Record {
  id: number;
  user_address: string;
  salesperson: string;
  amount: number;
  interest: number;
  period: number;
  start_time: string;
  end_time: string;
  orderId: number;
  status: string;
}

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState<boolean>(false);
  const [fullAddress, setFullAddress] = useState<string>('');
  const [newRecord, setNewRecord] = useState<Omit<Record, 'id'>>({
    user_address: '',
    salesperson: '',
    amount: 0,
    interest: 0,
    period: 0,
    start_time: '',
    end_time: '',
    orderId: 0,
    status: ''
  });

  const fetchRecords = async () => {
    const response = await fetch('/api/records/getRecords');
    const data = await response.json();
    setRecords(data.records);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecord(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddRecord = async () => {
    try {
      const response = await fetch('/api/records/addRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
      });

      if (response.ok) {
        fetchRecords();
        setDialogOpen(false);
      } else {
        alert('Error adding record');
      }
    } catch (error) {
      alert('Error adding record');
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewRecord({
      user_address: '',
      salesperson: '',
      amount: 0,
      interest: 0,
      period: 0,
      start_time: '',
      end_time: '',
      orderId: 0,
      status: ''
    });
  };

  const handleAddressDialogClose = () => {
    setAddressDialogOpen(false);
    setFullAddress('');
  };

  const handleViewFullAddress = (address: string) => {
    setFullAddress(address);
    setAddressDialogOpen(true);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1">
            充值记录
          </Typography>
          <Tooltip title="添加记录">
            <IconButton onClick={() => setDialogOpen(true)} color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>用户地址</TableCell>
                  <TableCell>业务员</TableCell>
                  <TableCell>金额</TableCell>
                  <TableCell>利息</TableCell>
                  <TableCell>周期</TableCell>
                  <TableCell>开始时间</TableCell>
                  <TableCell>结束时间</TableCell>
                  <TableCell>订单ID</TableCell>
                  <TableCell>状态</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map(record => (
                  <TableRow key={record.id}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>
                      {truncateAddress(record.user_address)}
                      <Tooltip title="查看完整地址">
                        <IconButton onClick={() => handleViewFullAddress(record.user_address)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{record.salesperson}</TableCell>
                    <TableCell>{record.amount}</TableCell>
                    <TableCell>{record.interest}</TableCell>
                    <TableCell>{record.period}</TableCell>
                    <TableCell>{new Date(record.start_time).toLocaleString()}</TableCell>
                    <TableCell>{new Date(record.end_time).toLocaleString()}</TableCell>
                    <TableCell>{record.orderId}</TableCell>
                    <TableCell>{record.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>添加记录</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="用户地址"
            name="user_address"
            fullWidth
            value={newRecord.user_address}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="业务员"
            name="salesperson"
            fullWidth
            value={newRecord.salesperson}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="金额"
            name="amount"
            fullWidth
            type="number"
            value={newRecord.amount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="利息"
            name="interest"
            fullWidth
            type="number"
            value={newRecord.interest}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="周期"
            name="period"
            fullWidth
            type="number"
            value={newRecord.period}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="开始时间"
            name="start_time"
            fullWidth
            type="datetime-local"
            value={newRecord.start_time}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="结束时间"
            name="end_time"
            fullWidth
            type="datetime-local"
            value={newRecord.end_time}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="订单ID"
            name="orderId"
            fullWidth
            type="number"
            value={newRecord.orderId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="状态"
            name="status"
            fullWidth
            value={newRecord.status}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            取消
          </Button>
          <Button onClick={handleAddRecord} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addressDialogOpen} onClose={handleAddressDialogClose}>
        <DialogTitle>完整用户地址</DialogTitle>
        <DialogContent>
          <DialogContentText>{fullAddress}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddressDialogClose} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecordsPage;
