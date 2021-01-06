import { ApolloServer } from 'apollo-server-koa';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import serve from 'koa-static';
import send from 'koa-send';
import path from 'path';
import schema from './libs/schema';
import upload from './route/upload';

const app = new Koa();
const router = new Router();
const rootDir = path.resolve(process.cwd(), './../client/out');

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://closed-status.shop'
        : 'http://localhost:3000',
  })
);
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(rootDir));
app.use(async (ctx: Context) => {
  if (
    ctx.status === 404 &&
    ctx.path.indexOf('/graphql') !== 0 &&
    ctx.path.indexOf('/upload') !== 0
  ) {
    await send(ctx, 'index.html', {
      root: rootDir,
    });
  }
});

const apollo = new ApolloServer({
  schema,
});

router.use('/upload', upload.routes());
router.get('/graphql', apollo.getMiddleware());
router.post('/graphql', apollo.getMiddleware());

apollo.applyMiddleware({ app, cors: false });

export default app;
