import type { Sql } from 'postgres';

const products = [
  {
    id: 1,
    name: 'Christmas tree hanging ornaments',
    price: 13,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_balls_13_wc6vaz_c_fill_w_710_h_448_dxz0qd.jpg',
    description: 'Christmas tree hanging ornaments',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 2,
    name: 'Christmas tree hanging ornaments',
    price: 15,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_balls_9_ze7l6a_c_fill_w_710_h_448_g_auto_psiaph.jpg',
    description: 'Christmas tree hanging ornaments',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 3,
    name: 'Christmas decoration',
    price: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/xmas_decor_14_mlrtnx_z61afa.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 4,
    name: 'Christmas House',
    price: 27,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005663/xmas_house_27_uvfekj_zhhzx8.jpg',
    description:
      'This cozy Christmas house features a welcoming porch adorned with festive lights and holiday decorations, creating a warm, inviting atmosphere. Perfect for adding a touch of holiday cheer to any space, this charming scene embodies the spirit of Christmas and is ideal for gift-giving or seasonal decor.',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 5,
    name: 'Christmas decoration',
    price: 16,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/santa_27_ocxhfb_c_fill_w_710_h_448_jc4inf.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 6,
    name: 'Snow globe',
    price: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_snow_globe_zpqoaw_c_fill_w_710_h_448_wml1hs.jpg',
    description: 'Snow globe',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 7,
    name: 'Jingle Bells',
    price: 25,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/junlebells_25_aatiuc_awm8ft.jpg',
    description: 'Jingle Bells',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 8,
    name: 'Christmas decoration',
    price: 24,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005663/xmas_decor_23_2_knxwgg_c_fill_w_710_h_448_g_auto_haupzv.jpg',
    description: 'Christmas decoration',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 9,
    name: 'Christmas tree',
    price: 219,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_tree_210_bl8six_c_fill_w_710_h_448_g_auto_t91ca5.jpg',
    description: 'Christmas tree',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 10,
    name: 'Macarons',
    price: 12,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016818/macarons_13_trtxy2_yhjsja.jpg',
    description: 'Macarons',
    seller_id: 1,
    category_id: 9,
  },
  {
    id: 11,
    name: 'Berry Mix',
    price: 14,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016817/berries_14_eoj7dj_xw16b6.jpg',
    seller_id: 1,
    description: 'Berry Mix',
    category_id: 9,
  },
  {
    id: 12,
    name: 'Donuts',
    price: 11,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016817/donuts_11_2_bfsohy_yhjfir.jpg',
    description: 'Donuts',
    seller_id: 1,
    category_id: 9,
  },
  {
    id: 13,
    name: 'Pancakes',
    price: 9,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016818/pancakes_9_pq7no0_rxftu1.jpg',
    description: 'Pancakes',
    seller_id: 1,
    category_id: 9,
  },
  {
    id: 14,
    name: 'Christmas tree',
    price: 29,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734016912/xmas_tree_29_tzfayw_ilngud.jpg',
    description: 'Christmas tree',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 15,
    name: 'Christmas decoration set',
    price: 36,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005661/xmas_wreath_36_xa98c5_c_fill_w_710_h_448_g_auto_ssoz4b.jpg',
    description: 'Christmas decoration set',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 16,
    name: 'Mini Santa',
    price: 17,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734005662/santa_27_ocxhfb_c_fill_w_710_h_448_jc4inf.jpg',
    description: 'Mini Santa',
    seller_id: 1,
    category_id: 1,
  },
  {
    id: 17,
    name: 'Cupcakes',
    price: 21,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017033/cupcakes_21_n2ijnf_npygpa.jpg',
    description: 'Cupcakes',
    seller_id: 1,
    category_id: 9,
  },
  {
    id: 18,
    name: 'Smartphone',
    price: 449,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017095/mobile-phone_v586rg_xc7fgo.png',
    description: 'Smartphone',
    seller_id: 1,
    category_id: 5,
  },
  {
    id: 19,
    name: 'Wireless Power Bank',
    price: 21,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017111/Power_Bank_Wireless_21_v5mgda_ytjjdi.jpg',
    description: 'Wireless Power Bank',
    seller_id: 1,
    category_id: 2,
  },
  {
    id: 20,
    name: 'Christmas wreath',
    price: 39,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017148/xmas_wreath_31_fwuc4d_vjaws7.jpg',
    description: 'Christmas wreath',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 21,
    name: 'Bluetooth speaker',
    price: 52,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017196/Bluetooth_speaker-52_o3r58r_c_pad_b_gen_fill_w_710_h_448_pyffk8.jpg',
    description: 'Bluetooth speaker',
    seller_id: 1,
    category_id: 2,
  },
  {
    id: 22,
    name: 'Lipstick',
    price: 22,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017233/lipsticks-5893481_1280_wzq6qk_sc8oi6.jpg',
    description: 'Lipstick',
    seller_id: 1,
    category_id: 2,
  },
  {
    id: 23,
    name: 'Doll ​house',
    price: 49,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/v1734017262/toy_hk5kt9_hymzz0.jpg',
    description: 'Doll ​house',
    seller_id: 1,
    category_id: 2,
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
