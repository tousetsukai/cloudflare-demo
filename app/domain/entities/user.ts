import { Ordinal } from "../values/ordinal";

export class User {
  constructor(
    readonly id: number,
    public username: string,
    public displayName: string,
    readonly cohortNumber: Ordinal,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  changeUsername(newUsername: string) {
    this.username = newUsername;
  }

  changeDisplayName(newDisplayName: string) {
    this.displayName = newDisplayName;
  }
}
