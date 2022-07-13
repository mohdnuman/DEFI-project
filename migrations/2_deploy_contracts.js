const usdt = artifacts.require("../contracts/usdt.sol");
const usdc = artifacts.require("../contracts/usdc.sol");
const dai = artifacts.require("../contracts/dai.sol");
const masterContract = artifacts.require("../contracts/masterContract.sol");

module.exports = async function (deployer) {
  await deployer.deploy(usdt, 1000);
  await deployer.deploy(usdc, 1000);
  await deployer.deploy(dai, 1000);
  await deployer.deploy(
    masterContract,
    0x544da813111b666026c17c3d61a7e44bd196a53d,
    0xd41d46272a6e92ecd179cd6c31178daac780163a,
    0x36e1f337f0a641c218640b5d41489cb0bc14c62b,
    0x43dd7514c9ba6ca9305ec973832e2c2c61346db7
  );
};
