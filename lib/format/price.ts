/**
 * Format a price stored in cents (integer) to a euro string like "€ 140,46".
 */
export function formatEuroFromCents(valueInCents: number | null | undefined) {
  if (typeof valueInCents !== 'number' || Number.isNaN(valueInCents)) {
    return '€ 0,00';
  }

  const euros = valueInCents / 100;
  return `€ ${euros.toFixed(2).replace('.', ',')}`;
}
