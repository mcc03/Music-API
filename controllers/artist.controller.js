const Artist = require('../models/artist.model');

const populateQuery = [
    {path:'songs', select:'title'}, 
];

const readAll = (req, res) => {

    Artist.find().populate(populateQuery)
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
    //     "message": "All Artists retrieved"
    // });
};

const readOne = (req, res) => {
    let id = req.params.id;

    Artist.findById(id).populate(populateQuery)
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Artist with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Artist with id: ${id} retrieved`,
                data
            });
        })
        .catch(err => {
            console.log(err);

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Artist with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });

    // res.status(200).json({
    //     "message": `Artist with id: ${id} retrieved`
    // });
};

const createData = (req, res) => {
    console.log(req.body);
    let body = req.body;

    Artist.create(body)
        .then(data => {
            console.log(`New artist created`, data);

            return res.status(201).json({
                message: "Artist created",
                data
            });
        })
        .catch(err => {
            console.log(err);

            if(err.name === 'ValidationError'){
                return res.status(422).json(err)
            }

            return res.status(500).json(err);
        });


    // return res.status(201).json({
    //     "message": "All good",
    //     data
    // });
};

const updateData = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Artist.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
    .then(data => {

            if(data){
                return res.status(201).json(data);
            }

            return res.status(404).json({
                message: `Artist with id: ${id} not found`
            })
        })

    .catch(err => {

        if(err.name === 'CastError'){

            if(err.kind === 'ObjectId'){
                return res.status(404).json({
                    message: `Artist with id: ${id} not found`
                });
            }
            else {
                return res.status(422).json({
                    message: err.message
                });
            }

        }

        return res.status(500).json(err);
    });

    // connect to db and check if user exists
    // check if data is valid, if yes update user with :id



    // data.id = id;

    // res.status(200).json({
    //     "message": `You updated artist with id: ${id}`,
    //     data
    // });

};

const deleteData = (req, res) => {
    let id = req.params.id;

    // connect to db, check if user exists, if yes delete user

    Artist.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                return res.status(404).json({
                    message: `Artist with id: ${id} not found`
                });
            }

            return res.status(200).json({
                message: `Artist with id: ${id} deleted`
            });
        })
        .catch(err => {

            if(err.name === 'CastError'){
                return res.status(404).json({
                    message: `Artist with id: ${id} not found`
                });
            }

            return res.status(500).json(err);
        });

    // res.status(200).json({
    //     "message": `You deleted artist with id: ${id}`
    // });
};

module.exports = {
    readAll,
    readOne,
    createData,
    updateData,
    deleteData
};