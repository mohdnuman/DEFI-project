import React, { Component } from "react";
import Deposit from "./deposit";


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
              {this.state.activeBlock === "withdraw" &&  <div>withdraw {this.props.token}</div> }
              {this.state.activeBlock === "repay" &&  <div>repay {this.props.token}</div>}
              {this.state.activeBlock === "borrow" &&  <div>borrow {this.props.token}</div>}

            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default controller;
