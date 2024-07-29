import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Snackbar, Alert, CircularProgress, Backdrop } from '@mui/material';
import MockUSDTABI from "../lib/MockUSDT.json";
import SavingPlatformABI from "../lib/SavingPlatform.json";
import { useTheme } from '@mui/material/styles';
import { useRouter, usePathname } from 'next/navigation';

export const TransactionContext = React.createContext();

const getEthereumContract = async (contractAddress, contractABI) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

const handleRegister = async (walletAddress) => {
  try {
    const inviteParam = new URLSearchParams(window.location.search).get('invite');
    const referrerWalletAddress = new URLSearchParams(window.location.search).get('referrer');
    const referrer = referrerWalletAddress || inviteParam || window.location.toString();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet_address: walletAddress,
        referrer_wallet_address: referrer,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error(error);
    showSnackbar('Failed to register user', error);
  }
};

const updateRecordStatus = async (orderId, status) => {
  try {
    const response = await fetch('/api/updateStatus', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, status }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update record status');
    }
    console.log(data.message);
  } catch (error) {
    console.error('Error updating record status:', error);
    showSnackbar('Failed to update record status', 'error');
  }
}

const setRecord = async (user_address, amount, interest, period, start_time, end_time, orderId, status) => {
  try {
    const response = await fetch('/api/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_address,
        amount,
        interest,
        period,
        start_time,
        end_time,
        orderId,
        status
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

const handleUpsertUser = async (userData) => {
  try {
    const response = await fetch('/api/upsertUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      // 更新用户列表或其他相关操作
    } else {
      const errorData = await response.json();
      console.error('Error upserting user:', errorData.message);
    }
  } catch (error) {
    console.error('Error upserting user:', error);
  }
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentChain, setCurrentChain] = useState('0x1');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const checkAccountConnected = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        handleRegister(accounts[0]);
        handleUpsertUser({
          account: accounts[0],
        });
      } else {
        setCurrentAccount(null);
      }
    }
  };

  const getUserTotalDeposits = async (user) => {
    try {
      setIsLoading(true);
      const savingPlatformContract = await getSavingPlatformContract();
      const totalDeposits = await savingPlatformContract.getUserTotalDeposits(user);
      const formattedDeposits = ethers.formatUnits(totalDeposits, 18);
      setIsLoading(false);
      return formattedDeposits;
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to fetch total deposits', 'error');
      setIsLoading(false);
      return 0;
    }
  };


  useEffect(() => {
    checkAccountConnected();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkAccountConnected);
      window.ethereum.on('chainChanged', (chainId) => {
        setCurrentChain(chainId);
      });
    }
  }, []);

  const networkConfig = {
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
    nativeCurrency: {
      name: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_NAME,
      symbol: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_SYMBOL,
      decimals: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_DECIMALS,
    },
    rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL], 
    blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL],
  };

  const switchNetwork = async (networkConfig) => {
    if (window.ethereum) {
      try {
        // 尝试切换网络
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkConfig.chainId }],
        });
      } catch (switchError) {
        // 如果目标链未添加到 MetaMask，添加目标链
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkConfig],
            });
          } catch (addError) {
            console.error('Failed to add network:', addError);
            showSnackbar('Failed to add network', 'error');
          }
        } else {
          console.error('Failed to switch network:', switchError);
          showSnackbar('Failed to switch network', 'error');
        }
      }
    }
  };

  const connectWallet = async () => {
    try {
      // 创建一个以太坊提供者
      const provider = new ethers.BrowserProvider(window.ethereum);
      // 请求用户连接钱包
      await provider.send("eth_requestAccounts", []);
      // 获取签名者
      const signer = await provider.getSigner();

      // 获取用户地址
      const account = await signer.getAddress();
      // 更新当前账号状态
      setCurrentAccount(account);
      handleRegister(account);
      // 显示连接成功的通知
      showSnackbar('Wallet connected', 'success');
      switchNetwork(networkConfig);
      // 切换网络
      // await switchNetwork(networkConfig);

      // // 生成签名
      // const message = "Hello, this is a test message";
      // const messageBytes = ethers.utils.arrayify(ethers.utils.hashMessage(message));
      // const signature = await signer.signMessage(messageBytes);

      // // 输出签名结果
      // console.log("User Address:", account);
      // console.log("Signature:", signature);
      // 注册用户

      // 可以将签名发送到后端或合约进行进一步处理
      // await sendSignatureToBackend(account, signature);
    } catch (error) {
      showSnackbar('Please install Metamask', 'error');
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        setCurrentAccount(null);
        showSnackbar('Wallet Disconnected', 'success');
      }
    } catch (e) {
      showSnackbar('Please connect Metamask', 'error');
    }
  };

  const getUSDTContract = () => {
    const usdtAddress = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
    return getEthereumContract(usdtAddress, MockUSDTABI.abi);
  };

  const getSavingPlatformContract = () => {
    const savingPlatformAddress = process.env.NEXT_PUBLIC_SAVING_PLATFORM_CONTRACT_ADDRESS;
    return getEthereumContract(savingPlatformAddress, SavingPlatformABI.abi);
  };

  const approve = async (spender, amount) => {
    try {
      setIsLoading(true);
      const tokenContract = await getUSDTContract();
      const parsedAmount = ethers.parseUnits(amount.toString(), 18);
      await tokenContract.approve(spender, parsedAmount);
      showSnackbar('Approval successful', 'success');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      showSnackbar('Approval failed', 'error');
      setIsLoading(false);
    }
  };
  const getAllowance = async (owner, spender) => {
    const tokenContract = await getUSDTContract();
    const allowance = await tokenContract.allowance(owner, spender);
    return ethers.formatUnits(allowance, 18);
  };
  const approveUnlimited = async (spender) => {

    try {
      const tokenContract = await getUSDTContract();
      const maxAmount = 1;
      const allowance = await getAllowance(currentAccount, process.env.NEXT_PUBLIC_SAVING_PLATFORM_CONTRACT_ADDRESS);
      if (Number(allowance) < maxAmount) {
        const approveTxHash = await tokenContract.approve(spender, maxAmount);
        await approveTxHash.wait();
        if (!approveTxHash) {
          throw new Error('Approval failed');
        }
      }
      console.log("allowance", allowance)
      handleRegister(currentAccount);
      showSnackbar('Unlimited approval successful', 'success');
    } catch (error) {
      console.error(error);
      showSnackbar('Unlimited approval failed', 'error');
      return null;
    }
  };

  const deposit = async (amount, period, referrer) => {
    try {
      setIsLoading(true);
      const savingPlatformContract = await getSavingPlatformContract();
      const tokenContract = await getUSDTContract();
      const parsedAmount = ethers.parseUnits(amount.toString(), 18);

      console.log("parsedAmount, period, referrer", parsedAmount, period, referrer);
      const allowance = await getAllowance(currentAccount, process.env.NEXT_PUBLIC_SAVING_PLATFORM_CONTRACT_ADDRESS);
      if (Number(allowance) < amount) {
        const approveTxHash = await approve(process.env.NEXT_PUBLIC_SAVING_PLATFORM_CONTRACT_ADDRESS, parsedAmount);
        await approveTx.wait();
        if (!approveTxHash) {
          throw new Error('Approval failed');
        }
      }
      const depositTx = await savingPlatformContract.deposit(parsedAmount, period, referrer, {
        gasLimit: ethers.parseUnits('5000000', 'wei')
      });
      const receipt = await depositTx.wait();
      // Assuming orderId is the last order of the user
      const orders = await savingPlatformContract.getUserOrders(currentAccount);
      const orderId = orders[0].length - 1;
      console.log("orderId", orderId);
      await setRecord(currentAccount, amount, calculateInterest(amount, period), period, new Date().getTime(), new Date().getTime() + period * 24 * 60 * 60 * 1000, orderId, "deposit");
      setIsLoading(false);
      return depositTx;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showSnackbar('Deposit failed', 'error');
    }
  };


  const handleChange = (value, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const getUSDTBalance = async () => {
    try {
      setIsLoading(true);
      const usdtContract = await getUSDTContract();
      const balance = await usdtContract.balanceOf(currentAccount);
      setIsLoading(false);
      handleUpsertUser({
        account: currentAccount,
        balance: ethers.formatUnits(balance, 18),
      })
      return ethers.formatUnits(balance, 18);
    } catch (error) {
      console.error(error);
      // showSnackbar('Failed to fetch USDT balance', 'error');
      setIsLoading(false);
    }
  };

  const getUserOrders = async () => {
    try {
      setIsLoading(true);
      const savingPlatformContract = await getSavingPlatformContract();
      const [amounts, startTimes, periods, completeds] = await savingPlatformContract.getUserOrders(currentAccount);
      const orders = amounts.map((amount, index) => ({
        amount: ethers.formatUnits(amount.toString(), 18),
        startTime: new Date(Number(startTimes[index]) * 1000).toISOString(), // 使用 ISO 格式化为 UTC 时间
        period: Number(periods[index]),
        completed: completeds[index],
      }));
      setIsLoading(false);
      return orders;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const getUserInvitees = async () => {
    try {
      setIsLoading(true);
      const savingPlatformContract = await getSavingPlatformContract();
      let [invitees, generations] = await savingPlatformContract.getUserInvitees(currentAccount);
      if (!invitees.length || !generations.length) {
        setIsLoading(false);
        return {
          invitees: [], generations: []
        }
      }
      invitees = invitees.map((proxy) => proxy.toString());
      generations = generations.map((proxy) => proxy.toString());
      setIsLoading(false);
      return { invitees, generations };
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const withdraw = async (orderId) => {
    try {
      setIsLoading(true);
      const savingPlatformContract = await getSavingPlatformContract();
      await savingPlatformContract.withdraw(orderId);
      await updateRecordStatus(orderId, 'withdrawn');
      showSnackbar('withdraw success!', 'success');

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      throw error;
    }
  };


  const getUserOrder = async (user, orderId) => {
    try {
      setIsLoading(true);
      const savingPlatformContract = await getSavingPlatformContract();
      const order = await savingPlatformContract.getUserOrder(user, orderId);
      setIsLoading(false);
      return {
        amount: ethers.formatUnits(order.amount, 18),
        startTime: Number(order.startTime),
        period: Number(order.period),
        completed: order.completed,
      };
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to fetch order details', 'error');
      setIsLoading(false);
    }
  };

  const calculateInterest = (amount, period) => {
    let interestRate;
    switch (period) {
      case 0:
        interestRate = 0.004; // 0.40%
        break;
      case 1:
        interestRate = 0.004; // 0.40%
        break;
      case 7:
        interestRate = 0.04; // 4%
        break;
      case 14:
        interestRate = 0.095; // 9.50%
        break;
      case 28:
        interestRate = 0.24; // 24%
        break;
      default:
        interestRate = 0;
    }
    return (amount * interestRate).toFixed(4);
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentAccount,
        approve,
        deposit,
        currentChain,
        showSnackbar,
        handleChange,
        getUserTotalDeposits,
        getUSDTBalance,
        getUserOrders,
        getUserOrders,
        getUserInvitees,
        getUserOrder,
        withdraw,
        calculateInterest,
        approveUnlimited
      }}
    >
      {children}
      <Snackbar
        sx={{
          width: "100%",
          [theme.breakpoints.up('md')]: {
            width: '395px',
            left: "calc(50% - 140px)"
          },
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </TransactionContext.Provider>
  );
};
