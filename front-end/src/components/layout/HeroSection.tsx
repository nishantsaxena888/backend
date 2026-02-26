import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClientConfig } from "@/mock/types";

interface HeroSectionProps {
    config: ClientConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
    return (
        <div className="relative py-12 md:py-24 px-4 overflow-hidden rounded-[40px] mx-4 my-8 bg-primary/5 border border-primary/10">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-10 blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-8 text-center md:text-left animate-in slide-in-from-left duration-700">
                    {config.hero.badge && (
                        <Badge variant="secondary" className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 animate-bounce">
                            {config.hero.badge}
                        </Badge>
                    )}
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
                        {config.hero.headline}
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-medium leading-relaxed">
                        {config.hero.subheadline}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-4">
                        <Button size="lg" className="rounded-2xl px-10 h-16 text-lg font-black shadow-2xl shadow-primary/25 hover:scale-105 transition-all">
                            {config.hero.cta}
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-2xl px-10 h-16 text-lg font-black border-2 hover:bg-muted">
                            Explore Collection
                        </Button>
                    </div>
                </div>
                <div className="flex-1 relative hidden lg:block animate-in zoom-in duration-1000">
                    <div className="w-full aspect-square rounded-[60px] border-[40px] border-primary/5 rotate-12 animate-[pulse_4s_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[200px] drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700 cursor-default hover:scale-110 active:scale-95">
                            {config.logoIcon}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
