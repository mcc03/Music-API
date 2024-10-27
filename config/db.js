const mongoose = require('mongoose');

// const username = encodeURIComponent("n00212147");
// const password = encodeURIComponent("Bu7pychnhMnPrdU8");
// const host = encodeURIComponent("cluster0.dhs3o.mongodb.net");
// const database = encodeURIComponent("articles_db");

const init = () => {
    mongoose.set('debug', true);
    
    mongoose.connect(process.env.DB_ATLAS_URL)
    .catch(err => {
        console.log(`Error: ${err.stack}`);
    });
    mongoose.connection.on('open', () => {
        console.log(`Connected to ${process.env.DB_NAME}`);
    })
};

module.exports = init;