import type { Sql } from 'postgres';

const products = [
  {
    id: 1,
    name: 'Breakfast',
    price: 6,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730211477/samples/breakfast.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 2,
    name: 'Dessert Plate',
    price: 16,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730211478/samples/dessert-on-a-plate.jpg',
    description:
      'odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 3,
    name: 'Spices',
    price: 10,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730211471/samples/food/spices.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consecteturx ea commodi consequatur',
    seller_id: 3,
    category_id: 1,
  },
  {
    id: 4,
    name: 'Cat',
    price: 10,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917187/pexels-cong-h-613161-1404825_oqrqbr.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consecteturx ea commodi consequatur',
    seller_id: 5,
    category_id: 2,
  },
  {
    id: 5,
    name: 'Lemon',
    price: 10,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917188/pexels-fotios-photos-1209462_jjesxq.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 3,
    category_id: 2,
  },
  {
    id: 6,
    name: 'Sunset',
    price: 18,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917189/pexels-b3stography-609537_dxsifi.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consecteturx ea commodi consequatur',
    seller_id: 4,
    category_id: 2,
  },
  {
    id: 7,
    name: 'Girafs',
    price: 38,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917186/pexels-punttim-139764_o7mxjx.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 4,
    category_id: 2,
  },
  {
    id: 8,
    name: 'Chairs',
    price: 38,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917308/pexels-eric-mufasa-578798-1350789_usmxd6.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 3,
    category_id: 3,
  },
  {
    id: 9,
    name: 'Lamp',
    price: 8,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917308/pexels-kowalievska-1148955_byvwe3.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 1,
    category_id: 3,
  },
  {
    id: 10,
    name: 'Chairs',
    price: 8,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917317/pexels-pixabay-220749_hu5oni.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 3,
    category_id: 3,
  },
  {
    id: 11,
    name: 'Table',
    price: 8,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917187/pexels-robin-schreiner-1188739-2261165_imdq16.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consecteturx ea commodi consequatur',
    seller_id: 4,
    category_id: 3,
  },
  {
    id: 12,
    name: 'Couch',
    price: 48,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917313/pexels-pixabay-276534_vxp9wb.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 4,
    category_id: 3,
  },
  {
    id: 13,
    name: 'Couch',
    price: 48,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917314/pexels-pixabay-276583_wiikri.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 1,
    category_id: 3,
  },
  {
    id: 14,
    name: 'Bed',
    price: 48,
    image_url:
      'https://res.cloudinary.com/dnglmyclj/image/upload/c_fill,w_500,h_375,ar_4:3,g_auto,e_improve,e_sharpen/v1730917314/pexels-pixabay-279746_wwcvpt.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    seller_id: 4,
    category_id: 3,
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
