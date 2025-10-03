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

const MAX_CATEGORY_NAME_LENGTH = 30;

const extraCategories = (() => {
  const categories: { name: string; imageUrl: string }[] = [];
  const usedNames = new Set<string>();

  for (let index = 0; index < EXTRA_CATEGORY_COUNT; index++) {
    const adjective = adjectives[index % adjectives.length];
    const noun = nouns[Math.floor(index / adjectives.length) % nouns.length];
    const baseName = `${adjective} ${noun}`;

    const suffix = `-${String(index + 1).padStart(2, '0')}`;
    const availableLength = MAX_CATEGORY_NAME_LENGTH - suffix.length;
    const truncatedBase = baseName.slice(0, Math.max(availableLength, 0)).trimEnd();
    let candidate = `${truncatedBase}${suffix}`;

    if (candidate.length === 0) {
      candidate = `Category${suffix}`;
    }

    if (usedNames.has(candidate)) {
      let attempt = index + EXTRA_CATEGORY_COUNT;
      do {
        const attemptSuffix = `-${String(attempt + 1).padStart(2, '0')}`;
        const attemptBase = baseName
          .slice(0, Math.max(MAX_CATEGORY_NAME_LENGTH - attemptSuffix.length, 0))
          .trimEnd();
        candidate = `${attemptBase}${attemptSuffix}`;
        attempt += 1;
      } while (usedNames.has(candidate));
    }

    usedNames.add(candidate);
    categories.push({ name: candidate, imageUrl: CATEGORY_IMAGE_PLACEHOLDER });
  }

  return categories;
})();

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
