const express=require('express')
const app=express()
const path = require('path');
const cors = require('cors');
const randomstring = require("randomstring");
app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use(express.static(path.join(__dirname, 'frontend.html')))
const pincodes=[];
const names=[];
const mapping = new Map();
create_random_pincodes=()=>{
    for(let i=0;i<30000;i++)
    {
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    pincodes.push(randomSixDigitNumber);
    }
};
create_random_strings=()=>{
    for(let i=0;i<10000000;i++)
    {
    const name=randomstring.generate({
        length: 10,
        charset: 'alphabetic'
      });
      names.push(name);
      mapping.set(name,pincodes);
    }
}
create_random_pincodes();
create_random_strings();
console.log(mapping.size)