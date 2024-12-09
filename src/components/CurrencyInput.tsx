import React from 'react';
import { DollarSign } from 'lucide-react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CurrencyInput({ value, onChange }: CurrencyInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <DollarSign className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingrese monto en COP"
        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}