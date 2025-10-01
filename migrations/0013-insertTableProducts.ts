import type { Sql } from 'postgres';

const products = [
  {
    id: 1,
    name: 'Christmas tree hanging ornaments',
    brand: 'Holiday Co',
    price: 13,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_balls_13_wc6vaz_c_fill_w_710_h_448_dxz0qd.jpg',
    description: 'Christmas tree hanging ornaments',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 2,
    name: 'Christmas tree hanging ornaments',
    brand: 'Festive Decor',
    price: 15,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_balls_9_ze7l6a_c_fill_w_710_h_448_g_auto_psiaph.jpg',
    description: 'Christmas tree hanging ornaments',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 3,
    name: 'Christmas decoration',
    brand: 'WinterCraft',
    price: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_decor_14_mlrtnx_z61afa.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 4,
    name: 'Christmas House',
    brand: 'Snowy Homes',
    price: 27,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005663/xmas_house_27_uvfekj_zhhzx8.jpg',
    description:
      'This cozy Christmas house features a welcoming porch adorned with festive lights and holiday decorations...',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 5,
    name: 'Christmas decoration',
    brand: 'Festive World',
    price: 16,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/santa_27_ocxhfb_c_fill_w_710_h_448_jc4inf.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 6,
    name: 'Snow globe',
    brand: 'Snowy Magic',
    price: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_snow_globe_zpqoaw_c_fill_w_710_h_448_wml1hs.jpg',
    description: 'Snow globe',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 7,
    name: 'Jingle Bells',
    brand: 'BellTone',
    price: 25,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/junlebells_25_aatiuc_awm8ft.jpg',
    description: 'Jingle Bells',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 8,
    name: 'Christmas decoration',
    brand: 'Holiday Makers',
    price: 24,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005663/xmas_decor_23_2_knxwgg_c_fill_w_710_h_448_g_auto_haupzv.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 9,
    name: 'Christmas tree',
    brand: 'GreenTree Co',
    price: 219,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_tree_210_bl8six_c_fill_w_710_h_448_g_auto_t91ca5.jpg',
    description: 'Christmas tree',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 10,
    name: 'Macarons',
    brand: 'Sweet Bites',
    price: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016818/macarons_13_trtxy2_yhjsja.jpg',
    description: 'Macarons',
    seller_id: 1,
    categoryName: 'Snacks',
  },
  {
    id: 11,
    name: 'Berry Mix',
    brand: 'FreshFarm',
    price: 14,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016817/berries_14_eoj7dj_xw16b6.jpg',
    description: 'Berry Mix',
    seller_id: 1,
    categoryName: 'Snacks',
  },
  {
    id: 12,
    name: 'Donuts',
    brand: 'Donutland',
    price: 11,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016817/donuts_11_2_bfsohy_yhjfir.jpg',
    description: 'Donuts',
    seller_id: 1,
    categoryName: 'Snacks',
  },
  {
    id: 13,
    name: 'Pancakes',
    brand: 'Fluffy Foods',
    price: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016818/pancakes_9_pq7no0_rxftu1.jpg',
    description: 'Pancakes',
    seller_id: 1,
    categoryName: 'Snacks',
  },
  {
    id: 14,
    name: 'Christmas tree',
    brand: 'Festive Green',
    price: 29,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016912/xmas_tree_29_tzfayw_ilngud.jpg',
    description: 'Christmas tree',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 15,
    name: 'Christmas decoration set',
    brand: 'Holiday Pack',
    price: 36,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_wreath_36_xa98c5_c_fill_w_710_h_448_g_auto_ssoz4b.jpg',
    description: 'Christmas decoration set',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 16,
    name: 'Mini Santa',
    brand: 'SantaWorks',
    price: 17,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/santa_27_ocxhfb_c_fill_w_710_h_448_jc4inf.jpg',
    description: 'Mini Santa',
    seller_id: 1,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 17,
    name: 'Cupcakes',
    brand: 'BakeHouse',
    price: 21,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017033/cupcakes_21_n2ijnf_npygpa.jpg',
    description: 'Cupcakes',
    seller_id: 1,
    categoryName: 'Snacks',
  },
  {
    id: 18,
    name: 'Smartphone',
    brand: 'TechBrand',
    price: 449,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017095/mobile-phone_v586rg_xc7fgo.png',
    description: 'Smartphone',
    seller_id: 1,
    categoryName: 'Electronics',
  },
  {
    id: 19,
    name: 'Wireless Power Bank',
    brand: 'PowerPlus',
    price: 21,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017111/Power_Bank_Wireless_21_v5mgda_ytjjdi.jpg',
    description: 'Wireless Power Bank',
    seller_id: 1,
    categoryName: 'Christmas Gifts Ideas',
  },
  {
    id: 20,
    name: 'Christmas wreath',
    brand: 'Evergreen',
    price: 39,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017148/xmas_wreath_31_fwuc4d_vjaws7.jpg',
    description: 'Christmas wreath',
    seller_id: 3,
    categoryName: 'Christmas Decorations',
  },
  {
    id: 21,
    name: 'Bluetooth speaker',
    brand: 'SoundMax',
    price: 52,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017196/Bluetooth_speaker-52_o3r58r_c_pad_b_gen_fill_w_710_h_448_pyffk8.jpg',
    description: 'Bluetooth speaker',
    seller_id: 1,
    categoryName: 'Christmas Gifts Ideas',
  },
  {
    id: 22,
    name: 'Lipstick',
    brand: 'BeautyLine',
    price: 22,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017233/lipsticks-5893481_1280_wzq6qk_sc8oi6.jpg',
    description: 'Lipstick',
    seller_id: 1,
    categoryName: 'Christmas Gifts Ideas',
  },
  {
    id: 23,
    name: 'Doll house',
    brand: 'ToyWorld',
    price: 49,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017262/toy_hk5kt9_hymzz0.jpg',
    description: 'Doll house',
    seller_id: 1,
    categoryName: 'Christmas Gifts Ideas',
  },
];

const CATEGORY_IMAGE_PLACEHOLDER =
  'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_640,h_404/v1749471355/placeholder_yab9lx.jpg';

export async function up(sql: Sql) {
  const sellers = await sql<{ id: number }[]>`
    SELECT id
    FROM users
    WHERE role_id = 2
    ORDER BY id
  `;

  if (sellers.length === 0) {
    throw new Error('No seller users found to seed products');
  }

  const sellerIds = sellers.map((seller) => seller.id);

  const categories = await sql<{ id: number; category_name: string }[]>`
    SELECT id, category_name
    FROM product_categories
  `;

  const categoryIdByName = new Map(
    categories.map((category) => [category.category_name, category.id]),
  );

  let sellerIndex = 0;
  for (const product of products) {
    const sellerId = sellerIds[sellerIndex % sellerIds.length];
    sellerIndex += 1;
    let categoryId = categoryIdByName.get(product.categoryName);

    if (!categoryId) {
      const [newCategory] = await sql<{ id: number }[]>`
        INSERT INTO product_categories (category_name, image_url)
        VALUES (${product.categoryName}, ${CATEGORY_IMAGE_PLACEHOLDER})
        RETURNING id
      `;

      categoryId = newCategory.id;
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
