import { Mail, ShieldCheck, MapPin, Package, Heart, LogOut, Settings, CreditCard, ChevronRight, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ClientConfig } from '@/mock/types';
import { useLanguage } from '@/components/language-provider';

interface ProfileViewProps {
    user: { name: string; email: string } | null;
    config: ClientConfig;
    onSignOut: () => void;
    onClose: () => void;
    onEditProfile?: () => void;
    onWishlistClick?: () => void;
    onOrdersClick?: () => void;
    onAddressesClick?: () => void;
    onPaymentClick?: () => void;
    onPrivacyClick?: () => void;
    onContactSupport?: () => void;
}

export function ProfileView({ 
    user, 
    config, 
    onSignOut, 
    onClose,
    onEditProfile,
    onWishlistClick,
    onOrdersClick,
    onAddressesClick,
    onPaymentClick,
    onPrivacyClick,
    onContactSupport
}: ProfileViewProps) {
    const { t } = useLanguage();
    if (!user) return null;

    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 space-y-8 animate-in fade-in duration-500">

            {/* Profile Header Card */}
            <div className="relative overflow-hidden rounded-[40px] bg-primary p-8 md:p-12 text-primary-foreground shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl rounded-[32px]">
                        <AvatarFallback className="text-4xl font-black bg-white/20 backdrop-blur-md rounded-[28px]">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-2">{user.name}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <span className="flex items-center gap-2 text-primary-foreground/80 text-sm font-bold tracking-tight">
                                    <Mail className="w-4 h-4" /> {user.email}
                                </span>
                                <Badge variant="secondary" className="bg-white/20 text-white border-none py-1 px-4 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {t('profile.vip')}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl font-bold h-10 px-6" onClick={onEditProfile}>
                                <Settings className="w-4 h-4 mr-2" /> {t('profile.edit')}
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl font-bold h-10 px-4" onClick={onSignOut}>
                                <LogOut className="w-4 h-4 mr-2" /> {t('profile.sign_out')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Navigation Links Column */}
                <div className="space-y-6">
                    <Card className="rounded-[32px] border-none shadow-xl overflow-hidden">
                        <CardContent className="p-4 space-y-1">
                            {[
                                { icon: Package, label: t('profile.orders'), color: 'text-blue-500', onClick: onOrdersClick },
                                { icon: Heart, label: t('profile.wishlist'), color: 'text-red-500', onClick: onWishlistClick },
                                { icon: MapPin, label: t('profile.addresses'), color: 'text-green-500', onClick: onAddressesClick },
                                { icon: CreditCard, label: t('profile.payment'), color: 'text-purple-500', onClick: onPaymentClick },
                                { icon: ShieldCheck, label: t('profile.privacy'), color: 'text-orange-500', onClick: onPrivacyClick },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center gap-4 p-4 hover:bg-muted rounded-2xl transition-all group font-bold text-sm cursor-pointer"
                                    onClick={item.onClick}
                                >
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                    <span className="flex-1 text-left">{item.label}</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border-none shadow-xl bg-primary/5 border border-primary/10 overflow-hidden">
                        <CardContent className="p-8 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-black text-xl tracking-tight leading-none">{t('profile.need_help')}</h4>
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                    {t('profile.priority_support')}
                                </p>
                            </div>
                            <Button className="w-full rounded-xl font-black h-12 shadow-lg shadow-primary/20" onClick={onContactSupport}>{t('profile.contact_support')}</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders Component Column */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="rounded-[40px] border-none shadow-xl overflow-hidden min-h-[500px]">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-3xl font-black tracking-tight leading-none">{t('profile.recent_orders')}</CardTitle>
                                    <CardDescription className="text-xs font-bold uppercase tracking-widest mt-2">{config.name} • {t('profile.shopping_history')}</CardDescription>
                                </div>
                                <Badge className="rounded-full px-4 font-black">2 {t('profile.orders')}</Badge>
                            </div>
                        </CardHeader>
                        <Separator className="mx-8" />
                        <CardContent className="p-8">
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                                    <Package className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-bold text-xl">{t('profile.no_orders')}</h4>
                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                        {t('profile.no_orders_msg')} {config.name} {t('profile.no_orders_cta')}
                                    </p>
                                </div>
                                <Button variant="outline" className="rounded-xl font-bold h-12 px-8" onClick={onClose}>
                                    {t('profile.return_to_shop')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
