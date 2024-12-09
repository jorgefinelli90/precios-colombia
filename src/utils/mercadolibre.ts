export const getMercadoLibreSearchUrl = (query: string): string => {
  const encodedQuery = encodeURIComponent(query);
  return `https://listado.mercadolibre.com.co/${encodedQuery}`;
};