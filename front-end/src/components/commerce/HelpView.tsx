import { HelpCircle, MessageCircle, Phone, Mail, ChevronLeft, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/components/language-provider';
import type { ClientConfig } from '@/mock/types';

interface HelpViewProps {
    config: ClientConfig;
    onClose: () => void;
}

export function HelpView({ config, onClose }: HelpViewProps) {
    const { t } = useLanguage();

    const faqs = [
        { q: "How do I track my order?", a: "You can track your order in the 'Order History' section of your profile." },
        { q: "What is your return policy?", a: "We offer a 30-day return policy for most items in their original condition." },
        { q: "Do you offer international shipping?", a: "Currently, we only ship within the continental United States." },
        { q: "How can I contact support?", a: "You can reach us via the contact form below or by calling our support line." }
    ];

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
                        How can we <span className="text-primary">help?</span>
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl">
                        Search our help center or contact our support team for any assistance you need.
                    </p>
                </div>
                <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary">
                    <HelpCircle className="w-12 h-12" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input 
                            placeholder="Search for help articles..." 
                            className="h-20 pl-16 pr-8 text-xl rounded-[30px] border-none bg-muted/30 shadow-inner focus-visible:ring-primary/20 font-bold"
                        />
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="p-8 rounded-[40px] bg-background border hover:border-primary/30 transition-all hover:shadow-xl group">
                                    <h4 className="font-black text-lg mb-4 group-hover:text-primary transition-colors">{faq.q}</h4>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="space-y-8">
                    <div className="bg-primary rounded-[40px] p-8 text-primary-foreground shadow-2xl space-y-6 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <h4 className="text-xl font-black tracking-tight relative z-10">Contact Support</h4>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="font-bold">{config.phone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="font-bold">support@{config.name.toLowerCase().replace(' ', '')}.com</span>
                            </div>
                        </div>
                        <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-2xl h-14 font-black shadow-xl relative z-10">
                            <MessageCircle className="w-5 h-5 mr-2" /> Live Chat
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
