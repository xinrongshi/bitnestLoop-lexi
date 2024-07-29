const MockUSDT = artifacts.require("MockUSDT");
const SavingPlatform = artifacts.require("SavingPlatform");

module.exports = async function(deployer, network, accounts) {
  const owner = accounts[0];

  try {
    console.log("Deploying MockUSDT contract...");
    console.log("network",network)
    await deployer.deploy(MockUSDT);
    const usdtToken = await MockUSDT.deployed();
    console.log("MockUSDT deployed at:", usdtToken.address);

    console.log("Deploying SavingPlatform contract...");
    await deployer.deploy(SavingPlatform, usdtToken.address, owner);
    const savingPlatform = await SavingPlatform.deployed();
    console.log("SavingPlatform deployed at:", savingPlatform.address);
  } catch (error) {
    console.error("Deployment failed:", error.message);
  }
};
