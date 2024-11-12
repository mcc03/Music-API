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

// const MongoClient = require('mongodb').MongoClient;
 
// const username = encodeURIComponent('n00212147');
// const password = encodeURIComponent('Bu7pychnhMnPrdU8');
// const host = encodeURI('cluster0.dhs3o.mongodb.net');
// const database = encodeURI('articles_db');
 
// const url = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`
 
// async function connect(){
//     try{
//         const client = new MongoClient(url);
 
//         await client.connect();
//         console.log("Connected to DB succesfully")
 
//         const db = client.db(database);
//         // const collections = await db.listCollections({},{nameOnly:  true}).toArray();
//         // console.log(collections);
 
//         // client.close();
//         return db;
//     }
//     catch(error){
//         console.log(error)
//     }
// }
// // connect();
// module.exports = connect;