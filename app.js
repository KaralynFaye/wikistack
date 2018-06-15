const morgan = require('morgan');
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const layout = require('./views/layout')
const {db} = require ('./models');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) =>{
  res.send(layout());
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
