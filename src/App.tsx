import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { ProductModal } from './components/ProductModal';
import { ProductList } from './components/ProductList';
import { CurrencyInput } from './components/CurrencyInput';
import { ConversionResult } from './components/ConversionResult';
import { ConversionResultARS } from './components/ConversionResultARS';
import { RatesConfig } from './components/RatesConfig';
import { Product, defaultRates } from './types';
import { saveProducts, loadProducts } from './utils/storage';
import { convertCurrency } from './utils/currency';
import './styles.css';

function App() {
  const [currentView, setCurrentView] = useState<'converter' | 'wishlist'>('converter');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [amount, setAmount] = useState('');
  const [amountARS, setAmountARS] = useState('');
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

  const { usd, ars } = amount
    ? { 
        usd: Number(amount) / 4200, 
        ars: (Number(amount) / 4200) * 1060 
      }
    : { usd: 0, ars: 0 };

  const { usd: usdFromARS, cop: copFromARS } = amountARS
    ? { 
        usd: Number(amountARS) / 1060,
        cop: (Number(amountARS) / 1060) * 4200
      }
    : { usd: 0, cop: 0 };

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
                    placeholder="Ingrese monto en COP"
                  />
                </div>
                <ConversionResult usd={usd} ars={ars} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto en Pesos Argentinos (ARS)
                  </label>
                  <CurrencyInput
                    value={amountARS}
                    onChange={setAmountARS}
                    placeholder="Ingrese monto en ARS"
                  />
                </div>
                <ConversionResultARS usd={usdFromARS} cop={copFromARS} />
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