import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import contractRoutes from "./routes/contract.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();
const mongodbUri = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended:false}));

async function connect() {
    
    try{
        await mongoose.connect(mongodbUri);
        app.listen(3000);
        console.log("server Running");
    }
    catch(error){
        console.log(error)
    }
}

app.use(authRoutes);

app.use(contractRoutes);

app.use(adminRoutes);

app.use(userRoutes);

connect();