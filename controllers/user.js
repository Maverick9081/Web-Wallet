import { ethers } from "ethers";
import dotenv from "dotenv";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
dotenv.config();

export const getTransaction = async(req,res,next) => {
    
    const ABI = ["function transfer(address to, uint256 amount) public  returns (bool)"]

    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const user = jwt.verify(bearerToken, process.env.JWT_PRIVATE_KEY);

    const userEmail = user.email;
    const userDetail = await User.findOne({email :userEmail});
    
    const privateKey =userDetail.privateKey;
    
    const provider =  ethers.getDefaultProvider("rinkeby", {
        alchemy : privateKey,
    });

    const signer = new ethers.Wallet(privateKey,provider);
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS,ABI,signer);
    const transactions = await token.queryFilter(ABI,userDetail.address);
    res.send(transactions);
}

export const getBalance = async (req,res,next) => {
    const ABI = ["function balanceOf(address account) public returns (uint256)"];
    
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const user = jwt.verify(bearerToken, process.env.JWT_PRIVATE_KEY);

    const userEmail = user.email;
    const userDetail = await User.findOne({email :userEmail});
    
    const privateKey =userDetail.privateKey;
    
    const provider =  ethers.getDefaultProvider("rinkeby", {
        alchemy : privateKey,
    });

    const signer = new ethers.Wallet(privateKey,provider);
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS,ABI,signer);
    const balance = await token.balanceOf(userDetail.address);
    res.send(balance);
}