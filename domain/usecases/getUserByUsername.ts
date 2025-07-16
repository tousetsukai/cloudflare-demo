import { User } from '../entities/user';
import { IUserRepository } from '../interfaces/userRepository';

export class GetUserByUsernameUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
