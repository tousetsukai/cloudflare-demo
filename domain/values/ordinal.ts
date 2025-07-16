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

  static parse(s: string): Ordinal {
    const match = s.match(/^([1-9]\d*)(st|nd|rd|th)$/);
    if (!match) {
      throw new Error(`Invalid ordinal string: ${s}`);
    }
    const value = parseInt(match[1], 10);
    if (isNaN(value)) {
      throw new Error(`Invalid number in ordinal string: ${s}`);
    }
    return new Ordinal(value);
  }
}
