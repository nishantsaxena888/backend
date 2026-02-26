import { ArrowRight, Clock, TruckIcon, Shield, Percent, Package, Sparkles, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-black text-white py-12 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your favorite food,
            <span className="text-gray-300"> delivered fast</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Order from the best local restaurants with easy, on-demand delivery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold">Fast Delivery</p>
                <p className="text-gray-400 text-xs">In 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold">Fresh Food</p>
                <p className="text-gray-400 text-xs">Quality guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold">Top Rated</p>
                <p className="text-gray-400 text-xs">4.5+ restaurants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}