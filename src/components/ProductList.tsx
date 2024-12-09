import React, { useState } from 'react';
import { Trash2, Search, Copy, CheckSquare, Square } from 'lucide-react';
import { Product, ExchangeRates } from '../types';
import { convertCurrency } from '../utils/currency';
import { getMercadoLibreSearchUrl } from '../utils/mercadolibre';
import { getFalabellaSearchUrl } from '../utils/falabella';
import ImageModal from './ImageModal';

interface ProductListProps {
  products: Product[];
  rates: ExchangeRates;
  onDelete: (id: string) => void;
}

export function ProductList({ products, rates, onDelete }: ProductListProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleMercadoLibreSearch = (productName: string) => {
    const url = getMercadoLibreSearchUrl(productName);
    window.open(url, '_blank');
  };

  const toggleProduct = (id: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  const copySelectedProducts = () => {
    const selectedItems = products
      .filter(p => selectedProducts.has(p.id))
      .map(product => {
        const { usd, ars } = convertCurrency(product.priceCOP, rates);
        return `${product.name}: $${product.priceCOP ? product.priceCOP.toLocaleString() : 'N/A'} COP | ${usd ? usd.toLocaleString() : 'N/A'} USD | $${ars ? ars.toLocaleString() : 'N/A'} ARS`;
      })
      .join('\n');

    if (selectedItems) {
      navigator.clipboard.writeText(selectedItems);
      alert('¡Productos copiados al portapapeles!');
    } else {
      alert('Por favor selecciona al menos un producto');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSelectAll}
          className="flex items-center gap-2 px-3 py-2 text-sm text-black hover:text-gray-700"
        >
          {selectedProducts.size === products.length ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
          {selectedProducts.size === products.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
        </button>
        <button
          onClick={copySelectedProducts}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={selectedProducts.size === 0}
        >
          <Copy className="h-4 w-4" />
          Copiar Items
        </button>
      </div>

      {isModalOpen && selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setModalOpen(false)} />
      )}

      {products.map((product) => {
        const { usd, ars } = convertCurrency(product.priceCOP, rates);

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 animate-fade-in"
          >
            <div className="flex gap-4 text-black">
              <button
                onClick={() => toggleProduct(product.id)}
                className="text-black hover:text-gray-700"
              >
                {selectedProducts.has(product.id) ? 
                  <CheckSquare className="h-5 w-5" /> : 
                  <Square className="h-5 w-5" />
                }
              </button>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div className="montserrat-regular text-black">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-black">
                        COP: ${product.priceCOP.toLocaleString()}
                      </p>
                      <p className="text-sm text-black">
                        USD: ${usd.toLocaleString()}
                      </p>
                      <p className="text-sm text-black">
                        ARS: ${ars.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleMercadoLibreSearch(product.name)}
                        className="mt-3 flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                      >
                        <Search className="h-4 w-4" />
                        <span className="font-bold">Buscar en MercadoLibre</span>
                      </button>
                      <button
                        onClick={() => window.open(getFalabellaSearchUrl(product.name), '_blank')}
                        className="mt-3 flex items-center gap-2 text-sm text-green-400 hover:text-green-700 transition-colors"
                      >
                        <Search className="h-4 w-4" />
                        <span>Buscar en Falabella CO</span>
                      </button>
                    </div>
                  </div>
                  {product.imageData && (
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageData}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-md"
                        onClick={() => {
                          setSelectedImage(product.imageData);
                          setModalOpen(true);
                        }}
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-black hover:text-gray-700 p-1 flex items-center"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
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