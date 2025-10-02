export type GuestCartItem = {
  productId: number;
  quantity: number;
};

export function parseGuestCartCookie(value: string | undefined): GuestCartItem[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        productId: Number(item?.productId),
        quantity: Number(item?.quantity),
      }))
      .filter((item) => Number.isInteger(item.productId) && Number.isInteger(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
}

export function serializeGuestCart(items: GuestCartItem[]): string {
  return JSON.stringify(items);
}

export function upsertGuestCartItem(
  items: GuestCartItem[],
  productId: number,
  quantityDelta: number,
): GuestCartItem[] {
  const existingIndex = items.findIndex((item) => item.productId === productId);

  if (existingIndex === -1) {
    return quantityDelta > 0
      ? [...items, { productId, quantity: quantityDelta }]
      : items;
  }

  const updated = [...items];
  const newQuantity = updated[existingIndex]?.quantity
    ? updated[existingIndex].quantity + quantityDelta
    : quantityDelta;

  if (newQuantity <= 0) {
    updated.splice(existingIndex, 1);
  } else {
    updated[existingIndex] = { productId, quantity: newQuantity };
  }

  return updated;
}

export function replaceGuestCartItemQuantity(
  items: GuestCartItem[],
  productId: number,
  quantity: number,
): GuestCartItem[] {
  const sanitizedQuantity = Math.max(quantity, 0);
  const existingIndex = items.findIndex((item) => item.productId === productId);

  if (existingIndex === -1) {
    return sanitizedQuantity > 0
      ? [...items, { productId, quantity: sanitizedQuantity }]
      : items;
  }

  if (sanitizedQuantity === 0) {
    return items.filter((item) => item.productId !== productId);
  }

  const updated = [...items];
  updated[existingIndex] = { productId, quantity: sanitizedQuantity };
  return updated;
}

export function removeGuestCartItem(
  items: GuestCartItem[],
  productId: number,
): GuestCartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function getGuestCartTotalQuantity(items: GuestCartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
