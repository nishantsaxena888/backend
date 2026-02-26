import { X, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { MENU_ITEMS, MODIFIERS, getMenuCategories, findModifierById } from '../../data/menu';
import type { MenuItem, MenuModifier } from '../../types/restaurant';

interface MenuSelectionProps {
  onClose: () => void;
}

export function MenuSelection({ onClose }: MenuSelectionProps) {
  const { selectedOrder, addItemToOrder } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('Appetizers');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<MenuModifier[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const categories = getMenuCategories();
  const menuItems = MENU_ITEMS.filter(item => item.category === selectedCategory && item.available);

  const handleItemClick = (item: MenuItem) => {
    if (item.modifiers.length > 0) {
      setSelectedItem(item);
      setSelectedModifiers([]);
      setSpecialInstructions('');
    } else {
      // No modifiers, add directly
      if (selectedOrder) {
        addItemToOrder(selectedOrder.id, item, []);
      }
    }
  };

  const toggleModifier = (modifier: MenuModifier) => {
    setSelectedModifiers(prev => {
      const exists = prev.find(m => m.id === modifier.id);
      if (exists) {
        return prev.filter(m => m.id !== modifier.id);
      } else {
        return [...prev, modifier];
      }
    });
  };

  const handleAddToOrder = () => {
    if (!selectedOrder || !selectedItem) return;
    
    addItemToOrder(selectedOrder.id, selectedItem, selectedModifiers, specialInstructions);
    setSelectedItem(null);
    setSelectedModifiers([]);
    setSpecialInstructions('');
  };

  if (selectedItem) {
    // Modifier selection view
    const availableModifiers = selectedItem.modifiers
      .map(id => findModifierById(id))
      .filter(m => m !== undefined) as MenuModifier[];

    const modifierCategories = Array.from(new Set(availableModifiers.map(m => m.category)));

    const totalPrice = selectedItem.price + selectedModifiers.reduce((sum, mod) => sum + mod.price, 0);

    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setSelectedItem(null)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              ← Back to menu
            </button>
            <button onClick={onClose} className="text-slate-600 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-slate-900">{selectedItem.name}</h3>
          <p className="text-sm text-slate-600">${selectedItem.price.toFixed(2)}</p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {modifierCategories.map(category => {
            const mods = availableModifiers.filter(m => m.category === category);
            return (
              <div key={category} className="mb-6">
                <h4 className="text-sm text-slate-700 mb-2 uppercase tracking-wide">
                  {category}
                </h4>
                <div className="space-y-2">
                  {mods.map(mod => {
                    const isSelected = selectedModifiers.some(m => m.id === mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModifier(mod)}
                        className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                              isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-slate-900">{mod.name}</span>
                          </div>
                          {mod.price > 0 && (
                            <span className="text-sm text-slate-600">+${mod.price.toFixed(2)}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="mb-6">
            <h4 className="text-sm text-slate-700 mb-2 uppercase tracking-wide">
              Special Instructions
            </h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests..."
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={handleAddToOrder}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Order (${totalPrice.toFixed(2)})
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Menu</h3>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-3 text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="bg-white border-2 border-slate-200 hover:border-blue-400 rounded-lg p-3 text-left transition-all hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm text-slate-900 line-clamp-2 mb-1">
                {item.name}
              </h4>
              <p className="text-sm text-slate-900">${item.price.toFixed(2)}</p>
              {item.description && (
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
