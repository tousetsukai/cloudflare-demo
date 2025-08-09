import { User } from '../entities/user';
import type { IUserRepository } from '../interfaces/userRepository';
import { Ordinal } from '../values/ordinal';

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    email: string,
    username: string,
    displayName: string,
    cohortNumber: number,
  ): Promise<User> {
    // Check if the user already exists
    const existingEmailUser = await this.userRepository.findByEmail(email);
    if (existingEmailUser) {
      throw new Error('The email already registered');
    }
    const existingUsernameUser =
      await this.userRepository.findByUsername(username);
    if (existingUsernameUser) {
      throw new Error('The username already registered');
    }

    // Create a new user
    const id = await this.userRepository.nextId();
    const user = User.create(
      id,
      email,
      username,
      displayName,
      new Ordinal(cohortNumber),
    );
    await this.userRepository.create(user);

    return user;
  }
}
