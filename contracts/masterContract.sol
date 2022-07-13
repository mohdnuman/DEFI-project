// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface token {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from,address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract masterContract{
    using SafeMath for uint;

    mapping(address=>mapping(address=>uint256)) public getUserDeposit;
    mapping(address=>uint256) public getUserTotalDeposit;
    mapping(address=>mapping(address=>uint256)) public getUserCredit;
    mapping(address=>uint256) public getUserCreditLimit;
    mapping(address=>bool) public isTokenSupported;
    address public getInterestVault;

    event Deposit(
        address indexed _user,
        address indexed _token,
        uint256 _amount
    );

    event Borrow(
        address indexed _user,
        address indexed _token,
        uint256 _amount
    );

    event Repay(
        address indexed _user,
        address indexed _token,
        uint256 _amount
    );

    event Withdraw(
        address indexed _user,
        address indexed _token
    );

    constructor(address _vault,address token0,address token1,address token2){
        getInterestVault=_vault;
        isTokenSupported[token0]=true;
        isTokenSupported[token1]=true;
        isTokenSupported[token2]=true;
    }


    function deposit(address _token, uint256 _amount) public payable returns (bool success){
        require(isTokenSupported[_token]==true);
        require(token(_token).balanceOf(msg.sender)>=_amount);
        require(token(_token).transferFrom(msg.sender, address(this), _amount));

        getUserDeposit[msg.sender][_token]=getUserDeposit[msg.sender][_token]+_amount;
        getUserTotalDeposit[msg.sender]=getUserTotalDeposit[msg.sender]+_amount;

        uint limit= SafeMath.div(getUserTotalDeposit[msg.sender],2);
        getUserCreditLimit[msg.sender]=limit;

        emit Deposit(msg.sender,_token,_amount);

        return true;
    }

    function borrow(address _token, uint256 _amount) public payable returns (bool success){
        require(isTokenSupported[_token]==true);
        require(token(_token).balanceOf(address(this))>= _amount);
        require(getUserCreditLimit[msg.sender]>=_amount);
        require(token(_token).transfer(msg.sender, _amount));

        getUserCredit[msg.sender][_token]=getUserCredit[msg.sender][_token]+_amount;
        getUserCreditLimit[msg.sender]=getUserCreditLimit[msg.sender]-_amount;
        
        emit Borrow(msg.sender,_token,_amount);

        return true;
    }

    function repay(address _token,uint256 _amount) public payable returns (bool success){
        require(isTokenSupported[_token]==true);
        require(getUserCredit[msg.sender][_token] >= _amount);
        require(token(_token).balanceOf(msg.sender) >= _amount);
        require(token(_token).transferFrom(msg.sender,address(this),_amount));

        getUserCredit[msg.sender][_token]=getUserCredit[msg.sender][_token]-_amount;
        getUserCreditLimit[msg.sender]=getUserCreditLimit[msg.sender]+_amount;

        emit Repay(msg.sender,_token,_amount);

        return true;
    }

    function withdraw(address _token) public payable returns (bool success){
        require(isTokenSupported[_token]==true);
        require(getUserCredit[msg.sender][_token]==0);
        require(getUserDeposit[msg.sender][_token] >= 0);
        require(token(_token).transfer(msg.sender, getUserDeposit[msg.sender][_token]));

        getUserTotalDeposit[msg.sender]=getUserTotalDeposit[msg.sender]-getUserDeposit[msg.sender][_token];
        uint limit= SafeMath.div(getUserTotalDeposit[msg.sender],2);
        getUserCreditLimit[msg.sender]=limit;
        getUserDeposit[msg.sender][_token]=0;
        
        emit Withdraw(msg.sender,_token);

        return true; 
    }
    
}