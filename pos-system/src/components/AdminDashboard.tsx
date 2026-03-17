import { useState } from 'react';
import { usePOSStore } from '../context/store-context';
import { Button } from './core/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, History, ArrowLeft, User, Settings, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './core/Tabs';
import { ProductManagement } from '@/product-management/ProductManagement';
import { t } from '@/mock/data';
import { useLanguage } from '@/components/language-provider';
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfilePage } from './ProfilePage';
import { SettingsPage } from './SettingsPage';

export function AdminDashboard({ onBack }: { onBack: () => void }) {
    const { transactions } = usePOSStore();
    const { currentLanguage } = useLanguage();
    const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'settings'>('dashboard');

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col animate-in fade-in duration-500">
            <header className="border-b bg-card px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-xl" onClick={currentView === 'dashboard' ? onBack : () => setCurrentView('dashboard')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="text-xl sm:text-2xl font-black tracking-tighter leading-none">{t('Admin Console', currentLanguage.code, 'ui')}</h1>
                        <p className="hidden xs:block text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{t('Mode: Management', currentLanguage.code, 'ui')}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-6">
                    <ThemeSwitcher />
                    <LanguageSwitcher />

                    <div className="hidden lg:flex items-center gap-3">
                        <Separator orientation="vertical" className="h-8" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                                    <div className="text-right">
                                        <p className="text-sm font-black">{t('Manager Access', currentLanguage.code, 'ui')}</p>
                                        <p className="text-[10px] uppercase font-black text-primary">{t('Admin', currentLanguage.code, 'ui')}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center font-black shadow-inner">AD</div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60 p-2 rounded-[24px] shadow-2xl border-2 bg-popover/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                                <DropdownMenuItem
                                    className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
                                    onClick={() => setCurrentView('profile')}
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-tight">{t('My Profile', currentLanguage.code, 'ui')}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-primary/5 transition-colors"
                                    onClick={() => setCurrentView('settings')}
                                >
                                    <Settings className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-tight">{t('Settings', currentLanguage.code, 'ui')}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-2 bg-muted/50" />
                                <DropdownMenuItem className="flex items-center gap-4 px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-destructive/10 transition-colors text-destructive">
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-bold text-sm tracking-tight">{t('Logout', currentLanguage.code, 'ui')}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-auto">
                {currentView === 'dashboard' ? (
                    <Tabs defaultValue="inventory">
                        <TabsList className="mb-8 w-full justify-start overflow-x-auto no-scrollbar border-b rounded-none bg-transparent h-auto p-0 gap-6">
                            <TabsTrigger value="inventory" className="gap-2 pb-4 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary shrink-0">
                                <Package className="w-4 h-4" /> {t('Inventory', currentLanguage.code, 'ui')}
                            </TabsTrigger>
                            <TabsTrigger value="transactions" className="gap-2 pb-4 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary shrink-0">
                                <History className="w-4 h-4" /> {t('Transactions', currentLanguage.code, 'ui')}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="inventory" className="space-y-6 pt-2">
                            <ProductManagement />
                        </TabsContent>

                        <TabsContent value="transactions">
                            <Card className="border-2">
                                <CardHeader>
                                    <CardTitle className="text-xl font-black">{t('Transaction Log', currentLanguage.code, 'ui')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[500px] pr-4">
                                        <div className="space-y-4">
                                            {transactions.length === 0 && (
                                                <div className="py-20 text-center text-muted-foreground font-bold italic">
                                                    {t('No transactions recorded yet.', currentLanguage.code, 'ui')}
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
                ) : currentView === 'profile' ? (
                    <ProfilePage />
                ) : (
                    <SettingsPage />
                )}
            </main>
        </div>
    );
}
