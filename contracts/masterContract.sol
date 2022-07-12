// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface token {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from,address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external returns (uint256);
}

contract masterContract{
    using SafeMath for uint;

    mapping(address=>uint256) public getUserDeposit;
    mapping(address=>uint256) public getUserCredit;
    mapping(address=>uint256) public getUserCreditScore;
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

    constructor(address _vault,address token0,address token1,address token2){
        getInterestVault=_vault;
        isTokenSupported[token0]=true;
        isTokenSupported[token1]=true;
        isTokenSupported[token2]=true;
    }


    function deposit(address _token, uint256 _amount) public returns (bool success){
        require(isTokenSupported[_token]==true);
        require(token(_token).balanceOf(msg.sender)>=_amount);
        require(token(_token).transferFrom(msg.sender, address(this), _amount));
        getUserDeposit[msg.sender]=getUserDeposit[msg.sender]+_amount;

        uint score= SafeMath.div(getUserDeposit[msg.sender],2);
        getUserCreditScore[msg.sender]=score;

        emit Deposit(msg.sender,_token,_amount);

        return true;
    }

    function borrow(address _token, uint256 _amount) public returns (bool success){
        require(isTokenSupported[_token]==true);
        require(token(_token).balanceOf(address(this))>= _amount);
        require(getUserCreditScore[msg.sender]>=_amount);
        require(token(_token).transfer(msg.sender, _amount));

        getUserCredit[msg.sender]=getUserCredit[msg.sender]+_amount;
        getUserCreditScore[msg.sender]=getUserCreditScore[msg.sender]-_amount;
        
        emit Borrow(msg.sender,_token,_amount);

        return true;
    }
}