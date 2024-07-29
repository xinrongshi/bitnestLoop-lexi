const SavingPlatform = artifacts.require("SavingPlatform");
const MockUSDT = artifacts.require("MockUSDT");
const { advanceTimeAndBlock } = require('./helper');

// contract("SavingPlatform", accounts => {
//   let platform;
//   let usdtToken;
//   const [admin, user1, referrer] = accounts;
//   console.log("user1",user1)
//   console.log("admin",admin)
//   beforeEach(async () => {
//     usdtToken = await MockUSDT.new(); // mock USDT
//     platform = await SavingPlatform.new(usdtToken.address,admin);

//     // give user some amount
//     await usdtToken.transfer(user1, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(platform.address, web3.utils.toWei('1000', 'ether'));
//   });

//   it("should allow users to deposit", async () => {
//     const depositAmount = web3.utils.toWei('100', 'ether');
//     console.log('USDT Balance BEFORE:', (await usdtToken.balanceOf(user1)).toString());
//     await usdtToken.approve(platform.address, depositAmount, { from: user1 });
//     await platform.deposit(depositAmount, 30, referrer, { from: user1 });
//     await platform.balances(user1);
//     console.log('USDT Balance After:', (await usdtToken.balanceOf(user1)).toString());
//     assert.equal(await platform.balances(user1), depositAmount, "Deposit amount should be recorded in the platform");
//   });
// });

// contract("SavingPlatform", accounts => {
//   let platform;
//   let usdtToken;
//   const [admin, user1, referrer] = accounts;

//   beforeEach(async () => {
//     // 部署MockUSDT合约
//     usdtToken = await MockUSDT.new();

//     // 部署SavingPlatform合约，并将合约管理员设置为admin
//     platform = await SavingPlatform.new(usdtToken.address, admin);

//     // 给user1和平台合约转账一些USDT
//     await usdtToken.transfer(user1, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(platform.address, web3.utils.toWei('1000', 'ether'));

//     // 用户user1授权平台合约花费其USDT
//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user1 });
//   });

//   it("should allow users to withdraw after the period has ended", async () => {
//     const amount = web3.utils.toWei('10', 'ether');
//     const period = 1;

//     // 用户存款
//     await platform.deposit(amount, period, referrer, { from: user1 });

//     // 推进时间
//     await advanceTimeAndBlock(period);

//     const initialBalance = await usdtToken.balanceOf(user1);
//     console.log(`Initial Balance of user1: ${initialBalance.toString()}`);

//     // 检查合约余额
//     const contractInitialBalance = await usdtToken.balanceOf(platform.address);
//     console.log(`Initial Balance of contract: ${contractInitialBalance.toString()}`);

//     // 用户提款
//     await platform.withdraw(0, { from: user1, gas: 500000 });

//     const finalBalance = await usdtToken.balanceOf(user1);
//     console.log(`Final Balance of user1: ${finalBalance.toString()}`);

//     // 检查合约余额
//     const contractFinalBalance = await usdtToken.balanceOf(platform.address);
//     console.log(`Final Balance of contract: ${contractFinalBalance.toString()}`);

//     // 获取用户订单详情
//     const orderDetails = await platform.getUserOrder(user1, 0);
//     console.log(`Order Amount: ${orderDetails.amount.toString()}`);
//     console.log(`Order StartTime: ${orderDetails.startTime.toString()}`);
//     console.log(`Order Period: ${orderDetails.period.toString()}`);
//     console.log(`Order Completed: ${orderDetails.completed}`);

//     // 获取推荐人的余额
//     const referrerBalance = await usdtToken.balanceOf(referrer);
//     console.log(`Balance of referrer: ${referrerBalance.toString()}`);

//     // 验证订单完成状态
//     assert(orderDetails.completed, "The order should be marked as completed.");
//     // 验证用户余额增加
//     assert(finalBalance.gt(initialBalance), "The user's balance should increase after withdrawal.");
//     // 验证推荐人获得奖励
//     assert(referrerBalance.gt(0), "The referrer should receive a reward.");
//   });
// });

// contract("SavingPlatform", accounts => {
//   let platform;
//   let usdtToken;
//   const [admin, user1, referrer] = accounts;

//   beforeEach(async () => {
//     // 部署MockUSDT合约
//     usdtToken = await MockUSDT.new();
    
//     // 部署SavingPlatform合约，并将合约管理员设置为admin
//     platform = await SavingPlatform.new(usdtToken.address, admin);

//     // 给user1和平台合约转账一些USDT
//     await usdtToken.transfer(user1, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(platform.address, web3.utils.toWei('1000', 'ether'));

//     // 用户user1授权平台合约花费其USDT
//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user1 });
//   });



