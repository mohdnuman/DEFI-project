import React, { Component } from 'react';
import Controller from "./controller";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      activeBlock:"USDT",
    };
  }
   
  setCurrentBlockToUSDT=()=>{
    this.setState({
      activeBlock:"USDT"
    });
  }
  
  setCurrentBlockToUSDC=()=>{
    this.setState({
      activeBlock:"USDC"
    });
  }

  setCurrentBlockToDAI=()=>{
    this.setState({
      activeBlock:"DAI"
    });
  }

  render() {
    return (
      <div>
        <nav>
          <p id="logo">Nebula Finance</p>
        </nav>
        <table className='middle-banner'>
          <tr>
            <th onClick={this.setCurrentBlockToUSDT}>
              USDT
            </th>
            <th onClick={this.setCurrentBlockToUSDC}>
              USDC
            </th>
            <th onClick={this.setCurrentBlockToDAI}>
              DAI
            </th>
          </tr>
          <tr>
            <td colSpan={3} className='controller-box'>
            {this.state.activeBlock==="USDT" && <Controller token="USDT"/>}
            {this.state.activeBlock==="USDC" && <Controller token="USDC"/>}
            {this.state.activeBlock==="DAI" && <Controller token="DAI"/>}
            </td>
          </tr>
        </table>

      </div>
    );
  }
}

export default App;