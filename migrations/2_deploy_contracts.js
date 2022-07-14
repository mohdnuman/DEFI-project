const masterContract = artifacts.require("../contracts/masterContract.sol");

module.exports = async function (deployer) {
  await deployer.deploy(
    masterContract,
    "0x8167d92ac36a1332a078fc0f32eaf1281a3ab80c",
    "0xc449d51da0be9d7e0a5745072749d935601e7658",
    "0x41588196aa767d5a6811d56b54a85558472f45d8",
    "0xb7e355b2c61d3e4f9d0ffcf0bc863aeefdf8f8de"
  );
};
