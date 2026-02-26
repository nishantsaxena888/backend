import { ArrowRight, Package, TruckIcon, Shield, Percent } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-white">
      {/* Main Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-full text-sm mb-4 font-medium">
                <Percent className="w-3.5 h-3.5" />
                <span>Wholesale Distribution Pricing</span>
              </div>
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                Warehouse Distribution
                <br />
                <span className="text-gray-700">For Retailers & Stores</span>
              </h1>
              <p className="text-lg mb-2 text-gray-700">
                Beverages, Sodas, Snacks & Packaged Goods
              </p>
              <p className="text-base mb-6 text-gray-600">
                Bulk orders with competitive wholesale pricing - Coke, Pepsi, chips, canned goods & more
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                  <span>View Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg transition-colors border border-gray-300 hover:border-gray-700 hover:text-gray-700 font-medium">
                  Request Quote
                </button>
              </div>
            </div>
            <div className="hidden md:block p-8">
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Warehouse beverages and packaged goods"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <TruckIcon className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Free Delivery</h3>
              <p className="text-xs text-gray-600">Orders over $1,000</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Authorized Distributor</h3>
              <p className="text-xs text-gray-600">Genuine brand products</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Pallet Quantities</h3>
              <p className="text-xs text-gray-600">Cases & bulk orders</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <Percent className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Best Prices</h3>
              <p className="text-xs text-gray-600">Wholesale rates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-900 font-semibold">Popular Categories</h2>
            <p className="text-sm text-gray-600 mt-1">Shop by product type</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm border border-gray-200">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Card 1 - Beverages */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Beverages & Sodas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Beverages & Sodas</h3>
              <p className="text-xs text-gray-500 mt-1">Coke, Pepsi & more</p>
            </div>
          </div>

          {/* Category Card 2 - Snacks */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Snacks & Chips"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Snacks & Chips</h3>
              <p className="text-xs text-gray-500 mt-1">Lay's, Doritos & more</p>
            </div>
          </div>

          {/* Category Card 3 - Canned Goods */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1591952961842-58c837eaa9a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Canned & Packaged"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Canned & Packaged</h3>
              <p className="text-xs text-gray-500 mt-1">Ready-to-ship items</p>
            </div>
          </div>

          {/* Category Card 4 - Energy Drinks */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1622484211269-2b8f8b0b2a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Energy Drinks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Energy Drinks</h3>
              <p className="text-xs text-gray-500 mt-1">Red Bull, Monster & more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
