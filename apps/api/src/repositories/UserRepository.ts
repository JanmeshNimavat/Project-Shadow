import { DrizzleD1Database } from 'drizzle-orm/d1';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { User } from '@repo/shared';

export class UserRepository {
  constructor(private db: DrizzleD1Database) {}

  async findById(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).get();
    return result as User | undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).get();
    return result as User | undefined;
  }

  async create(user: Omit<User, 'created_at'>): Promise<User> {
    const result = await this.db.insert(users).values(user).returning().get();
    return result as User;
  }
}
