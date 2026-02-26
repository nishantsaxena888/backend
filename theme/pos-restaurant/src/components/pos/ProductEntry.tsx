import { useState, useRef, useEffect } from 'react';
import { Scan, Search, Zap } from 'lucide-react';
import { useTransaction } from '../../contexts/TransactionContext';
import { findProductByBarcode, findProductBySKU, searchProducts, PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

const QUICK_TILES: Product[] = PRODUCTS.filter(p => 
  ['Nips', 'Mixers', 'Ice'].includes(p.category)
).slice(0, 9);

export function ProductEntry() {
  const { addLineItem } = useTransaction();
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const barcodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus barcode input on mount
    barcodeRef.current?.focus();
  }, []);

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    // Try barcode first, then SKU
    let product = findProductByBarcode(barcodeInput);
    if (!product) {
      product = findProductBySKU(barcodeInput);
    }

    if (product) {
      addLineItem(product);
      setBarcodeInput('');
      barcodeRef.current?.focus();
    } else {
      // Show error or search
      alert('Product not found');
      setBarcodeInput('');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = searchProducts(query);
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    addLineItem(product);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
    barcodeRef.current?.focus();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Barcode Scanner Input */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <form onSubmit={handleBarcodeSubmit}>
          <label className="block mb-2">
            <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
              <Scan className="w-4 h-4" />
              Barcode / SKU
            </div>
            <input
              ref={barcodeRef}
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              placeholder="Scan or enter barcode..."
              className="w-full px-3 py-2.5 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              autoFocus
            />
          </label>
        </form>
      </div>

      {/* Manual Search */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Search Results */}
        {showSearch && searchResults.length > 0 && (
          <div className="absolute left-4 right-4 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl max-h-96 overflow-auto z-10">
            {searchResults.map(product => (
              <button
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="w-full p-3 text-left hover:bg-blue-50 border-b border-slate-100 last:border-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.sku}</p>
                  </div>
                  <span className="text-sm text-slate-900">${product.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Sale Tiles */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-green-600" />
          <h3 className="text-sm text-slate-700">Quick Sale</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_TILES.map(product => (
            <button
              key={product.id}
              onClick={() => addLineItem(product)}
              className="aspect-square bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 rounded-lg p-2 flex flex-col items-center justify-center text-center transition-all hover:shadow-md active:scale-95"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded object-cover mb-1"
              />
              <p className="text-xs text-slate-900 line-clamp-2 mb-1">
                {product.name}
              </p>
              <p className="text-xs text-green-700">${product.price}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
