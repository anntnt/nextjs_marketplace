# Migration Review

## 0000-createTableRoles.ts
- Type: Schema
- Purpose: Creates the `roles` table
- Risk: Low
- Status: Safe and current
- Notes: Foundational table. Should remain immutable.

## 0001-createTableUsers.ts
- Type: Schema
- Purpose: Creates the `users` table
- Risk: Low
- Status: Safe and current
- Notes: Depends on `roles`. Naming differs between DB and TypeScript model, but behavior is clear.

## 0002-createTableProductCategories.ts
- Type: Schema
- Purpose: Creates the `product_categories` table
- Risk: Low
- Status: Safe and current
- Notes: Foundational category table.

## 0003-createTableProducts.ts
- Type: Schema
- Purpose: Creates the `products` table
- Risk: Medium
- Status: Safe and current
- Notes: Central table. Depends on `users` and `product_categories`. `price` is stored as integer/cents.

## 0008-insertTableProductCategories.ts
- Type: Seed
- Purpose: Inserts initial product categories
- Risk: Medium
- Status: Safe but historical
- Notes: Seed data is embedded in migration history. Keep immutable.

## 0009-insertTableRoles.ts
- Type: Seed
- Purpose: Inserts initial roles
- Risk: Medium
- Status: Safe but historical
- Notes: Uses fixed role IDs. App logic depends on these assumptions.

## 0012-insertTableUsers.ts
- Type: Seed
- Purpose: Inserts seeded buyer and seller accounts
- Risk: Medium
- Status: Safe but historical
- Notes: Useful for demo/test accounts. Depends on role names and seeded user data.

## 0014-insertTableProducts.ts
- Type: Seed
- Purpose: Inserts generated demo products
- Risk: High
- Status: Safe but historical
- Notes:
  - Truncates `products` with `TRUNCATE TABLE products RESTART IDENTITY CASCADE`
  - Destructive migration behavior
  - Should not be used as a model for future migrations
  - Keep immutable for compatibility only

## 0015-insertMinimalSeed.ts
- Type: Seed
- Purpose: Inserts fallback sample category and product
- Risk: Medium
- Status: Safe but historical
- Notes:
  - Adds `Sample Category` and `Sample Product`
  - Rollback was corrected to delete category-linked products first
  - Keep immutable

# Overall Conclusion

## Safe schema foundation
- 0000
- 0001
- 0002
- 0003

## Historical seed migrations
- 0008
- 0009
- 0012
- 0014
- 0015

## Highest-risk migration
- 0014-insertTableProducts.ts

## Rules Going Forward
- Old migrations are immutable
- New DB changes must be added as new migrations
- Do not casually delete historical migrations from a live project
- Bulk demo data should eventually move out of the permanent migration chain
