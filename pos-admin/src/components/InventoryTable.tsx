import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight, Download, X, SlidersHorizontal, ArrowUpDown, ArrowUp, ArrowDown, Tag, MapPin, Building2, Settings } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { MultiSelectFilter } from './MultiSelectFilter';
import { ColumnFilter } from './ColumnFilter';
import { BulkOperationsPanel } from './BulkOperationsPanel';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  tags: string[];
  suppliers: string[];
  locations: string[];
  brand: string;
  warranty: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 79.99, stock: 145, status: 'In Stock', lastUpdated: '2024-12-10', tags: ['Audio', 'Bluetooth', 'Premium'], suppliers: ['TechCorp', 'AudioMax'], locations: ['Warehouse A', 'Store 1'], brand: 'SoundPro', warranty: '2 Years' },
  { id: 2, name: 'Smart Watch', sku: 'SW-002', category: 'Electronics', price: 199.99, stock: 89, status: 'In Stock', lastUpdated: '2024-12-11', tags: ['Wearable', 'Smart', 'Fitness'], suppliers: ['TechCorp', 'WearableTech'], locations: ['Warehouse B', 'Store 2'], brand: 'FitTime', warranty: '1 Year' },
  { id: 3, name: 'Laptop Stand', sku: 'LS-003', category: 'Electronics', price: 29.99, stock: 234, status: 'In Stock', lastUpdated: '2024-12-09', tags: ['Accessory', 'Ergonomic'], suppliers: ['OfficeSupply'], locations: ['Warehouse A'], brand: 'ErgoDesk', warranty: '6 Months' },
  { id: 4, name: 'USB-C Cable', sku: 'UC-004', category: 'Electronics', price: 14.99, stock: 8, status: 'Low Stock', lastUpdated: '2024-12-12', tags: ['Cable', 'Accessory'], suppliers: ['TechCorp'], locations: ['Store 1'], brand: 'CablePro', warranty: '90 Days' },
  { id: 5, name: 'Desk Lamp', sku: 'DL-005', category: 'Electronics', price: 44.99, stock: 167, status: 'In Stock', lastUpdated: '2024-12-08', tags: ['Lighting', 'LED'], suppliers: ['LightWorks', 'OfficeSupply'], locations: ['Warehouse A', 'Warehouse B'], brand: 'BrightLight', warranty: '1 Year' },
  { id: 6, name: 'Coffee Mug', sku: 'CM-006', category: 'Food & Beverage', price: 12.99, stock: 0, status: 'Out of Stock', lastUpdated: '2024-12-07', tags: ['Drinkware', 'Ceramic'], suppliers: ['KitchenPlus'], locations: ['Store 2'], brand: 'MugMaster', warranty: 'None' },
  { id: 7, name: 'Notebook Set', sku: 'NB-007', category: 'Books', price: 24.99, stock: 312, status: 'In Stock', lastUpdated: '2024-12-10', tags: ['Stationery', 'Paper'], suppliers: ['PaperWorld', 'OfficeSupply'], locations: ['Warehouse A', 'Store 1', 'Store 2'], brand: 'WriteWell', warranty: 'None' },
  { id: 8, name: 'Ergonomic Mouse', sku: 'EM-008', category: 'Electronics', price: 34.99, stock: 76, status: 'In Stock', lastUpdated: '2024-12-11', tags: ['Accessory', 'Ergonomic', 'Wireless'], suppliers: ['TechCorp', 'OfficeSupply'], locations: ['Warehouse B'], brand: 'ComfortClick', warranty: '1 Year' },
  { id: 9, name: 'Bluetooth Speaker', sku: 'BS-009', category: 'Electronics', price: 59.99, stock: 5, status: 'Low Stock', lastUpdated: '2024-12-09', tags: ['Audio', 'Bluetooth', 'Portable'], suppliers: ['AudioMax'], locations: ['Store 1'], brand: 'SoundWave', warranty: '1 Year' },
  { id: 10, name: 'Water Bottle', sku: 'WB-010', category: 'Other', price: 19.99, stock: 189, status: 'In Stock', lastUpdated: '2024-12-12', tags: ['Drinkware', 'Sports'], suppliers: ['SportGear', 'KitchenPlus'], locations: ['Warehouse A', 'Store 2'], brand: 'HydroLife', warranty: '6 Months' },
  { id: 11, name: 'Phone Case', sku: 'PC-011', category: 'Electronics', price: 24.99, stock: 423, status: 'In Stock', lastUpdated: '2024-12-08', tags: ['Accessory', 'Protection'], suppliers: ['TechCorp', 'MobilePlus'], locations: ['Warehouse B', 'Store 1', 'Store 2'], brand: 'SafeCase', warranty: '90 Days' },
  { id: 12, name: 'T-Shirt', sku: 'TS-012', category: 'Clothing', price: 29.99, stock: 156, status: 'In Stock', lastUpdated: '2024-12-10', tags: ['Apparel', 'Cotton'], suppliers: ['FashionHub'], locations: ['Store 2'], brand: 'ComfortWear', warranty: 'None' },
];

