import React from 'react';

interface ConversionResultARSProps {
  usd: number;
  cop: number;
}

export function ConversionResultARS({ usd, cop }: ConversionResultARSProps) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600 font-medium">USD</p>
        <p className="text-2xl font-bold text-blue-700">${usd ? usd.toLocaleString() : '0'}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-600 font-medium">Pesos Colombianos (COP)</p>
        <p className="text-2xl font-bold text-green-700">${cop ? cop.toLocaleString() : '0'}</p>
      </div>
    </div>
  );
}
