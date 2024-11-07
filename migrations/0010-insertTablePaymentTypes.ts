import type { Sql } from 'postgres';

const payments = [
  {
    id: 1,
    name: 'Credit card',
  },
  {
    id: 2,
    name: 'Paypal',
  },
  {
    id: 3,
    name: 'Bank transfer',
  },
];

export async function up(sql: Sql) {
  for (const payment of payments) {
    await sql`
      INSERT INTO
        payment_types (payment_name)
      VALUES
        (
          ${payment.name}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const payment of payments) {
    await sql`
      DELETE FROM payment_types
      WHERE
        id = ${payment.id}
    `;
  }
}
