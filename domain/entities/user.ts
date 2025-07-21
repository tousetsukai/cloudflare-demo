import type { Ordinal } from '../values/ordinal';

export class User {
  constructor(
    readonly id: string,
    readonly email: string,
    public username: string,
    public displayName: string,
    readonly cohortNumber: Ordinal,
  ) {}

  static create(
    id: string,
    email: string,
    username: string,
    displayName: string,
    cohortNumber: Ordinal,
  ): User {
    // TODO: validate
    return new User(id, email, username, displayName, cohortNumber);
  }

  changeUsername(newUsername: string) {
    this.username = newUsername;
  }

  changeDisplayName(newDisplayName: string) {
    this.displayName = newDisplayName;
  }
}
