import type { Sql } from 'postgres';
import { z } from 'zod';

export type Image = {
  id: number;
  url: string;
  type: string;
};

export const imageSchema = z.object({
  imageUrl: z.string().url(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE images (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      url varchar(255) NOT NULL,
      type varchar(20) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE images`;
}
