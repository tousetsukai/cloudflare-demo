import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

const timestamps = {
  createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
};

export const users = sqliteTable('users', {
  id: integer().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  displayName: text().notNull(),
  cohortNumber: integer().notNull(), // 卒業期
  profile: text(),
  // 高々3つなのでベタ書きしているが要検討
  // 学年ごとに役割 (責任者、針金チーフなど) も入れたい
  grade1ClassNumber: integer(), // cohortNumber=60, grade1ClassNumber=5 なら行灯は 58th1-5
  grade2ClassNumber: integer(),
  grade3ClassNumber: integer(),
  ...timestamps,
});

export const festivals = sqliteTable('festivals', {
  id: integer().primaryKey({ autoIncrement: true }),
  festivalNumber: integer().notNull().unique(),
  theme: text().notNull(), // テーマまだ発表されていない状態で作ることもあるかもしれないが、not null から nullable にするのは簡単なのでこのまま
  themeKana: text(), // よみがなは不明なことがある
  // 行列開催日、準備開始日も入れたい
  ...timestamps,
});

// 今後クラスの行灯以外の行灯 (灯雪会行灯など) も扱う可能性があるため class_andons みたいな名前にするか迷うが、結局クラスの行灯がメインなので andons とする
export const andons = sqliteTable(
  'andons',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    festivalId: integer().notNull(), // festivalNumber のほうがいい説
    grade: integer().notNull(),
    classNumber: integer().notNull(), // クラス番号が不明なケースがあり、その場合はマイナスとする (URL に入れたいので何らかの値は必要)
    title: text(),
    description: text(),
    score: real(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('andon_festival_id_grade_class_number_key').on(
      table.festivalId,
      table.grade,
      table.classNumber,
    ),
    index('andon_festival_id_idx').on(table.festivalId),
  ],
);

export const prizes = sqliteTable('prizes', {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  hexColor: text().notNull(),
  order: integer().notNull(), // lower is high score
  ...timestamps,
});

export const classroomPrizes = sqliteTable(
  'andon_prizes',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    andonId: integer()
      .notNull()
      .references(() => andons.id),
    prizeId: integer()
      .notNull()
      .references(() => prizes.id),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('andon_prizes_andon_id_prize_id_key').on(
      table.andonId,
      table.prizeId,
    ),
    index('andon_prizes_andon_id_idx').on(table.andonId),
    index('andon_prizes_prize_id_idx').on(table.prizeId),
  ],
);

export const articles = sqliteTable('articles', {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  ownerId: integer().references(() => users.id), // ユーザ退会時に削除されないようにする
  // TODO: editors
  ...timestamps,
});
