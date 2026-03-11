import { useState } from 'react';
import { usePOSStore } from '../context/store-context';
import { usePOSTheme } from './theme-provider';
import { Button } from './core/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, History, ArrowLeft, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './core/Tabs';

export function AdminDashboard({ onBack }: { onBack: () => void }) {
    const { inventory, transactions, updateProduct } = usePOSStore();
    const { theme } = usePOSTheme();
    const currentInventory = inventory[theme] || [];

    const [editingProduct, setEditingProduct] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ name: string; price: string }>({ name: '', price: '' });

    const handleEditStart = (p: any) => {
        setEditingProduct(p.id);
        setEditValues({ name: p.name, price: p.price.toString() });
    };

    const handleSave = () => {
        if (editingProduct) {
            updateProduct(theme, editingProduct, {
                name: editValues.name,
                price: parseFloat(editValues.price) || 0
            });
            setEditingProduct(null);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col animate-in fade-in duration-500">
            <header className="border-b bg-card p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-black tracking-tighter">Admin <span className="text-primary">Console</span></h1>
                </div>
                <Badge variant="outline" className="font-black uppercase tracking-widest px-3 py-1">Mode: Management</Badge>
            </header>

            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
                <Tabs defaultValue="inventory">
                    <TabsList className="mb-8">
                        <TabsTrigger value="inventory" className="gap-2">
                            <Package className="w-4 h-4" /> Inventory
                        </TabsTrigger>
                        <TabsTrigger value="transactions" className="gap-2">
                            <History className="w-4 h-4" /> Transactions
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="inventory" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentInventory.map(p => (
                                <Card key={p.id} className="border-2 overflow-hidden hover:border-primary/50 transition-all">
                                    <div className="aspect-video bg-muted flex items-center justify-center text-4xl">
                                        {p.image}
                                    </div>
                                    <CardHeader className="pb-2">
                                        {editingProduct === p.id ? (
                                            <Input
                                                value={editValues.name}
                                                onChange={e => setEditValues({ ...editValues, name: e.target.value })}
                                                className="font-bold"
                                            />
                                        ) : (
                                            <CardTitle className="text-lg font-black">{p.name}</CardTitle>
                                        )}
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{p.sku}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            {editingProduct === p.id ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black">$</span>
                                                    <Input
                                                        type="number"
                                                        value={editValues.price}
                                                        onChange={e => setEditValues({ ...editValues, price: e.target.value })}
                                                        className="w-24 h-8 px-2"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-2xl font-black text-primary">${p.price}</span>
                                            )}

                                            {editingProduct === p.id ? (
                                                <Button size="sm" onClick={handleSave} className="gap-2">
                                                    <Save className="w-3.5 h-3.5" /> Save
                                                </Button>
                                            ) : (
                                                <Button variant="outline" size="sm" onClick={() => handleEditStart(p)}>
                                                    Edit Product
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="transactions">
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="text-xl font-black">Transaction Log</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[500px] pr-4">
                                    <div className="space-y-4">
                                        {transactions.length === 0 && (
                                            <div className="py-20 text-center text-muted-foreground font-bold italic">
                                                No transactions recorded yet.
                                            </div>
                                        )}
                                        {transactions.map(t => (
                                            <div key={t.id} className="p-4 rounded-xl border-2 bg-card/50 flex justify-between items-center group hover:border-primary/30 transition-all">
                                                <div>
                                                    <p className="font-black text-sm">{t.id}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase font-black">{new Date(t.timestamp).toLocaleString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-primary">${t.total.toFixed(2)}</p>
                                                    <Badge variant="secondary" className="text-[8px] uppercase">{t.theme}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
