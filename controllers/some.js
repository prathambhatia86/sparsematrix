const Redis = require("ioredis");
const { forEach } = require("underscore");
var redis = new Redis(
    {
        password: 'rXB1Jrg9p21qLCeRRsdxnfMY0nBcxSu7',

        host: 'redis-12222.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12222

    }
);

// Return true if merchant serves this pincode
const checkEntries = async (merchantName, Pincode) => {
    try {
        return await redis.sismember(Pincode, merchantName);
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
    const pinCode = req.body.pinCode;
    let check = redis.exists(pinCode);
    if (check == false) {
        //Bad Request
        res.status(400);
        return
    }
    redis.smembers(pinCode).then((result) => {
        console.log(result);
        res.status(200).json({ merchants: result.filter((pincode) => { return pincode != 0; }) });
    })
}

//Return all pincodes serviced by a merchant
const getAllPincodes = async (req, res) => {
    const merchant = req.user.username;
    let check = redis.exists(merchant);
    if (check == false) {
        //Bad Request
        res.status('400');
        return
    }
    const result = await redis.hget(merchant, "pins");
    res.status(200).json(result);
}

//Update the merchant
const updateMerchant = async (req, res) => {
    console.log(req.body);
    const username = req.user.username
    let pins = req.body.pins
    let addedPins = req.body.addedPins
    let delPins = req.body.delPins
    pins = JSON.stringify(pins);
    console.log(pins)
    console.log(addedPins);
    try {
        await redis.hset(username, 'pins', pins)
        for (const val of addedPins) {
            redis.sadd(val, username); //Removed await, we aren't reporting any errors so let it happen in background
        }
        for (const val of delPins) {
            redis.srem(val, username); //Removed await
        }
        res.status(200);
    } catch (error) {
        console.error("Error in Redis operation:", error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    doesServe, getMerchants, updateMerchant, getAllPincodes
}