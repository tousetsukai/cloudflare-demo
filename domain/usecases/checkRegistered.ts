import { IUserRepository } from '../interfaces/userRepository';

export class CheckRegisteredUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user !== null;
  }
}
