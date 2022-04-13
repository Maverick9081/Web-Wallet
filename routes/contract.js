import express from "express";
import { transfer } from "../controllers/mint.js";
import { verifyToken } from "../middleware/Authentication.js";

const router = express.Router();

router.post('/transfer',verifyToken,transfer);

export default router;