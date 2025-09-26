import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  // Convert to cents (integer)
  await sql`
    ALTER TABLE products
    ALTER COLUMN price TYPE INTEGER USING (ROUND(price * 100))
  `;
}

export async function down(sql: Sql) {
  // Revert back to NUMERIC(10,2) if needed
  await sql`
    ALTER TABLE products
    ALTER COLUMN price TYPE NUMERIC(10,2) USING price / 100.0
  `;
}
