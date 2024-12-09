import React, { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, priceCOP: number, imageData?: string) => void;
}

export function ProductModal({ isOpen, onClose, onSave }: ProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageData, setImageData] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const formatPrice = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format with dots
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setPrice(rawValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, Number(price.replace(/\./g, '')), imageData);
    setName('');
    setPrice('');
    setImageData(undefined);
  };

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const context = canvas.getContext('2d');
      
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.5); // Compress to 50%
        setImageData(imageData);
      }

      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    } catch (error) {
      console.error('Error capturing image:', error);
      alert('No se pudo acceder a la cámara');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageData(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Agregar Producto</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCapture}
              className="text-gray-600 hover:text-gray-800 transition-colors"
              title="Tomar Foto"
            >
              <Camera className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Precio (COP)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                value={formatPrice(price)}
                onChange={handlePriceChange}
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">COP</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Producto
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Subir Imagen
              </button>
            </div>
            {imageData && (
              <div className="mt-2">
                <img
                  src={imageData}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}