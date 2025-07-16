import { User } from '../entities/user';
import { Ordinal } from '../values/ordinal';

export type UpdateUserDto = {
  username?: string;
  displayName?: string;
  cohortNumber?: Ordinal;
};

export interface IUserRepository {
  nextId(): Promise<string>;
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: string, userData: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<void>;
}
