import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function WarehouseProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: 'Electronics',
        cost: 0,
        stock: 0,
        minReorderLevel: 20,
        location: '',
        supplier: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Warehouse product saved successfully!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'cost' || name === 'stock' || name === 'minReorderLevel' ? parseFloat(value) || 0 : value,
        }));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div>
                <h2 className="text-3xl font-medium text-gray-900">Add Warehouse Inventory</h2>
                <p className="text-gray-600 mt-2">Receive new stock or create a new inventory item</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <form id="warehouse-form" onSubmit={handleSubmit} className="space-y-8">
                    {/* Identity Info */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Product Identification</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name" className="mb-2 block">Product Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Wireless Keyboard"
                                />
                            </div>

                            <div>
                                <Label htmlFor="sku" className="mb-2 block">SKU (Stock Keeping Unit) <span className="text-red-500">*</span></Label>
                                <Input
                                    id="sku"
                                    type="text"
                                    name="sku"
                                    required
                                    value={formData.sku}
                                    onChange={handleChange}
                                    className="font-mono text-sm"
                                    placeholder="e.g. WH-KB-001"
                                />
                            </div>

                            <div>
                                <Label htmlFor="category" className="mb-2 block">Category <span className="text-red-500">*</span></Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, category: value }))}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Furniture">Furniture</SelectItem>
                                        <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                                        <SelectItem value="Apparel">Apparel</SelectItem>
                                        <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="supplier" className="mb-2 block">Primary Supplier</Label>
                                <Input
                                    id="supplier"
                                    type="text"
                                    name="supplier"
                                    value={formData.supplier}
                                    onChange={handleChange}
                                    placeholder="e.g. TechCorp Inc."
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Logistics & Stock */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Logistics & Tracking</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="cost" className="mb-2 block">Unit Cost ($) <span className="text-red-500">*</span></Label>
                                <Input
                                    id="cost"
                                    type="number"
                                    name="cost"
                                    step="0.01"
                                    min="0"
                                    required
                                    value={formData.cost}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="stock" className="mb-2 block">Current Stock Level <span className="text-red-500">*</span></Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    name="stock"
                                    min="0"
                                    required
                                    value={formData.stock}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="minReorderLevel" className="mb-2 block">Minimum Reorder Level</Label>
                                <Input
                                    id="minReorderLevel"
                                    type="number"
                                    name="minReorderLevel"
                                    min="0"
                                    value={formData.minReorderLevel}
                                    onChange={handleChange}
                                    placeholder="Alert when stock falls below..."
                                />
                            </div>

                            <div>
                                <Label htmlFor="location" className="mb-2 block">Warehouse Location (Aisle/Bin)</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Aisle 4, Bin 12A"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                        >
                            Save Inventory Record
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
