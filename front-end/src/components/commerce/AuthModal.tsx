import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Zap } from 'lucide-react';
import type { ClientConfig } from '@/mock/types';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { GoogleLoginButton, FacebookLoginButton } from './SocialAuth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/components/language-provider';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: ClientConfig;
    onAuthSuccess: (user: { name: string; email: string }) => void;
    initialTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, config: _, onAuthSuccess, initialTab = 'login' }: AuthModalProps) {
    const { t } = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const user = {
                name: formData.name || formData.email.split('@')[0] || 'Member',
                email: formData.email
            };

            localStorage.setItem('user', JSON.stringify(user));
            onAuthSuccess(user);
            setIsLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[440px] p-0 flex flex-col max-h-[95vh] overflow-hidden border-none shadow-2xl bg-background rounded-3xl outline-none">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="relative">
                        <div className="p-5 sm:p-7">
                            <DialogTitle className="sr-only">Authentication</DialogTitle>
                            <Tabs defaultValue={initialTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl mb-6 sm:mb-8">
                                    <TabsTrigger value="login" className="rounded-lg font-bold">{t('auth.sign_in')}</TabsTrigger>
                                    <TabsTrigger value="register" className="rounded-lg font-bold">{t('auth.create_account')}</TabsTrigger>
                                </TabsList>

                                <form onSubmit={handleAuth} className="space-y-4 sm:space-y-5">
                                    {/* ... rest of the form ... */}
                                    <TabsContent value="login" className="space-y-4 m-0">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">{t('auth.email')}</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    type="email"
                                                    required
                                                    placeholder="name@email.com"
                                                    className="h-12 pl-11 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center px-1">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('auth.password')}</Label>
                                                <button type="button" className="text-[10px] font-bold text-primary hover:underline">{t('auth.forgot')}</button>
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="h-12 pl-11 pr-11 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    value={formData.password}
                                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="register" className="space-y-4 m-0">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">{t('auth.full_name')}</Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="John Doe"
                                                    className="h-12 pl-11 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">{t('auth.email')}</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    type="email"
                                                    required
                                                    placeholder="name@email.com"
                                                    className="h-12 pl-11 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">{t('auth.password')}</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="h-12 pl-11 pr-11 rounded-xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                                    value={formData.password}
                                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 mt-4 active:scale-[0.98] transition-all"
                                    >
                                        {isLoading ? (
                                            <Zap className="w-5 h-5 animate-spin" />
                                        ) : (
                                            t('auth.submit')
                                        )}
                                    </Button>
                                </form>

                                <div className="relative my-4 sm:my-6">
                                    <div className="absolute inset-0 flex items-center"><Separator /></div>
                                    <div className="relative flex justify-center text-[10px] uppercase font-bold px-4 bg-background text-muted-foreground tracking-widest">
                                        {t('auth.or')}
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3">
                                    <GoogleLoginButton
                                        short
                                        className="flex-1"
                                        isLoading={isLoading}
                                        onClick={() => handleAuth({ preventDefault: () => { } } as React.FormEvent)}
                                    />
                                    <FacebookLoginButton
                                        short
                                        className="flex-1"
                                        isLoading={isLoading}
                                        onClick={() => handleAuth({ preventDefault: () => { } } as React.FormEvent)}
                                    />
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
