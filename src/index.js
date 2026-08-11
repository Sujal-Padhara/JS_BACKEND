// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
    
})

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import express from "express"
import connectDB from "./db/index.js";
const app = express()


// 2. sencond approch to conncet DB
connectDB()













/* 
1. First Aprroch to connect Database
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>
            {
            console.log("Error: ", error);
            throw err
        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is Listening on prot ${process.env.PORT}`);
        })

    }catch(error) {
        console.error("ERROR: ", error)
        throw err
    }
} )()
    */