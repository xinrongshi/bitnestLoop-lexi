async function increaseTime(seconds) {
    return new Promise((resolve, reject) => {
      web3.currentProvider.send({
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [seconds], // 跳跃的时间，以秒为单位
        id: new Date().getTime()
      }, (err, result) => {
        if (err) { return reject(err); }
        web3.currentProvider.send({
          jsonrpc: "2.0",
          method: "evm_mine",
          id: new Date().getTime()
        }, (err, result) => {
          if (err) { return reject(err); }
          resolve(result);
        });
      });
    });
  }

  export default increaseTime
  
  // 示例：跳跃7天（7 * 24 * 60 * 60 秒）
  async function jumpToEndOfPeriod() {
    await increaseTime(7 * 24 * 60 * 60);
    console.log("Time jumped 7 days ahead");
  }
  