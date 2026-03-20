import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import { useLanguage } from "@/components/language-provider";

interface SettingsViewProps {
    user: { name: string; email: string } | null;
    onClose: () => void;
}

export function SettingsView({ user, onClose }: SettingsViewProps) {
    const { t } = useLanguage();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    if (!user) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfileImage(url);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSave = () => {
        // In a real app, this would call an API
        console.log('Saving profile...', { name: user.name, email: user.email, profileImage });
        onClose();
    };

    return (
        <div className="min-h-screen bg-background animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/10">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={onClose}
                            className="rounded-2xl hover:bg-muted transition-all active:scale-90"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-primary">
                            {t('profile.edit') || 'Edit Profile'}
                        </h1>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Profile Photo Section */}
                    <div className="flex flex-col items-center space-y-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-[40px] bg-primary/10 flex items-center justify-center text-4xl font-black text-primary border-4 border-primary/20 shadow-2xl overflow-hidden">
                                        {profileImage ? (
                                            <img src={profileImage} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[40px]">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md rounded-[32px] border-none shadow-2xl p-0 overflow-hidden">
                                <div className="bg-primary p-8 text-primary-foreground">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">
                                            {t('profile.photo_settings') || 'Photo Settings'}
                                        </DialogTitle>
                                        <DialogDescription className="text-primary-foreground/70 font-bold uppercase tracking-widest text-[10px]">
                                            Manage your professional profile appearance
                                        </DialogDescription>
                                    </DialogHeader>
                                </div>
                                <div className="p-6 space-y-3">
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleImageUpload} 
                                    />
                                    <Button 
                                        className="w-full h-14 rounded-2xl font-black flex items-center gap-3 bg-muted hover:bg-muted/80 text-foreground transition-all group"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <Upload className="w-4 h-4" />
                                        </div>
                                        Upload New Photo
                                    </Button>
                                    <Button 
                                        variant="ghost"
                                        className="w-full h-14 rounded-2xl font-black flex items-center gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all group"
                                        onClick={handleRemoveImage}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </div>
                                        Remove Current Photo
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                        <div className="text-center">
                            <h3 className="text-lg font-black tracking-tight">{user.name}</h3>
                            <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-70">{user.email}</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="space-y-8 bg-muted/20 p-8 rounded-[40px] border border-border/50 backdrop-blur-sm">
                        <div className="grid gap-6">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</Label>
                                <Input defaultValue={user.name} className="h-16 rounded-2xl bg-background border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold px-6 text-lg" />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</Label>
                                <Input defaultValue={user.email} className="h-16 rounded-2xl bg-background border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold px-6 text-lg" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button 
                                onClick={handleSave}
                                className="w-full h-16 rounded-[24px] font-black shadow-2xl shadow-primary/20 text-lg uppercase tracking-tight hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
                
                <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Settings are stored locally in your current session.
                </p>
            </main>
        </div>
    );
}
