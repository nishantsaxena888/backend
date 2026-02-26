export function NavBar({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  const categories = [
    { name: 'All Products', icon: '✨' },
    { name: 'Bags', icon: '👜' },
    { name: 'Sunglasses', icon: '🕶️' },
    { name: 'Perfume', icon: '💐' },
    { name: 'Jewelry', icon: '💎' },
    { name: 'Clothing', icon: '👗' },
    { name: 'Shoes', icon: '👠' }
  ];

  const isSelected = (category: string) => {
    if (category.name === selectedCategory) return true;
    return false;
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-yellow-900/20 sticky top-[72px] z-40 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-yellow-900/50'
                  : 'bg-gray-800 text-yellow-100/80 hover:bg-gray-700 border border-yellow-900/20'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}