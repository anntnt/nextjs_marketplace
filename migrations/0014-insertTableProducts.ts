import type { Sql } from 'postgres';

const CATEGORY_IMAGE_PLACEHOLDER =
  'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';

const FALLBACK_CATEGORY_NAME = 'General Merchandise';

const descriptorWords = [
  'Artisan',
  'Classic',
  'Signature',
  'Heritage',
  'Modern',
  'Cozy',
  'Luxe',
  'Sustainable',
  'Limited',
  'Premium',
  'Rustic',
  'Elegant',
  'Urban',
  'Bold',
  'Refined',
  'Vibrant',
];

const fallbackProductBaseNames = [
  'Curated Gift Set',
  'Premium Lifestyle Bundle',
  'Essential Daily Carry',
  'Heritage Collector Piece',
  'Urban Utility Kit',
  'Wellness Starter Pack',
  'Crafted Home Accent',
  'Travel Ready Companion',
  'Limited Edition Release',
  'Eco Friendly Classic',
];

const normalizeCategoryName = (name: string | null | undefined) =>
  (name ?? FALLBACK_CATEGORY_NAME)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ')
    .trim();

const categoryProductBaseNames: Record<string, string[]> = {
  [normalizeCategoryName('Christmas Decorations')]: [
    'Nordic Pine Garland',
    'Glass Bauble Trio',
    'Winterberry Centerpiece',
    'Velvet Tree Skirt',
    'Snowfall LED Lights',
    'Cedar Advent Calendar',
    'Porcelain Nativity Set',
    'Lantern Window Display',
    'Frosted Wreath',
    'Starlit Mantel Village',
  ],
  [normalizeCategoryName('Christmas Gifts Ideas')]: [
    'Festive Cocoa Crate',
    'Luxury Bath Ritual Set',
    'Gourmet Cookie Collection',
    'Winter Wellness Hamper',
    'Cozy Fireside Blanket',
    'Monogram Travel Wallet',
    'Artisan Chocolate Flight',
    'Mini Projector Gift',
    'Personalized Storybook Kit',
    'Holiday Spice Tea Chest',
  ],
  [normalizeCategoryName('Fashion')]: [
    'Linen Utility Jumpsuit',
    'Wool Wrap Coat',
    'Tailored Chino Trouser',
    'Recycled Denim Jacket',
    'Silk Neck Scarf',
    'Ribbed Knit Sweater',
    'Leather Crossbody Bag',
    'Classic Chelsea Boot',
    'Organic Cotton Tee',
    'Pleated Midi Skirt',
  ],
  [normalizeCategoryName('Cosmetics')]: [
    'Botanical Facial Oil',
    'Velvet Matte Lip Duo',
    'Glow Renewal Serum',
    'Rosewater Toning Mist',
    'Mineral Finish Powder',
    'Bamboo Cleansing Balm',
    'Amber Woods Perfume',
    'Soothing Overnight Mask',
    'Vitamin C Radiance Drops',
    'Marine Collagen Cream',
  ],
  [normalizeCategoryName('Electronics')]: [
    'Smart Home Hub',
    'Noise Canceling Headphones',
    'Wireless Charging Pad',
    '4K Streaming Stick',
    'Portable Bluetooth Speaker',
    'Travel Power Bank',
    'Compact Drone Kit',
    'Smart Ambient Light Bar',
    'Mechanical Keyboard',
    'USB C Docking Station',
  ],
  [normalizeCategoryName('TV & Cameras')]: [
    'Mirrorless Travel Camera',
    'Action Cam Adventure Pack',
    'Ultra HD Media Player',
    'Studio Ring Light',
    'Wide Angle Lens Kit',
    'Wireless Lavalier Mic',
    'Portable Projector',
    'Motorized Gimbal',
    'Retro Film Scanner',
    'Smart TV Soundbar',
  ],
  [normalizeCategoryName('Clocks & Jewelry')]: [
    'Marble Mantel Clock',
    'Skeleton Wall Clock',
    'Sapphire Accent Bracelet',
    'Minimalist Steel Watch',
    'Art Deco Pendant',
    'Pearl Drop Earrings',
    'Stackable Ring Set',
    'Leather Strap Chronograph',
    'Keepsake Locket Necklace',
    'Crystal Stud Earrings',
  ],
  [normalizeCategoryName('Sports Equipment')]: [
    'Carbon Trekking Poles',
    'Breathable Training Tee',
    'Adjustable Kettlebell Set',
    'Trail Running Vest',
    'Yoga Support Block',
    'Waterproof Gym Duffel',
    'Balance Trainer Board',
    'Portable Goal Net',
    'Resistance Band Kit',
    'Insulated Bike Bottle',
  ],
  [normalizeCategoryName('Snacks')]: [
    'Savory Herb Nut Mix',
    'Dark Chocolate Sea Salt Bark',
    'Matcha Shortbread Bites',
    'Mediterranean Olive Tapenade',
    'Spiced Citrus Marmalade',
    'Artisan Cheese Crisps',
    'Rosemary Cracker Flats',
    'Dried Fruit Medley',
    'Chili Lime Corn Crunch',
    'Caramel Sea Salt Popcorn',
  ],
  [normalizeCategoryName('Home & Kitchen')]: [
    'Stoneware Baking Dish',
    'Beechwood Knife Block',
    'Recycled Glass Pitcher',
    'Cotton Napkin Set',
    'Aromatic Diffuser Lamp',
    'Modular Pantry Jar',
    'Weighted Throw Blanket',
    'Storage Basket Trio',
    'Copper Saucepan',
    'Terracotta Planter Duo',
  ],
  [normalizeCategoryName('Pets & Pet Supplies')]: [
    'Orthopedic Pet Lounger',
    'Interactive Treat Puzzle',
    'Eco Chew Toy Set',
    'Travel Water Bottle',
    'Reflective Walking Harness',
    'Ceramic Feeding Station',
    'Catnip Felt Mouse Trio',
    'Cooling Pet Bandana',
    'Pet Grooming Brush Kit',
    'Woven Leash and Collar',
  ],
  [normalizeCategoryName('Wellness')]: [
    'Meditation Floor Cushion',
    'Aromatherapy Ritual Kit',
    'Herbal Bath Soak',
    'Weighted Sleep Mask',
    'Mindful Prompt Journal',
    'Balance Essential Oil Blend',
    'Organic Matcha Tin',
    'Acupressure Mat',
    'Sound Therapy Speaker',
    'Linen Yoga Bolster',
  ],
  [normalizeCategoryName('Handicrafts')]: [
    'Macrame Plant Hanger Kit',
    'Hand Loom Weaving Set',
    'Watercolor Stationery Pack',
    'Ceramic Tile Mosaic Kit',
    'Needle Felting Workshop Box',
    'Japanese Bookbinding Kit',
    'Clay Sculpting Tools',
    'Embroidery Story Sampler',
    'Block Printing Bundle',
    'Wood Carving Starter Set',
  ],
  [normalizeCategoryName('Books')]: [
    'Illustrated Travel Journal',
    'Plant Based Kitchen Guide',
    'Nordic Design Anthology',
    'Wellness Reflection Workbook',
    'Creative Writing Prompt Deck',
    'Photography Field Manual',
    'Modern Architecture Digest',
    'Mindful Productivity Planner',
    'Global Street Food Stories',
    'Beginner Calligraphy Course',
  ],
  [normalizeCategoryName('Art')]: [
    'Gallery Canvas Triptych',
    'Archival Giclee Print',
    'Sculpted Clay Bust',
    'Textured Abstract Panel',
    'Framed Botanical Sketch',
    'Metal Wall Relief',
    'Glass Fusion Centerpiece',
    'Hand Painted Mural Kit',
    'Limited Lithograph Series',
    'Ink Wash Landscape',
  ],
  [normalizeCategoryName('Garden Equipments')]: [
    'Expandable Hose Kit',
    'Heirloom Seed Collection',
    'Adjustable Patio Sprayer',
    'Ergonomic Hand Tool Set',
    'Raised Bed Corner Brackets',
    'Gardener Kneeling Bench',
    'Self Watering Planter',
    'Solar Pathway Lanterns',
    'Pollinator Habitat House',
    'Compost Aerator Tool',
  ],
};

