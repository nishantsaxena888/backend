import { Search } from 'lucide-react';

interface ColumnFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ColumnFilter({ value, onChange, placeholder = 'Filter...' }: ColumnFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-7 pr-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          value ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
      />
    </div>
  );
}
