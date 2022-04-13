import { ethers } from "ethers";
import dotenv from "dotenv";
import User from "../models/user.js";
import postmark from "postmark";
import jwt from "jsonwebtoken";
dotenv.config();

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export async function airDrop(address){
    
    const provider =  ethers.getDefaultProvider("rinkeby", {
        alchemy : process.env.ACCOUNT_PRIVATE_KEY,
    }); 
    const ABI = ["function mint(address beneficiary,uint amount) external"]

    const signer = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY,provider);
 
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS,ABI,signer); 
    await token.mint(address,"2000000000000000000000");
}

export const transfer = async(req,res,next)=> {

    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ')[1];
    const user = jwt.verify(bearer, process.env.JWT_PRIVATE_KEY);

    const userEmail = user.email;
    const userDetail = await User.findOne({email :userEmail});
    
    const privateKey =userDetail.privateKey;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;

    const ABI = ["function transfer(address to, uint256 amount) public  returns (bool)"]

    const provider =  ethers.getDefaultProvider("rinkeby", {
        alchemy : privateKey,
    });
    
    const signer = new ethers.Wallet(privateKey,provider);
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS,ABI,signer); 
    try{
        const tx =await token.transfer(toAddress,amount);
        const txs = tx[1];
        await client.sendEmail(
            {
                From: "abhishek.umedbhai@solulab.com",
                To: userEmail,
                Subject: "Your Transaction Details",
                HtmlBody: `Your current Transaction details are as followed :
                            ${txs} `
            })
        res.send(tx);
    }
    catch(error)
    {
        console.log(error);
    }
}




