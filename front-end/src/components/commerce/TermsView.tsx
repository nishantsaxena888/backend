import { FileText, Gavel, Scale, AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/language-provider';
import type { ClientConfig } from '@/mock/types';

interface TermsViewProps {
    config: ClientConfig;
    onClose: () => void;
}

export function TermsView({ config, onClose }: TermsViewProps) {
    const { t } = useLanguage();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-12">
                <div className="space-y-4">
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="mb-4 -ml-4 hover:bg-primary/5 text-primary font-bold rounded-xl"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> {t('profile.return_to_shop')}
                    </Button>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        Terms of <span className="text-primary">Service</span>
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl">
                        By using {config.name}, you agree to our terms and conditions. Please read them carefully to understand your rights and responsibilities.
                    </p>
                </div>
                <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary">
                    <Gavel className="w-12 h-12" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Scale className="w-6 h-6 text-primary" /> Use of Services
                        </h3>
                        <div className="prose prose-emerald dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                            <p>
                                By accessing our platform, you agree to provide accurate information and use our services only for lawful purposes. Any unauthorized use of the platform and its intellectual property is strictly prohibited.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-primary" /> Limitation of Liability
                        </h3>
                        <div className="prose prose-emerald dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                            <p>
                                {config.name} is provided "as is" without any warranties. We are not liable for any direct or indirect damages arising from your use of the platform.
                            </p>
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="bg-primary/5 rounded-[40px] p-8 border border-primary/10 space-y-6">
                        <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" /> Key Highlights
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "Full compliance with local laws.",
                                "Transparent pricing and policies.",
                                "Secure and reliable user experience.",
                                "Right to terminate improper usage."
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm font-bold text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
