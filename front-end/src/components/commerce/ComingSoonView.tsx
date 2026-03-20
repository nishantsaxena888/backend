import { ArrowLeft, Construction, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ComingSoonViewProps {
    title: string;
    onClose: () => void;
}

export function ComingSoonView({ title, onClose }: ComingSoonViewProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="relative mx-auto w-32 h-32 bg-primary/10 rounded-[48px] flex items-center justify-center text-primary overflow-hidden">
                    <Construction className="w-16 h-16 animate-bounce" />
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                </div>
                
                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tight leading-none uppercase italic text-primary">
                        {title}
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                        We're working hard to bring this feature to you. Stay tuned for updates!
                    </p>
                </div>

                <div className="pt-4 space-y-4">
                    <Button 
                        size="lg" 
                        onClick={onClose}
                        className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
                    >
                        <ArrowLeft className="w-5 h-5 mr-3" />
                        Go Back
                    </Button>
                    <Button 
                        variant="ghost"
                        onClick={() => window.location.href = '/'}
                        className="w-full h-14 rounded-2xl font-bold text-muted-foreground"
                    >
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Return to Shop
                    </Button>
                </div>
            </div>
        </div>
    );
}
