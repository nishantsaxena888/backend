export function NavBar({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  const categories = [
    { name: 'All Products', icon: '🛒' },
    { name: 'Fresh Produce', icon: '🥬' },
    { name: 'Dairy & Eggs', icon: '🥛' },
    { name: 'Meat & Seafood', icon: '🥩' },
    { name: 'Bakery', icon: '🍞' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Pantry', icon: '🥫' },
    { name: 'Frozen Foods', icon: '❄️' },
    { name: 'Snacks', icon: '🍿' },
    { name: 'Household', icon: '🧹' }
  ];

  const isSelected = (category: string) => {
    if (category.name === selectedCategory) return true;
    if (category.name.toLowerCase().includes('produce') && selectedCategory.toLowerCase().includes('produce')) {
      return true;
    }
    if (category.name.toLowerCase().includes('dairy') && selectedCategory.toLowerCase().includes('dairy')) {
      return true;
    }
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-[113px] z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                isSelected(category)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-green-600'
              }`}
            >
              <span className="text-base">{category.icon}</span>
              <span>{category.name}</span>
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
