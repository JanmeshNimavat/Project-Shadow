import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { CaseRepository } from '../repositories/CaseRepository';

type Env = {
  Bindings: {
    DB: D1Database;
  };
};

const casesRoute = new Hono<Env>();

casesRoute.get('/', async (c) => {
  const db = drizzle(c.env.DB);
  const repo = new CaseRepository(db);
  
  try {
    const cases = await repo.findAll();
    return c.json(cases);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

casesRoute.get('/:id', async (c) => {
  const db = drizzle(c.env.DB);
  const repo = new CaseRepository(db);
  
  try {
    const caseItem = await repo.findById(c.req.param('id'));
    if (!caseItem) return c.json({ error: 'Case not found' }, 404);
    return c.json(caseItem);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export { casesRoute };
