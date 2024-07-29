async function advanceTimeAndBlock(time) {
  time = time * 24 * 60 * 60
    await new Promise((resolve, reject) => {
      web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [time],
        id: new Date().getTime()
      }, (err, result) => {
        if (err) { return reject(err); }
        return resolve(result);
      });
    });
    await new Promise((resolve, reject) => {
      web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: new Date().getTime()
      }, (err, result) => {
        if (err) { return reject(err); }
        return resolve(result);
      });
    });
  }
  
  module.exports = {
    advanceTimeAndBlock
  };