import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './core/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from './auth-context';
import { useLanguage } from './language-provider';
import { t } from '@/mock/data';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Github, Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
    const { login, isLoading } = useAuth();
    const { currentLanguage } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const from = location.state?.from?.pathname || "/my-profile";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate(from, { replace: true });
        }
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
                    <div className="w-16 h-16 bg-primary rounded-[22px] flex items-center justify-center text-primary-foreground text-3xl shadow-xl shadow-primary/20 mx-auto mb-4">
                        ⚡
                    </div>
                    <div>
                        <CardTitle className="text-4xl font-black tracking-tighter leading-none mb-2">
                            {t('Welcome Back', currentLanguage.code, 'ui')}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-bold">
                            {t('Enter your credentials to access your terminal.', currentLanguage.code, 'ui')}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                    placeholder={t('Password', currentLanguage.code, 'ui')}
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
                            {isLoading ? t('Logging in...', currentLanguage.code, 'ui') : (
                                <>
                                    {t('Sign In', currentLanguage.code, 'ui')} <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-4 text-muted-foreground font-black tracking-widest">
                                {t('Or continue with', currentLanguage.code, 'ui')}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 rounded-xl border-2 font-bold gap-2">
                            <Github className="w-4 h-4" /> Github
                        </Button>
                        <Button variant="outline" className="h-12 rounded-xl border-2 font-bold gap-2">
                            <Mail className="w-4 h-4" /> Google
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="pb-12 pt-8 justify-center">
                    <p className="text-sm text-muted-foreground font-bold">
                        {t("Don't have an account?", currentLanguage.code, 'ui')}{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-primary hover:underline underline-offset-4 font-black"
                        >
                            {t('Sign Up', currentLanguage.code, 'ui')}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
