const Redis = require("ioredis");
var redis = new Redis(
    {
        password: 'rXB1Jrg9p21qLCeRRsdxnfMY0nBcxSu7',
       
            host: 'redis-12222.c274.us-east-1-3.ec2.cloud.redislabs.com',
            port: 12222
        
    }
);
const addMerchant=async(req,res)=>{
const name =req.body.name
const username=req.body.username
const password=req.body.password
const city=req.body.city
let data={
    "name":name,
    "password":password,
    "city":city
}
data=JSON.stringify(data);
console.log(data);
let result=await redis.set(username,data);
res.send(result);
}
module.exports={
    addMerchant,
}