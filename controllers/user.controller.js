const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const register = (req, res) => {
    console.log(req.body)

    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10)

    //if role field is undefined, make it false, else get value of req.body.role
    if (req.body.role === undefined) {
        newUser.role = false;
    } else {
        newUser.role = req.body.role;
    }

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
            console.log('User found:', user); // Log the user object

            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    msg: 'Authentication failed. Invalid user or password'
                });
            }

            //error handling for APP KEY
            if (!process.env.APP_KEY) {
                console.error('APP_KEY is not defined');
                return res.status(500).json({
                    msg: 'Internal server error'
                });
            }

            //token generation
            const token = jwt.sign({
                email: user.email,
                full_name: user.full_name,
                _id: user._id,
                role: user.role
            }, process.env.APP_KEY);

            return res.status(200).json({
                msg: 'All good',
                token: token,
            });
        })
        .catch(err => {
            console.error('Error during login:', err); // Log the error
            return res.status(500).json({
                msg: 'Internal server error',
                error: err.message
            });
        });
};

module.exports = {
    login
};

const loginRequired = (req, res, next) => {
    if(req.user){
        next()
    }
    else {
        return res.status(401).json({message: "Unauthorized user."})
    }
}

const readAll = (req, res) => {

    User.find()
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