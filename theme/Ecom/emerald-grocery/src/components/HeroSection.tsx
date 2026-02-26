import { ArrowRight, Package, TruckIcon, Shield, Percent } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-white">
      {/* Main Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg overflow-hidden border border-green-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-full text-sm mb-4 font-medium">
                <Percent className="w-3.5 h-3.5" />
                <span>Wholesale Pricing Available</span>
              </div>
              <h1 className="text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
                Fresh Groceries
                <br />
                <span className="text-green-600">For Your Business</span>
              </h1>
              <p className="text-lg mb-2 text-gray-700">
                Bulk Orders & Wholesale Rates
              </p>
              <p className="text-base mb-6 text-gray-600">
                Premium quality products for retailers and distributors
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg transition-colors border border-gray-300 hover:border-green-600 hover:text-green-600 font-medium">
                  Request Quote
                </button>
              </div>
            </div>
            <div className="hidden md:block p-8">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Fresh groceries"
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
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <TruckIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Free Delivery</h3>
              <p className="text-xs text-gray-600">Orders over $500</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Quality Guaranteed</h3>
              <p className="text-xs text-gray-600">100% fresh products</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Bulk Orders</h3>
              <p className="text-xs text-gray-600">Wholesale pricing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Percent className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-sm">Best Prices</h3>
              <p className="text-xs text-gray-600">Competitive rates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-900 font-semibold">Shop by Category</h2>
            <p className="text-sm text-gray-600 mt-1">Browse our fresh selection</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium text-sm">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Card 1 */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Fresh Produce"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Fresh Produce</h3>
              <p className="text-xs text-gray-500 mt-1">500+ items</p>
            </div>
          </div>

          {/* Category Card 2 */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Dairy & Eggs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Dairy & Eggs</h3>
              <p className="text-xs text-gray-500 mt-1">200+ items</p>
            </div>
          </div>

          {/* Category Card 3 */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Meat & Seafood"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Meat & Seafood</h3>
              <p className="text-xs text-gray-500 mt-1">150+ items</p>
            </div>
          </div>

          {/* Category Card 4 */}
          <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Bakery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center border-t border-gray-100">
              <h3 className="text-gray-900 font-medium">Bakery</h3>
              <p className="text-xs text-gray-500 mt-1">300+ items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
