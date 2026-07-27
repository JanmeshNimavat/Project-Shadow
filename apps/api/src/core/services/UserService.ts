import { User } from '@repo/shared';
import { UserRepositoryPort } from '../ports/UserRepositoryPort';

export class UserService {
  constructor(private userRepository: UserRepositoryPort) {}

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
