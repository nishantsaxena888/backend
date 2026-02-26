import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Plus } from 'lucide-react';

interface ElasticMultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  mode?: 'single' | 'multiple';
  allowCreate?: boolean;
  disabled?: boolean;
}

export function ElasticMultiSelect({ 
  options, 
  selected, 
  onChange, 
  placeholder = 'Select...', 
  mode = 'multiple',
  allowCreate = false,
  disabled = false
}: ElasticMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (option: string) => {
    if (disabled) return;

    if (mode === 'single') {
      onChange([option]);
      setIsOpen(false);
      setSearchTerm('');
    } else {
      if (selected.includes(option)) {
        onChange(selected.filter(item => item !== option));
      } else {
        onChange([...selected, option]);
      }
    }
  };

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(selected.filter(item => item !== option));
  };

  const handleCreate = () => {
    if (!allowCreate || !inputValue.trim() || disabled) return;
    
    const newValue = inputValue.trim();
    if (!options.includes(newValue) && !selected.includes(newValue)) {
      if (mode === 'single') {
        onChange([newValue]);
      } else {
        onChange([...selected, newValue]);
      }
      setInputValue('');
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && allowCreate && inputValue.trim()) {
      e.preventDefault();
      handleCreate();
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchTerm(value);
  };

  const displayText = mode === 'single' && selected.length === 1
    ? selected[0]
    : selected.length === 0 
      ? placeholder 
      : `${selected.length} selected`;

  return (
    <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-left border rounded-lg flex items-center gap-2 flex-wrap cursor-pointer transition-colors ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-blue-400'
        } ${
          selected.length > 0 ? 'border-blue-400' : 'border-gray-300'
        } ${
          isOpen ? 'ring-2 ring-blue-200' : ''
        }`}
      >
        {mode === 'multiple' && selected.length > 0 ? (
          <>
            {selected.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={(e) => handleRemove(item, e)}
                  className="hover:text-blue-900"
                  disabled={disabled}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <div className="flex-1 min-w-[100px]">
              <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </>
        ) : (
          <>
            <span className={`flex-1 truncate ${selected.length === 0 ? 'text-gray-500' : ''}`}>
              {displayText}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden flex flex-col">
          {/* Search/Create Input */}
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={allowCreate ? "Search or create..." : "Search..."}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {allowCreate && inputValue.trim() && !options.includes(inputValue.trim()) && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="Create new item"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto">
            {allowCreate && inputValue.trim() && !options.includes(inputValue.trim()) && !selected.includes(inputValue.trim()) && (
              <button
                type="button"
                onClick={handleCreate}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 border-b border-gray-100 text-blue-600"
              >
                <Plus className="w-4 h-4" />
                Create "{inputValue.trim()}"
              </button>
            )}

            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">
                {allowCreate ? 'Type to create new item' : 'No options found'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleToggle(option)}
                  className={`w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center gap-2 border-b border-gray-100 last:border-b-0 ${
                    selected.includes(option) ? 'bg-blue-50' : ''
                  }`}
                >
                  {mode === 'multiple' && (
                    <div className={`w-4 h-4 border rounded flex items-center justify-center flex-shrink-0 ${
                      selected.includes(option) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}>
                      {selected.includes(option) && <Check className="w-3 h-3 text-white" />}
                    </div>
                  )}
                  <span className="truncate flex-1">{option}</span>
                  {mode === 'single' && selected.includes(option) && (
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer with count */}
          {mode === 'multiple' && selected.length > 0 && (
            <div className="p-2 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
              {selected.length} item{selected.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
