const express = require('express');
const router = express.Router();

const { 
    register,
    login,
    loginRequired,
    readAll
} = require('../controllers/user.controller');

router.get('/', readAll);
router.post('/register', register);
router.post('/login', login);

module.exports = router;