export function NavBar({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) {
  const categories = [
    'All Products',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Sports',
    'Books',
    'Beauty',
    'Toys & Games',
    'Automotive',
    'Health'
  ];

  // Normalize category for matching (handle Home & Living vs Home & Kitchen)
  const isSelected = (category: string) => {
    if (category === selectedCategory) return true;
    if (category.toLowerCase().includes('home') && selectedCategory.toLowerCase().includes('home')) {
      return true;
    }
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`text-sm whitespace-nowrap pb-1 transition-all ${
                isSelected(category)
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}