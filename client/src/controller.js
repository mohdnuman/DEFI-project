import React, { Component } from 'react';

class controller extends Component {
    constructor(props){
        super(props);
        this.state={
            usdt:"",
            usdc:"",
            dai:""
        }
    }
    render() {
        return (
            <div>
                {this.props.token}
            </div>
        );
    }
}

export default controller;