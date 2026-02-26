import { useState } from 'react';
import { X, Save, Trash2, Copy, Tag, Building2, MapPin, DollarSign, Package } from 'lucide-react';
import { Product } from './InventoryTable';
import { ElasticMultiSelect } from './ElasticMultiSelect';

interface BulkOperationsPanelProps {
  products: Product[];
  selectedProducts: number[];
  setProducts: (products: Product[]) => void;
  setSelectedProducts: (ids: number[]) => void;
  onClose: () => void;
}

type OperationType = 'update' | 'delete' | 'duplicate' | 'addTags' | 'removeTags' | 'addSuppliers' | 'removeSuppliers' | 'addLocations' | 'removeLocations' | 'changeCategory' | 'changeStatus' | 'adjustPrice' | 'adjustStock';

export function BulkOperationsPanel({ products, selectedProducts, setProducts, setSelectedProducts, onClose }: BulkOperationsPanelProps) {
  const [operation, setOperation] = useState<OperationType>('update');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  
  // Get selected product objects
  const selectedProductObjects = products.filter(p => selectedProducts.includes(p.id));
  
  // Field values
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [brand, setBrand] = useState('');
  const [warranty, setWarranty] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [suppliers, setSuppliers] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [priceAdjustment, setPriceAdjustment] = useState('0');
  const [priceAdjustmentType, setPriceAdjustmentType] = useState<'set' | 'increase' | 'decrease' | 'percent'>('set');
  const [stockAdjustment, setStockAdjustment] = useState('0');
  const [stockAdjustmentType, setStockAdjustmentType] = useState<'set' | 'increase' | 'decrease'>('set');

  // Get unique values from all products
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allStatuses: Array<'In Stock' | 'Low Stock' | 'Out of Stock'> = ['In Stock', 'Low Stock', 'Out of Stock'];
  const allBrands = Array.from(new Set(products.map(p => p.brand)));
  const allWarranties = Array.from(new Set(products.map(p => p.warranty)));
  const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
  const allSuppliers = Array.from(new Set(products.flatMap(p => p.suppliers)));
  const allLocations = Array.from(new Set(products.flatMap(p => p.locations)));

  const handleApply = () => {
    if (operation === 'delete') {
      if (confirm(`Are you sure you want to delete ${selectedProductObjects.length} products?`)) {
        setProducts(products.filter(p => !selectedProducts.includes(p.id)));
        setSelectedProducts([]);
        onClose();
      }
      return;
    }

    if (operation === 'duplicate') {
      const maxId = Math.max(...products.map(p => p.id));
      const duplicates = selectedProductObjects.map((product, idx) => ({
        ...product,
        id: maxId + idx + 1,
        sku: `${product.sku}-COPY${idx + 1}`,
        name: `${product.name} (Copy)`,
        lastUpdated: new Date().toISOString().split('T')[0],
      }));
      setProducts([...products, ...duplicates]);
      setSelectedProducts([]);
      onClose();
      return;
    }

    const updates = products.map(product => {
      if (!selectedProducts.includes(product.id)) return product;

      const update: Product = { ...product };

      if (operation === 'update') {
        if (selectedFields.includes('category') && category) update.category = category;
        if (selectedFields.includes('status') && status) update.status = status as any;
        if (selectedFields.includes('brand') && brand) update.brand = brand;
        if (selectedFields.includes('warranty') && warranty) update.warranty = warranty;
      }

      if (operation === 'addTags' || (operation === 'update' && selectedFields.includes('tags'))) {
        update.tags = Array.from(new Set([...(product.tags || []), ...tags]));
      }

      if (operation === 'removeTags') {
        update.tags = product.tags.filter(t => !tags.includes(t));
      }

      if (operation === 'addSuppliers' || (operation === 'update' && selectedFields.includes('suppliers'))) {
        update.suppliers = Array.from(new Set([...(product.suppliers || []), ...suppliers]));
      }

      if (operation === 'removeSuppliers') {
        update.suppliers = product.suppliers.filter(s => !suppliers.includes(s));
      }

      if (operation === 'addLocations' || (operation === 'update' && selectedFields.includes('locations'))) {
        update.locations = Array.from(new Set([...(product.locations || []), ...locations]));
      }

      if (operation === 'removeLocations') {
        update.locations = product.locations.filter(l => !locations.includes(l));
      }

      if (operation === 'adjustPrice' || (operation === 'update' && selectedFields.includes('price'))) {
        const adjustment = parseFloat(priceAdjustment) || 0;
        switch (priceAdjustmentType) {
          case 'set':
            update.price = adjustment;
            break;
          case 'increase':
            update.price = product.price + adjustment;
            break;
          case 'decrease':
            update.price = Math.max(0, product.price - adjustment);
            break;
          case 'percent':
            update.price = product.price * (1 + adjustment / 100);
            break;
        }
        update.price = Math.round((update.price || 0) * 100) / 100;
      }

      if (operation === 'adjustStock' || (operation === 'update' && selectedFields.includes('stock'))) {
        const adjustment = parseInt(stockAdjustment) || 0;
        switch (stockAdjustmentType) {
          case 'set':
            update.stock = adjustment;
            break;
          case 'increase':
            update.stock = product.stock + adjustment;
            break;
          case 'decrease':
            update.stock = Math.max(0, product.stock - adjustment);
            break;
        }
      }

      update.lastUpdated = new Date().toISOString().split('T')[0];
      return update;
    });

    setProducts(updates);
    setSelectedProducts([]);
    onClose();
  };

  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-2xl">Bulk Operations</h3>
            <p className="text-gray-600 mt-1">{selectedProductObjects.length} product{selectedProductObjects.length !== 1 ? 's' : ''} selected</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Operation Type Selection */}
          <div className="mb-6">
            <label className="block mb-3">Select Operation</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setOperation('update')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'update' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Save className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Update Fields</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('delete')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'delete' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Trash2 className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Delete</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('duplicate')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'duplicate' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Copy className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Duplicate</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('addTags')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'addTags' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Tag className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Add Tags</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('removeTags')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'removeTags' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Tag className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Remove Tags</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('adjustPrice')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'adjustPrice' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <DollarSign className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Adjust Price</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('adjustStock')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'adjustStock' 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Package className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Adjust Stock</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('addSuppliers')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'addSuppliers' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Add Suppliers</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('removeSuppliers')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'removeSuppliers' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Remove Suppliers</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('addLocations')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'addLocations' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <MapPin className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Add Locations</span>
              </button>

              <button
                type="button"
                onClick={() => setOperation('removeLocations')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  operation === 'removeLocations' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <MapPin className="w-5 h-5 mx-auto mb-2" />
                <span className="block">Remove Locations</span>
              </button>
            </div>
          </div>

          {/* Operation-specific forms */}
          <div className="space-y-6">
            {operation === 'update' && (
              <div className="space-y-4">
                <p className="text-gray-600">Select fields to update for all selected products:</p>
                
                {/* Category */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-category"
                    checked={selectedFields.includes('category')}
                    onChange={() => toggleField('category')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-category" className="block mb-2 cursor-pointer">Category</label>
                    <ElasticMultiSelect
                      options={allCategories}
                      selected={category ? [category] : []}
                      onChange={(values) => setCategory(values[0] || '')}
                      placeholder="Select category"
                      mode="single"
                      disabled={!selectedFields.includes('category')}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-status"
                    checked={selectedFields.includes('status')}
                    onChange={() => toggleField('status')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-status" className="block mb-2 cursor-pointer">Status</label>
                    <ElasticMultiSelect
                      options={allStatuses}
                      selected={status ? [status] : []}
                      onChange={(values) => setStatus(values[0] || '')}
                      placeholder="Select status"
                      mode="single"
                      disabled={!selectedFields.includes('status')}
                    />
                  </div>
                </div>

                {/* Brand */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-brand"
                    checked={selectedFields.includes('brand')}
                    onChange={() => toggleField('brand')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-brand" className="block mb-2 cursor-pointer">Brand</label>
                    <ElasticMultiSelect
                      options={allBrands}
                      selected={brand ? [brand] : []}
                      onChange={(values) => setBrand(values[0] || '')}
                      placeholder="Select or type brand"
                      mode="single"
                      allowCreate={true}
                      disabled={!selectedFields.includes('brand')}
                    />
                  </div>
                </div>

                {/* Warranty */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-warranty"
                    checked={selectedFields.includes('warranty')}
                    onChange={() => toggleField('warranty')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-warranty" className="block mb-2 cursor-pointer">Warranty</label>
                    <ElasticMultiSelect
                      options={allWarranties}
                      selected={warranty ? [warranty] : []}
                      onChange={(values) => setWarranty(values[0] || '')}
                      placeholder="Select warranty"
                      mode="single"
                      disabled={!selectedFields.includes('warranty')}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-tags"
                    checked={selectedFields.includes('tags')}
                    onChange={() => toggleField('tags')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-tags" className="block mb-2 cursor-pointer">Add Tags</label>
                    <ElasticMultiSelect
                      options={allTags}
                      selected={tags}
                      onChange={setTags}
                      placeholder="Select or create tags"
                      mode="multiple"
                      allowCreate={true}
                      disabled={!selectedFields.includes('tags')}
                    />
                  </div>
                </div>

                {/* Suppliers */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-suppliers"
                    checked={selectedFields.includes('suppliers')}
                    onChange={() => toggleField('suppliers')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-suppliers" className="block mb-2 cursor-pointer">Add Suppliers</label>
                    <ElasticMultiSelect
                      options={allSuppliers}
                      selected={suppliers}
                      onChange={setSuppliers}
                      placeholder="Select or create suppliers"
                      mode="multiple"
                      allowCreate={true}
                      disabled={!selectedFields.includes('suppliers')}
                    />
                  </div>
                </div>

                {/* Locations */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="field-locations"
                    checked={selectedFields.includes('locations')}
                    onChange={() => toggleField('locations')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="field-locations" className="block mb-2 cursor-pointer">Add Locations</label>
                    <ElasticMultiSelect
                      options={allLocations}
                      selected={locations}
                      onChange={setLocations}
                      placeholder="Select or create locations"
                      mode="multiple"
                      allowCreate={true}
                      disabled={!selectedFields.includes('locations')}
                    />
                  </div>
                </div>
              </div>
            )}

            {(operation === 'addTags' || operation === 'removeTags') && (
              <div>
                <label className="block mb-2">
                  {operation === 'addTags' ? 'Tags to Add' : 'Tags to Remove'}
                </label>
                <ElasticMultiSelect
                  options={allTags}
                  selected={tags}
                  onChange={setTags}
                  placeholder="Select or create tags"
                  mode="multiple"
                  allowCreate={operation === 'addTags'}
                />
              </div>
            )}

            {(operation === 'addSuppliers' || operation === 'removeSuppliers') && (
              <div>
                <label className="block mb-2">
                  {operation === 'addSuppliers' ? 'Suppliers to Add' : 'Suppliers to Remove'}
                </label>
                <ElasticMultiSelect
                  options={allSuppliers}
                  selected={suppliers}
                  onChange={setSuppliers}
                  placeholder="Select or create suppliers"
                  mode="multiple"
                  allowCreate={operation === 'addSuppliers'}
                />
              </div>
            )}

            {(operation === 'addLocations' || operation === 'removeLocations') && (
              <div>
                <label className="block mb-2">
                  {operation === 'addLocations' ? 'Locations to Add' : 'Locations to Remove'}
                </label>
                <ElasticMultiSelect
                  options={allLocations}
                  selected={locations}
                  onChange={setLocations}
                  placeholder="Select or create locations"
                  mode="multiple"
                  allowCreate={operation === 'addLocations'}
                />
              </div>
            )}

            {operation === 'adjustPrice' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Price Adjustment Type</label>
                  <select
                    value={priceAdjustmentType}
                    onChange={(e) => setPriceAdjustmentType(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="set">Set to specific value</option>
                    <option value="increase">Increase by amount</option>
                    <option value="decrease">Decrease by amount</option>
                    <option value="percent">Adjust by percentage</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">
                    {priceAdjustmentType === 'percent' ? 'Percentage (%)' : 'Amount ($)'}
                  </label>
                  <input
                    type="number"
                    value={priceAdjustment}
                    onChange={(e) => setPriceAdjustment(e.target.value)}
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}

            {operation === 'adjustStock' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Stock Adjustment Type</label>
                  <select
                    value={stockAdjustmentType}
                    onChange={(e) => setStockAdjustmentType(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="set">Set to specific value</option>
                    <option value="increase">Increase by amount</option>
                    <option value="decrease">Decrease by amount</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Quantity</label>
                  <input
                    type="number"
                    value={stockAdjustment}
                    onChange={(e) => setStockAdjustment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            )}

            {operation === 'delete' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  ⚠️ Warning: This will permanently delete {selectedProductObjects.length} product{selectedProductObjects.length !== 1 ? 's' : ''}. This action cannot be undone.
                </p>
              </div>
            )}

            {operation === 'duplicate' && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">
                  This will create {selectedProductObjects.length} duplicate product{selectedProductObjects.length !== 1 ? 's' : ''} with new SKUs.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className={`flex-1 px-6 py-3 text-white rounded-lg transition-colors ${
                operation === 'delete' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {operation === 'delete' ? 'Delete Products' : 
               operation === 'duplicate' ? 'Duplicate Products' : 
               'Apply Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}