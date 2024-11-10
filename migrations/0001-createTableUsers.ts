import type { Sql } from 'postgres';
import { z } from 'zod';

export const userLoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type UserLogin = {
  id: number;
  username: string;
};

export const userSchema = z.object({
  username: z.string().min(3),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(3),
  emailAddress: z.string(),
  birthday: z.coerce.date(),
  gender: z.string().optional(),
  storeName: z.string().optional(),
  uAddress: z.string().optional(),
  roleId: z.number(),
});

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  birthday: Date;
  gender: string | null;
  storeName: string | null;
  uAddress: string | null;
  roleId: number;
};
export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(50) NOT NULL,
      firstname varchar(50) NOT NULL,
      lastname varchar(50) NOT NULL,
      email_address varchar(50) NOT NULL,
      password_hash varchar(150) NOT NULL,
      birthday date NOT NULL,
      gender varchar(10),
      store_name varchar(50),
      u_address varchar(50),
      role_id integer NOT NULL REFERENCES roles (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
