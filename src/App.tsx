import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { ProductModal } from './components/ProductModal';
import { ProductList } from './components/ProductList';
import { CurrencyInput } from './components/CurrencyInput';
import { ConversionResult } from './components/ConversionResult';
import { RatesConfig } from './components/RatesConfig';
import { Product, defaultRates } from './types';
import { saveProducts, loadProducts } from './utils/storage';
import { convertCurrency } from './utils/currency';

function App() {
  const [currentView, setCurrentView] = useState<'converter' | 'wishlist'>('converter');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [amount, setAmount] = useState('');
  const [rates, setRates] = useState(defaultRates);

  useEffect(() => {
    const savedProducts = loadProducts();
    setProducts(savedProducts);
  }, []);

  const handleSaveProduct = (name: string, priceCOP: number, imageData?: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      priceCOP,
      imageData,
      createdAt: Date.now(),
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const { usd = 0, ars = 0 } = amount 
    ? convertCurrency(Number(amount), rates) 
    : { usd: 0, ars: 0 };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Precios Colombia 2025
        </h1>

        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {currentView === 'converter' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto en Pesos Colombianos (COP)
                  </label>
                  <CurrencyInput
                    value={amount}
                    onChange={setAmount}
                  />
                </div>
                <ConversionResult usd={usd} ars={ars} />
              </div>
            </div>
            <RatesConfig
              rates={rates}
              onRatesChange={setRates}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Producto</span>
            </button>
            
            <ProductList
              products={products}
              rates={rates}
              onDelete={handleDeleteProduct}
            />
          </div>
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
        />
      </div>
    </div>
  );
}

export default App;