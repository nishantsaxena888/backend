import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LiquorProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 'Wine',
        abv: 0,
        volume: 750,
        price: 0,
        stock: 0,
        supplier: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Liquor product saved successfully!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'abv' || name === 'volume' ? parseFloat(value) || 0 : value,
        }));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div>
                <h2 className="text-3xl font-medium text-gray-900">Add Liquor Store Item</h2>
                <p className="text-gray-600 mt-2">Register new bottles, kegs, or cases for sale</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <form id="liquor-form" onSubmit={handleSubmit} className="space-y-8">
                    {/* Identity Info */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Beverage Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name" className="mb-2 block">Beverage Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Cabernet Sauvignon"
                                />
                            </div>

                            <div>
                                <Label htmlFor="brand" className="mb-2 block">Brand/Distillery <span className="text-red-500">*</span></Label>
                                <Input
                                    id="brand"
                                    type="text"
                                    name="brand"
                                    required
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. Silver Oak"
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
                                        <SelectItem value="Wine">Wine</SelectItem>
                                        <SelectItem value="Beer">Beer</SelectItem>
                                        <SelectItem value="Spirits">Spirits</SelectItem>
                                        <SelectItem value="Liqueur">Liqueur</SelectItem>
                                        <SelectItem value="Mixers">Mixers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="supplier" className="mb-2 block">Supplier/Distributor</Label>
                                <Input
                                    id="supplier"
                                    type="text"
                                    name="supplier"
                                    value={formData.supplier}
                                    onChange={handleChange}
                                    placeholder="e.g. Southern Glazer's"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Specifications & Sale Info */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Specifications & Pricing</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="abv" className="mb-2 block">ABV (Alcohol By Volume %)</Label>
                                <div className="relative">
                                    <Input
                                        id="abv"
                                        type="number"
                                        name="abv"
                                        step="0.1"
                                        min="0"
                                        max="100"
                                        value={formData.abv}
                                        onChange={handleChange}
                                        className="pr-8"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="volume" className="mb-2 block">Volume (ml) <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <Input
                                        id="volume"
                                        type="number"
                                        name="volume"
                                        min="0"
                                        required
                                        value={formData.volume}
                                        onChange={handleChange}
                                        className="pr-10"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">ml</span>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="price" className="mb-2 block">Retail Price ($) <span className="text-red-500">*</span></Label>
                                <Input
                                    id="price"
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    min="0"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="stock" className="mb-2 block">Shelf Stock Units <span className="text-red-500">*</span></Label>
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
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                        <Button type="button" variant="outline" className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Register Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