const ITEMS_PER_PAGE = 8;

export function InventoryTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Column filters
  const [nameFilter, setNameFilter] = useState('');
  const [skuFilter, setSkuFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [warrantyFilter, setWarrantyFilter] = useState<string[]>([]);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [suppliersFilter, setSuppliersFilter] = useState<string[]>([]);
  const [locationsFilter, setLocationsFilter] = useState<string[]>([]);
  
  // Range filters
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [stockMin, setStockMin] = useState('');
  const [stockMax, setStockMax] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  const [sortBy, setSortBy] = useState<'name' | 'sku' | 'price' | 'stock' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showColumnFilters, setShowColumnFilters] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isBulkPanelOpen, setIsBulkPanelOpen] = useState(false);

  // Get unique values for filters
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allStatuses = Array.from(new Set(products.map(p => p.status)));
  const allBrands = Array.from(new Set(products.map(p => p.brand)));
  const allWarranties = Array.from(new Set(products.map(p => p.warranty)));
  const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
  const allSuppliers = Array.from(new Set(products.flatMap(p => p.suppliers)));
  const allLocations = Array.from(new Set(products.flatMap(p => p.locations)));

  // Filter products
  const filteredProducts = products.filter(product => {
    // Text search
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Column filters
    const matchesName = !nameFilter || product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesSku = !skuFilter || product.sku.toLowerCase().includes(skuFilter.toLowerCase());
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(product.category);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(product.status);
    const matchesBrand = brandFilter.length === 0 || brandFilter.includes(product.brand);
    const matchesWarranty = warrantyFilter.length === 0 || warrantyFilter.includes(product.warranty);
    
    // Many-to-many filters
    const matchesTags = tagsFilter.length === 0 || tagsFilter.some(tag => product.tags.includes(tag));
    const matchesSuppliers = suppliersFilter.length === 0 || suppliersFilter.some(supplier => product.suppliers.includes(supplier));
    const matchesLocations = locationsFilter.length === 0 || locationsFilter.some(location => product.locations.includes(location));
    
    // Range filters
    const matchesPriceMin = !priceMin || product.price >= parseFloat(priceMin);
    const matchesPriceMax = !priceMax || product.price <= parseFloat(priceMax);
    const matchesStockMin = !stockMin || product.stock >= parseInt(stockMin);
    const matchesStockMax = !stockMax || product.stock <= parseInt(stockMax);
    const matchesDateFrom = !dateFrom || product.lastUpdated >= dateFrom;
    const matchesDateTo = !dateTo || product.lastUpdated <= dateTo;
    
    return matchesSearch && matchesName && matchesSku && matchesCategory && 
           matchesStatus && matchesBrand && matchesWarranty &&
           matchesTags && matchesSuppliers && matchesLocations &&
           matchesPriceMin && matchesPriceMax && 
           matchesStockMin && matchesStockMax &&
           matchesDateFrom && matchesDateTo;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'sku':
        comparison = a.sku.localeCompare(b.sku);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'stock':
        comparison = a.stock - b.stock;
        break;
      case 'date':
        comparison = a.lastUpdated.localeCompare(b.lastUpdated);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleClearFilters = () => {
    setSearchTerm('');
    setNameFilter('');
    setSkuFilter('');
    setCategoryFilter([]);
    setStatusFilter([]);
    setBrandFilter([]);
    setWarrantyFilter([]);
    setTagsFilter([]);
    setSuppliersFilter([]);
    setLocationsFilter([]);
    setPriceMin('');
    setPriceMax('');
    setStockMin('');
    setStockMax('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0 && confirm(`Delete ${selectedProducts.length} selected products?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const handleSort = (field: 'name' | 'sku' | 'price' | 'stock' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: 'name' | 'sku' | 'price' | 'stock' | 'date') => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortOrder === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-blue-600" /> : 
      <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  const handleAddProduct = (product: Omit<Product, 'id' | 'lastUpdated'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(...products.map(p => p.id)) + 1,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, newProduct]);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (product: Omit<Product, 'id' | 'lastUpdated'>) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...product, id: p.id, lastUpdated: new Date().toISOString().split('T')[0] }
          : p
      ));
      setEditingProduct(null);
      setIsFormOpen(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) +
    (nameFilter ? 1 : 0) +
    (skuFilter ? 1 : 0) +
    categoryFilter.length +
    statusFilter.length +
    brandFilter.length +
    warrantyFilter.length +
    tagsFilter.length +
    suppliersFilter.length +
    locationsFilter.length +
    (priceMin ? 1 : 0) +
    (priceMax ? 1 : 0) +
    (stockMin ? 1 : 0) +
    (stockMax ? 1 : 0) +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Inventory Management</h2>
          {activeFiltersCount > 0 && (
            <p className="text-gray-600 mt-2">{activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}</p>
          )}
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Global Search and Actions */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Global search across all products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowColumnFilters(!showColumnFilters)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                showColumnFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              Column Filters
            </button>
            
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
              Clear all {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>

      {/* Results Count and Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} products
        </div>
        
        {selectedProducts.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsBulkPanelOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Bulk Operations ({selectedProducts.length})
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Quick Delete
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {/* Column Headers */}
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    Product Name
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('sku')}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    SKU
                    {getSortIcon('sku')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('price')}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    Price
                    {getSortIcon('price')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('stock')}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    Stock
                    {getSortIcon('stock')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Tags</th>
                <th className="px-4 py-3 text-left">Suppliers</th>
                <th className="px-4 py-3 text-left">Locations</th>
                <th className="px-4 py-3 text-left">Warranty</th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    Last Updated
                    {getSortIcon('date')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>

              {/* Column Filters */}
              {showColumnFilters && (
                <tr className="border-b border-gray-200 bg-gray-100">
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">
                    <ColumnFilter
                      value={nameFilter}
                      onChange={setNameFilter}
                      placeholder="Filter name..."
                    />
                  </th>
                  <th className="px-4 py-2">
                    <ColumnFilter
                      value={skuFilter}
                      onChange={setSkuFilter}
                      placeholder="Filter SKU..."
                    />
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allCategories}
                      selected={categoryFilter}
                      onChange={setCategoryFilter}
                      placeholder="All"
                    />
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allBrands}
                      selected={brandFilter}
                      onChange={setBrandFilter}
                      placeholder="All"
                    />
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        placeholder="Min"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        placeholder="Max"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={stockMin}
                        onChange={(e) => setStockMin(e.target.value)}
                        placeholder="Min"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={stockMax}
                        onChange={(e) => setStockMax(e.target.value)}
                        placeholder="Max"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allStatuses}
                      selected={statusFilter}
                      onChange={setStatusFilter}
                      placeholder="All"
                    />
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allTags}
                      selected={tagsFilter}
                      onChange={setTagsFilter}
                      placeholder="All Tags"
                      icon={<Tag className="w-3 h-3" />}
                    />
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allSuppliers}
                      selected={suppliersFilter}
                      onChange={setSuppliersFilter}
                      placeholder="All"
                      icon={<Building2 className="w-3 h-3" />}
                    />
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allLocations}
                      selected={locationsFilter}
                      onChange={setLocationsFilter}
                      placeholder="All"
                      icon={<MapPin className="w-3 h-3" />}
                    />
                  </th>
                  <th className="px-4 py-2">
                    <MultiSelectFilter
                      options={allWarranties}
                      selected={warrantyFilter}
                      onChange={setWarrantyFilter}
                      placeholder="All"
                    />
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex gap-1">
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              )}
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600">{product.sku}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.brand}</td>
                  <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{product.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.suppliers.slice(0, 1).map((supplier, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {supplier}
                        </span>
                      ))}
                      {product.suppliers.length > 1 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{product.suppliers.length - 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.locations.slice(0, 1).map((location, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          {location}
                        </span>
                      ))}
                      {product.locations.length > 1 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{product.locations.length - 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.warranty}</td>
                  <td className="px-4 py-3 text-gray-600">{product.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} products
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          
          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Show first page, last page, current page, and pages around current
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .map((page, idx, arr) => (
                <>
                  {/* Add ellipsis if there's a gap */}
                  {idx > 0 && arr[idx - 1] !== page - 1 && (
                    <span key={`ellipsis-${page}`} className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] px-3 py-2 border rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                </>
              ))
            }
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Last
          </button>
        </div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
          onClose={handleCloseForm}
        />
      )}

      {/* Bulk Operations Panel */}
      {isBulkPanelOpen && (
        <BulkOperationsPanel
          products={products}
          selectedProducts={selectedProducts}
          setProducts={setProducts}
          setSelectedProducts={setSelectedProducts}
          onClose={() => setIsBulkPanelOpen(false)}
        />
      )}
    </div>
  );
}