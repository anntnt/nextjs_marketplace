import type { Sql } from 'postgres';
import { z } from 'zod';

export const userLoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export type UserLogin = {
  id: number;
  username: string;
};

const MIN_BIRTH_YEAR = 1900;

const birthDateSchema = z.preprocess(
  (value) => {
    if (value instanceof Date) return value;
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) return date;
    }
    return value;
  },
  z
    .date({
      required_error: 'Birth date is required.',
      invalid_type_error: 'Birth date: Please enter a valid date.',
    })
    .superRefine((date, ctx) => {
      if (date.getFullYear() < MIN_BIRTH_YEAR) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Birth date: Please enter a valid date.',
        });
        return;
      }

      const today = new Date();
      const threshold = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      if (date > threshold) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Birth date: You must be at least 18 years old.',
        });
      }
    }),
);

export const userSchema = z.object({
  username: z.string().min(3),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  emailAddress: z.string(),
  birthday: birthDateSchema,
  gender: z.string().optional(),
  storeName: z.string().optional(),
  uAddress: z.string().optional(),
  roleId: z.number(),
});

export type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  emailAddress: string;
  birthday: Date;
  gender: string | null;
  storeName: string | null;
  address: string | null;
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
      address varchar(50),
      role_id integer NOT NULL REFERENCES roles (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
