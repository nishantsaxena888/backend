import { Package, Sparkles, Shield, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-black">
            LUXURY FASHION
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Curated designer pieces for the modern wardrobe
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm pt-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-black" />
              <span className="text-gray-700 font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-black" />
              <span className="text-gray-700 font-medium">Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-black" />
              <span className="text-gray-700 font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-black" />
              <span className="text-gray-700 font-medium">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}