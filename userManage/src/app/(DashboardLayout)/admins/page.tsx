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
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Admin {
  id: number;
  username: string;
  role: string;
  created_at: string;
  email: string;
}

const AdminListPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);

  const fetchAdmins = async () => {
    const response = await fetch('/api/getAllAdmins/route');
    const data = await response.json();
    data.admins.sort((a: Admin, b: Admin) => a.id - b.id);
    setAdmins(data.admins);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleViewDetails = async (username: string) => {
    try {
      const response = await fetch(`api/downline/${username}`);
      const data = await response.json();
      setDialogContent(data);
      setDialogOpen(true);
    } catch (error) {
      alert('Error fetching details');
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        const response = await fetch('/api/deleteManager/route', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: deleteId })
        });

        if (response.ok) {
          fetchAdmins();
          setDeleteDialogOpen(false);
        } else {
          alert('Error deleting admin');
        }
      } catch (error) {
        alert('Error deleting admin');
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogContent(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const openDeleteDialog = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const openEditDialog = (admin: Admin) => {
    setEditAdmin(admin);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAdmin((prevAdmin) => prevAdmin ? { ...prevAdmin, [name]: value } : null);
  };

  const handleEditSave = async () => {
    if (editAdmin) {
      try {
        const response = await fetch('/api/updateManager/route', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editAdmin)
        });

        if (response.ok) {
          fetchAdmins();
          setEditDialogOpen(false);
        } else {
          alert('Error updating admin');
        }
      } catch (error) {
        alert('Error updating admin');
      }
    }
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditAdmin(null);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          所有管理员
        </Typography>
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
                  <TableCell>Id</TableCell>
                  <TableCell>用户名</TableCell>
                  <TableCell>角色</TableCell>
                  <TableCell>邮箱</TableCell>
                  <TableCell>创建时间</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((admin, index) => (
                  <TableRow key={index}>
                    <TableCell>{admin.id}</TableCell>
                    <TableCell>{admin.username}</TableCell>
                    <TableCell>{admin.role}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{new Date(admin.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Tooltip title="查看详情">
                        <IconButton style={{ fontSize: 12 }} onClick={() => handleViewDetails(admin.username)} color="primary">
                          详情
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="编辑">
                        <IconButton style={{ fontSize: 12 }} onClick={() => openEditDialog(admin)} color="primary">
                          编辑
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="删除">
                        <IconButton style={{ fontSize: 12 }} onClick={() => openDeleteDialog(admin.id)} color="secondary">
                          删除
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

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>详情</DialogTitle>
        <DialogContent>
          {dialogContent && (
            <List>
              {dialogContent.map((item: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`级别: ${item.level}`}
                    secondary={`推荐人地址: ${item.referrer_wallet_address} - 被推荐人地址: ${item.referred_wallet_address}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Box style={{ width: "200px" }}>
            {
              !dialogContent || dialogContent.length === 0 && (
                "暂无数据"
              )
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            你确定要删除这个管理员吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            取消
          </Button>
          <Button onClick={handleDelete} color="secondary">
            删除
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>编辑管理员</DialogTitle>
        <DialogContent>
          {editAdmin && (
            <>
              {/* <TextField
                margin="dense"
                label="用户名"
                name="username"
                fullWidth
                value={editAdmin.username}
                onChange={handleEditChange}
              /> */}
              <TextField
                margin="dense"
                label="角色"
                name="role"
                fullWidth
                value={editAdmin.role}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="邮箱"
                name="email"
                fullWidth
                value={editAdmin.email || ''}
                onChange={handleEditChange}
              />
            </>
          )}
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
    </Container>
  );
};

export default AdminListPage;
