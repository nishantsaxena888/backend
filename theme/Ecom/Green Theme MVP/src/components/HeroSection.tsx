import { ArrowRight, Zap, Shield, TruckIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100">
      {/* Main Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-amber-900 rounded-full text-sm mb-6 shadow-lg">
                <Zap className="w-4 h-4 fill-amber-900" />
                <span className="font-semibold">Flash Sale - Limited Time</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                Discover Premium
                <br />
                <span className="text-amber-300">Electronics</span>
              </h1>
              <p className="text-xl mb-2 text-emerald-100">
                Up to 60% OFF
              </p>
              <p className="text-lg mb-8 text-emerald-100">
                Free shipping on all orders over $50
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-emerald-700 px-8 py-4 rounded-2xl hover:bg-amber-50 hover:shadow-xl transition-all flex items-center justify-center gap-2 shadow-lg group">
                  <span className="font-semibold">Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all border-2 border-white/30">
                  View Collections
                </button>
              </div>
            </div>
            <div className="hidden md:block p-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-400/20 rounded-3xl blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Featured products"
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-stone-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold">Free Shipping</h3>
              <p className="text-sm text-slate-600">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-stone-200">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold">Secure Payment</h3>
              <p className="text-sm text-slate-600">100% protected</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-stone-200">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-teal-600 fill-teal-600" />
            </div>
            <div>
              <h3 className="text-slate-900 font-semibold">Fast Delivery</h3>
              <p className="text-sm text-slate-600">2-3 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl text-slate-900">Shop by Category</h2>
            <p className="text-sm text-slate-600 mt-1">Explore our curated collections</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-sm">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Card 1 */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-200">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
              <img
                src="https://images.unsplash.com/photo-1604846887565-640d2f52d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Gaming"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-semibold">Gaming</h3>
              <p className="text-xs text-white/80">500+ products</p>
            </div>
          </div>

          {/* Category Card 2 */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-200">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
              <img
                src="https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Electronics"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-semibold">Electronics</h3>
              <p className="text-xs text-white/80">1200+ products</p>
            </div>
          </div>

          {/* Category Card 3 */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-200">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Fashion"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-semibold">Fashion</h3>
              <p className="text-xs text-white/80">800+ products</p>
            </div>
          </div>

          {/* Category Card 4 */}
          <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-stone-200">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
              <img
                src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Home"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-semibold">Home & Living</h3>
              <p className="text-xs text-white/80">650+ products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
