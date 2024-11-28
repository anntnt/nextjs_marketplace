import type { Sql } from 'postgres';

const productCategories = [
  {
    id: 1,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739733/xmas_decoration_category_nkfqwq.png',
    name: 'Christmas Decorations',
  },
  {
    id: 2,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1732739731/category_fashion_sj9pbp.jpg',
    name: 'Fashion',
  },
  {
    id: 3,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739727/cetegory_cosmetic_tg6v6p.jpg',
    name: 'Cosmetics',
  },
  {
    id: 4,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739728/category_electronics_ler1s4.jpg',
    name: 'Electronics',
  },
  {
    id: 5,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732739733/category_tv_obnljr.webp',
    name: 'TV & Cameras',
  },
  {
    id: 6,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739729/category_Clocks_Jewelry_n86kn9.jpg',
    name: 'Clocks & Jewelry',
  },
  {
    id: 7,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732739730/category_Sport_Sports_equipment_fasc9n.jpg',
    name: 'Sports Equipment',
  },
  {
    id: 8,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732739733/category_snack_ko9frd.jpg',
    name: 'Snacks',
  },
  {
    id: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739728/category_home_kitchen_yddutj.jpg',
    name: 'Home & Kitchen',
  },
  {
    id: 10,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739730/category_pets_pet_supplies_y1lpea.jpg',
    name: 'Pets & Pet Supplies',
  },
  {
    id: 11,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739729/category_garden_equipment_iynk1z.jpg',
    name: 'Garden Equipments',
  },
  {
    id: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739728/category_wellness_ig2oox.jpg',
    name: 'Wellness',
  },
  {
    id: 13,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732739733/category_dandicraft_hpyyah.jpg',
    name: 'Handicrafts',
  },
  {
    id: 14,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732739728/category_books_pftzhr.jpg',
    name: 'Books',
  },
  {
    id: 15,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732739729/category_art_mbzekw.jpg',
    name: 'Art',
  },
  {
    id: 16,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732789133/santa-claus-2927962_1280_glsv8g.png',
    name: 'Christmas Gifts Ideas',
  },
];

export async function up(sql: Sql) {
  for (const productCategory of productCategories) {
    await sql`
      INSERT INTO
        product_categories (category_name, image_url)
      VALUES
        (
          ${productCategory.name},
          ${productCategory.image_url}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const productCategory of productCategories) {
    await sql`
      DELETE FROM product_categories
      WHERE
        id = ${productCategory.id}
    `;
  }
}
