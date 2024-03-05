// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PFSwap {
  address public poxAddress;
  address public owner;

  uint public ethPool;
  mapping (address => uint) public poxPool;

  event Swap(address indexed user, address indexed tokenFrom, address indexed tokenTo, uint amount);
  event Withdraw(address indexed user, address indexed token, uint amount);

  constructor(address _poxAddress) {
    poxAddress = _poxAddress;
    owner = msg.sender;
  }

  function depositETH() external payable {
    require(msg.value > 0, "Send something bro :-");
    ethPool += msg.value;
  }

  function depositPOX(uint _amount) external {
    require(_amount > 0, "Amount must be greater than 0!");
    require(IERC20(poxAddress).balanceOf(msg.sender) >= _amount, "Insufficient balance!");

    IERC20(poxAddress).transferFrom(msg.sender, address(this), _amount);
    poxPool[poxAddress] += _amount;
  }

  function swapETHtoPOX() external payable {
    require(msg.value > 0, "Send ETH with the same amount as the swap amount");
    require(ethPool >= msg.value, "Not enough in the Pool :)");
    require(poxPool[poxAddress] > 0, "Sorry No POX pool :/");

    uint amountToReceive = (msg.value * poxPool[poxAddress] / ethPool);

    IERC20(poxAddress).transfer(msg.sender, amountToReceive);

    ethPool += msg.value;
    poxPool[poxAddress] -= amountToReceive;
    
    emit Swap(msg.sender, address(0), poxAddress, msg.value);
  }

  function swapPOXtoETH(uint _amount) external {
    require(_amount > 0, "Amount must be greater than 0!");
    require(poxPool[poxAddress] >= _amount, "Not enough in the pool :))");
    require(ethPool > 0, "Sorry No ETH Pool :/");

    uint amountToReceive = (_amount * ethPool / poxPool[poxAddress]);

    IERC20(poxAddress).transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(amountToReceive);

    poxPool[poxAddress] += _amount;
    ethPool -= amountToReceive;

    emit Swap(msg.sender, poxAddress, address(0), _amount);
  }

 function withdrawETH(uint _amount) external {
    require(msg.sender == owner, "Not Owner :0");
    require(ethPool >= _amount, "Insufficient ETH balance");

    ethPool -= _amount;
    payable(owner).transfer(_amount);

    emit Withdraw(msg.sender, address(0), _amount);
  }

  function withdrawPOX(uint _amount) external {
    require(msg.sender == owner, "Not Owner :0");
    require(poxPool[poxAddress] >= _amount, "Insufficient POX balance");

    poxPool[poxAddress] -= _amount;
    IERC20(poxAddress).transfer(owner, _amount);

    emit Withdraw(msg.sender, poxAddress, _amount);
  }
}
