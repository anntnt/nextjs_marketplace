import type { Sql } from 'postgres';

const adjectives = [
  'Aurora',
  'Harvest',
  'Velvet',
  'Cascade',
  'Golden',
  'Echo',
  'Silver',
  'Maple',
  'Cedar',
  'Azure',
  'Ember',
  'Marble',
  'Juniper',
  'Willow',
  'Saffron',
  'Midnight',
  'Serene',
  'Coastal',
  'Evergreen',
  'Crystal',
];

const nouns = [
  'Collective',
  'Boutique',
  'Emporium',
  'Market',
  'Goods',
  'Outfitters',
  'Treasures',
  'Provisions',
  'Supply',
  'Gallery',
  'Curations',
  'Bazaar',
  'Depot',
  'Exchange',
  'Haven',
  'Vault',
  'Workshop',
  'Corner',
  'Showcase',
  'Collections',
];

const CATEGORY_IMAGE_PLACEHOLDER =
  'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';

const EXTRA_CATEGORY_COUNT = 60;

const extraCategories = Array.from({ length: EXTRA_CATEGORY_COUNT }, (_, index) => {
  const adjective = adjectives[index % adjectives.length];
  const noun = nouns[Math.floor(index / adjectives.length) % nouns.length];
  const name = `${adjective} ${noun}`.slice(0, 30);

  return {
    name,
    imageUrl: CATEGORY_IMAGE_PLACEHOLDER,
  };
});

export async function up(sql: Sql) {
  for (const category of extraCategories) {
    await sql`
      INSERT INTO product_categories
        (category_name, image_url)
      VALUES
        (${category.name}, ${category.imageUrl})
    `;
  }
}

export async function down(sql: Sql) {
  for (const category of extraCategories) {
    await sql`
      DELETE FROM product_categories
      WHERE category_name = ${category.name}
    `;
  }
}
