const connectToDb = require('./config/db')
const {faker} = require('@faker-js/faker')

connectToDb().then(async (db) => {
    console.log("seeding...");

    const collections = await db.listCollections({},{nameOnly:true}).toArray();

    collections.forEach(async (collection) => {
        await db.dropCollection(collection.name)
        console.log("Dropping", collection.name)
    });

    const newCollection = await db.createCollection("seed");

    // let categories = [
    //     {title: "Soccer"},
    //     {title: "Basketball"},
    //     {title: "Rugby"},
    // ]

    //seed 10 genres
    let genres = [faker.music.genre]

    for(let i = 0; i < 10; i++){
        genres.push({
            genre: faker.music.genre()
        })
    }

    let result = await newCollection.insertMany(genres)

    return console.log(result)
})