// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {
    constructor() ERC20("Mock USDT", "mUSDT") {
        require(bytes(name()).length > 0, "Name must be set");
        require(bytes(symbol()).length > 0, "Symbol must be set");
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals()))); // 初始发行100万mUSDT，按照USDT的精度
    }

   
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
