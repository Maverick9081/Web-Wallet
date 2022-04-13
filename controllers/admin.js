import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

export const getTransaction = async(req,res,next) => {
    const ABI = ["function transfer(address to, uint256 amount) public  returns (bool)"]

    const privateKey = process.env.ACCOUNT_PRIVATE_KEY;
    const provider =  ethers.getDefaultProvider("rinkeby", {
        alchemy : privateKey,
    });
    const signer = new ethers.Wallet(privateKey,provider);
    const token = new ethers.Contract(process.env.TOKEN_ADDRESS,ABI,signer);
    const transactions = await token.queryFilter(ABI);
    res.send(transactions);
}