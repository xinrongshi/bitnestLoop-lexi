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
  DialogTitle,
  Button,
  IconButton,
  Tooltip,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Referral {
  id: number;
  referrer_wallet_address: string;
  wallet_address: string;
  created_at: string;
}

const ReferralsPage: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [currentReferral, setCurrentReferral] = useState<Partial<Referral>>({});

  const fetchReferrals = async () => {
    const response = await fetch('/api/referrals/getReferrals');
    const data = await response.json();
    setReferrals(data.referrals);
    setLoading(false);
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentReferral(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditReferral = async () => {
    try {
      const response = await fetch('/api/referrals/updateReferral', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentReferral)
      });

      if (response.ok) {
        fetchReferrals();
        setEditDialogOpen(false);
      } else {
        alert('Error updating referral');
      }
    } catch (error) {
      alert('Error updating referral');
    }
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentReferral({});
  };

  const openEditDialog = (referral: Referral) => {
    setCurrentReferral({
      ...referral,
      created_at: new Date(referral.created_at).toISOString().slice(0, -1)
    });
    setEditDialogOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1">
            邀请记录
          </Typography>
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
                  <TableCell>邀请人</TableCell>
                  <TableCell>被邀请人</TableCell>
                  <TableCell>邀请时间</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referrals.map(referral => (
                  <TableRow key={referral.id}>
                    <TableCell>{referral.referrer_wallet_address}</TableCell>
                    <TableCell>{referral.wallet_address}</TableCell>
                    <TableCell>{new Date(referral.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Tooltip title="编辑邀请记录">
                        <IconButton onClick={() => openEditDialog(referral)} color="primary" size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>编辑邀请记录</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="邀请人"
            name="referrer_wallet_address"
            fullWidth
            value={currentReferral.referrer_wallet_address || ''}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="被邀请人"
            name="wallet_address"
            fullWidth
            value={currentReferral.wallet_address || ''}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="邀请时间"
            name="created_at"
            fullWidth
            type="datetime-local"
            value={currentReferral.created_at || ''}
            onChange={handleEditInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            取消
          </Button>
          <Button onClick={handleEditReferral} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReferralsPage;
