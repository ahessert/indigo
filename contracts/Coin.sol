// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface CoinInterface is IERC20 {
    function burnCoins(address, address, uint256) external;
    function mintCoins(address, address, uint64) external;
    function transferCoins(address, address, uint256) external;
    function freeTrial(address _to) external;
}

contract Coin is ERC20, CoinInterface {
    address private _admin = address(0);
    uint64 freeTrialINDG = 200;
    uint64 freeTrialWEI = 10000000000000000; // 0.01 ETH To cover gas fees
    mapping (address => bool) private _freeTrialParticipants;

    constructor() ERC20("Indigo", "INDG") payable {
        _admin = msg.sender;
    }

    receive() external payable {
        payable(msg.sender).transfer(msg.value);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function burnCoins(address _sender, address _from, uint256 _amount) public override {
        require(_sender == _from, "Not token owner. Unauthorized to burn tokens");
        _burn(_from, _amount);
    }

    function mintCoins(address _sender, address _to, uint64 _amount) public override {
        require(_sender == _admin,
                "Unauthorized to mint new coins");
        _mint(_to, _amount);
    }

    function transferCoins(address _sender, address _to, uint256 _amount) public override {
        _transfer(_sender, _to, _amount);
    }
    
    function freeTrial(address _to) public override {
        require(
            _freeTrialParticipants[_to] != true,
            "Address already received free trial AirDrop"
        );
        _mint(_to, freeTrialINDG);
        payable(_to).transfer(freeTrialWEI);
        _freeTrialParticipants[_to] = true;
    }

    function freeTrialBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
