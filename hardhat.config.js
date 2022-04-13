require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
// require("@nomiclabs/hardhat-etherscan");
require("./scripts/deploy.js");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
};
