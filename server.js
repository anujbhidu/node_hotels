//import express from 'express'

const express = require('express');
const app = express();
const db = require('./db'); // assuming you have a db.js file in the same directory
const mongoose = require('mongoose'); // add this
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/disconnect', async (req, res) => {
    try {
        console.log('Disconnect route hit');
        await mongoose.disconnect(); // ✅ this is the correct method
        res.send('MongoDB disconnected');
    } catch (err) {
        res.status(500).send('Error disconnecting from MongoDB');
    } 
});

app.get('/', (req, res) => {
  res.send('Hello this my first express app')
})

app.get('/serve',(req,res)=>{
    res.send("Sure sir, i would love to serve food")
})

app.get('/idli/:size',(req,res)=>{
    const size = req.params.size;
    var customizedIDLI = {
        name:'rava idli',
        size: size,
        is_sambhar:true, 
        is_chutni:false
    }
    res.send(customizedIDLI)
})

app.get('/daal',(req,res)=>{
    res.send("welcome to desi food hub would love to serve rice")
})

app.get('/randomfood', (req, res) => {
    const foods = ['idli', 'daal', 'pasta', 'burger'];
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    res.send(`Today’s special: ${randomFood}`);
});

const personRoutes = require('./routes/personRoutes.js');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes.js');
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>{
    console.log("listening on port 3000")
})


