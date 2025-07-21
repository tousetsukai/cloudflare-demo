import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './infra/d1/schema.ts',
  casing: 'snake_case',
  out: './migrations',
});
