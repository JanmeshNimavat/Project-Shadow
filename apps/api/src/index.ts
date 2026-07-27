import { Hono } from 'hono';
import { usersRoute } from './routes/users';
import { casesRoute } from './routes/cases';

type Env = {
  Bindings: {
    DB: D1Database;
    EVIDENCE_BUCKET: R2Bucket;
    SESSION_STORE: KVNamespace;
  };
};

const app = new Hono<Env>();

app.route('/api/users', usersRoute);
app.route('/api/cases', casesRoute);

app.get('/', (c) => {
  return c.json({ message: 'ShadowWatch API v2.0 is running' });
});

export default app;
