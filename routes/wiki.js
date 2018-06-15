const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
module.exports = router;

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});