import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClientConfig } from "@/mock/types";
import { useLanguage } from "@/components/language-provider";

interface HeroSectionProps {
    config: ClientConfig;
    onCtaClick?: () => void;
    onExploreClick?: () => void;
}

export function HeroSection({ config, onCtaClick, onExploreClick }: HeroSectionProps) {
    const { t, l } = useLanguage();
    return (
        <div className="relative py-10 md:py-24 px-4 md:px-8 overflow-hidden rounded-[32px] md:rounded-[60px] mx-2 md:mx-4 my-4 md:my-8 bg-primary/5 border border-primary/10">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-10 blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16">
                <div className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left animate-in slide-in-from-left duration-700">
                    {config.hero.badge && (
                        <Badge variant="secondary" className="px-4 py-1.5 md:px-6 md:py-2.5 text-[10px] md:text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                            {l(config, 'hero.badge')}
                        </Badge>
                    )}
                    <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter text-foreground leading-[0.85] break-words">
                        {l(config, 'hero.headline')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-muted-foreground max-w-xl font-medium leading-relaxed mx-auto lg:mx-0">
                        {l(config, 'hero.subheadline')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                        <Button 
                            size="lg" 
                            className="w-full sm:w-auto rounded-2xl px-10 h-14 md:h-16 text-base md:text-lg font-black shadow-2xl shadow-primary/25 hover:scale-105 transition-all"
                            onClick={onCtaClick}
                        >
                            {l(config, 'hero.cta')}
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="w-full sm:w-auto rounded-2xl px-10 h-14 md:h-16 text-base md:text-lg font-black border-2 hover:bg-muted"
                            onClick={onExploreClick}
                        >
                            {t('hero.explore')}
                        </Button>
                    </div>
                </div>
                <div className="flex-1 relative hidden lg:block animate-in zoom-in duration-1000">
                    <div className="w-full aspect-square rounded-[60px] border-[40px] border-primary/5 rotate-12 animate-[pulse_4s_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[150px] xl:text-[200px] drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700 cursor-default hover:scale-110 active:scale-95">
                            {config.logoIcon}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
