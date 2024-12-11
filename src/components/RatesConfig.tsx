import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ExchangeRates } from '../utils/currency';

interface RatesConfigProps {
  rates: ExchangeRates;
  onRatesChange: (rates: ExchangeRates) => void;
}

export function RatesConfig({ rates, onRatesChange }: RatesConfigProps) {
  const [localRates, setLocalRates] = useState(rates);

  const handleRatesChange = (newRates: ExchangeRates) => {
    setLocalRates(newRates);
  };

  const handleConfirm = () => {
    onRatesChange(localRates);
  };

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
            value={localRates.usdToCop}
            onChange={(e) => handleRatesChange({ ...localRates, usdToCop: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            1 USD = ARS
          </label>
          <input
            type="number"
            value={localRates.usdToArs}
            onChange={(e) => handleRatesChange({ ...localRates, usdToArs: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleConfirm}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>Confirmar Tasas</span>
        </button>
      </div>
    </div>
  );
}