import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../core/services/UserService';

type Env = {
  Bindings: {
    DB: D1Database;
  };
};

const usersRoute = new Hono<Env>();

usersRoute.get('/:id', async (c) => {
  const db = drizzle(c.env.DB);
  const repo = new UserRepository(db);
  const service = new UserService(repo);
  
  try {
    const user = await service.getUserProfile(c.req.param('id'));
    return c.json(user);
  } catch (error: any) {
    return c.json({ error: error.message }, 404);
  }
});

export { usersRoute };
