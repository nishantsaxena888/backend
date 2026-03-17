import * as React from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { t } from "@/mock/data";
import { useLanguage } from "@/components/language-provider";

interface ImageUploaderProps {
    mainImage?: string;
    gallery: string[];
    onChange: (updates: { mainImage?: string; gallery?: string[] }) => void;
}

export function ImageUploader({ mainImage, gallery, onChange }: ImageUploaderProps) {
    const { currentLanguage } = useLanguage();
    const [dragActive, setDragActive] = React.useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        // Simulate upload
        const mockUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";
        if (!mainImage) {
            onChange({ mainImage: mockUrl });
        } else {
            onChange({ gallery: [...gallery, mockUrl] });
        }
    };

    const removeMainImage = () => onChange({ mainImage: "" });
    const removeGalleryImage = (index: number) => {
        const newGallery = [...gallery];
        newGallery.splice(index, 1);
        onChange({ gallery: newGallery });
    };

    return (
        <div className="space-y-4">
            <div
                className={cn(
                    "relative aspect-square sm:aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden bg-muted/20",
                    dragActive ? "border-primary bg-primary/5 scale-[0.98]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30",
                    mainImage && "border-solid border-border bg-card"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {mainImage ? (
                    <>
                        <img src={mainImage} alt="Product" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="destructive" className="rounded-xl shadow-xl font-black uppercase text-[10px] tracking-widest" onClick={removeMainImage}>
                                <X className="w-3 h-3 mr-1.5" />
                                {t('Remove', currentLanguage.code, 'ui')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-6 space-y-2 pointer-events-none">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="font-black text-sm">{t('Drop product image here', currentLanguage.code, 'ui')}</p>
                        <p className="text-xs text-muted-foreground">{t('Click to browse or drag and drop', currentLanguage.code, 'ui')}</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {gallery.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border bg-muted/10 group">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeGalleryImage(i);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-destructive text-white items-center justify-center hidden group-hover:flex shadow-lg"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                <button
                    className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30 transition-all flex flex-col items-center justify-center text-muted-foreground hover:text-primary group"
                    onClick={() => {
                        // Simulate adding to gallery
                        const mockUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
                        onChange({ gallery: [...gallery, mockUrl] });
                    }}
                >
                    <Plus className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t('More', currentLanguage.code, 'ui')}</span>
                </button>
            </div>
        </div>
    );
}
