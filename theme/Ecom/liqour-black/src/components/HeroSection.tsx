import { ArrowRight, Clock, TruckIcon, Shield, Percent, Package, Wine, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-black text-white py-12 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Spirits,
            <span className="text-gray-300"> delivered to your door</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            New Jersey's finest selection of wines, spirits & craft beers - delivered within hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold">Fast Delivery</p>
                <p className="text-gray-400 text-xs">Same-day available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Wine className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold">Premium Selection</p>
                <p className="text-gray-400 text-xs">Top quality spirits</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold">21+ Verified</p>
                <p className="text-gray-400 text-xs">Age verified delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}