const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
module.exports = router;
const bodyParser = require ('body-parser')

//router.use(bodyParser.urlencoded({extended:true}));
//router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.redirect('/');

});

router.post('/', (req, res, next) => {

});

router.get('/add', (req, res, next) => {
    res.send(addPage());
    //res.json(req.body);
});
