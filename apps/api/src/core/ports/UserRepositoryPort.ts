import { User } from '@repo/shared';

export interface UserRepositoryPort {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(user: Omit<User, 'created_at'>): Promise<User>;
}
