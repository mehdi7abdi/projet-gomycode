/**
 * Formate un montant en dinars algériens.
 * Exemple : 25999 => "25 999 DA"
 */
export function formatPrice(value) {
  return `${value.toLocaleString("fr-DZ")} DA`;
}

/**
 * Calcule le pourcentage de réduction arrondi.
 */
export function getDiscountPercent(oldPrice, newPrice) {
  if (!oldPrice) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

