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
try {
    // Assuming you have a Redis client (redis) already set up
    // and connected in your code
    let result = await redis.sadd(username, data);
    
    // Check the result, it may be useful for error handling depending on your use case
    console.log("Redis Sadd Result:", result);
  
    res.send(200);
  } catch (error) {
    console.error("Error in Redis operation:", error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("Internal Server Error");
  }
}
const doLogin=async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    // redis.smembers(username, (err, userData) => {
    //     if (err) {
    //       return res.status(500).json({ error: 'Error retrieving data from Redis' });
    //     }
    
    //     if (!userData) {
    //       return res.status(404).json({ error: 'User not found' });
    //     }
    //     const userObject = JSON.parse(userData);
    //     if(userObject.password==password)
    //     {
    //         res.send("success");
    //     }
    //     else
    //     {
    //         res.send("incorrect");
    //     }
    //   });
    const userData=await redis.smembers(username);
        if (!userData) {
          return res.status(404).json({ error: 'User not found' });
        }
        const userObject = await JSON.parse(userData);
        console.log(userObject)
        if(userObject.password==password)
        {
            res.send("success");
        }
        else
        {
            res.send("incorrect");
        }
    };
    
module.exports={
    addMerchant,doLogin,
}