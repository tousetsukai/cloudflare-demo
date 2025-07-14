export class Ordinal {
  constructor(public readonly inner: number) {}

  equals(other: Ordinal): boolean {
    return this.inner === other.inner;
  }

  toString(): string {
    switch (this.inner % 100) {
      case 11:
      case 12:
      case 13:
        return `${this.inner}th`;
      default:
        switch (this.inner % 10) {
          case 1:
            return `${this.inner}st`;
          case 2:
            return `${this.inner}nd`;
          case 3:
            return `${this.inner}rd`;
          default:
            return `${this.inner}th`;
        }
    }
  }
}
