import { usePOSStore } from '../context/store-context';
import { Button } from './core/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, History, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './core/Tabs';
import { ProductManagement } from '@/product-management/ProductManagement';

export function AdminDashboard({ onBack }: { onBack: () => void }) {
    const { transactions } = usePOSStore();

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
                    <TabsList className="mb-8 w-full justify-start overflow-x-auto no-scrollbar border-b rounded-none bg-transparent h-auto p-0 gap-6">
                        <TabsTrigger value="inventory" className="gap-2 pb-4 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary shrink-0">
                            <Package className="w-4 h-4" /> Inventory
                        </TabsTrigger>
                        <TabsTrigger value="transactions" className="gap-2 pb-4 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary shrink-0">
                            <History className="w-4 h-4" /> Transactions
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="inventory" className="space-y-6 pt-2">
                        <ProductManagement />
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
