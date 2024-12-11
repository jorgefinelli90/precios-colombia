export interface Product {
  id: string;
  name: string;
  priceCOP: number;
  createdAt: number;
  imageData?: string;
}

export interface ExchangeRates {
  usdToCop: number;
  usdToArs: number;
}

export const defaultRates: ExchangeRates = {
  usdToCop: 4370,
  usdToArs: 1060,
};