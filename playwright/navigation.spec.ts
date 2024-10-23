import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  // E2E: Add to cart, change quantity and remove from cart

  await page.getByRole('link', { name: 'Products' }).click();
  await page.waitForURL('/products');

  /* const products = [
    {
      id: 1,
      name: 'Cashew nuts',
      price: 6,
      image: 'cashew-nuts.jpg',
      description:
        'Cashew nuts are rich, buttery seeds packed with healthy fats, protein, and essential nutrients. Perfect for snacking or cooking, they offer a creamy texture and delicious flavor.',
    },
    {
      id: 3,
      name: 'Mango',
      price: 13,
      image: 'mango.jpg',
      description: 'Mango',
    },
    {
      id: 4,
      name: 'Coconut',
      price: 7,
      image: 'coconut.jpg',
      description: 'Coconut',
    },
    {
      id: 5,
      name: 'Dried Pineapple',
      price: 6,
      image: 'dried-pineapple.jpg',
      description: 'Dried Pineapple',
    },
    {
      id: 6,
      name: 'Instant noodles',
      price: 7,
      image: 'instant-noodles.jpg',
      description: 'Instant noodles',
    },
  ];
   for (const product of products) {
    await expect(page.getByTestId(`product-${product.id}`)).toHaveText(
      product.name,
    );
    await expect(page.getByRole('img', { name: product.name })).toBeVisible();
    await expect(page.getByRole('link', { name: product.name })).toBeVisible();
  }*/
  await page.getByRole('link', { name: 'Cashew nuts' }).click();
  await page.waitForURL('/products/1');
  // E2E Test need to be adapted because Quantity Input isn't Select anymore but an Input

  //  await page.setViewportSize({ width: 1920, height: 911 });

  /* await page.getByTestId('product-quantity').selectOption('2');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('link', { name: 'Cart (2)' })).toBeVisible();

  await page.getByTestId('product-quantity').selectOption('10');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('link', { name: 'Cart (12)' })).toBeVisible();

  await page.getByRole('link', { name: 'Products' }).click();
  await page.waitForURL('/products');

  await page.getByRole('link', { name: 'Coconut' }).click();
  await page.waitForURL('/products/4');
  await page.getByTestId('product-quantity').selectOption('6');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('link', { name: 'Cart (18)' })).toBeVisible();

  await page.getByRole('link', { name: 'Cart' }).click();
  await page.waitForURL('/cart');

  await page.getByTestId('cart-product-remove-4').click();
  await expect(page.getByRole('link', { name: 'Cart (12)' })).toBeVisible();*/

  // E2E: Checkout flow, payment page, thank you page

  await page.getByTestId('cart-checkout').click();
  /* await expect(page.getByTestId('checkout-first-name')).toBeVisible();
  await expect(page.getByTestId('checkout-last-name')).toBeVisible();
  await expect(page.getByTestId('checkout-email')).toBeVisible();
  await expect(page.getByTestId('checkout-address')).toBeVisible();
  await expect(page.getByTestId('checkout-city')).toBeVisible();
  await expect(page.getByTestId('checkout-postal-code')).toBeVisible();
  await expect(page.getByTestId('checkout-country')).toBeVisible();
  await expect(page.getByTestId('checkout-credit-card')).toBeVisible();
  await expect(page.getByTestId('checkout-expiration-date')).toBeVisible();
  await expect(page.getByTestId('checkout-security-code')).toBeVisible();
  await expect(page.getByTestId('checkout-confirm-order')).toBeVisible();*/

  // Check if the input has the 'required' attribute
  let input = page.getByTestId('checkout-first-name');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-last-name');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-email');
  // Check if it is required and type=email
  await expect(input).toHaveAttribute('required');
  await expect(input).toHaveAttribute('type', 'email');

  input = page.getByTestId('checkout-address');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-city');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-postal-code');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-credit-card');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-expiration-date');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  input = page.getByTestId('checkout-security-code');
  // Check if it is required
  await expect(input).toHaveAttribute('required');

  await page.getByTestId('checkout-first-name').fill('John');
  await page.getByTestId('checkout-last-name').fill('Doe');
  await page.getByTestId('checkout-email').fill('Doe@gmail.com');
  await page.getByTestId('checkout-address').fill('Test Street');
  await page.getByTestId('checkout-city').fill('Vienna');
  await page.getByTestId('checkout-postal-code').fill('1020');
  await page.getByTestId('checkout-country').selectOption('Austria');
  await page.getByTestId('checkout-credit-card').fill('1234567890');
  await page.getByTestId('checkout-expiration-date').fill('12/2025');
  await page.getByTestId('checkout-security-code').fill('234');

  await page.getByTestId('checkout-confirm-order').click();
  await page.waitForURL('/thank-you');
  await expect(page).toHaveTitle('Thank you for your order | Tropical Snacks');
  await expect(page.getByRole('link', { name: 'Cart (0)' })).toBeVisible();
});