//   it("should allow users to withdraw after the period has ended", async () => {
//     const amount = web3.utils.toWei('10', 'ether');
//     const periods = [1, 7 , 14 , 28]; // 1天，7天，14天和28天周期

//     for (let period of periods) {
//       // 每次循环前重新部署合约以重置状态
//       platform = await SavingPlatform.new(usdtToken.address, admin);
//       await usdtToken.transfer(platform.address, web3.utils.toWei('1000', 'ether'));
//       await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user1 });

//       // 用户存款
//       await platform.deposit(amount, period, referrer, { from: user1 });

//       // 推进时间
//       await advanceTimeAndBlock(period);

//       const initialBalance = await usdtToken.balanceOf(user1);
//       console.log(`Initial Balance of user1: ${initialBalance.toString()}`);

//       // 检查合约余额
//       const contractInitialBalance = await usdtToken.balanceOf(platform.address);
//       console.log(`Initial Balance of contract: ${contractInitialBalance.toString()}`);

//       // 用户提款
//       await platform.withdraw(0, { from: user1, gas: 500000 });

//       const finalBalance = await usdtToken.balanceOf(user1);
//       console.log(`Final Balance of user1: ${finalBalance.toString()}`);

//       // 检查合约余额
//       const contractFinalBalance = await usdtToken.balanceOf(platform.address);
//       console.log(`Final Balance of contract: ${contractFinalBalance.toString()}`);

//       // 获取用户订单详情
//       const orderDetails = await platform.getUserOrder(user1, 0);
//       console.log(`Order Amount: ${orderDetails.amount.toString()}`);
//       console.log(`Order StartTime: ${orderDetails.startTime.toString()}`);
//       console.log(`Order Period: ${orderDetails.period.toString()}`);
//       console.log(`Order Completed: ${orderDetails.completed}`);

//       // 获取推荐人的余额
//       const referrerBalance = await usdtToken.balanceOf(referrer);
//       console.log(`Balance of referrer: ${referrerBalance.toString()}`);

//       // 验证订单完成状态
//       assert(orderDetails.completed, "The order should be marked as completed.");
//       // 验证用户余额增加
//       assert(finalBalance.gt(initialBalance), "The user's balance should increase after withdrawal.");
//       // 验证推荐人获得奖励
//       assert(referrerBalance.gt(0), "The referrer should receive a reward.");
//     }
//   });
// });



contract("SavingPlatform", accounts => {
  let platform;
  let usdtToken;
  const [admin, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18] = accounts;

  beforeEach(async () => {
    usdtToken = await MockUSDT.new();
    platform = await SavingPlatform.new(usdtToken.address, admin);

    for (let i = 1; i < accounts.length; i++) {
      await usdtToken.transfer(accounts[i], web3.utils.toWei('10000', 'ether'));
      await usdtToken.approve(platform.address, web3.utils.toWei('10000', 'ether'), { from: accounts[i] });
    }
    await usdtToken.transfer(platform.address, web3.utils.toWei('10000', 'ether'));
  });


  it("should allow users to withdraw after the period has ended and pay correct referral rewards", async () => {
    const amount = web3.utils.toWei('9000', 'ether');
    const period = 1; // 1天周期
    const length = accounts.length
    // // 创建用户链: user1 -> user2 -> user3 -> ... -> user18
    for (let i = 1; i < length; i++) {
      try {
          await platform.deposit(amount, period, accounts[i - 1], { from: accounts[i] });
      } catch (error) {
          console.error(`Error occurred during deposit for account ${i}:`, error);
      }
    }

    await advanceTimeAndBlock(period);

    const initialBalance = await usdtToken.balanceOf(user9);
    console.log(`Initial Balance of lastUser: ${initialBalance.toString()}`);

    // 捕获日志事件
    let events = await platform.getPastEvents('Log', {
      fromBlock: 'latest'
    });

    await platform.withdraw(0, { from: user9, gas: 500000 });

    const finalBalance = await usdtToken.balanceOf(user9);
    const finalBalance2 = await usdtToken.balanceOf(user2);
    console.log(`Final Balance of usdtToken: ${finalBalance.toString()}`);

    // 打印事件日志
    events.forEach(event => {
      console.log(event);
    });

    const orderDetails = await platform.getUserOrder(user9, 0);
    console.log(`Order Amount: ${orderDetails.amount.toString()}`);
    console.log(`Order StartTime: ${orderDetails.startTime.toString()}`);
    console.log(`Order Period: ${orderDetails.period.toString()}`);
    console.log(`Order Completed: ${orderDetails.completed}`);

    // 检查推荐人的余额
    for (let i = 1; i < length; i++) {
      const referrer = accounts[i];
      const referrerBalance = await usdtToken.balanceOf(referrer);
      console.log(`Balance of referrer ${i}: ${referrerBalance.toString()}`);
    }

    assert(orderDetails.completed, "The order should be marked as completed.");
    assert(finalBalance.gt(initialBalance), "The user's balance should increase after withdrawal.");
    assert(finalBalance2.gt(initialBalance), "The user's balance should increase after withdrawal.");
  });
});

