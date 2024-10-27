const express = require('express');
jwt = require('jsonwebtoken');
const app = express();

require('dotenv').config();
require('./config/db.js')();
const port = 5000;


// const db =  require('./config/db.js');
app.use(express.json());

//app.set('view engine', 'html');
app.use(express.static(__dirname + '/views/'));

app.use((req, res, next) => {
    console.log("REQUEST: ", req)
    req.user = "marlon";
    next();
});

app.use((req, res, next) => {
    console.log("REQUEST Log 2: ", req)
    next();
});

//// AUTHORIZATION ////
app.use((req, res, next) => {
    let authHeader = req.headers.authorization?.split(' ');

    if(req.headers?.authorization && authHeader[0] === 'Bearer'){
        jwt.verify(authHeader[1], process.env.JWT_SECRET, (err, decoded) => {
            if(err) req.user = undefined;
            req.user = decoded;
            next();
        });
    }
    else {
        req.user = undefined;
        next();
    }
})
//////////////////////

app.use('/api/users', require('./routes/users'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/publishers', require('./routes/publishers'));
app.use('/api/genres', require('./routes/genres'));
app.use('/api/producers', require('./routes/producers'));
app.use('/api/songs', require('./routes/songs'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

