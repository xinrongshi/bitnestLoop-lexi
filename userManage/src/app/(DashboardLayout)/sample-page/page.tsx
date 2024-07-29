"use client";
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Container,
  Paper,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { jwtDecode } from "jwt-decode";
interface Downline {
  wallet_address: string;
  referred_wallet_address: string;
  referrer_wallet_address: string;
  level: number;
}



const AdminDetailPage: React.FC = () => {
  const [shareLink, setShareLink] = useState<string>('');
  const [downline, setDownline] = useState<Downline[]>([]);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const decoded: any = jwtDecode(token);
    const username =decoded.username;
    const link = `${process.env.NEXT_PUBLIC_FRONTEND_URL}?referrer=${username}`;
    setShareLink(link);
    // 从数据库获取多级被推荐人信息
    fetch(`/api/downline/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setDownline(data);
      });
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('链接已复制到剪贴板');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <ListIcon color="primary" sx={{ marginRight: 1 }} />
          <Typography variant="h4" component="h1">
            推荐信息
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        <Box display="flex" alignItems="center" mb={2}>
          <ShareIcon color="primary" sx={{ marginRight: 1 }} />
          <Typography variant="body1" gutterBottom>
            分享链接: <Link href={shareLink}>{shareLink}</Link>
          </Typography>
          <Tooltip title="复制链接">
            <IconButton onClick={handleCopyLink} color="primary" sx={{ marginLeft: 1 }}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        {downline.length === 0 ? (
          <Box display="flex" alignItems="center" mb={2}>
            <PersonIcon color="primary" sx={{ marginRight: 1 }} />
            <Typography variant="body1">暂无被推荐人</Typography>
          </Box>
        ) : (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <PersonIcon color="primary" sx={{ marginRight: 1 }} />
              <Typography variant="body1" gutterBottom>
                被推荐人列表:
              </Typography>
            </Box>
            <List>
              {downline.map((referral) => (
                <ListItem key={referral.wallet_address}>
                  <ListItemText
                    primary={`${referral.referred_wallet_address} - 推荐人: ${referral.referrer_wallet_address}`}
                    secondary={`级别: ${referral.level}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDetailPage;
