import bcrypt from "bcrypt";
import postmark from "postmark";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { airDrop } from "./mint.js";
import  User  from "../models/user.js";
import { ethers } from "ethers"
dotenv.config();

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export const postSignUp = async(req,res,next) =>{
    const email =  req.body.email;
    const password = req.body.password;
    try {
        const repeatedUser = await User.findOne({ email : email})
        if(repeatedUser){
            return res.redirect('/logIn');
        }   
        const hashedPassword = await bcrypt.hash(password,12);
        const wallet = new ethers.Wallet.createRandom();
        const privateKey = wallet.privateKey;
        const address = wallet.address;
        
        const otp = Math.floor(Math.random()*999999);
        const otpExpiration = Date.now() +120000;
        const user = new User({
            email : email,
            password : hashedPassword,
            privateKey : privateKey,
            address : address,
            otp: otp,
            otpExpiration :otpExpiration
        });
            
        await user.save();
         
        await client.sendEmail(
            {
               From: "abhishek.umedbhai@solulab.com",
               To: email,
               Subject: "Verification OTP",
               HtmlBody: `<h2> your verification OTP is ${otp}.It will expire in one minute </h2>`
            }
        );
        res.send(`OTP sent to ${email}`);
    }
    catch(error) {
        console.log(error);
    }
}

export const verify =async (req,res,next) =>{
    const email = req.body.email;
    const otp = req.body.otp;

    try{
        const user = await User.findOne({ email:email })
        if(user){
            if(!user.verified){
                if(Date.now() < user.otpExpiration){
                    if(otp == user.otp) {
                        const address = user.address;
                        airDrop(address);
                        res.send(`<h2>Verification Successful</h2>
                                    <h3> your wallet address is 
                                    ${address}  and Your account 
                                    privateKey is ${user.privateKey}</h3>`
                                )
                        return;
                    }
                    else{
                        res.status(400).send("invalid OTP,Please re-enter");
                    }
                }
                else{
                    res.status(400).send("OTP expired,please create a new one!");
                }
            }
            else{
                res.send("User already verified");
                return;
            }    
        }
        else{
            res.status(400).send("User not found");
        }
        return;
    }
    catch(error){
        console.log(error);
    }
}

export const postLogIn = async(req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.findOne({ email :email})
        const comparedPassword = await bcrypt.compare(password,user.password);
        if(comparedPassword){
            const token = jwt.sign({email : email,role : user.role},process.env.JWT_PRIVATE_KEY, { expiresIn : '1h' });
            user.token = token;
            return user.save();
        }
       res.send("User created successfully ,Please verify");
    }
    catch(error){
        console.log(error);
    }
}

export const postGetOTP = async(req,res,next) => {
    const email = req.body.email;

    try{
        const user = await User.findOne({ email:email})
        if(user){
            const otp = Math.floor(Math.random()*999999);
            const otpExpiration = Date.now() +120000;
            user.otp = otp;
            user.otpExpiration =otpExpiration;

            await user.save();
            await client.sendEmail(
                {
                    From: "abhishek.umedbhai@solulab.com",
                    To: email,
                    Subject: "Your login OTP",
                    HtmlBody: `<h2> your one time login OTP is ${otp}.It will expire in one minute </h2>`
                })
            return;    
        }

        return res.error("User not found")
    }
    catch(error){
        res.send(error);
    }
}

export const postLoginWithOTP = async(req,res,next) => {
    const email = req.body.email;
    const otp = req.body.otp;

    try{
        const user = await User.findOne({ email:email })
        if(user){
            if(Date.now() < user.otpExpiration){
                if(otp == user.otp) {
                
                    const token =  jwt.sign({email : email,role : user.role},process.env.JWT_PRIVATE_KEY, { expiresIn : '1h' });
                    user.token = token;
                    await user.save();
                    return res.send("LoginSuccessful");
                }
                else{
                    res.status(400).send("invalid otp,Please re-enter");
                }
            }
            else{
                res.status(400).send("OTP expired,please create new one");
            }
        }
        else{
            res.status(400).send("user with this email not found");
        }
        return;
    }
    catch(error){
        console.log(error);
    }
}


