const Redis = require("ioredis");
var redis = new Redis();
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
module.exports = {
    doesServe, getMerchants, getPincodes
}