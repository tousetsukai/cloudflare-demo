import { Ordinal } from '../values/ordinal';

export class Andon {
  constructor(
    readonly id: number,
    readonly festivalNumber: Ordinal,
    readonly grade: number,
    readonly classNumber: number,
    public title: string,
    public description: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }

  changeDescription(newDescription: string) {
    this.description = newDescription;
  }
}
