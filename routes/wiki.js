const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
module.exports = router;
const bodyParser = require ('body-parser')
const wikiPage = require('../views/wikiPage');
const main = require ('../views/main')
const { User } = require('../models');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    try{
        const pages = await Page.findAll();
        res.send(main(pages));

    }
    catch(err){next(err)}

});

router.post('/', async (req, res, next) => {

    const page = new Page({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const author = await User.findOrCreate({where: {name: req.body.author}});
        page.setAuthor(author[0].id);
    } catch (err) { console.log('broken')}

    Page.beforeValidate((pg)=> {
        pg.slug = slugger(pg.title);
    })

    const slugger = (title) => {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');

    }

    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch (err) { next(err) }

});

router.get('/add', (req, res, next) => {
    res.send(addPage());

});

router.get('/:slug', async (req,res,next) => {

    try{
        const page = await Page.findOne({
            where:{slug: req.params.slug}
        })
        if (!page){
            res.send(404, 'Page not Found')
        }
        const author = await page.getAuthor();
        res.send(wikiPage(page, author));
    }
    catch(err){next(err)}
})
