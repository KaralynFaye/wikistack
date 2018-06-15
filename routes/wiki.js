const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
module.exports = router;
const bodyParser = require ('body-parser')

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.redirect('/');

});

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        content: req.body.content
    });

    const slugger = (title) => {
        slug = title.replace()
    }

    try {
        await page.save();
        res.redirect('/');
    } catch (err) { next(err) }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});