const getBaseNamesForCategory = (categoryName: string) =>
  categoryProductBaseNames[normalizeCategoryName(categoryName)] ??
  fallbackProductBaseNames;

const buildMeaningfulProductName = (seed: number, categoryName: string) => {
  const baseNames = getBaseNamesForCategory(categoryName);
  const baseName = baseNames[seed % baseNames.length];
  const descriptor = descriptorWords[(seed * 7 + 3) % descriptorWords.length];

  if (baseName.toLowerCase().includes(descriptor.toLowerCase())) {
    return baseName;
  }

  return `${descriptor} ${baseName}`;
};

const usedProductNameCounts = new Map<string, number>();

const getUniqueProductName = (candidateName: string) => {
  const normalizedKey = candidateName.toLowerCase();
  const currentCount = usedProductNameCounts.get(normalizedKey) ?? 0;
  usedProductNameCounts.set(normalizedKey, currentCount + 1);

  if (currentCount === 0) {
    return candidateName;
  }

  const suffix = ` #${currentCount + 1}`;
  const maxBaseLength = Math.max(0, 60 - suffix.length);
  const trimmedBase = candidateName.length > maxBaseLength
    ? candidateName.slice(0, maxBaseLength).trimEnd()
    : candidateName;

  return `${trimmedBase}${suffix}`;
};

