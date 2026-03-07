import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function RestaurantProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Main Course',
        price: 0,
        prepTime: 15,
        status: 'Available',
        dietaryTags: [] as string[],
        description: '',
    });

    const [newTag, setNewTag] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Restaurant product saved successfully!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'prepTime' ? parseFloat(value) || 0 : value,
        }));
    };

    const addTag = () => {
        if (newTag.trim() && !formData.dietaryTags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                dietaryTags: [...prev.dietaryTags, newTag.trim()],
            }));
            setNewTag('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            dietaryTags: prev.dietaryTags.filter(t => t !== tag),
        }));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div>
                <h2 className="text-3xl font-medium text-gray-900">Add Restaurant Menu Item</h2>
                <p className="text-gray-600 mt-2">Create a new dish or drink for the restaurant POS</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <form id="restaurant-form" onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name" className="mb-2 block">Item Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Classic Cheeseburger"
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
                                        <SelectItem value="Starters">Starters</SelectItem>
                                        <SelectItem value="Main Course">Main Course</SelectItem>
                                        <SelectItem value="Desserts">Desserts</SelectItem>
                                        <SelectItem value="Beverages">Beverages</SelectItem>
                                        <SelectItem value="Sides">Sides</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="description" className="mb-2 block">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief description of the item..."
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Pricing & Operations */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Pricing & Operations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <Label htmlFor="price" className="mb-2 block">Price ($) <span className="text-red-500">*</span></Label>
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
                                <Label htmlFor="prepTime" className="mb-2 block">Prep Time (mins)</Label>
                                <Input
                                    id="prepTime"
                                    type="number"
                                    name="prepTime"
                                    min="0"
                                    value={formData.prepTime}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="status" className="mb-2 block">Status <span className="text-red-500">*</span></Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, status: value }))}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Sold Out">Sold Out</SelectItem>
                                        <SelectItem value="Hidden">Hidden</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Dietary Tags */}
                    <div>
                        <h4 className="mb-4 text-gray-900 text-lg font-medium">Dietary Tags</h4>
                        <div className="flex gap-2 mb-4">
                            <Input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="Add a tag (e.g. Vegan)..."
                                className="flex-1"
                            />
                            <Button type="button" onClick={addTag} className="gap-2">
                                <Plus className="w-4 h-4" />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.dietaryTags.map((tag) => (
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

                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                        <Button type="button" variant="outline" className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Save Menu Item
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
