import { Ordinal } from '../values/ordinal';
import { PrizeSnapshot } from '../values/prizeSnapshot';

export class Andon {
  constructor(
    readonly id: number,
    readonly festivalNumber: Ordinal,
    readonly grade: number,
    readonly classNumber: number,
    public title: string,
    public description: string,
    public prizes: PrizeSnapshot[],
  ) {}
}
