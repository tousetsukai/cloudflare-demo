import { PrizeSnapshot } from '../values/prizeSnapshot';

export class Prize {
  constructor(
    readonly id: number,
    public name: string,
    public hexColor: string,
    public order: number, // lower is high score
  ) {}

  // 変更不可のスナップショット
  snapshot(): PrizeSnapshot {
    return new PrizeSnapshot(this.id, this.name, this.hexColor, this.order);
  }
}
