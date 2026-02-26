interface NavBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { name: 'All', icon: '✨' },
  { name: 'New Arrivals', icon: '🆕' },
  { name: 'Women', icon: '👗' },
  { name: 'Men', icon: '👔' },
  { name: 'Bags', icon: '👜' },
  { name: 'Shoes', icon: '👠' },
  { name: 'Accessories', icon: '💍' },
  { name: 'Sunglasses', icon: '🕶️' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Sale', icon: '🔥' },
];

export function NavBar({ selectedCategory, onCategoryChange }: NavBarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.name
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{category.icon}</span>
              <span className="uppercase tracking-wide">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}