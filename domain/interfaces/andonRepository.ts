import { Andon } from '../entities/andon';

export type UpdateAndonDto = {
  title?: string;
  description?: string;
};

export interface IAndonRepository {
  find(
    festivalNumber: number,
    grade: number,
    classNumber: number,
  ): Promise<Andon | null>;
  listByFestivalNumber(festivalNumber: number): Promise<Andon[]>;
}
