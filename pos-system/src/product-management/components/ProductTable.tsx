import * as React from "react";
import {
    Edit,
    Trash2,
    MoreVertical,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Eye
} from "lucide-react";
import type { Product } from "../types";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onDeleteBulk: (ids: string[]) => void;
}

export function ProductTable({ products, onEdit, onDelete, onDeleteBulk }: ProductTableProps) {
    const { currentLanguage } = useLanguage();
    const [search, setSearch] = React.useState("");
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleSelectAll = () => {
        if (selectedIds.length === paginatedProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(paginatedProducts.map(p => p.id!));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder={t('Search products by name or SKU...', currentLanguage.code, 'ui')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 rounded-xl border-2 h-11 shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {selectedIds.length > 0 && (
                        <Button
                            variant="destructive"
                            className="rounded-xl shadow-lg shadow-destructive/20 animate-in zoom-in-95"
                            onClick={() => {
                                onDeleteBulk(selectedIds);
                                setSelectedIds([]);
                            }}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t('Delete', currentLanguage.code, 'ui')} ({selectedIds.length})
                        </Button>
                    )}
                    <Button variant="outline" className="rounded-xl border-2 h-11">
                        <Filter className="w-4 h-4 mr-2" />
                        {t('Filters', currentLanguage.code, 'ui')}
                    </Button>
                </div>
            </div>

            <div className="rounded-[32px] border-2 bg-card shadow-xl shadow-primary/5 overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <Table>
                        <TableHeader className="bg-muted/10 border-b-2">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="w-12 px-6">
                                    <Checkbox
                                        checked={selectedIds.length > 0 && selectedIds.length === paginatedProducts.length}
                                        onCheckedChange={toggleSelectAll}
                                        className="rounded-lg border-2"
                                    />
                                </TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground w-16">{t('Info', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground min-w-[200px]">{t('Product Details', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground hidden lg:table-cell">{t('Identity/SKU', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground hidden md:table-cell">{t('Category', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground">{t('Price', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground hidden lg:table-cell">{t('Stock Level', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground hidden sm:table-cell">{t('Status', currentLanguage.code, 'ui')}</TableHead>
                                <TableHead className="w-12 px-6"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedProducts.map((product) => (
                                <TableRow key={product.id} className="border-none hover:bg-primary/[0.02] transition-all duration-300 group cursor-default">
                                    <TableCell className="px-6 py-4">
                                        <Checkbox
                                            checked={selectedIds.includes(product.id!)}
                                            onCheckedChange={() => toggleSelect(product.id!)}
                                            className="rounded-lg border-2"
                                        />
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-background shadow-lg overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500 bg-muted flex items-center justify-center">
                                            {product.mainImage ? (
                                                <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Eye className="w-5 h-5 opacity-20" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-sm tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                                                {t(product.name, currentLanguage.code, 'products')}
                                            </span>
                                            <span className="text-[10px] font-bold text-muted-foreground/60 lg:hidden">ID: {product.sku}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell py-4">
                                        <Badge variant="outline" className="text-[9px] font-mono tracking-widest bg-muted/30 border-none px-2 py-0.5">
                                            {product.sku}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.categories.slice(0, 1).map(cat => (
                                                <Badge key={cat} variant="outline" className="text-[9px] font-black uppercase tracking-tighter bg-primary/5 text-primary border-none transition-all">
                                                    {t(cat, currentLanguage.code, 'categories')}
                                                </Badge>
                                            ))}
                                            {product.categories.length > 1 && (
                                                <span className="text-[9px] font-black text-muted-foreground/40">+{product.categories.length - 1}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-md text-primary tracking-tighter tabular-nums">
                                                {product.currency === "USD" ? "$" : product.currency}{product.regularPrice.toFixed(2)}
                                            </span>
                                            {product.salePrice && (
                                                <span className="text-[9px] text-muted-foreground line-through decoration-destructive/30 tabular-nums">
                                                    {product.currency === "USD" ? "$" : product.currency}{product.salePrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell py-4">
                                        <div className="flex flex-col gap-1.5 w-24">
                                            <div className="flex justify-between items-end">
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest",
                                                    product.stockQuantity <= product.lowStockThreshold ? "text-destructive" : "text-muted-foreground"
                                                )}>
                                                    {product.stockQuantity <= product.lowStockThreshold ? t('Critical', currentLanguage.code, 'ui') : t('Healthy', currentLanguage.code, 'ui')}
                                                </span>
                                                <span className="text-xs font-black tabular-nums">{product.stockQuantity}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        product.stockQuantity <= product.lowStockThreshold ? "bg-destructive w-1/4" : "bg-primary w-2/3"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell py-4">
                                        <Badge
                                            className={cn(
                                                "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] border-none shadow-sm",
                                                product.status === "publish" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                                            )}
                                            variant="outline"
                                        >
                                            {t(product.status, currentLanguage.code, 'ui')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-2xl hover:bg-primary/5 hover:text-primary transition-colors">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 rounded-[24px] border-2 shadow-2xl p-2 animate-in zoom-in-95 duration-200">
                                                <div className="px-3 py-2 border-b mb-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('Quick Actions', currentLanguage.code, 'ui')}</p>
                                                </div>
                                                <DropdownMenuItem onClick={() => onEdit(product)} className="rounded-xl cursor-pointer py-2.5 hover:bg-primary/10 hover:text-primary font-bold">
                                                    <Edit className="w-4 h-4 mr-3" />
                                                    {t('Edit Product Details', currentLanguage.code, 'ui')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 hover:bg-primary/10 hover:text-primary font-bold">
                                                    <Eye className="w-4 h-4 mr-3" />
                                                    {t('Live Preview', currentLanguage.code, 'ui')}
                                                </DropdownMenuItem>
                                                <Separator className="my-1.5" />
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(product.id!)}
                                                    className="rounded-xl cursor-pointer py-2.5 text-destructive focus:text-destructive focus:bg-destructive/5 font-bold"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-3" />
                                                    {t('Permanent Delete', currentLanguage.code, 'ui')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2 py-4">
                <p className="text-sm text-muted-foreground">
                    {t('Showing', currentLanguage.code, 'ui')} <b>{(currentPage - 1) * itemsPerPage + 1}</b> {t('to', currentLanguage.code, 'ui')} <b>{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</b> {t('of', currentLanguage.code, 'ui')} <b>{filteredProducts.length}</b> {t('products', currentLanguage.code, 'ui')}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl h-10 w-10 border-2"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1 mx-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <Button
                                key={i}
                                variant={currentPage === i + 1 ? "default" : "ghost"}
                                size="icon"
                                className={cn(
                                    "h-10 w-10 rounded-xl text-xs font-bold",
                                    currentPage === i + 1 && "shadow-lg shadow-primary/20"
                                )}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-xl h-10 w-10 border-2"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
