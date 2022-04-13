pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

    constructor() ERC20("MyToken","MTK") Ownable(){}

    function mint(address beneficiary,uint amount) external {
        _mint(beneficiary,amount);
    }

     function totalSupply() public pure  override returns (uint256) {
        return 100 *100*6;
    }
}