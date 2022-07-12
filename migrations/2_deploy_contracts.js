const usdt = artifacts.require('../contracts/usdt.sol');
const usdc = artifacts.require('../contracts/usdc.sol');
const dai = artifacts.require('../contracts/dai.sol');

module.exports = async function(deployer) {
  await deployer.deploy(usdt,1000);
  await deployer.deploy(usdc,1000);
  await deployer.deploy(dai,1000);
};
