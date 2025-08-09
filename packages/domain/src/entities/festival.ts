import type { Ordinal } from '../values/ordinal';

// 北高祭と行灯は一対多の関係だが、整合しないといけないデータはないため、集約にはしない
export class Festival {
  constructor(
    readonly id: number,
    readonly number: Ordinal,
    readonly theme?: string,
    readonly themeKana?: string,
  ) {}
}
