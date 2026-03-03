import { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface MultiSelectFilterProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  icon?: ReactNode;
}

export function MultiSelectFilter({ options, selected, onChange, placeholder = 'Select...', icon }: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const displayText = selected.length === 0 
    ? placeholder 
    : selected.length === 1 
      ? selected[0] 
      : `${selected.length} selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 py-1 text-left border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-between gap-1 ${
          selected.length > 0 ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
        }`}
      >
        <span className="flex items-center gap-1 truncate">
          {icon}
          <span className="truncate">{displayText}</span>
        </span>
        <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-2">
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
            >
              <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                selected.length === options.length ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {selected.length === options.length && <Check className="w-3 h-3 text-white" />}
              </div>
              {selected.length === options.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          
          {options.length === 0 ? (
            <div className="p-2 text-sm text-gray-500 text-center">No options available</div>
          ) : (
            options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleToggle(option)}
                className="w-full text-left px-2 py-2 text-sm hover:bg-blue-50 flex items-center gap-2 border-b border-gray-100 last:border-b-0"
              >
                <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                  selected.includes(option) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}>
                  {selected.includes(option) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="truncate">{option}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
