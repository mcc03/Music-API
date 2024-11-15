require('dotenv').config();
const { connect, disconnect } = require('./config/db');
const Genre = require('./models/genre.model');
const User = require('./models/user.model');
const Producer = require('./models/producer.model');
const Publisher = require('./models/publisher.model');
const Artist = require('./models/artist.model');
const Song = require('./models/song.model');

//define users and roles
const users = [
    {
        full_name : "admin user",
        email : "admin@gmail.com",
        password : "secret1234",
        role: 1
    },
    {
        full_name : "regular user",
        email : "regular@gmail.com",
        password : "secret1234",
        role: 0
    },
];

//define genres
const genres = [
    {
        name: "Electronic"
    },
    {
        name: "Rock"
    },
    {
        name: "Pop"
    }
]

//define producers
const producers = [
    {
        full_name: "Bob"
    },
    {
        full_name: "Jack"
    }
]

//define publishers
const publishers = [
    {
        name: "Platinum records"
    },
    {
        name: "Bronze records"
    }
]

//define artists, ignore songs array for now, push the song IDs later
const artists = [
    {
        full_name: "Artist A",
    },
    {
        full_name: "Artist B"
    }
]

let seedDB = async () => {
    await connect();
    //delete data before seeding
    await User.deleteMany();
    await Genre.deleteMany();
    await Producer.deleteMany();
    await Publisher.deleteMany();
    await Artist.deleteMany();
    await Song.deleteMany();

    //seed users
    await User.insertMany(users);

    //seed genres and retrieve IDs
    const insertedGenres = await Genre.insertMany(genres);
    const genreIds = insertedGenres.map(genre => genre._id); //map the IDs to a new array

    //seed producers and retrieve IDs
    const insertedProducers = await Producer.insertMany(producers);
    const producerIds = insertedProducers.map(producer => producer._id);

    //seed publishers and retrieve IDs
    const insertedPublishers = await Publisher.insertMany(publishers);
    const publisherIds = insertedPublishers.map(publisher => publisher._id);

    //seed artists and retrieve IDs
    const insertedArtists = await Artist.insertMany(artists);
    const artistIds = insertedArtists.map(artist => artist._id);

    //define songs with IDs
    const songs = [
        {
            title: "Seeded Song A",
            artists: [artistIds[0]], //use the first artist's ID
            description: "testing",
            genre: genreIds[0], //use the first genre's ID
            feature: artistIds[1], //use the second artist's ID as feature
            producer: producerIds[0], //use the first producer's ID
            publisher: publisherIds[0] //use the first publisher's ID
        }
    ];

        //insert songs and retrieve IDs
        const insertedSongs = await Song.insertMany(songs);
        const songIds = insertedSongs.map(song => song._id);
    
        //update the songs array in each artist document
        for (let song of insertedSongs) {
            for (let artistId of song.artists) {
                let artist = await Artist.findById(artistId);
                if (artist) {
                    artist.songs.push(song._id);
                    await artist.save();
                }
            }
        }
};

seedDB().then(() => {
    console.log('Seeding operation successfull!');
    disconnect(); //disconnect after seeding
});
