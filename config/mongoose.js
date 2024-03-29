const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/ques_db");

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting the database"));

db.once('open', function(){
    console.log("Successfully connected to the database");
})

module.exports = db;
