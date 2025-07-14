import { drizzle } from 'drizzle-orm/d1';
import { eq, sql } from 'drizzle-orm';
import { users } from './schema';
import {
  IUserRepository,
  CreateUserDto,
  UpdateUserDto,
} from '../domain/interfaces/repositories';
import { User } from '../domain/entities/user';
import { Ordinal } from '../domain/values/ordinal';

export class UserRepository implements IUserRepository {
  private db;

  constructor(db: D1Database) {
    this.db = drizzle(db, { casing: 'snake_case' });
  }

  toEntity(row: {
    id: number;
    username: string;
    displayName: string;
    cohortNumber: number;
    createdAt: string;
    updatedAt: string;
  }): User {
    return new User(
      row.id,
      row.username,
      row.displayName,
      new Ordinal(row.cohortNumber),
      new Date(row.createdAt),
      new Date(row.updatedAt),
    );
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const values = {
      ...userData,
      cohortNumber: userData.cohortNumber.inner,
    };
    const [user] = await this.db.insert(users).values(values).returning();
    return this.toEntity(user);
  }

  async findUserById(id: number): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user ? this.toEntity(user) : null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user ? this.toEntity(user) : null;
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User | null> {
    const values = {
      ...userData,
      cohortNumber: userData.cohortNumber?.inner,
      updatedAt: sql`(CURRENT_TIMESTAMP)`,
    };
    const [user] = await this.db
      .update(users)
      .set(values)
      .where(eq(users.id, id))
      .returning();
    return user ? this.toEntity(user) : null;
  }

  async deleteUser(id: number): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }
}
