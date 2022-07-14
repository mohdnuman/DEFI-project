import React, { Component } from "react";
import usdt from "./contracts/usdt";
import usdc from "./contracts/usdc";
import dai from "./contracts/dai";
import web3 from './web3';


class deposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenBalance: "",
      currentToken: "",
    };
  }

  async componentDidMount() {
    console.log(this.props.token)
    const accounts = await web3.eth.getAccounts();
    if (this.props.token == "USDT") {
      let usdtBal = await usdt.methods.balanceOf(accounts[0]).call();
      this.setState({
        tokenBalance: usdtBal,
        currentToken: "0xc449d51DA0bE9D7e0a5745072749D935601e7658",
      });
    } else if (this.props.token == "USDC") {
      let usdcBal = await usdc.methods.balanceOf(accounts[0]).call();
      this.setState({
        tokenBalance: usdcBal,
        currentToken: "0x41588196Aa767D5A6811D56B54A85558472F45D8",
      });
    } else if (this.props.token == "DAI") {
      let daiBal = await dai.methods.balanceOf(accounts[0]).call();
      this.setState({
        tokenBalance: daiBal,
        currentToken: "0xb7E355b2c61d3e4F9D0ffcf0bC863aEefDF8F8DE",
      });
    }
  }

  render() {
    return <div>
        {this.props.token} Balance: {this.state.tokenBalance}
    </div>;
  }
}

export default deposit;
