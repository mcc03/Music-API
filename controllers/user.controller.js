const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const register = (req, res) => {
    console.log(req.body)

    //newUser.role = False;

    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10)
    newUser.role = req.body.role;


    newUser.save()
            .then(data => {
                data.password = undefined;
                return res.status(201).json(data);
            })
            .catch(err => {
                return res.status(400).json({
                    message: err
                })
            });
    
}

const login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user || !user.comparePassword(req.body.password)){
            res.status(401).json({
                message: 'Authentication failed. Invalid user.'
            })
        }

        return res.status(200).json({
            token: jwt.sign({
                email: user.email,
                full_name: user.full_name,
                _id: user._id,
                role: user.role
            }, process.env.JWT_SECRET)
        });

    })
    .catch(err => {
        return res.status(500).json(err);
    })
}

const loginRequired = (req, res, next) => {
    if(req.user){
        next()
    }
    else {
        return res.status(401).json({message: "Unauthorized user."})
    }
}

const readAll = (req, res) => {

    User.find()//.//populate('festival') //shows the festival data
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
    //     "message": "All Producers retrieved"
    // });
};

module.exports = {
    register,
    login,
    loginRequired,
    readAll
}
