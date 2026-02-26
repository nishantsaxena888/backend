export function NavBar({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  const categories = [
    { name: 'All Products', icon: '🏪' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👔' },
    { name: 'Home & Living', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Toys & Games', icon: '🎮' },
    { name: 'Automotive', icon: '🚗' },
    { name: 'Health', icon: '💊' }
  ];

  const isSelected = (category: string) => {
    if (category.name === selectedCategory) return true;
    if (category.name.toLowerCase().includes('home') && selectedCategory.toLowerCase().includes('home')) {
      return true;
    }
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-[132px] z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                isSelected(category)
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-emerald-600 hover:scale-105'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
