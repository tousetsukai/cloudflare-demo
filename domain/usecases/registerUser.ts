import { User } from '../entities/user';
import { IUserRepository } from '../interfaces/userRepository';
import { Ordinal } from '../values/ordinal';

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, username: string): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already registered');
    }

    // Create a new user
    const userData = {
      id: crypto.randomUUID(), // TODO: Generate a unique ID
      email,
      username,
      displayName: username, // Default display name to username
      cohortNumber: new Ordinal(1), // Default cohort number, can be adjusted later
    };

    return this.userRepository.create(userData);
  }
}
