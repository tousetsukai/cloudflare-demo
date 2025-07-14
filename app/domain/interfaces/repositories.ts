import { User } from '../entities/user';
import { Ordinal } from '../values/ordinal';

export type CreateUserDto = {
  username: string;
  displayName: string;
  cohortNumber: Ordinal;
};

export type UpdateUserDto = {
  username?: string;
  displayName?: string;
  cohortNumber?: Ordinal;
};

export interface IUserRepository {
  createUser(userData: CreateUserDto): Promise<User>;
  findUserById(id: number): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
  updateUser(id: number, userData: UpdateUserDto): Promise<User | null>;
  deleteUser(id: number): Promise<void>;
}
