import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      sender_id integer NOT NULL REFERENCES users (id),
      receiver_id integer NOT NULL REFERENCES users (id),
      content text NOT NULL,
      sending_timestamp timestamp NOT NULL,
      is_read boolean NOT NULL DEFAULT FALSE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE messages`;
}
