const express = require('express');
const db = require('./config/mongoose');

const port = 8000;

const app = express();

app.use(express.urlencoded());

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`error while starting the server -> ${err}`);
        return;
    }
    console.log(`Server is running on port -> ${port}`);
})


