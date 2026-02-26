import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Zap, ShieldCheck, Github, Chrome } from 'lucide-react';
import type { ClientConfig } from '@/mock/types';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    config: ClientConfig;
    onAuthSuccess: (user: { name: string; email: string }) => void;
    initialTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, config, onAuthSuccess, initialTab = 'login' }: AuthModalProps) {
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
            <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl bg-background rounded-3xl">
                <div className="relative">
                    {/* Header Branding */}
                    <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="relative z-10 flex flex-col items-center text-center gap-3">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-xl border border-white/20">
                                {config.logoIcon}
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black tracking-tight">{config.name}</DialogTitle>
                                <DialogDescription className="text-primary-foreground/80 text-xs font-bold uppercase tracking-widest mt-1">
                                    Premium Membership
                                </DialogDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-4 right-4 text-primary-foreground hover:bg-white/20 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="p-8">
                        <Tabs defaultValue={initialTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl mb-8">
                                <TabsTrigger value="login" className="rounded-lg font-bold">Sign In</TabsTrigger>
                                <TabsTrigger value="register" className="rounded-lg font-bold">Create Account</TabsTrigger>
                            </TabsList>

                            <form onSubmit={handleAuth} className="space-y-5">
                                <TabsContent value="login" className="space-y-4 m-0">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Email Address</Label>
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
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Password</Label>
                                            <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="••••••••"
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
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Full Name</Label>
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
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Email Address</Label>
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
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest pl-1">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="Min. 8 characters"
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
                                        "Join the Experience"
                                    )}
                                </Button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><Separator /></div>
                                <div className="relative flex justify-center text-[10px] uppercase font-bold px-4 bg-background text-muted-foreground tracking-widest">
                                    Or continue with
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 hover:bg-muted/50">
                                    <Chrome className="w-4 h-4" /> Google
                                </Button>
                                <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 hover:bg-muted/50">
                                    <Github className="w-4 h-4" /> Github
                                </Button>
                            </div>

                            <Alert className="mt-8 bg-primary/5 border-primary/10 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <AlertDescription className="text-[10px] font-bold text-primary leading-tight">
                                    Demo Mode: Any credentials will authorize you and store your session locally.
                                </AlertDescription>
                            </Alert>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
