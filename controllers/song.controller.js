const Song = require('../models/song.model');
const Artist = require('../models/artist.model')

//https://stackoverflow.com/questions/21069813/mongoose-multiple-query-populate-in-a-single-call
const populateQuery = [
    {path:'genre', select:'name'}, 
    {path:'feature', select:'full_name'}, 
    {path:'producer', select:'full_name'},
    {path:'publisher', select:'name'},
    {path:'artists', select:'full_name'}
];

const readAll = (req, res) => {

    Song.find().populate(populateQuery) //shows the genre data
        .then(data => {
            console.log(data);

            if(data.length > 0){
                return res.status(200).json(data);
            }
            else {
                return res.status(404).json('None found');
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        });

    // res.status(200).json({
    //     "message": "All Songs retrieved"
    // });
};

const readOne = (req, res) => {
    let id = req.params.id;

    Song.findById(id).populate(populateQuery)
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Song with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Song with id: ${id} retrieved`,
                data
            });
        })
        .catch(err => {
            console.log(err);

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Song with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });

    // res.status(200).json({
    //     "message": `Song with id: ${id} retrieved`
    // });
};

const createData = async (req, res) => {
    console.log(req.body);
    let body = req.body;

    try {
        let newSong = await Song.create(body);
        console.log(`New song created`, newSong);
    
        //get the song's artists
        const artists = newSong.artists;
    
        //push the song ids into the artist's songs array and save
        for (let artistId of artists) {
            let artist = await Artist.findById(artistId);
    
            //if the song has artists, push the song ID to the artist's songs array
            if (artist) {
                artist.songs.push(newSong._id);
                await artist.save();
            }
        }
        return res.status(201).json({
            message: "Song created",
            data: newSong
        });
    } catch (err) {
        console.log(err);

        if (err.name === 'ValidationError') {
            return res.status(422).json(err);
        }

        return res.status(500).json(err);
    
    }
};

const updateData = async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    try{
        let song = await Song.findById(id);

        if(!song){
            return res.status(404).json({
                message: `Song with id: ${id} not found`
            })
        }

        // console.log("TESTING UPDATE 0");
        // console.log(song);

        song.title = body.title;

        //loops through artists and adds each one
        body.artists.forEach(artist => {
            song.artists.addToSet(artist);
        });

        song.description = body.description;
        song.genre = body.genre;
        song.feature = body.feature;
        song.producer = body.producer;
        song.publisher = body.publisher;

        let updatedSong = await song.save();

        // console.log("TESTING UPDATE 2");
        // console.log(updatedSong);

        //push song's id into artist's songs array
        if(updatedSong){ 

        //get the song's artists
        const artists = updatedSong.artists;

        //push song's id into each artist's songs array and save the artist
        for (let artistId of artists) {
            let artist = await Artist.findById(artistId);
            
            if (artist) {
                artist.songs.push(updatedSong._id);
                await artist.save();
            }
        }
            return res.status(201).json(updatedSong);
        }
    }
    catch(err){

        if(err.name === 'CastError'){

            if(err.kind === 'ObjectId'){
                return res.status(404).json({
                    message: `Song with id: ${id} not found`
                });
            }
            else {
                return res.status(422).json({
                    message: err.message
                });
            }

        }

        return res.status(500).json(err);
    };

    


    // Song.findByIdAndUpdate(id, body, {
    //     new: true,
    //     runValidators: true
    // })
    // .then(data => {

    //         if(data){
    //             return res.status(201).json(data);
    //         }

    //         return res.status(404).json({
    //             message: `Song with id: ${id} not found`
    //         })
    //     })

    // .catch(err => {

    //     if(err.name === 'CastError'){

    //         if(err.kind === 'ObjectId'){
    //             return res.status(404).json({
    //                 message: `Song with id: ${id} not found`
    //             });
    //         }
    //         else {
    //             return res.status(422).json({
    //                 message: err.message
    //             });
    //         }

    //     }

    //     return res.status(500).json(err);
    // });

    // connect to db and check if user exists
    // check if data is valid, if yes update user with :id



    // data.id = id;

    // res.status(200).json({
    //     "message": `You updated song with id: ${id}`,
    //     data
    // });

};

const deleteData = (req, res) => {
    let id = req.params.id;

    // connect to db, check if user exists, if yes delete user

    Song.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Song with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Song with id: ${id} deleted`
            });
        })
        .catch(err => {

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Song with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });

    // res.status(200).json({
    //     "message": `You deleted song with id: ${id}`
    // });
};

module.exports = {
    readAll,
    readOne,
    createData,
    updateData,
    deleteData
};