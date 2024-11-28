import type { Sql } from 'postgres';

const products = [
  {
    id: 1,
    name: 'Christmas tree hanging ornaments',
    price: 13,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732740978/Christmas_Tree_Hanging_Ornaments_13_dzzntk.jpg',
    description: 'Christmas tree hanging ornaments',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 2,
    name: 'Christmas tree hanging ornaments',
    price: 15,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732740969/Christmas_Tree_Hanging_Ornaments_15_f20qa5.jpg',
    description: 'Christmas tree hanging ornaments',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 3,
    name: 'Christmas balls',
    price: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732740968/xmas_balls_9_ze7l6a.jpg',
    description: 'Christmas balls',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 4,
    name: 'Christmas House',
    price: 27,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732740967/xmas_house_27_uvfekj.jpg',
    description:
      'This cozy Christmas house features a welcoming porch adorned with festive lights and holiday decorations, creating a warm, inviting atmosphere. Perfect for adding a touch of holiday cheer to any space, this charming scene embodies the spirit of Christmas and is ideal for gift-giving or seasonal decor.',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 5,
    name: 'Christmas balls',
    price: 6,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732740969/xmas_balls_6_p5pesj.jpg',
    description: 'Christmas balls',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 6,
    name: 'Snow globe',
    price: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732740969/xmas_snow_globe_zpqoaw.jpg',
    description: 'Snow globe',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 7,
    name: 'Jingle Bells',
    price: 25,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732740969/junlebells_25_aatiuc.jpg',
    description: 'Jingle Bells',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 8,
    name: 'Christmas decoration',
    price: 24,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732740975/xmas_decor_23_ltteve.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 9,
    name: 'Christmas tree',
    price: 219,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732740973/xmas_tree_210_bl8six.jpg',
    description: 'Christmas tree',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 10,
    name: 'Macarons',
    price: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732742164/macarons_13_trtxy2.jpg',
    description: 'Macarons',
    seller_id: 1,
    category_id: 8,
  },
  {
    id: 11,
    name: 'Berry Mix',
    price: 14,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732742160/berries_14_eoj7dj.jpg',
    seller_id: 1,
    description: 'Berry Mix',
    category_id: 8,
  },
  {
    id: 12,
    name: 'Donuts',
    price: 11,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732742158/donuts_11_2_bfsohy.jpg',
    description: 'Donuts',
    seller_id: 1,
    category_id: 8,
  },
  {
    id: 13,
    name: 'Pancakes',
    price: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732742161/pancakes_9_pq7no0.jpg',
    description: 'Pancakes',
    seller_id: 1,
    category_id: 8,
  },
  {
    id: 14,
    name: 'Christmas tree',
    price: 29,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732740970/xmas_tree_29_tzfayw.jpg',
    description: 'Christmas tree',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 15,
    name: 'Christmas decoration set',
    price: 36,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/t_category/v1732740976/xmas_wreath_36_xa98c5.jpg',
    description: 'Christmas decoration set',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 16,
    name: 'Mini Santa',
    price: 17,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732740973/santa_27_ocxhfb.jpg',
    description: 'Mini Santa',
    seller_id: 1,
    category_id: 1,
  },
  {
    id: 17,
    name: 'Cupcakes',
    price: 21,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732742156/cupcakes_21_n2ijnf.jpg',
    description: 'Cupcakes',
    seller_id: 1,
    category_id: 8,
  },
  {
    id: 18,
    name: 'Smartphone',
    price: 449,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448/v1732788294/mobile-phone_v586rg.png',
    description: 'Smartphone',
    seller_id: 1,
    category_id: 4,
  },
  {
    id: 19,
    name: 'Wireless Power Bank',
    price: 21,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_710,h_448,g_auto/v1732735928/Power_Bank_Wireless_21_v5mgda.jpg',
    description: 'Wireless Power Bank',
    seller_id: 1,
    category_id: 16,
  },
  {
    id: 20,
    name: 'Christmas wreath',
    price: 36,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/t_category/v1732740976/xmas_wreath_36_xa98c5.jpg',
    description: 'Christmas wreath',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 21,
    name: 'Bluetooth speaker',
    price: 52,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732789132/Bluetooth_speaker-52_o3r58r.jpg',
    description: 'Bluetooth speaker',
    seller_id: 1,
    category_id: 16,
  },
  {
    id: 22,
    name: 'Lipstick',
    price: 22,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732788294/lipsticks-5893481_1280_wzq6qk.jpg',
    description: 'Lipstick',
    seller_id: 1,
    category_id: 16,
  },
  {
    id: 23,
    name: 'Doll ​house',
    price: 49,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_pad,b_gen_fill,w_710,h_448/v1732788294/toy_hk5kt9.jpg',
    description: 'Doll ​house',
    seller_id: 1,
    category_id: 16,
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO
        products (
          name,
          price,
          image_url,
          description,
          seller_id,
          category_id
        )
      VALUES
        (
          ${product.name},
          ${product.price},
          ${product.image_url},
          ${product.description},
          ${product.seller_id},
          ${product.category_id}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products
      WHERE
        id = ${product.id}
    `;
  }
}
