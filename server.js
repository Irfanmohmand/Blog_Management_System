import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.js";
import blogRouter from "./routers/blog.js";
import { config } from "dotenv";
import cors from "cors";
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


config({
  path: './data/config.env'
})

mongoose.connect(process.env.MONGO_URL, {
  dbName: "Blog_managment_system"
}).then(() => console.log("Db connected.."));


// User Router
app.use("/api/user", userRouter);


// Blog Router
app.use("/api/blog", blogRouter);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
