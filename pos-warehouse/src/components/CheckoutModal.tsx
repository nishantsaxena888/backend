import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
    subtotal: number;
    tax: number;
    total: number;
}

export function CheckoutModal({
    isOpen,
    onClose,
    onComplete,
    subtotal,
    tax,
    total,
}: CheckoutModalProps) {
    const [cashGiven, setCashGiven] = useState("");
    const cashAmount = parseFloat(cashGiven) || 0;
    const changeDue = Math.max(0, cashAmount - total);

    const handleNumpad = (num: string) => {
        if (num === "C") setCashGiven("");
        else if (num === "00") setCashGiven(prev => prev ? prev + "00" : prev);
        else setCashGiven(prev => prev + num);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl border-border/50 text-foreground bg-background rounded-3xl p-0 overflow-hidden gap-0">
                <div className="flex h-[600px] w-full">
                    {/* Left panel: Order Summary */}
                    <div className="relative w-1/3 bg-muted/20 p-8 flex flex-col border-r border-border/50">
                        <DialogHeader className="mb-8">
                            <DialogTitle className="text-2xl font-black">Transfer/Checkout Summary</DialogTitle>
                        </DialogHeader>
                        <div className="flex-1 flex flex-col justify-end space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-muted-foreground">Subtotal</span>
                                <span className="font-black">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-muted-foreground">Tax</span>
                                <span className="font-black">${tax.toFixed(2)}</span>
                            </div>
                            <Separator className="bg-border/50 my-4" />
                            <div className="flex justify-between items-center bg-card p-4 rounded-2xl shadow-sm border border-border/50">
                                <span className="font-black text-xl">Total Value</span>
                                <span className="font-black text-3xl text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right panel: Payment */}
                    <div className="flex-1 p-8 flex flex-col">
                        <h2 className="text-xl font-black mb-6">Select Accounting Method</h2>
                        <Tabs defaultValue="cash" className="flex-1 flex flex-col">
                            <TabsList className="grid w-full grid-cols-2 h-16 bg-muted/30 rounded-2xl mb-8 p-1 relative">
                                <TabsTrigger value="cash" className="rounded-xl text-lg font-bold h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Cash / External</TabsTrigger>
                                <TabsTrigger value="card" className="rounded-xl text-lg font-bold h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Internal Account</TabsTrigger>
                            </TabsList>

                            <TabsContent value="cash" className="flex-1 flex flex-col mt-0 h-full">
                                <div className="flex-1 grid grid-cols-2 gap-8">
                                    {/* Numpad */}
                                    <div className="grid grid-cols-3 gap-3 h-fit">
                                        {[..."123456789", "C", "0", "00"].map((btn) => (
                                            <Button
                                                key={btn}
                                                variant={btn === "C" ? "destructive" : "outline"}
                                                className={`h-16 text-2xl font-black rounded-2xl ${btn !== 'C' && 'border-border/50 shadow-sm hover:bg-muted'}`}
                                                onClick={() => handleNumpad(btn)}
                                            >
                                                {btn}
                                            </Button>
                                        ))}
                                    </div>
                                    {/* Amount Info */}
                                    <div className="flex flex-col space-y-6">
                                        <div>
                                            <p className="text-sm font-bold text-muted-foreground mb-2">Tendered Amount</p>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-black text-muted-foreground">$</span>
                                                <Input
                                                    readOnly
                                                    value={cashGiven}
                                                    className="h-20 text-4xl font-black pl-12 rounded-2xl border-border/50 bg-background shadow-inner"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-muted/10 p-6 rounded-3xl border border-border/50 flex-1 flex flex-col justify-center">
                                            <p className="text-sm font-bold text-muted-foreground mb-1">Change Due</p>
                                            <p className={`text-5xl font-black tracking-tighter ${changeDue > 0 ? "text-primary" : "text-muted-foreground/30"}`}>
                                                ${changeDue.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-16 text-xl font-black rounded-2xl mt-8 shadow-lg shadow-primary/20"
                                    disabled={cashAmount < total || total === 0}
                                    onClick={() => {
                                        onComplete();
                                        onClose();
                                        setCashGiven("");
                                    }}
                                >
                                    Log Transaction
                                </Button>
                            </TabsContent>

                            <TabsContent value="card" className="flex-1 flex flex-col items-center justify-center mt-0 h-full space-y-8">
                                <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="text-2xl font-black">Scan Internal Account ID</h3>
                                    <p className="text-muted-foreground font-medium text-lg">Use employee badge or department card.</p>
                                </div>
                                <div className="w-full max-w-sm pt-4">
                                    <Button
                                        className="w-full h-16 text-xl font-black rounded-2xl shadow-lg shadow-primary/20"
                                        disabled={total === 0}
                                        onClick={() => {
                                            onComplete();
                                            onClose();
                                        }}
                                    >
                                        Charge Department Account
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
