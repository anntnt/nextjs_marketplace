import type { Sql } from 'postgres';

const THRESHOLD = 20000; // €200.00 in cents

export async function up(sql: Sql) {
  await sql`
    UPDATE products
    SET price = ROUND(price / 100.0)
    WHERE price > ${THRESHOLD}
  `;
}

export async function down(sql: Sql) {
  // No-op: price normalization is idempotent and not safely reversible
}
