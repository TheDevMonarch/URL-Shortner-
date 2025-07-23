import express from "express";
import mongoose from "mongoose";
import {shortUrl} from "./controllers/url.js"
import { originalUrl } from "./controllers/url.js";
import dotenv from 'dotenv';

const app = express();

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT;

app.use(express.urlencoded({extended:true}))

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      dbName: "Nodejs_Mastery_Course",
    }
  )
  .then(() => {
    console.log("MongoDB connected..");
  })
  .catch((err) => {
    console.log(err);
  });


  // rendering the ejs file
  app.get('/', (req, res)=>{
    res.render('index.ejs', {shortUrl: null })
  })

  // short URL logic
  app.post('/short', shortUrl)

  //Dynamic routing using slug
  app.get('/:shortCode', originalUrl)
  
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
