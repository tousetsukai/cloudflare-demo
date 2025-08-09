export class PrizeSnapshot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly hexColor: string,
    public readonly order: number, // lower is high score
  ) {}
}
