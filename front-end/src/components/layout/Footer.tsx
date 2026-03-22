import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";
import type { ClientConfig } from "@/mock/types";

interface FooterProps {
    config: ClientConfig;
    onCategorySelect?: (category: string) => void;
    onViewChange?: (view: 'home' | 'profile' | 'privacy' | 'terms' | 'help') => void;
}

export function Footer({ config, onCategorySelect, onViewChange }: FooterProps) {
    const { t, l } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/10 border-t pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-primary/20 shrink-0">
                                {config.logoIcon}
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter text-foreground">{l(config, 'name')}</h2>
                        </div>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
                            {l(config, 'tagline')}
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Youtube className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="space-y-6 text-center md:text-left">
                        <h4 className="text-xs font-black uppercase tracking-widest text-foreground">{t('footer.navigation')}</h4>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => onViewChange?.('home')}
                                    className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group mx-auto md:mx-0"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                    {t('footer.shop_all')}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onViewChange?.('profile')}
                                    className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group mx-auto md:mx-0"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                    {t('footer.my_profile')}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onViewChange?.('help')}
                                    className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group mx-auto md:mx-0"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                    {t('footer.help')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Categories Section */}
                    <div className="space-y-6 text-center md:text-left">
                        <h4 className="text-xs font-black uppercase tracking-widest text-foreground">{t('footer.categories')}</h4>
                        <ul className="space-y-4">
                            {config.categories.slice(0, 4).map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => onCategorySelect?.(cat)}
                                        className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group mx-auto md:mx-0"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                        {t(cat) || cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="col-span-2 md:col-span-1 space-y-6 text-center md:text-left">
                        <h4 className="text-xs font-black uppercase tracking-widest text-foreground">{t('footer.newsletter')}</h4>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                            {t('footer.subscribe_msg')}
                        </p>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder={t('footer.email_placeholder')}
                                className="pl-12 h-14 rounded-2xl bg-background border-none shadow-inner focus-visible:ring-primary/20 transition-all font-bold text-xs"
                            />
                            <Button
                                size="icon"
                                className="absolute right-2 top-2 h-10 w-10 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="bg-border/30 mb-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center md:text-left">
                    <p>© {currentYear} {l(config, 'name').toUpperCase()} INC.</p>
                    
                    <div className="flex items-center gap-6 md:gap-8">
                        <button
                            onClick={() => onViewChange?.('privacy')}
                            className="hover:text-primary transition-colors whitespace-nowrap"
                        >
                            {t('footer.privacy')}
                        </button>
                        <button
                            onClick={() => onViewChange?.('terms')}
                            className="hover:text-primary transition-colors whitespace-nowrap"
                        >
                            {t('footer.terms')}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
