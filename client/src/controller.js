import React, { Component } from "react";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Repay from "./Repay";
import Borrow from "./Borrow";


class controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: "deposit"
    };
  }
  

  setCurrentBlockToDeposit = () => {
    this.setState({
      activeBlock: "deposit",
    });
  };

  setCurrentBlockToWithdraw = () => {
    this.setState({
      activeBlock: "withdraw",
    });
  };

  setCurrentBlockToBorrow = () => {
    this.setState({
      activeBlock: "borrow",
    });
  };

  setCurrentBlockToRepay = () => {
    this.setState({
      activeBlock: "repay",
    });
  };
  
  
  
  render() {
    return (
      <div className="inner-block">
        <table>
          <tr>
            <th onClick={this.setCurrentBlockToDeposit}>DEPOSIT</th>
            <th onClick={this.setCurrentBlockToWithdraw}>WITHDRAW</th>
            <th onClick={this.setCurrentBlockToBorrow}>BORROW</th>
            <th onClick={this.setCurrentBlockToRepay}>REPAY</th>
          </tr>
          <tr>
            <td colSpan={4}>
              {this.state.activeBlock === "deposit" && <Deposit token={this.props.token}/>}
              {this.state.activeBlock === "withdraw" &&  <Withdraw token={this.props.token}/> }
              {this.state.activeBlock === "repay" &&  <Repay token={this.props.token}/>}
              {this.state.activeBlock === "borrow" &&  <Borrow token={this.props.token}/>}

            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default controller;
