import React from 'react';
import { Settings } from 'lucide-react';
import { ExchangeRates } from '../utils/currency';

interface RatesConfigProps {
  rates: ExchangeRates;
  onRatesChange: (rates: ExchangeRates) => void;
}

export function RatesConfig({ rates, onRatesChange }: RatesConfigProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Configuración de Tasas</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            1 USD = COP
          </label>
          <input
            type="number"
            value={rates.usdToCop}
            onChange={(e) => onRatesChange({ ...rates, usdToCop: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            1 USD = ARS
          </label>
          <input
            type="number"
            value={rates.usdToArs}
            onChange={(e) => onRatesChange({ ...rates, usdToArs: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}