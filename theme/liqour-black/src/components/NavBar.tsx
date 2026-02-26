export function NavBar({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  const categories = [
    { name: 'All Products', icon: '🍷' },
    { name: 'Whiskey', icon: '🥃' },
    { name: 'Vodka', icon: '🍸' },
    { name: 'Rum', icon: '🍹' },
    { name: 'Gin', icon: '🍸' },
    { name: 'Tequila', icon: '🥃' },
    { name: 'Wine', icon: '🍷' },
    { name: 'Beer', icon: '🍺' }
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
    <nav className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                selectedCategory === category.name
                  ? 'bg-black text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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