const express = require('express');     // framework of js
const mongoose = require('mongoose');  // For working with mongodb
const morgan = require('morgan');       // Log in console which api has been called
const bodyParser = require('body-parser');  // Parse the incoming value
const app = express();
//const { ServerSelectionError } = require('mongodb');


const EmployeeRoute = require('./routes/employee')

mongoose.connect('mongodb://127.0.0.1:27017/testdb',{useNewUrlParser : true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error',(err) => {
    console.log(`Error occurred while connecting to MongoDB ${err}`);
})

db.once('open' , () => {
    console.log("Connected to MongoDB");
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT ,() =>{
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/employee', EmployeeRoute)