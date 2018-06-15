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
    try {
      const user = await User.findOne({
      where: {id: req.params.id}
      })
      const pages = await Page.findAll({where: {authorId: req.params.id}})
      res.send(userPages(user, pages));
    }
    catch (err) {console.log('user issue')}
})
