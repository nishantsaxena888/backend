import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useWarehouseInventory } from "../hooks/useWarehouseInventory";
import { POSSwitcher } from "@/components/POSSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { WarehouseInventoryRow } from "../components/WarehouseInventoryRow";

export default function WarehousePOS() {
    const [searchTerm, setSearchTerm] = useState("");
    const { inventory, updateStock } = useWarehouseInventory();

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="h-20 border-b border-border bg-background px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-muted">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-black">Warehouse Management</h1>
                    <POSSwitcher />
                </div>

                <div className="relative w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by product name or SKU..."
                        className="pl-11 h-12 bg-muted/50 border-none rounded-2xl"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className="flex-1 p-8 bg-muted/10">
                <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[100px] py-4 font-black">SKU</TableHead>
                                    <TableHead className="py-4 font-black">Product Name</TableHead>
                                    <TableHead className="py-4 font-black">Category</TableHead>
                                    <TableHead className="py-4 font-black text-right">Unit</TableHead>
                                    <TableHead className="py-4 font-black text-right">In Stock</TableHead>
                                    <TableHead className="py-4 font-black text-center">Status</TableHead>
                                    <TableHead className="py-4 font-black text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInventory.map((product) => (
                                    <WarehouseInventoryRow
                                        key={product.id}
                                        product={product}
                                        onUpdateStock={updateStock}
                                    />
                                ))}

                                {filteredInventory.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                                            <Search className="w-8 h-8 mx-auto mb-4 opacity-20" />
                                            <p className="font-bold">No inventory found matching "{searchTerm}"</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
