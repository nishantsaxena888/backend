import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X, Plus, Info, Globe, Truck, BarChart3 } from "lucide-react";
import type { Product } from "../types";
import { ProductSchema } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySelector } from "./CategorySelector";
import { StockManager } from "./StockManager";
import { PriceSection } from "./PriceSection";
import { ImageUploader } from "./ImageUploader";
import { Separator } from "@/components/ui/separator";

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSubmit: (data: Product) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Product>({
        resolver: zodResolver(ProductSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            shortDescription: "",
            sku: "",
            regularPrice: 0,
            status: "draft",
            currency: "USD",
            taxClass: "standard",
            manageStock: true,
            stockStatus: "instock",
            categories: [],
            mainImage: "",
            gallery: [],
            attributes: [],
            shipping: { weight: 0, length: 0, width: 0, height: 0 },
            seo: { metaTitle: "", metaDescription: "", slug: "" },
            ...initialData
        }
    });

    const { fields: attributeFields, append: appendAttribute, remove: removeAttribute } = useFieldArray({
        control,
        name: "attributes"
    });

    const formValues = watch();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-20 py-4 border-b">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight">
                        {initialData?.id ? "Edit Product" : "Create New Product"}
                    </h2>
                    <p className="text-sm text-muted-foreground">Fill in the details below to publish your product.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" type="button" onClick={onCancel} className="rounded-xl flex-1 sm:flex-none">
                        Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl flex-1 sm:flex-none shadow-xl shadow-primary/20" disabled={isLoading}>
                        <Save className="w-4 h-4 mr-2" />
                        {initialData?.id ? "Update Product" : "Publish Product"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b bg-muted/30 flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" />
                            <h3 className="font-black text-sm uppercase tracking-widest">Basic Information</h3>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Product Name</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    className="h-12 text-lg font-bold rounded-xl border-2 focus-visible:ring-primary/20"
                                    placeholder="e.g. Wireless Noise Cancelling Headphones"
                                />
                                {errors.name && <p className="text-xs text-destructive font-bold">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description (Rich Text)</Label>
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    className="min-h-[200px] rounded-xl border-2 focus-visible:ring-primary/20"
                                    placeholder="Describe your product in detail..."
                                />
                                {errors.description && <p className="text-xs text-destructive font-bold">{errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="shortDescription" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Short Description</Label>
                                <Textarea
                                    id="shortDescription"
                                    {...register("shortDescription")}
                                    className="min-h-[80px] rounded-xl border-2 focus-visible:ring-primary/20"
                                    placeholder="A brief summary for search results..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Sections Tabs */}
                    <Tabs defaultValue="inventory" className="w-full">
                        <TabsList className="w-full justify-start h-14 bg-muted/50 p-1.5 rounded-2xl border-2 overflow-x-auto no-scrollbar flex-nowrap">
                            <TabsTrigger value="inventory" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <BarChart3 className="w-4 h-4" />
                                Inventory
                            </TabsTrigger>
                            <TabsTrigger value="pricing" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <Globe className="w-4 h-4" />
                                Pricing
                            </TabsTrigger>
                            <TabsTrigger value="shipping" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <Truck className="w-4 h-4" />
                                Shipping
                            </TabsTrigger>
                            <TabsTrigger value="attributes" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <Plus className="w-4 h-4" />
                                Attributes
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="inventory" className="mt-4">
                            <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm">
                                <CardContent className="p-6">
                                    <StockManager
                                        sku={formValues.sku}
                                        stockQuantity={formValues.stockQuantity}
                                        manageStock={formValues.manageStock}
                                        stockStatus={formValues.stockStatus}
                                        lowStockThreshold={formValues.lowStockThreshold}
                                        onChange={(updates) => {
                                            Object.entries(updates).forEach(([key, val]) => {
                                                setValue(key as any, val);
                                            });
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="pricing" className="mt-4">
                            <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm">
                                <CardContent className="p-6">
                                    <PriceSection
                                        regularPrice={formValues.regularPrice}
                                        salePrice={formValues.salePrice}
                                        taxClass={formValues.taxClass}
                                        currency={formValues.currency}
                                        onChange={(updates) => {
                                            Object.entries(updates).forEach(([key, val]) => {
                                                setValue(key as any, val);
                                            });
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="shipping" className="mt-4">
                            <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm">
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Weight (kg)</Label>
                                            <Input type="number" step="0.1" {...register("shipping.weight", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Length (cm)</Label>
                                            <Input type="number" {...register("shipping.length", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Width (cm)</Label>
                                            <Input type="number" {...register("shipping.width", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Height (cm)</Label>
                                            <Input type="number" {...register("shipping.height", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="attributes" className="mt-4">
                            <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm">
                                <CardContent className="p-6 space-y-4">
                                    {attributeFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-3 items-end animate-in fade-in slide-in-from-left-2 duration-200">
                                            <div className="flex-1 space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Attribute Name</Label>
                                                <Input {...register(`attributes.${index}.name` as const)} placeholder="e.g. Size" className="rounded-xl border-2" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Value</Label>
                                                <Input {...register(`attributes.${index}.value` as const)} placeholder="e.g. XL" className="rounded-xl border-2" />
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => removeAttribute(index)} className="rounded-xl text-destructive hover:bg-destructive/10">
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => appendAttribute({ name: "", value: "" })}
                                        className="w-full rounded-xl border-dashed border-2 py-6"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Attribute
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-8">
                    {/* Status & Category Sidebars */}
                    <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm sticky top-24">
                        <div className="px-6 py-4 border-b bg-muted/30 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" />
                            <h3 className="font-black text-sm uppercase tracking-widest">Publish Settings</h3>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Categories</Label>
                                <CategorySelector
                                    selectedCategories={formValues.categories}
                                    onChange={(cats) => setValue("categories", cats)}
                                />
                                {errors.categories && <p className="text-xs text-destructive font-bold">{errors.categories.message}</p>}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">SEO Slug</Label>
                                <Input
                                    {...register("seo.slug")}
                                    placeholder="product-url-slug"
                                    className="rounded-xl border-2"
                                />
                                {errors.seo?.slug && <p className="text-xs text-destructive font-bold">{errors.seo.slug.message}</p>}
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Media</Label>
                                <ImageUploader
                                    mainImage={formValues.mainImage}
                                    gallery={formValues.gallery}
                                    onChange={(updates) => {
                                        if (updates.mainImage !== undefined) setValue("mainImage", updates.mainImage);
                                        if (updates.gallery !== undefined) setValue("gallery", updates.gallery);
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
