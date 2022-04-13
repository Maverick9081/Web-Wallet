import express from "express";
import { getTransaction, getBalance } from "../controllers/user.js";
import { verifyToken } from "../middleware/Authentication.js";

const router = express.Router();

router.get('/transactions',verifyToken,getTransaction);

router.get('/getBalance',verifyToken, getBalance);

export default router;