import type { Sql } from 'postgres';

const productCategories = [
  {
    id: 1,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_wreath_36_xa98c5_c_fill_w_710_h_448_g_auto_ssoz4b.jpg',
    name: 'Christmas Decorations',
  },

  {
    id: 2,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017899/category_xmas_gift_muekuz.png',
    name: 'Christmas Gifts Ideas',
  },
  {
    id: 3,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017905/category_fashion_sj9pbp_c_fill_w_710_h_448_g_auto_cmcp0m.jpg',
    name: 'Fashion',
  },
  {
    id: 4,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017897/cetegory_cosmetic_tg6v6p_ktjbhk.jpg',
    name: 'Cosmetics',
  },
  {
    id: 5,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017918/category_electronics_ler1s4_zpkabm.jpg',
    name: 'Electronics',
  },
  {
    id: 6,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017908/category_tv_obnljr_c_fill_w_710_h_448_g_auto_l08ue7.webp',
    name: 'TV & Cameras',
  },
  {
    id: 7,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017900/category_Clocks_Jewelry_n86kn9_tm04wt.jpg',
    name: 'Clocks & Jewelry',
  },
  {
    id: 8,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017906/category_Sport_Sports_equipment_fasc9n_c_fill_w_710_h_448_g_auto_zcfdl5.jpg',
    name: 'Sports Equipment',
  },
  {
    id: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017904/category_snack_ko9frd_c_fill_w_710_h_448_g_auto_qt1zkx.jpg',
    name: 'Snacks',
  },
  {
    id: 10,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017910/category_home_kitchen_yddutj_mpgd34.jpg',
    name: 'Home & Kitchen',
  },
  {
    id: 11,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017902/category_pets_pet_supplies_y1lpea_adhkpq.jpg',
    name: 'Pets & Pet Supplies',
  },
  {
    id: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017912/category_wellness_jw5rge.jpg',
    name: 'Wellness',
  },
  {
    id: 13,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017907/category_handicraft_hpyyah_kyyfct.jpg',
    name: 'Handicrafts',
  },
  {
    id: 14,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017898/category_books_pftzhr_c_fill_w_710_h_448_g_auto_abuzji.jpg',
    name: 'Books',
  },
  {
    id: 15,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017915/category_art_mbzekw_c_fill_w_710_h_448_g_auto_hwqzge.jpg',
    name: 'Art',
  },
  {
    id: 16,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017901/category_garden_equipment_iynk1z_e7l85s.jpg',
    name: 'Garden Equipments',
  },
];

export async function up(sql: Sql) {
  for (const productCategory of productCategories) {
    await sql`
      INSERT INTO
        product_categories (category_name, image_url)
      SELECT
        ${productCategory.name},
        ${productCategory.image_url}
      WHERE NOT EXISTS (
        SELECT 1
        FROM product_categories
        WHERE category_name = ${productCategory.name}
      )
    `;
  }
}

export async function down(sql: Sql) {
  for (const productCategory of productCategories) {
    await sql`
      DELETE FROM product_categories
      WHERE
        category_name = ${productCategory.name}
    `;
  }
}