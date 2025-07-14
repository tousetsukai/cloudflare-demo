import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './app/db/schema.ts',
  casing: 'snake_case',
  out: './migrations',
});
