const usdc = artifacts.require("../contracts/usdc.sol");
const assert = require("assert");

contract("USDC", function (accounts) {
  it("sets totalSupply on deployment", async () => {
    const instance = await usdc.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), "1000");
  });

  it("it allocates the initial supply to the admin account", async () => {
    const instance = await usdc.deployed();
    const adminBalance = await instance.balanceOf(accounts[0]);
    assert.equal(adminBalance.toNumber(), "1000");
  });

  it("it sets the name and symbol correctly", async () => {
    const instance = await usdc.deployed();
    const name = await instance.name();
    const symbol = await instance.symbol();
    assert.equal(name, "USD coin");
    assert.equal(symbol, "USDC");
  });
});
