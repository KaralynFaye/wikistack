const express = require('express');
const router = express.Router();
module.exports = router;
const { Page } = require('../models');
const { User } = require('../models');
const userList = require('../views/userList');
const userPages = require('../views/userPages')

router.get('/', async (req, res, next) => {
    const users = await User.findAll();
    res.send(userList(users));
})

router.get('/:id', async (req, res, next) => {
    const user = await User.findOne({
        where: {id: req.param.id}
    })
    const pages = await Pages.findAll({where: {author: req.param.id}})
    res.send(userPages(user, pages));
})