// contract("SavingPlatform", accounts => {
//   let platform;
//   let usdtToken;
//   const [admin, user1, user2, referrer] = accounts;

//   beforeEach(async () => {
//     usdtToken = await MockUSDT.new();
//     platform = await SavingPlatform.new(usdtToken.address, admin);

//     // 给user1和平台合约转账一些USDT
//     await usdtToken.transfer(user1, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(platform.address, web3.utils.toWei('1000', 'ether'));

//     // 用户user1授权平台合约花费其USDT
//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user1 });
//   });

//   it("should correctly calculate the total deposits of a user", async () => {
//     const depositAmount1 = web3.utils.toWei('100', 'ether');
//     const depositAmount2 = web3.utils.toWei('200', 'ether');
//     const period = 30;

//     // 用户存款
//     await platform.deposit(depositAmount1, period, referrer, { from: user1 });
//     await platform.deposit(depositAmount2, period, referrer, { from: user1 });

//     // 获取用户总存款
//     const totalDeposits = await platform.getUserTotalDeposits(user1);
//     const expectedTotal = web3.utils.toWei('300', 'ether');

//     console.log('Total Deposits:', totalDeposits.toString());
//     assert.equal(totalDeposits.toString(), expectedTotal, "Total deposits should be 300 USDT");
//   });

//   it("should return 0 if the user has no deposits", async () => {
//     // 获取没有存款的用户的总存款
//     const totalDeposits = await platform.getUserTotalDeposits(user2);
//     const expectedTotal = web3.utils.toWei('0', 'ether');

//     console.log('Total Deposits for user2:', totalDeposits.toString());
//     assert.equal(totalDeposits.toString(), expectedTotal, "Total deposits should be 0 USDT");
//   });
// });



// contract("SavingPlatform", accounts => {
//   let platform;
//   let usdtToken;
//   const [admin, user1, user2, user3, user4] = accounts;

//   beforeEach(async () => {
//     usdtToken = await MockUSDT.new();
//     platform = await SavingPlatform.new(usdtToken.address, admin);

//     await usdtToken.transfer(user1, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(user2, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(user3, web3.utils.toWei('1000', 'ether'));
//     await usdtToken.transfer(user4, web3.utils.toWei('1000', 'ether'));

//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user1 });
//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user2 });
//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user3 });
//     await usdtToken.approve(platform.address, web3.utils.toWei('1000', 'ether'), { from: user4 });
//   });

//   it("should correctly store and retrieve user invitees and their generations", async () => {
//     await platform.deposit(web3.utils.toWei('100', 'ether'), 30, user1, { from: user2 });
//     await platform.deposit(web3.utils.toWei('100', 'ether'), 30, user2, { from: user3 });
//     await platform.deposit(web3.utils.toWei('100', 'ether'), 30, user3, { from: user4 });

//     const result1 = await platform.getUserInvitees(user1);
//     const invitees1 = result1[0];
//     const generations1 = result1[1];
//     assert.equal(invitees1.length, 3, "User1 should have 2 invitees");
    
//     assert.equal(invitees1[0], user2, "User1's invitee should be user2");
//     assert.equal(generations1[0].toNumber(), 1, "User2 should be a first generation invitee of user1");
//     assert.equal(invitees1[1], user3, "User1's invitee should be user3");
//     assert.equal(generations1[1].toNumber(), 2, "User3 should be a second generation invitee of user1");
//     assert.equal(invitees1[2], user4, "User1's invitee should be user3");
//     assert.equal(generations1[2].toNumber(), 3, "User4 should be a third generation invitee of user1");

//     const result2 = await platform.getUserInvitees(user2);
//     const invitees2 = result2[0];
//     const generations2 = result2[1];

//     assert.equal(invitees2.length, 2, "User2 should have 2 invitee");
//     assert.equal(invitees2[0], user3, "User2's invitee should be user3");
//     assert.equal(generations2[0].toNumber(), 1, "User3 should be a first generation invitee of user2");

//     const result3 = await platform.getUserInvitees(user3);
//     const invitees3 = result3[0];
//     const generations3 = result3[1];

//     assert.equal(invitees3.length, 1, "User3 should have 1 invitee");
//     assert.equal(invitees3[0], user4, "User3's invitee should be user4");
//     assert.equal(generations3[0].toNumber(), 1, "User4 should be a first generation invitee of user3");
//   });
// });