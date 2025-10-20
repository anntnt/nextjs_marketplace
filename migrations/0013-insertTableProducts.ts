import type { Sql } from 'postgres';

const rawProducts = [
  {
    id: 1,
    name: 'Christmas tree hanging ornaments',
    brand: 'Holiday Co',
    price: 1300,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_balls_13_wc6vaz_c_fill_w_710_h_448_dxz0qd.jpg',
    description: 'Christmas tree hanging ornaments',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 2,
    name: 'Christmas tree hanging ornaments',
    brand: 'Festive Decor',
    price: 1500,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_balls_9_ze7l6a_c_fill_w_710_h_448_g_auto_psiaph.jpg',
    description: 'Christmas tree hanging ornaments',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 3,
    name: 'Christmas decoration',
    brand: 'WinterCraft',
    price: 900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_decor_14_mlrtnx_z61afa.jpg',
    description: 'Christmas decoration',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 4,
    name: 'Christmas House',
    brand: 'Snowy Homes',
    price: 2700,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005663/xmas_house_27_uvfekj_zhhzx8.jpg',
    description:
      'This cozy Christmas house features a welcoming porch adorned with festive lights and holiday decorations...',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 5,
    name: 'Christmas decoration',
    brand: 'Festive World',
    price: 1600,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/santa_27_ocxhfb_c_fill_w_710_h_448_jc4inf.jpg',
    description: 'Christmas decoration',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 6,
    name: 'Snow globe',
    brand: 'Snowy Magic',
    price: 1200,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_snow_globe_zpqoaw_c_fill_w_710_h_448_wml1hs.jpg',
    description: 'Snow globe',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 7,
    name: 'Jingle Bells',
    brand: 'BellTone',
    price: 2500,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/junlebells_25_aatiuc_awm8ft.jpg',
    description: 'Jingle Bells',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 8,
    name: 'Christmas decoration',
    brand: 'Holiday Makers',
    price: 2400,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005663/xmas_decor_23_2_knxwgg_c_fill_w_710_h_448_g_auto_haupzv.jpg',
    description: 'Christmas decoration',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 9,
    name: 'Christmas tree',
    brand: 'GreenTree Co',
    price: 21900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_tree_210_bl8six_c_fill_w_710_h_448_g_auto_t91ca5.jpg',
    description: 'Christmas tree',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 10,
    name: 'Macarons',
    brand: 'Sweet Bites',
    price: 1200,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016818/macarons_13_trtxy2_yhjsja.jpg',
    description: 'Macarons',
    categoryName: 'Snacks',
  },
  {
    id: 11,
    name: 'Berry Mix',
    brand: 'FreshFarm',
    price: 1400,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016817/berries_14_eoj7dj_xw16b6.jpg',
    description: 'Berry Mix',
    categoryName: 'Snacks',
  },
  {
    id: 12,
    name: 'Donuts',
    brand: 'Donutland',
    price: 1100,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016817/donuts_11_2_bfsohy_yhjfir.jpg',
    description: 'Donuts',
    categoryName: 'Snacks',
  },
  {
    id: 13,
    name: 'Pancakes',
    brand: 'Fluffy Foods',
    price: 900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016818/pancakes_9_pq7no0_rxftu1.jpg',
    description: 'Pancakes',
    categoryName: 'Snacks',
  },
  {
    id: 14,
    name: 'Christmas tree',
    brand: 'Festive Green',
    price: 2900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016912/xmas_tree_29_tzfayw_ilngud.jpg',
    description: 'Christmas tree',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 15,
    name: 'Christmas decoration set',
    brand: 'Holiday Pack',
    price: 3600,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_wreath_36_xa98c5_c_fill_w_710_h_448_g_auto_ssoz4b.jpg',
    description: 'Christmas decoration set',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 16,
    name: 'Mini Santa',
    brand: 'SantaWorks',
    price: 1700,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/santa_27_ocxhfb_c_fill_w_710_h_448_jc4inf.jpg',
    description: 'Mini Santa',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 17,
    name: 'Cupcakes',
    brand: 'BakeHouse',
    price: 2100,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017033/cupcakes_21_n2ijnf_npygpa.jpg',
    description: 'Cupcakes',
    categoryName: 'Snacks',
  },
  {
    id: 18,
    name: 'Smartphone',
    brand: 'TechBrand',
    price: 44900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017095/mobile-phone_v586rg_xc7fgo.png',
    description: 'Smartphone',
    categoryName: 'Electronics',
  },
  {
    id: 19,
    name: 'Wireless Power Bank',
    brand: 'PowerPlus',
    price: 2100,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017111/Power_Bank_Wireless_21_v5mgda_ytjjdi.jpg',
    description: 'Wireless Power Bank',
    categoryName: 'Christmas Gifts Ideas',
  },
  {
    id: 20,
    name: 'Christmas wreath',
    brand: 'Evergreen',
    price: 3900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017148/xmas_wreath_31_fwuc4d_vjaws7.jpg',
    description: 'Christmas wreath',
    categoryName: 'Christmas Decorations',
  },
  {
    id: 21,
    name: 'Bluetooth speaker',
    brand: 'SoundMax',
    price: 5200,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017196/Bluetooth_speaker-52_o3r58r_c_pad_b_gen_fill_w_710_h_448_pyffk8.jpg',
    description: 'Bluetooth speaker',
    categoryName: 'Christmas Gifts Ideas',
  },
  {
    id: 22,
    name: 'Lipstick',
    brand: 'BeautyLine',
    price: 2200,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017233/lipsticks-5893481_1280_wzq6qk_sc8oi6.jpg',
    description: 'Lipstick',
    categoryName: 'Christmas Gifts Ideas',
  },
  {
    id: 23,
    name: 'Doll house',
    brand: 'ToyWorld',
    price: 4900,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017262/toy_hk5kt9_hymzz0.jpg',
    description: 'Doll house',
    categoryName: 'Christmas Gifts Ideas',
  },
];

