const morgan = require('morgan');
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const layout = require('./views/layout')
const index = require ('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
const PORT = 1337;

const sync = async () => {
  await index.db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
  })
}

sync();

app.get('/', (req, res, next) =>{
  res.send(layout());
})