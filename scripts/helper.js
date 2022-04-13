const { ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

function getEnvVariable(key,defaultValue) {
    if(process.env[key]) {
        return process.env[key];
    }

    if(!defaultValue) {
        throw `${key} is not environment variable`
    }
    return defaultValue;
}

function getProvider() {
    return ethers.getDefaultProvider(getEnvVariable("NETWORK","rinkeby"), {
        alchemy : getEnvVariable("ALCHEMY_KEY"),
    });
}

function getAccount() {
    return new ethers.Wallet(getEnvVariable("ACCOUNT_PRIVATE_KEY"),getProvider());
}

module.exports = {
    getEnvVariable,
    getProvider,
    getAccount
}