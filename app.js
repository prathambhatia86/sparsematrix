const express=require('express')
const app=express()
const path = require('path');
const cors = require('cors');
const randomstring = require("randomstring");
app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
// app.use(express.static(path.join(__dirname, 'frontend.html')))
const pincodes=new Set();
const names=[];
const mapping = new Map();

create_random_pincodes=()=>{
    for(let i=0;i<30000;i++)
    {
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    a=randomSixDigitNumber;
    pincodes.add(randomSixDigitNumber);
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

app.post("/addRandomEntries",async(req,res)=>{
    create_random_pincodes();
    create_random_strings();
    console.log(names.length);
    res.send(true);
})

// check_entries=()=>{
// if(mapping.has(names[1000000]))
// {
//     let temp=new Set();
//     temp=mapping.get(names[100000]);
//     if(temp.has(a))
//     console.log("the pin facility is available with the particular merchant");
//     else
//     console.log("the merchant dont deliver to this location");
// }
// else
// {
//     console.log("this merchant does not exist or has not enabled pincode facility");
// }
// };

// check_entries();
app.listen(8000,()=>{
    console.log("conection is successful");
})