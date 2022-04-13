import express from "express";
import { getTransaction } from "../controllers/admin.js";
import { isAdmin,verifyToken } from "../middleware/Authentication.js";

const router = express.Router();

router.get('/admin/transactions',verifyToken,isAdmin,getTransaction);

export default router;