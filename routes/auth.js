import express from "express";
import { postSignUp, postLogIn, postGetOTP, postLoginWithOTP, verify } from "../controllers/auth.js"

const router = express.Router();

router.post('/signup',postSignUp);

router.post('/login',postLogIn);

router.post('/getOTP',postGetOTP);

router.post('/otpLogin' ,postLoginWithOTP);

router.post('/verify',verify);

export default router;