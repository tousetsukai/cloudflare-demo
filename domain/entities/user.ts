import { Ordinal } from '../values/ordinal';

export class User {
  constructor(
    readonly id: string,
    readonly auth0Id: string,
    public username: string,
    public displayName: string,
    readonly cohortNumber: Ordinal,
  ) {}

  static create(
    id: string,
    auth0Id: string,
    username: string,
    displayName: string,
    cohortNumber: Ordinal,
  ): User {
    return new User(id, auth0Id, username, displayName, cohortNumber);
  }

  changeUsername(newUsername: string) {
    this.username = newUsername;
  }

  changeDisplayName(newDisplayName: string) {
    this.displayName = newDisplayName;
  }
}
