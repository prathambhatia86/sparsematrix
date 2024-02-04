const Redis = require("ioredis");
const jwt = require("jsonwebtoken")
const secretKey = "buildforbharat"
var redis = new Redis(
    {
        password: 'rXB1Jrg9p21qLCeRRsdxnfMY0nBcxSu7',

        host: 'redis-12222.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12222

    }
);
const addMerchant = async (req, res) => {
    const name = req.body.name
    const username = req.body.username
    const password = req.body.password
    const city = req.body.city
    let pins = new Array()
    pins = JSON.stringify(pins)
    try {
        await redis.hset(username, 'name', name)
        await redis.hset(username, 'pins', pins)
        await redis.hset(username, 'city', city)
        await redis.hset(username, 'password', password)
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error in Redis operation:", error);
        res.status(500).send("Internal Server Error");
    }
}
const doLogin = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
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
    const userPass = await redis.hget(username, "password");
    if (!userPass) {
        return res.status(404).json({ error: 'User not found' });
    }
    const userObject = userPass;
    console.log(userObject)
    if (userObject == password) {
        const payload = {
            username: username
        }
        const token = jwt.sign(payload, secretKey);
        res.json({
            token: token,
            track: "correct"
        });
    }
    else {
        res.send("incorrect");
    }
};

module.exports = {
    addMerchant, doLogin,
}