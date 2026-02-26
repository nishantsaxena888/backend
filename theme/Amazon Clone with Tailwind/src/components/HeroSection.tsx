import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12 text-white">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                🎉 Limited Time Offer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
                Winter Sale
              </h1>
              <p className="text-xl md:text-2xl mb-2 text-blue-100">
                Up to 50% off
              </p>
              <p className="text-lg mb-8 text-blue-100">
                on selected electronics, fashion & more
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg group">
                  <span>Shop Deals</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/30 transition-all border-2 border-white/30">
                  Learn More
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div>
                  <div className="text-2xl">10K+</div>
                  <div className="text-blue-200">Products</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <div className="text-2xl">50K+</div>
                  <div className="text-blue-200">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <div className="text-2xl">Free</div>
                  <div className="text-blue-200">Shipping</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block p-8">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Hero banner"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-900">Shop by Category</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Card 1 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <img
                src="https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Gaming"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">Gaming</h3>
              <p className="text-xs text-gray-500">500+ items</p>
            </div>
          </div>

          {/* Category Card 2 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
              <img
                src="https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Electronics"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">Electronics</h3>
              <p className="text-xs text-gray-500">1200+ items</p>
            </div>
          </div>

          {/* Category Card 3 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Fashion"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">Fashion</h3>
              <p className="text-xs text-gray-500">800+ items</p>
            </div>
          </div>

          {/* Category Card 4 */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
              <img
                src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Home"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-gray-900 mb-1">Home & Living</h3>
              <p className="text-xs text-gray-500">650+ items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}