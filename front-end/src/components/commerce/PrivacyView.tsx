import { Shield, Lock, Eye, FileText, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/components/language-provider';
import type { ClientConfig } from '@/mock/types';

interface PrivacyViewProps {
    config: ClientConfig;
    onClose: () => void;
}

export function PrivacyView({ config, onClose }: PrivacyViewProps) {
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
                        Privacy <span className="text-primary">Policy</span>
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl">
                        Your privacy is our priority. We are committed to protecting your personal data and being transparent about how we use it.
                    </p>
                </div>
                <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary">
                    <Shield className="w-12 h-12" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Eye className="w-6 h-6 text-primary" /> Information Collection
                        </h3>
                        <div className="prose prose-emerald dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                            <p>
                                We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, shipping address, and payment information.
                            </p>
                            <p>
                                We also automatically collect certain information when you visit {config.name}, such as your IP address, browser type, and how you interact with our platform.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Lock className="w-6 h-6 text-primary" /> Data Security
                        </h3>
                        <div className="prose prose-emerald dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                            <p>
                                We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. This includes SSL encryption for all data transfers and secure storage for sensitive information.
                            </p>
                        </div>
                    </section>Section Content
                </div>

                <aside className="space-y-8">
                    <div className="bg-primary/5 rounded-[40px] p-8 border border-primary/10 space-y-6">
                        <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" /> Quick Summary
                        </h4>
                        <ul className="space-y-4">
                            {[
                                "We never sell your personal data.",
                                "We use cookies only to enhance your experience.",
                                "You have full control over your data.",
                                "Secure SSL-encrypted transactions."
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
