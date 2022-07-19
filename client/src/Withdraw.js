import React, { Component } from "react";
import usdt from "./contracts/usdt";
import usdc from "./contracts/usdc";
import dai from "./contracts/dai";
import master from "./contracts/masterContract";
import web3 from "./web3";

class withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenBalance: "",
      currentToken: "",
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (this.props.token == "USDT") {
      let usdtBal = await usdt.methods.balanceOf(accounts[0]).call();
      let usdtSup = await master.methods
        .getUserDeposit(
          accounts[0],
          "0xc449d51DA0bE9D7e0a5745072749D935601e7658"
        )
        .call();
      let usdtBor = await master.methods
        .getUserCredit(
          accounts[0],
          "0xc449d51DA0bE9D7e0a5745072749D935601e7658"
        )
        .call();
      this.setState({
        tokenBalance: usdtBal,
        tokenSupplied: usdtSup,
        tokenBorrowed: usdtBor,
        currentToken: "0xc449d51DA0bE9D7e0a5745072749D935601e7658",
      });
    } else if (this.props.token == "USDC") {
      let usdcBal = await usdc.methods.balanceOf(accounts[0]).call();
      let usdcSup = await master.methods
        .getUserDeposit(
          accounts[0],
          "0x41588196Aa767D5A6811D56B54A85558472F45D8"
        )
        .call();
      let usdcBor = await master.methods
        .getUserCredit(
          accounts[0],
          "0x41588196Aa767D5A6811D56B54A85558472F45D8"
        )
        .call();
      this.setState({
        tokenBalance: usdcBal,
        tokenInstance: usdc,
        tokenSupplied: usdcSup,
        tokenBorrowed: usdcBor,
        currentToken: "0x41588196Aa767D5A6811D56B54A85558472F45D8",
      });
    } else if (this.props.token == "DAI") {
      let daiBal = await dai.methods.balanceOf(accounts[0]).call();
      let daiSup = await master.methods
        .getUserDeposit(
          accounts[0],
          "0xb7E355b2c61d3e4F9D0ffcf0bC863aEefDF8F8DE"
        )
        .call();
      let daiBor = await master.methods
        .getUserCredit(
          accounts[0],
          "0xb7E355b2c61d3e4F9D0ffcf0bC863aEefDF8F8DE"
        )
        .call();
      this.setState({
        tokenBalance: daiBal,
        tokenInstance: dai,
        tokenSupplied: daiSup,
        tokenBorrowed: daiBor,
        currentToken: "0xb7E355b2c61d3e4F9D0ffcf0bC863aEefDF8F8DE",
      });
    }
  }

 

  handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    if (this.props.token === "USDT") {
      let witTRX = await master.methods
        .withdraw(this.state.currentToken)
        .send({ from: accounts[0] });
    } else if (this.props.token === "USDC") {
      let witTRX = await master.methods
        .withdraw(this.state.currentToken)
        .send({ from: accounts[0] });
    } else if (this.props.token === "DAI") {
      let witTRX = await master.methods
        .withdraw(this.state.currentToken)
        .send({ from: accounts[0] });
    }
  };

  render() {
    return (
      <div>
        {this.props.token} Supplied:{this.state.tokenSupplied}
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Withdraw</button>
        </form>
      </div>
    );
  }
}

export default withdraw;
