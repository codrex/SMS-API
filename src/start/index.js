const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet')();
const morgan = require('koa-morgan');
const fs = require('fs');

const { PORT } = require('../constants');

const accessLogStream = fs.createWriteStream('access.log', {
  flags: 'a',
});
const app = new Koa();
const bodyParser = new BodyParser();

app.use(bodyParser);
app.use(helmet);
app.use(morgan('combined', { stream: accessLogStream }));

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('App is listening on port', PORT);
});
