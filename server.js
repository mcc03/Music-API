const express = require('express');
const app = express();

require('dotenv').config();
require('./config/db.js')();
const port = 5000;


// const db =  require('./config/db.js');
app.use(express.json());

//app.set('view engine', 'html');
app.use(express.static(__dirname + '/views/'));

app.use('/api/users', require('./routes/users'));
app.use('/api/festivals', require('./routes/festivals'));
app.use('/api/stages', require('./routes/stages'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