const sellerUsernames = ['seller1', 'seller2', 'seller3'];

const products = rawProducts.map((product, index) => ({
  ...product,
  sellerUsername: sellerUsernames[index % sellerUsernames.length],
}));

const CATEGORY_IMAGE_PLACEHOLDER =
  'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';

export async function up(sql: Sql) {
  const sellers = await sql<{ id: number; username: string }[]>`
    SELECT id, username
    FROM users
    WHERE username = ANY(${sellerUsernames})
  `;

  if (sellers.length === 0) {
    throw new Error('No seller users found to seed products');
  }

  const sellerIdByUsername = new Map(
    sellers.map((seller) => [seller.username, seller.id]),
  );

  const categories = await sql<{ id: number; category_name: string }[]>`
    SELECT id, category_name
    FROM product_categories
  `;

  const categoryIdByName = new Map(
    categories.map((category) => [category.category_name, category.id]),
  );

  for (const product of products) {
    const sellerId = product.sellerUsername
      ? sellerIdByUsername.get(product.sellerUsername)
      : undefined;
    if (!sellerId) {
      throw new Error(
        `Seller with username "${product.sellerUsername}" not found. Ensure seeding users run first.`,
      );
    }

    let categoryId = categoryIdByName.get(product.categoryName);

    if (!categoryId) {
      const [newCategory] = await sql<{ id: number }[]>`
        INSERT INTO product_categories (category_name, image_url)
        SELECT ${product.categoryName}, ${CATEGORY_IMAGE_PLACEHOLDER}
        WHERE NOT EXISTS (
          SELECT 1
          FROM product_categories
          WHERE category_name = ${product.categoryName}
        )
        RETURNING id
      `;

      if (newCategory?.id) {
        categoryId = newCategory.id;
      } else {
        const [existingCategory] = await sql<{ id: number }[]>`
          SELECT id
          FROM product_categories
          WHERE category_name = ${product.categoryName}
          LIMIT 1
        `;

        categoryId = existingCategory?.id;
      }

      if (!categoryId) {
        throw new Error(
          `Required category "${product.categoryName}" missing and could not be created.`,
        );
      }

      categoryIdByName.set(product.categoryName, categoryId);
    }
    await sql`
      INSERT INTO
        products (
          name,
          brand,
          price,
          image_url,
          description,
          seller_id,
          category_id
        )
      VALUES
        (
          ${product.name},
          ${product.brand},
          ${product.price},
          ${product.image_url},
          ${product.description},
          ${sellerId},
          ${categoryId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products
      WHERE
        name = ${product.name}
        AND brand = ${product.brand}
    `;
  }
}
