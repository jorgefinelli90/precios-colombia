import { ExchangeRates } from '../types';

export const convertCurrency = (
  amountCOP: number,
  rates: ExchangeRates
): { usd: number; ars: number } => {
  const usd = Number((amountCOP / rates.usdToCop).toFixed(2));
  const ars = Number((usd * rates.usdToArs).toFixed(2));
  return { usd, ars };
};

export const copToUsd = (amountCOP: number, rate: number): number => {
  return Number((amountCOP / rate).toFixed(2));
};

export const usdToCop = (amountUSD: number, rate: number): number => {
  return Number((amountUSD * rate).toFixed(2));
};