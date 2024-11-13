require('dotenv').config();
const { connect, disconnect } = require('./config/db');
const Genre = require('./models/genre.model');
const User = require('./models/user.model');
const Producer = require('./models/producer.model');
const Publisher = require('./models/publisher.model');
const Artist = require('./models/artist.model');
const Song = require('./models/song.model');

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

const producers = [
    {
        full_name: "Bob"
    },
    {
        full_name: "Jack"
    }
]

const publishers = [
    {
        name: "Platinum records"
    },
    {
        name: "Bronze records"
    }
]

// const artists = [
//     {
//         name: "Electronic",
//         songs: [
//             {
//                 ref: 'Song',
//             }
//         ]
//     }
// ]

// const songs = [
//     {
//         title: "new created song auto added to artist",
//         artists: ["6728e1a7b4fbce4dc2ebd9cf"],
//         description: "testing",
//         genre: "671e51e1483b4e141960b0d9",
//         feature: "671e6510ee0793f5cedae5f9",
//         producer: "671e55154053186877ba3665",
//         publisher: "671e4f46d93800dfc775b43b"
//     }
// ]

let seedDB = async () => {
    await connect();
    await User.deleteMany();
    await Genre.deleteMany();
    await Producer.deleteMany();
    await Publisher.deleteMany();
    //await Todo.deleteMany();

    await User.insertMany(users);
    await Genre.insertMany(genres);
    await Producer.insertMany(producers);
    await Publisher.insertMany(publishers);
    //await Todo.insertMany(todos);
};

seedDB().then(() => {
    console.log('Seeding operation successfull!');
    disconnect();
});
