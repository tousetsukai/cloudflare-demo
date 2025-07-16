import { Ordinal } from '../values/ordinal';

// 北高祭と行灯は一対多の関係だが、整合しないといけないデータはないため、集約にはしない
export class Festival {
  constructor(
    readonly id: Ordinal,
    public theme?: string,
    public themeKana?: string,
  ) {}
}
