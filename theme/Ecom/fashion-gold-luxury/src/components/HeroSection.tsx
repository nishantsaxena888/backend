import { ArrowRight, Clock, TruckIcon, Shield, Percent, Package, Sparkles, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 border-b border-yellow-900/20 relative overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200">
              Luxury Fashion,
            </span>
            <br />
            <span className="text-gray-300">elevated to perfection</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/70 mb-10 leading-relaxed">
            Discover exclusive designer pieces, luxury accessories & haute couture - curated just for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-900/50">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Premium Delivery</p>
                <p className="text-yellow-200/70 text-xs">White glove service</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-900/50">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Authentic Luxury</p>
                <p className="text-yellow-200/70 text-xs">100% genuine designer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-900/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Buyer Protection</p>
                <p className="text-yellow-200/70 text-xs">Secure & insured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}