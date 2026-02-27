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
            <DialogContent className="sm:max-w-[440px] p-0 border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] bg-background rounded-[40px] outline-none max-h-[90vh] overflow-hidden [&>button]:hidden">
                <div className="relative h-full flex flex-col">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 z-50 p-2 bg-black/10 hover:bg-black/30 text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                        {/* Header Branding */}
                        <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-12 text-primary-foreground relative overflow-hidden text-center rounded-t-[40px]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl opacity-30" />
                            
                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[32px] flex items-center justify-center text-6xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-white/30 animate-in zoom-in-75 duration-700">
                                    <div className="drop-shadow-2xl">{config.logoIcon}</div>
                                </div>
                                <div className="space-y-3">
                                    <DialogTitle className="text-4xl font-black tracking-tighter leading-tight drop-shadow-sm">
                                        {t('age.title')}
                                    </DialogTitle>
                                    <DialogDescription className="text-primary-foreground/90 text-[11px] font-black uppercase tracking-[0.3em] bg-white/10 py-1.5 px-4 rounded-full inline-block backdrop-blur-sm">
                                        {t('age.requirement')}
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 space-y-10">
                            <div className="text-center">
                                <p className="text-[15px] text-muted-foreground font-semibold leading-relaxed">
                                    {t('age.instruction_pre')} <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-4">{t('age.age_limit')}</span> {t('age.instruction_post')} <span className="text-foreground font-bold">{config.name}</span>.
                                    <br />
                                    <span className="text-xs mt-2 block opacity-70">{t('age.instruction_final')}</span>
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-8">
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: t('age.month'), val: month, set: setMonth, placeholder: t('age.month_placeholder') },
                                        { label: t('age.day'), val: day, set: setDay, placeholder: t('age.day_placeholder') },
                                        { label: t('age.year'), val: year, set: setYear, placeholder: t('age.year_placeholder') }
                                    ].map((field, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <p className="text-[11px] font-black uppercase text-muted-foreground/60 tracking-[0.2em] text-center">{field.label}</p>
                                            <Input
                                                type="number"
                                                placeholder={field.placeholder}
                                                className="h-16 text-center text-xl font-black rounded-2xl bg-muted/20 border-2 border-transparent focus-visible:bg-background focus-visible:border-primary/20 focus-visible:ring-0 transition-all shadow-inner"
                                                value={field.val}
                                                onChange={e => field.set(e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {error && (
                                    <Alert variant="destructive" className="rounded-2xl border-none bg-destructive/10 text-destructive animate-in slide-in-from-top-2 duration-300">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertDescription className="text-xs font-black uppercase tracking-wider">{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-18 text-xl font-black rounded-[28px] shadow-[0_20px_40px_-10px_rgba(var(--primary),0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 bg-primary hover:shadow-primary/40 group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {t('age.verify_button')}
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </Button>
                            </form>

                            <div className="flex flex-col gap-6">
                                <div className="p-6 bg-muted/30 border border-border/50 rounded-[32px] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                                        <ShieldAlert className="w-8 h-8" />
                                    </div>
                                    <p className="text-[11px] text-muted-foreground font-bold leading-relaxed text-center italic relative z-10">
                                        {t('age.terms')}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-px flex-1 bg-border/50" />
                                    <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                        <ShieldAlert className="w-3.5 h-3.5" /> {t('age.license')}
                                    </p>
                                    <div className="h-px flex-1 bg-border/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
