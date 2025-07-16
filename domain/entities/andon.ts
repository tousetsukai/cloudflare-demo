import { Ordinal } from '../values/ordinal';
import { PrizeSnapshot } from '../values/prizeSnapshot';

export class Andon {
  constructor(
    readonly id: number,
    readonly festivalNumber: Ordinal,
    readonly grade: number,
    readonly classNumber: number,
    readonly title: string,
    readonly description: string,
    readonly prizes: PrizeSnapshot[], // 賞のデータの view だけで変更できないということを明示したい
  ) {}
}
