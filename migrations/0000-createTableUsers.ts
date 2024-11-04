import type { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3),
  /*firstName: z.string(),
  lastName: z.string(),*/
  password: z.string().min(3),
  /* emailAddress: z.string(),
  birthDate: z.coerce.date().optional(),
  gender: z.string(),
  uAddress: z.string().optional(),*/
});

export type User = {
  id: number;
  username: string;
  /* firstName: string;
  lastName: string;
  emailAddress: string;
  birthDate: Date;
  gender: string;
  uAddress: string;*/
};
export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(50) NOT NULL,
      firstname varchar(50),
      lastname varchar(50),
      email_address varchar(50),
      password_hash varchar(150) NOT NULL,
      birthday date,
      gender varchar(10),
      u_address varchar(50)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