export async function up(sql: Sql) {
  await sql`
    TRUNCATE TABLE products RESTART IDENTITY CASCADE
  `;

  const categories = await sql<{ id: number; category_name: string | null }[]>`
    SELECT id, category_name FROM product_categories
    ORDER BY id
  `;
  const categoryInfos = categories.map((row) => ({
    id: row.id,
    name: row.category_name ?? FALLBACK_CATEGORY_NAME,
  }));

  if (categoryInfos.length === 0) {
    throw new Error('Cannot seed products without product categories');
  }

  const sellers = await sql<{ id: number }[]>`
    SELECT id FROM users WHERE role_id = 2 ORDER BY id
  `;
  const sellerIds = sellers.map((seller) => seller.id);

  if (sellerIds.length === 0) {
    throw new Error('Cannot seed products without seller users');
  }

  // Dummy-Marken-Liste
  const brands = [
    'Acme Corp',
    'Global Goods',
    'Holiday Co',
    'TechBrand',
    'Everyday Essentials',
    'Generic Supplies',
    'EcoLine',
    'Festive World',
    'ValueMart',
    'SuperStore',
  ];

  const loremWords = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'in',
    'reprehenderit',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum',
  ];

  const buildProductDescription = (seed: number) => {
    const startIndex = seed % loremWords.length;
    const descWords: string[] = [];

    for (let offset = 0; offset < 12; offset++) {
      const word = loremWords[(startIndex + offset) % loremWords.length] ?? '';
      descWords.push(word);
    }

    return `Lorem ipsum dolor sit amet, ${descWords.join(
      ' ',
    )} tempor incididunt ut labore et dolore magna aliqua.`;
  };

  const generateProduct = (
    seed: number,
    categoryId: number,
    categoryName: string,
    sellerId: number,
  ) => {
    const rawName = buildMeaningfulProductName(seed, categoryName);
    const uniqueName = getUniqueProductName(rawName);
    const name =
      uniqueName.length > 60 ? uniqueName.slice(0, 60).trimEnd() : uniqueName;
    const description = buildProductDescription(seed);

    const price = Math.floor(Math.random() * 145 * 100 + 500); // store as cents (€5.00 - €149.99)

    const imageUrl = CATEGORY_IMAGE_PLACEHOLDER;
    const brand = brands[Math.floor(Math.random() * brands.length)] ?? 'Generic';

    return {
      name,
      brand,
      description,
      price,
      imageUrl,
      sellerId,
      categoryId,
    };
  };

  interface Product {
    name: string;
    brand: string;
    description: string;
    price: number;
    imageUrl: string;
    sellerId: number;
    categoryId: number;
  }

  const products: Product[] = [];

  const PRODUCTS_PER_CATEGORY = 100;

  // Seed a limited number of products per category to keep the dataset lightweight
  categoryInfos.forEach((category, index) => {
    for (let count = 0; count < PRODUCTS_PER_CATEGORY; count++) {
      const seed = index * PRODUCTS_PER_CATEGORY + count;
      const sellerId = sellerIds[seed % sellerIds.length];
      products.push(
        generateProduct(seed, category.id, category.name, sellerId),
      );
    }
  });

  const chunkSize = 100;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const values = chunk.flatMap((p) => [
      p.name,
      p.brand,
      p.description,
      p.price,
      p.imageUrl,
      p.sellerId,
      p.categoryId,
    ]);

    const valuePlaceholders = chunk
      .map(
        (_, chunkIndex) =>
          `($${chunkIndex * 7 + 1}, $${chunkIndex * 7 + 2}, $${chunkIndex * 7 + 3}, $${chunkIndex * 7 + 4}, $${chunkIndex * 7 + 5}, $${chunkIndex * 7 + 6}, $${chunkIndex * 7 + 7})`,
      )
      .join(', ');

    await sql.unsafe(
      `
      INSERT INTO products (
        name,
        brand,
        description,
        price,
        image_url,
        seller_id,
        category_id
      ) VALUES ${valuePlaceholders}
      `,
      values,
    );
  }
}

export async function down(sql: Sql) {
  await sql`
    DELETE FROM products
    WHERE image_url = ${CATEGORY_IMAGE_PLACEHOLDER}
      AND description LIKE 'Lorem ipsum dolor sit amet% tempor incididunt%'
  `;
}
