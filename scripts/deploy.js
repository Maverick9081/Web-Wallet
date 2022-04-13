const { getAccount } = require("./helper");
require("@nomiclabs/hardhat-web3");

// const provider =   ethers.getDefaultProvider("rinkeby",{
//     alchemy : process.env.ALCHEMY_KEY,
// });

// const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY,[ ,provider]);

// task("deployMyToken").setAction(async function(taskArguments,hre){

//     const myTokenContract = await hre.ethers.getContractFactory("MyToken",signer)
//     const myToken = await myTokenContract.deploy();
//     console.log(myToken.address);
// })
task("deployMyToken").setAction(async function(taskArguments,hre) {
    const myTokenContract = await hre.ethers.getContractFactory("MyToken",getAccount());
    const myToken = await myTokenContract.deploy();
    console.log(`contract deployed at address : ${myToken.address}`);
});