const express = require('express');
const router = express.Router();

//importing controller functions
const { 
    readAll, 
    readOne, 
    createData,
    updateData,
    deleteData
} = require('../controllers/artist.controller');

//importing loginRequired function
const { loginRequired } = require('../controllers/user.controller')

//defining routes
router.get('/', readAll);
router.get('/:id', readOne);
router.post('/', loginRequired, createData);  
router.put('/:id', loginRequired, updateData);  
router.delete('/:id', loginRequired, deleteData);

module.exports = router;