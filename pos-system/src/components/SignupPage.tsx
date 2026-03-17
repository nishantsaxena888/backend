import React, { useState } from 'react';
import { Button } from './core/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from './auth-context';
import { useLanguage } from './language-provider';
import { t } from '@/mock/data';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

export function SignupPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    const { signup, isLoading } = useAuth();
    const { currentLanguage } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signup(name, email, password);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden p-4">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />

            <div className="absolute top-6 right-6 flex gap-4 z-20">
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>

            <Card className="w-full max-w-[450px] border-2 bg-card/50 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[32px] overflow-hidden animate-in fade-in zoom-in-95 duration-700 relative z-10">
                <CardHeader className="space-y-4 pt-12 pb-8 text-center">
                    <button
                        onClick={onSwitchToLogin}
                        className="absolute top-8 left-8 p-2 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-16 h-16 bg-primary rounded-[22px] flex items-center justify-center text-primary-foreground text-3xl shadow-xl shadow-primary/20 mx-auto mb-4">
                        ✨
                    </div>
                    <div>
                        <CardTitle className="text-4xl font-black tracking-tighter leading-none mb-2">
                            {t('Create Account', currentLanguage.code, 'ui')}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-bold">
                            {t('Join Inventure POS and transform your business.', currentLanguage.code, 'ui')}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder={t('Full Name', currentLanguage.code, 'ui')}
                                    className="h-14 pl-12 rounded-2xl border-2 bg-background/50 focus-visible:ring-primary font-bold"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder={t('Email Address', currentLanguage.code, 'ui')}
                                    className="h-14 pl-12 rounded-2xl border-2 bg-background/50 focus-visible:ring-primary font-bold"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder={t('Create Password', currentLanguage.code, 'ui')}
                                    className="h-14 pl-12 rounded-2xl border-2 bg-background/50 focus-visible:ring-primary font-bold"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 gap-3 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? t('Creating Account...', currentLanguage.code, 'ui') : (
                                <>
                                    {t('Get Started', currentLanguage.code, 'ui')} <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="pb-12 pt-8 justify-center">
                    <p className="text-sm text-muted-foreground font-bold">
                        {t('Already have an account?', currentLanguage.code, 'ui')}{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-primary hover:underline underline-offset-4 font-black"
                        >
                            {t('Sign In', currentLanguage.code, 'ui')}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
