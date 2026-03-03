import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import { LiquorCartItem as CartItemType } from "../types";

interface LiquorCartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
}

export function LiquorCartItem({ item, onUpdateQuantity, onRemove }: LiquorCartItemProps) {
    return (
        <div className="group bg-muted/30 p-4 rounded-3xl space-y-4 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50">
            <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl shrink-0">
                    {item.image}
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <h4 className="font-black text-sm leading-tight mb-1">{item.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => onRemove(item.id)}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex items-center justify-between bg-background rounded-2xl p-1 gap-2 border border-border/50">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-xl hover:bg-muted text-muted-foreground"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
