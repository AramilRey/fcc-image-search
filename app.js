require('dotenv').config();

const router = require('koa-router')();
const koaBody = require('koa-body');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Koa = require('koa');
const app = new Koa();
const search = require('./lib/search');
const query = require('./models/query');

app.use(koaBody());

router.get('/favicon.ico', async ctx => ctx.status = 204);
router.get('/', async ctx => ctx.body = await query.find({}).select('-__v -_id').limit(10).sort('-when'));
router.get('/:search', search);
app.use(router.routes());

app.use(async function pageNotFound(ctx) {
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found';
  }
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
mongoose.connect(`mongodb://${dbUser}:${dbPass}@ds143707.mlab.com:43707/imagesearch`).then(() => console.log('DB connection established'));

app.listen(3000, () => console.log('App initialized'));
