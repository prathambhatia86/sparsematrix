const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
const _ = require('underscore');

//Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
// app.use(express.static(path.join(__dirname, 'frontend.html')))


const { doesServe, getMerchants, getPincodes } = require('./controllers/some');

// Start the server after initialization, if not initiliased, please see init.js

//Check if this merchant serves this pincode
app.post("/checkEntries", doesServe)
//Retrieve merchants at a pincode
app.post("/getMerchantsByPincode", getMerchants)
//Retrieve pincodes serviced by  a merchant
app.post("/getPincodesForMerchant", getPincodes)


//Start up the server
app.listen(8000, () => {
    console.log('Server is running on port 3000');
});