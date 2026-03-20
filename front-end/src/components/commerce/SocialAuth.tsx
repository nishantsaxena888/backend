import { Button } from "@/components/ui/button";
import { Chrome, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/components/language-provider';

interface SocialButtonProps {
    onClick?: () => void;
    className?: string;
    isLoading?: boolean;
    short?: boolean;
}

/**
 * Premium Google Login Button 
 * Features a subtle multi-color hover effect and branding-safe styling.
 */
export function GoogleLoginButton({ onClick, className, isLoading, short }: SocialButtonProps) {
    const { t } = useLanguage();
    return (
        <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={onClick}
            className={cn(
                "h-12 w-full rounded-xl font-bold gap-3 transition-all duration-300",
                "border-border bg-background hover:bg-muted/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                "flex items-center justify-center",
                className
            )}
        >
            <div className="relative flex items-center justify-center">
                <Chrome className="w-5 h-5 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span>{short ? t('auth.google') : t('auth.continue_google')}</span>
        </Button>
    );
}

/**
 * Premium Facebook Login Button
 * Uses the official brand color with a high-end gradient overlay.
 */
export function FacebookLoginButton({ onClick, className, isLoading, short }: SocialButtonProps) {
    const { t } = useLanguage();
    return (
        <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={onClick}
            className={cn(
                "h-12 w-full rounded-xl font-bold gap-3 transition-all duration-300",
                "border-[#1877F2]/20 bg-background hover:bg-[#1877F2]/5 hover:border-[#1877F2]/50 hover:shadow-lg hover:shadow-[#1877F2]/10",
                "flex items-center justify-center text-foreground hover:text-[#1877F2]",
                className
            )}
        >
            <div className="w-5 h-5 flex items-center justify-center">
                <Facebook className="w-5 h-5 fill-current" />
            </div>
            <span>{short ? t('auth.facebook') : t('auth.continue_facebook')}</span>
        </Button>
    );
}

/**
 * Combined Social Auth Section
 * Grid-based layout for multiple social providers.
 */
export function SocialAuthSection({ onSocialLogin, isLoading }: { onSocialLogin: (provider: string) => void, isLoading?: boolean }) {
    return (
        <div className="space-y-3">
            <GoogleLoginButton
                isLoading={isLoading}
                onClick={() => onSocialLogin('google')}
            />
            <FacebookLoginButton
                isLoading={isLoading}
                onClick={() => onSocialLogin('facebook')}
            />
        </div>
    );
}
