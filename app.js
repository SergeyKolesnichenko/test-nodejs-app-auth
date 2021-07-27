require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const router = require("./router/routers");

const errorMiddleware = require("./middlewares/errorMiddleware");


const PORT = process.env.PORT;

const app = express();

app.options('*', cors())
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);


const start = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL,
            { useNewUrlParser: true, useUnifiedTopology: true });
        
            app.listen(PORT, () => console.log("Server has been started!"));
    }catch(e){
        console.log(e);
    }
}

start();
