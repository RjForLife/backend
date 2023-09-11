import express from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import passport, { Passport } from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import { MemoryStore } from "express-session";

const app = express();
export default app;

dotenv.config(
    {
        path: "./config/config.env"
    }
)

//middlewares

app.use(
    session(
        {
            
            secret: "session-secret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                domain: 'backend-phi-virid.vercel.app', // Match the domain of the cookie
                secure: true, // Ensure the other attributes match the cookie
                httpOnly: true,
                sameSite: 'none',
                path: '/'
                }
        })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]

}))

app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();


//importing routes

import userRoute from './routes/user.js'
import orderRoute from './routes/order.js'


// import { connection } from "mongoose";

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);


// importing custom error middlewre

import { errorMiddleware } from "./middlewares/errorMiddleware.js";

app.use(errorMiddleware);

