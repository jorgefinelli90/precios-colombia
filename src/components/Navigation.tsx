import React from 'react';
import { Calculator, ListChecks } from 'lucide-react';

interface NavigationProps {
  currentView: 'converter' | 'wishlist';
  onViewChange: (view: 'converter' | 'wishlist') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <div className="flex gap-4 mb-6 montserrat-medium">
      <button
        onClick={() => onViewChange('converter')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
          currentView === 'converter'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Calculator className="h-5 w-5" />
        <span>Conversor</span>
      </button>
      
      <button
        onClick={() => onViewChange('wishlist')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
          currentView === 'wishlist'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <ListChecks className="h-5 w-5" />
        <span>Wishlist</span>
      </button>
    </div>
  );
}