const mongoose = require('mongoose'); 

// define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

// define event listers for database connection


db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})
db.on('error', (err) => {
    console.error('MongoDB connection error',err);
})
db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB server');
})

// export the databsase connection

module.exports = db;