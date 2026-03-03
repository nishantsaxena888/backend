import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Product } from './InventoryTable';

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  onClose: () => void;
}

export function ProductForm({ product, onSave, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    price: 0,
    stock: 0,
    status: 'In Stock' as 'In Stock' | 'Low Stock' | 'Out of Stock',
    tags: [] as string[],
    suppliers: [] as string[],
    locations: [] as string[],
    brand: '',
    warranty: '1 Year',
  });

  const [newTag, setNewTag] = useState('');
  const [newSupplier, setNewSupplier] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        tags: product.tags,
        suppliers: product.suppliers,
        locations: product.locations,
        brand: product.brand,
        warranty: product.warranty,
      });
    }
  }, [product]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addSupplier = () => {
    if (newSupplier.trim() && !formData.suppliers.includes(newSupplier.trim())) {
      setFormData(prev => ({
        ...prev,
        suppliers: [...prev.suppliers, newSupplier.trim()],
      }));
      setNewSupplier('');
    }
  };

  const removeSupplier = (supplier: string) => {
    setFormData(prev => ({
      ...prev,
      suppliers: prev.suppliers.filter(s => s !== supplier),
    }));
  };

  const addLocation = () => {
    if (newLocation.trim() && !formData.locations.includes(newLocation.trim())) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()],
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-2xl">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="mb-4 text-gray-700">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <label className="block mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                </div>

                {/* SKU */}
                <div>
                  <label className="block mb-2">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.sku ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter SKU"
                  />
                  {errors.sku && <p className="text-red-500 mt-1 text-sm">{errors.sku}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.brand ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter brand name"
                  />
                  {errors.brand && <p className="text-red-500 mt-1 text-sm">{errors.brand}</p>}
                </div>
              </div>
            </div>

            {/* Pricing and Inventory */}
            <div>
              <h4 className="mb-4 text-gray-700">Pricing & Inventory</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 mt-1 text-sm">{errors.price}</p>}
                </div>

                {/* Stock */}
                <div>
                  <label className="block mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 mt-1 text-sm">{errors.stock}</p>}
                </div>

                {/* Status */}
                <div>
                  <label className="block mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Warranty */}
            <div>
              <label className="block mb-2">Warranty</label>
              <select
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="None">None</option>
                <option value="90 Days">90 Days</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
              </select>
            </div>

            {/* Tags (Many-to-Many) */}
            <div>
              <h4 className="mb-4 text-gray-700">Tags</h4>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Suppliers (Many-to-Many) */}
            <div>
              <h4 className="mb-4 text-gray-700">Suppliers</h4>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSupplier())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a supplier..."
                />
                <button
                  type="button"
                  onClick={addSupplier}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.suppliers.map((supplier) => (
                  <span key={supplier} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-2">
                    {supplier}
                    <button
                      type="button"
                      onClick={() => removeSupplier(supplier)}
                      className="hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Locations (Many-to-Many) */}
            <div>
              <h4 className="mb-4 text-gray-700">Locations</h4>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a location..."
                />
                <button
                  type="button"
                  onClick={addLocation}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.locations.map((location) => (
                  <span key={location} className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-2">
                    {location}
                    <button
                      type="button"
                      onClick={() => removeLocation(location)}
                      className="hover:text-green-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}