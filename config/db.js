// const mongoose = require('mongoose');

// // const username = encodeURIComponent("n00212147");
// // const password = encodeURIComponent("Bu7pychnhMnPrdU8");
// // const host = encodeURIComponent("cluster0.dhs3o.mongodb.net");
// // const database = encodeURIComponent("articles_db");

// const init = () => {
//     mongoose.set('debug', true);
    
//     mongoose.connect(process.env.DB_ATLAS_URL)
//     .catch(err => {
//         console.log(`Error: ${err.stack}`);
//     });
//     mongoose.connection.on('open', () => {
//         console.log(`Connected to ${process.env.DB_NAME}`);
//     })
// };

// module.exports = init;

const mongoose = require("mongoose");
let db;

const connect = async () => {
    db = null;

    try {
        mongoose.set('strictQuery', false);
    
        let dbURL = process.env.DB_ATLAS_URL;

        console.log("Environment:", process.env.ENVIRONMENT);

        if(process.env.ENVIRONMENT === "testing"){
            dbURL = process.env.TEST_DB_ATLAS_URL;
            console.log("Using test database URL");
        }

        if (!dbURL) {
            throw new Error('Database URL is not defined');
        }

        await mongoose.connect(dbURL);

        console.log('Connected successfully to db');
        db = mongoose.connection;
    } catch (error) {
        console.log(error);
    } finally {
        if (db !== null && db.readyState === 1) {
            // await db.close();
            // console.log("Disconnected successfully from db");
        }
    }
};

const disconnect = async () => {
    console.log("test")
    await db.close();
};

module.exports = { connect, disconnect };