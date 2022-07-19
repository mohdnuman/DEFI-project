import React, { Component } from "react";
import usdt from "./contracts/usdt";
import usdc from "./contracts/usdc";
import dai from "./contracts/dai";
import master from "./contracts/masterContract";
import web3 from "./web3";


class Repay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenBalance: "",
      currentToken: "",
      repAmount:0
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

  handleChange=(e)=>{
    this.setState({
      repAmount:e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    if (this.props.token === "USDT") {
      let approval = await usdt.methods
      .approve(
        "0x0D0ff607F3519A293e03DAB6D8B6560378C53B2A",
        this.state.repAmount
      )
      .send({ from: accounts[0] });
      let repTRX = await master.methods
        .repay(this.state.currentToken,this.state.repAmount)
        .send({ from: accounts[0] });
    } else if (this.props.token === "USDC") {
      let approval = await usdc.methods
      .approve(
        "0x0D0ff607F3519A293e03DAB6D8B6560378C53B2A",
        this.state.repAmount
      )
      let repTRX = await master.methods
      .repay(this.state.currentToken,this.state.repAmount)
        .send({ from: accounts[0] });
    } else if (this.props.token === "DAI") {
      let approval = await dai.methods
      .approve(
        "0x0D0ff607F3519A293e03DAB6D8B6560378C53B2A",
        this.state.repAmount
      )
      let repTRX = await master.methods
      .repay(this.state.currentToken,this.state.repAmount)
        .send({ from: accounts[0] });
    }
  };

  render() {
    return <div>
      Amount of {this.props.token} to repay:{this.state.tokenBorrowed}
      <form onSubmit={this.handleSubmit}>
        <input type="numbers" onChange={this.handleChange}/>
        <button>MAX</button><br/>
        <button type="submit">Repay</button>
      </form>
    </div>;
  }
}

export default Repay;
