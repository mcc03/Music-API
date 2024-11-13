const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

require('dotenv').config();

// if(process.env.ENVIRONMENT !== 'testing'){
//     console.log(process.env.ENVIRONMENT);
//     require('./config/db').connect();
// }

require('./config/db').connect();

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// app.use((req, res, next) => {
//     console.log("REQUEST: ", req)
//     req.user = "marlon";
//     next();
// });

// app.use((req, res, next) => {
//     console.log("REQUEST Log 2: ", req)
//     next();
// });

//// AUTHORIZATION ////
// app.use((req, res, next) => {
//     let authHeader = req.headers.authorization?.split(' ');

//     if(req.headers?.authorization && authHeader[0] === 'Bearer'){
//         jwt.verify(authHeader[1], process.env.JWT_SECRET, (err, decoded) => {
//             if(err) req.user = undefined;
//             req.user = decoded;
//             next();
//         });
//     }
//     else {
//         req.user = undefined;
//         next();
//     }
// })
//////////////////////
app.use((req, res, next) => {
    if (req.headers?.authorization?.split(' ')[0] === 'Bearer') {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.APP_KEY,
            (err, decoded) => {
                if (err) req.user = undefined;

                req.user = decoded;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
});


app.use('/api/users', require('./routes/users'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/publishers', require('./routes/publishers'));
app.use('/api/genres', require('./routes/genres'));
app.use('/api/producers', require('./routes/producers'));
app.use('/api/songs', require('./routes/songs'));

module.exports = app;