import { AlertTriangle, ShieldAlert, X } from 'lucide-react';
import { useState } from 'react';
import type { ClientConfig } from '@/mock/types';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from '@/components/language-provider';

interface AgeVerificationProps {
    config: ClientConfig;
    onVerified: () => void;
}

export function AgeVerification({ config, onVerified }: AgeVerificationProps) {
    const { t } = useLanguage();
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    if (config.type !== 'liquor') return null;

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!month || !day || !year) {
            setError(t('age.error_incomplete'));
            return;
        }

        const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 21) {
            setError(t('age.error_underage'));
            return;
        }

        localStorage.setItem(`ageVerified_${config.id}`, 'true');
        setIsOpen(false);
        onVerified();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) setIsOpen(false); }}>
            <DialogContent className="sm:max-w-[440px] p-0 border-none shadow-2xl bg-background rounded-[40px] outline-none max-h-[95vh] overflow-y-auto [&>button]:hidden">
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    {/* Header Branding */}
                    <div className="bg-primary p-10 text-primary-foreground relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[28px] flex items-center justify-center text-5xl shadow-xl border border-white/20 animate-in zoom-in-50 duration-500">
                                {config.logoIcon}
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black tracking-tighter leading-none mb-2">{t('age.title')}</DialogTitle>
                                <DialogDescription className="text-primary-foreground/80 text-xs font-bold uppercase tracking-[0.2em]">
                                    {t('age.requirement')}
                                </DialogDescription>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">
                                {t('age.instruction_pre')} <span className="text-foreground font-bold">{t('age.age_limit')}</span> {t('age.instruction_post')} {config.name}. {t('age.instruction_final')}
                            </p>
                        </div>

                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">{t('age.month')}</p>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="12"
                                        placeholder={t('age.month_placeholder')}
                                        className="h-14 text-center text-lg font-bold rounded-2xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                        value={month}
                                        onChange={e => setMonth(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">{t('age.day')}</p>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="31"
                                        placeholder={t('age.day_placeholder')}
                                        className="h-14 text-center text-lg font-bold rounded-2xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                        value={day}
                                        onChange={e => setDay(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">{t('age.year')}</p>
                                    <Input
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        placeholder={t('age.year_placeholder')}
                                        className="h-14 text-center text-lg font-bold rounded-2xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                                        value={year}
                                        onChange={e => setYear(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="rounded-2xl border-none bg-destructive/10 text-destructive animate-in shake-1">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription className="text-xs font-bold">{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-16 text-xl font-black rounded-[24px] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {t('age.verify_button')}
                            </Button>
                        </form>

                        <div className="flex flex-col gap-4">
                            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                                <p className="text-[10px] text-amber-700 font-bold leading-relaxed text-center italic">
                                    {t('age.terms')}
                                </p>
                            </div>
                            <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                <ShieldAlert className="w-3 h-3" /> {t('age.license')}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
