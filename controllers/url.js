import { Url } from "../models/Url.js";
import shortid from "shortid";

export const shortUrl =async(req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `https://url-shortner-page.onrender.com/${shortCode}`;

  //save to database
  // const newUrl = await Url.create({shortCode, longUrl})

  const newUrl = new Url({shortCode, longUrl})
  newUrl.save();
  

  // console.log("short saved= ", newUrl)
  
  res.render("index.ejs", {shortUrl})
};

export const originalUrl = async(req, res)=>{

  const shortCode = req.params.shortCode;
  const originalUrl= await Url.findOne({shortCode})
  // console.log(originalUrl)

  if(originalUrl)
  {
    res.redirect(originalUrl.longUrl)
  }
  // res.json({shortCode: shortCode, originalUrl: originalUrl})

}
 