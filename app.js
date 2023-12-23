const express=require('express')
const app=express()
const path = require('path');
const cors = require('cors');
app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use(express.static(path.join(__dirname, 'frontend.html')))