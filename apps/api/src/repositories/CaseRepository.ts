import { DrizzleD1Database } from 'drizzle-orm/d1';
import { cases } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

export class CaseRepository {
  constructor(private db: DrizzleD1Database) {}

  async findAll() {
    return await this.db.select().from(cases).orderBy(desc(cases.created_at)).all();
  }

  async findById(id: string) {
    return await this.db.select().from(cases).where(eq(cases.id, id)).get();
  }

  async create(caseData: typeof cases.$inferInsert) {
    return await this.db.insert(cases).values(caseData).returning().get();
  }
}
