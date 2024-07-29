"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";

interface User {
  created_at: string;
  last_accessed_at: string;
  account: string;
  invite_code: string;
  agent_type: string;
  balance: number;
  city: string;
  level_1_count: number;
  level_2_count: number;
  level_3_count: number;
  circulation: number;
  team_total_recharge: number;
  personal_total_recharge: number;
  personal_recharge_count: number;
  total_withdrawal: number;
  notes: string;
}

interface Record {
  id: string;
  user_address: string;
  amount: number;
  interest: number;
  period: number;
  start_time: string;
  end_time: string;
  orderId: string;
  status: string;
}

interface Referral {
  level: number;
  referred_wallet_address: string;
  referrer_wallet_address: string;
}

const SearchUserPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    role: string;
  } | null>(null);
  const [account, setAccount] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<Partial<User>>({});
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [records, setRecords] = useState<Record[]>([]);

  const fetchAdmins = async () => {
    const response = await fetch("/api/getAllUsers/route");
    const data = await response.json();
    setData(data.users);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleReset = () => {
    setAccount("");
  };

  const handleViewDetails = async (user: User) => {
    try {
      const response = await fetch(`/api/getUserInfo/route?account=${user.account}`);
      const result = await response.json();

      if (response.ok) {
        const { user, referrals, records } = result;
        setSelectedUser(user);
        setReferrals(referrals);
        setRecords(records);
        setDialogOpen(true);
      } else {
        console.error("Error fetching user data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditDialogOpen = (user: User) => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditUser({});
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch("/api/updateUser/route", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });

      if (response.ok) {
        fetchAdmins();
        setEditDialogOpen(false);
      } else {
        console.error("Error updating user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <TableContainer component={Paper} sx={{ height: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>账号</TableCell>
                {/* <TableCell>邀请人</TableCell> */}
                <TableCell>代理类型</TableCell>
                <TableCell>余额</TableCell>
                <TableCell>城市</TableCell>
                <TableCell>流通</TableCell>
                <TableCell>备注</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {truncateAddress(row.account)}
                    <IconButton
                      onClick={() => handleViewDetails(row)}
                      size="small"
                    >
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.invite_code}</TableCell>
                  {/* <TableCell>{row.agent_type}</TableCell> */}
                  <TableCell>{row.balance}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.circulation}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewDetails(row)}
                      size="small"
                      style={{ fontSize: "12px" }}
                    >
                      详情
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditDialogOpen(row)}
                      size="small"
                      style={{ fontSize: "12px" }}
                    >
                      编辑
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>用户详情</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>创建时间:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.created_at}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>最近访问时间:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.last_accessed_at}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>一级数量:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.level_1_count}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>二级数量:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.level_2_count}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>三级数量:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.level_3_count}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>团队总充值:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.team_total_recharge}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>个人总充值:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.personal_total_recharge}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>个人充值次数:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.personal_recharge_count}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>总提币:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{selectedUser.total_withdrawal}</Typography>
                  </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>编辑用户</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="邀请人"
            name="invite_code"
            fullWidth
            value={editUser.invite_code || ""}
            onChange={handleEditInputChange}
          />
          {/* <TextField
            margin="dense"
            label="代理类型"
            name="agent_type"
            fullWidth
            value={editUser.agent_type || ""}
            onChange={handleEditInputChange}
          /> */}
          <TextField
            margin="dense"
            label="余额"
            name="balance"
            fullWidth
            type="number"
            value={editUser.balance || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="城市"
            name="city"
            fullWidth
            value={editUser.city || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="备注"
            name="notes"
            fullWidth
            value={editUser.notes || ""}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            取消
          </Button>
          <Button onClick={handleEditSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchUserPage;

