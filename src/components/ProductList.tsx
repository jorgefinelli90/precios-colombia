import React from 'react';
import { Trash2, Search } from 'lucide-react';
import { Product, ExchangeRates } from '../types';
import { convertCurrency } from '../utils/currency';
import { getMercadoLibreSearchUrl } from '../utils/mercadolibre';

interface ProductListProps {
  products: Product[];
  rates: ExchangeRates;
  onDelete: (id: string) => void;
}

export function ProductList({ products, rates, onDelete }: ProductListProps) {
  const handleMercadoLibreSearch = (productName: string) => {
    const url = getMercadoLibreSearchUrl(productName);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const { usd, ars } = convertCurrency(product.priceCOP, rates);
        
        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 animate-fade-in"
          >
            <div className="flex gap-4">
              {product.imageData && (
                <div className="flex-shrink-0">
                  <img
                    src={product.imageData}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        COP: ${product.priceCOP.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        USD: ${usd.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        ARS: ${ars.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleMercadoLibreSearch(product.name)}
                      className="mt-3 flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                    >
                      <Search className="h-4 w-4" />
                      <span>Buscar en MercadoLibre</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {products.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No hay productos en la lista
        </p>
      )}
    </div>
  );
}