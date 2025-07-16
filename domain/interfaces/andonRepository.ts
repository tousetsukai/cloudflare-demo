import { Andon } from '../entities/andon';

export type UpdateAndonDto = {
  title?: string;
  description?: string;
};

export interface IAndonRepository {
  nextId(): Promise<string>;
  find(
    festivalNumber: number,
    grade: number,
    classNumber: number,
  ): Promise<Andon | null>;
  listByFestivalNumber(festivalNumber: number): Promise<Andon[]>;
}
