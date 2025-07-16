import { User } from '../entities/user';
import { Ordinal } from '../values/ordinal';

export type CreateUserDto = {
  id: string;
  email: string;
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
  create(userData: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: string, userData: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<void>;
}
