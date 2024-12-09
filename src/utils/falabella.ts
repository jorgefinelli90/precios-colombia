export function getFalabellaSearchUrl(query: string): string {
  const encodedQuery = encodeURIComponent(query);
  return `https://www.falabella.com.co/falabella-co/search?Ntt=${encodedQuery}`;
}
