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
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

interface ProductFormProps {
    initialData?: Partial<Product>;
    onSubmit: (data: Product) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) {
    const { currentLanguage } = useLanguage();
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
                        {initialData?.id ? t('Edit Product', currentLanguage.code, 'ui') : t('Create New Product', currentLanguage.code, 'ui')}
                    </h2>
                    <p className="text-sm text-muted-foreground">{t('Fill in the details below to publish your product.', currentLanguage.code, 'ui')}</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" type="button" onClick={onCancel} className="rounded-xl flex-1 sm:flex-none">
                        {t('Cancel', currentLanguage.code, 'ui')}
                    </Button>
                    <Button type="submit" className="rounded-xl flex-1 sm:flex-none shadow-xl shadow-primary/20" disabled={isLoading}>
                        <Save className="w-4 h-4 mr-2" />
                        {initialData?.id ? t('Update Product', currentLanguage.code, 'ui') : t('Publish Product', currentLanguage.code, 'ui')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card className="rounded-[32px] border-2 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b bg-muted/30 flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" />
                            <h3 className="font-black text-sm uppercase tracking-widest">{t('Basic Information', currentLanguage.code, 'ui')}</h3>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Product Name', currentLanguage.code, 'ui')}</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    className="h-12 text-lg font-bold rounded-xl border-2 focus-visible:ring-primary/20"
                                    placeholder={t('e.g. Wireless Noise Cancelling Headphones', currentLanguage.code, 'ui')}
                                />
                                {errors.name && <p className="text-xs text-destructive font-bold">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Description (Rich Text)', currentLanguage.code, 'ui')}</Label>
                                <Textarea
                                    id="description"
                                    {...register("description")}
                                    className="min-h-[200px] rounded-xl border-2 focus-visible:ring-primary/20"
                                    placeholder={t('Describe your product in detail...', currentLanguage.code, 'ui')}
                                />
                                {errors.description && <p className="text-xs text-destructive font-bold">{errors.description.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="shortDescription" className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Short Description', currentLanguage.code, 'ui')}</Label>
                                <Textarea
                                    id="shortDescription"
                                    {...register("shortDescription")}
                                    className="min-h-[80px] rounded-xl border-2 focus-visible:ring-primary/20"
                                    placeholder={t('A brief summary for search results...', currentLanguage.code, 'ui')}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Sections Tabs */}
                    <Tabs defaultValue="inventory" className="w-full">
                        <TabsList className="w-full justify-start h-14 bg-muted/50 p-1.5 rounded-2xl border-2 overflow-x-auto no-scrollbar flex-nowrap">
                            <TabsTrigger value="inventory" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <BarChart3 className="w-4 h-4" />
                                {t('Inventory', currentLanguage.code, 'ui')}
                            </TabsTrigger>
                            <TabsTrigger value="pricing" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <Globe className="w-4 h-4" />
                                {t('Pricing', currentLanguage.code, 'ui')}
                            </TabsTrigger>
                            <TabsTrigger value="shipping" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <Truck className="w-4 h-4" />
                                {t('Shipping', currentLanguage.code, 'ui')}
                            </TabsTrigger>
                            <TabsTrigger value="attributes" className="rounded-xl font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary shrink-0">
                                <Plus className="w-4 h-4" />
                                {t('Attributes', currentLanguage.code, 'ui')}
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
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Weight (kg)', currentLanguage.code, 'ui')}</Label>
                                            <Input type="number" step="0.1" {...register("shipping.weight", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Length (cm)', currentLanguage.code, 'ui')}</Label>
                                            <Input type="number" {...register("shipping.length", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Width (cm)', currentLanguage.code, 'ui')}</Label>
                                            <Input type="number" {...register("shipping.width", { valueAsNumber: true })} className="rounded-xl border-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Height (cm)', currentLanguage.code, 'ui')}</Label>
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
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Attribute Name', currentLanguage.code, 'ui')}</Label>
                                                <Input {...register(`attributes.${index}.name` as const)} placeholder={t('e.g. Size', currentLanguage.code, 'ui')} className="rounded-xl border-2" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Value', currentLanguage.code, 'ui')}</Label>
                                                <Input {...register(`attributes.${index}.value` as const)} placeholder={t('e.g. XL', currentLanguage.code, 'ui')} className="rounded-xl border-2" />
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
                                        {t('Add Attribute', currentLanguage.code, 'ui')}
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
                            <h3 className="font-black text-sm uppercase tracking-widest">{t('Publish Settings', currentLanguage.code, 'ui')}</h3>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Categories', currentLanguage.code, 'ui')}</Label>
                                <CategorySelector
                                    selectedCategories={formValues.categories}
                                    onChange={(cats) => setValue("categories", cats)}
                                />
                                {errors.categories && <p className="text-xs text-destructive font-bold">{errors.categories.message}</p>}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('SEO Slug', currentLanguage.code, 'ui')}</Label>
                                <Input
                                    {...register("seo.slug")}
                                    placeholder={t('product-url-slug', currentLanguage.code, 'ui')}
                                    className="rounded-xl border-2"
                                />
                                {errors.seo?.slug && <p className="text-xs text-destructive font-bold">{errors.seo.slug.message}</p>}
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('Media', currentLanguage.code, 'ui')}</Label>
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
