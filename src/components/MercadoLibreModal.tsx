import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Product {
  id: string
  title: string
  thumbnail: string
  price: number
  original_price: number | null
  currency_id: string
  permalink: string
  category_id: string
  condition: string
}

interface MercadoLibreModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export default function MercadoLibreModal({ isOpen, onClose, productName }: MercadoLibreModalProps) {
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (isOpen && productName) {
      fetchProducts(0)
    }
  }, [isOpen, productName])

  const fetchProducts = async (currentOffset: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(productName)}&limit=5&offset=${currentOffset}`)
      const data = await response.json()
      setResults(currentOffset === 0 ? data.results : [...results, ...data.results])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = async () => {
    const newOffset = offset + 5
    setOffset(newOffset)
    await fetchProducts(newOffset)
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getCategoryName = (categoryId: string) => {
    const categories: {[key: string]: string} = {
      'MLA1055': 'Celulares y Teléfonos',
      'MLA1000': 'Electrónica, Audio y Video',
      'MLA1144': 'Consolas y Videojuegos',
      'MLA1039': 'Cámaras y Accesorios',
      'MLA1051': 'Industrias y Oficinas',
      'MLA1648': 'Computación',
      'MLA1276': 'Deportes y Fitness',
      'MLA1499': 'Inmuebles',
      'MLA1459': 'Salud y Equipamiento Médico',
    }
    return categories[categoryId] || 'Otra categoría'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold montserrat-regular">Resultados en MercadoLibre para: {productName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4">
          <ul className="space-y-4">
            {results.map((product) => (
              <li key={product.id} className="flex items-center space-x-4 border-b pb-4">
                <a href={product.permalink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-[100px] h-[100px] object-cover rounded"
                  />
                </a>
                <div className="flex-grow montserrat-regular">
                  <a href={product.permalink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <h2 className="font-semibold">{product.title}</h2>
                  </a>
                  <p className="text-lg font-bold">{formatPrice(product.price, product.currency_id)}</p>
                  {product.original_price && product.original_price > product.price && (
                    <p className="text-sm text-green-600 font-semibold">
                      ¡En promoción! Precio original: {formatPrice(product.original_price, product.currency_id)}
                    </p>
                  )}
                  <p className="text-sm">Categoría: {getCategoryName(product.category_id)}</p>
                  <p className="text-sm">Condición: {product.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
                </div>
              </li>
            ))}
          </ul>
          {results.length > 0 && (
            <button
              onClick={loadMore}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 montserrat-regular"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Mostrame 5 más, rey'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
