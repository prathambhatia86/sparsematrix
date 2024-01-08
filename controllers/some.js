const Redis = require("ioredis");
var redis = new Redis(
    {
        password: 'rXB1Jrg9p21qLCeRRsdxnfMY0nBcxSu7',
       
            host: 'redis-12222.c274.us-east-1-3.ec2.cloud.redislabs.com',
            port: 12222
        
    }
);

// Return true if merchant serves this pincode
const checkEntries = async (merchantName, Pincode) => {
    //Better to check merchant set, smaller is size probably?
    try {
        return await redis.sismember(merchantName, Pincode);
    } catch (error) {
        console.log(`Couldn't check if merchant serves location, error: ${error}`)
    }
}
const doesServe = async (req, res) => {
    const status = await checkEntries(req.body.merchantName, req.body.pinCode);
    res.json({ status: status });
}


//Return all merchants servicing a pincode
const getMerchants = async (req, res) => {
    const pinCode = req.body.pincode;
    const cursor = req.body.cursor;
    let check = redis.exists(pinCode);
    if (check == false) {
        //Bad Request
        res.status('400');
        return
    }
    redis.sscan(pinCode, cursor, "COUNT", 20).
        then((result) => {
            result = {
                cursor: result[0],
                data: result[1],
            }
            res.status(200).json(result);
        }).catch((error) => {
            console.log(error)
            res.status(500)
        })
}

//Return all pincodes serviced by a merchant
const getPincodes = async (req, res) => {
    const merchant = req.body.merchantName;
    console.log(merchant);
    const cursor = req.body.cursor;
    let check = redis.exists(merchant);
    if (check == false) {
        //Bad Request
        res.status('400');
        return
    }
    redis.sscan(merchant, cursor, "COUNT", 20).
        then((result) => {
            result = {
                cursor: result[0],
                data: result[1],
            }
            res.status(200).json(result);
        }).catch((error) => {
            console.log(error)
            res.status(500)
        })
}
const updateMerchant=async(req,res)=>{
const name =req.body.name
const username=req.body.username
const password=req.body.password
const city=req.body.city
const pins=req.body.pins
let data={
    "name":name,
    "password":password,
    "city":city,
    "pins":pins
}
data=JSON.stringify(data);
console.log(data);
try {
    // Assuming you have a Redis client (redis) already set up
    // and connected in your code
    await redis.del(username);
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
module.exports = {
    doesServe, getMerchants, getPincodes,updateMerchant
}