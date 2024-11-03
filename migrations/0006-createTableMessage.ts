import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user1_id integer NOT NULL REFERENCES users (id),
      user2_id integer NOT NULL REFERENCES users (id),
      message_content varchar(255) NOT NULL,
      message_time timestamp NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE messages cascade`;
}
