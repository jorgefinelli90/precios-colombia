import React from 'react';

interface ConversionResultProps {
  usd: number;
  ars: number;
}

export function ConversionResult({ usd, ars }: ConversionResultProps) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600 font-medium">USD</p>
        <p className="text-2xl font-bold text-blue-700">${usd ? usd.toLocaleString() : '0'}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-600 font-medium">Pesos Argentinos (ARS)</p>
        <p className="text-2xl font-bold text-green-700">${ars ? ars.toLocaleString() : '0'}</p>
      </div>
    </div>
  );
}