import { ArrowRight, Clock, TruckIcon, Shield, Percent, Package, Wine, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 border-b border-amber-900/20 relative overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200">
              Premium Spirits,
            </span>
            <br />
            <span className="text-gray-300">delivered to your door</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-100/70 mb-10 leading-relaxed">
            New Jersey's finest selection of wines, spirits & craft beers - delivered within hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/50">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Fast Delivery</p>
                <p className="text-amber-200/70 text-xs">Same-day available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/50">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Premium Selection</p>
                <p className="text-amber-200/70 text-xs">Top quality spirits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-900/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">21+ Verified</p>
                <p className="text-amber-200/70 text-xs">Age verified delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}