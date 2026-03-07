import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

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
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
    const cashAmount = parseFloat(cashGiven) || 0;
    const changeDue = Math.max(0, cashAmount - total);

    const handleNumpad = (num: string) => {
        if (num === "C") setCashGiven("");
        else if (num === "00") setCashGiven(prev => prev ? prev + "00" : prev);
        else setCashGiven(prev => prev + num);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] w-full bg-white rounded-[2rem] p-0 overflow-hidden gap-0 border-none shadow-2xl [&>button]:hidden text-[#432311]">
                <div className="flex w-full h-[600px]">
                    {/* Left panel: Order Summary */}
                    <div className="w-[40%] bg-white p-10 flex flex-col border-r border-[#fce8d5]">
                        <h2 className="text-[1.75rem] font-black text-[#432311] mb-8 tracking-tight">Order Summary</h2>
                        <div className="flex-1 flex flex-col justify-end space-y-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-[#506079]">Subtotal</span>
                                <span className="font-black text-[#432311] text-base">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-[#506079]">Liquor Tax (12%)</span>
                                <span className="font-black text-[#432311] text-base">${tax.toFixed(2)}</span>
                            </div>

                            <div className="pt-6 mt-2">
                                <div className="flex justify-between items-center border border-[#fce8d5] rounded-3xl p-5 shadow-sm">
                                    <span className="font-black text-2xl text-[#432311]">Total</span>
                                    <span className="font-black text-4xl tracking-tighter text-[#ff6b00]">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right panel: Payment */}
                    <div className="w-[60%] p-10 flex flex-col relative bg-white">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-[1.35rem] font-black text-[#432311] mb-8 text-center pt-2">Select Payment Method</h2>

                        <div className="flex gap-4 mb-10 h-[3.5rem]">
                            <Button
                                className={`flex-1 rounded-[1.25rem] text-[1.1rem] tracking-wide font-bold transition-all ${paymentMethod === 'cash' ? 'bg-[#ff6b00] text-white hover:bg-[#ff6b00]/90 shadow-md shadow-orange-500/20 border-transparent' : 'bg-transparent text-[#432311] hover:bg-orange-50 border border-orange-100'}`}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Cash
                            </Button>
                            <Button
                                className={`flex-1 rounded-[1.25rem] text-[1.1rem] tracking-wide font-bold transition-all ${paymentMethod === 'card' ? 'bg-[#5c3111] text-white hover:bg-[#5c3111]/90 shadow-md border-transparent shadow-orange-900/20' : 'bg-transparent text-[#432311] hover:bg-orange-50 border border-orange-100'}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                Credit Card
                            </Button>
                        </div>

                        {paymentMethod === 'cash' ? (
                            <div className="flex-1 flex flex-col">
                                <div className="flex gap-8 flex-1">
                                    {/* Numpad */}
                                    <div className="grid grid-cols-3 gap-3 w-[240px]">
                                        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((btn) => (
                                            <Button
                                                key={btn}
                                                variant="outline"
                                                className="h-[4.25rem] rounded-2xl text-[1.5rem] font-black border-[#fce8d5] text-[#432311] hover:bg-orange-50/50 shadow-none bg-white"
                                                onClick={() => handleNumpad(btn)}
                                            >
                                                {btn}
                                            </Button>
                                        ))}
                                        <Button
                                            className="h-[4.25rem] rounded-2xl text-[1.5rem] font-black bg-[#ef4444] text-white hover:bg-[#ef4444]/90 border-none shadow-none"
                                            onClick={() => handleNumpad("C")}
                                        >
                                            C
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-[4.25rem] rounded-2xl text-[1.5rem] font-black border-[#fce8d5] text-[#432311] hover:bg-orange-50/50 shadow-none bg-white"
                                            onClick={() => handleNumpad("0")}
                                        >
                                            0
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-[4.25rem] rounded-2xl text-[1.5rem] font-black border-[#fce8d5] text-[#432311] hover:bg-orange-50/50 shadow-none bg-white"
                                            onClick={() => handleNumpad("00")}
                                        >
                                            00
                                        </Button>
                                    </div>

                                    {/* Amount Info */}
                                    <div className="flex-1 flex flex-col justify-start space-y-4">
                                        <div>
                                            <p className="text-[0.85rem] font-bold text-[#506079] mb-2 text-center">Tendered Amount</p>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-[#506079]">$</span>
                                                <Input
                                                    readOnly
                                                    value={cashGiven || "0"}
                                                    className="h-[4.5rem] text-[1.5rem] font-black text-[#506079] text-center pl-8 rounded-[1.25rem] border-[#fce8d5] shadow-none bg-white focus-visible:ring-0"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-slate-50 border border-slate-100/50 rounded-[1.25rem] flex flex-col items-center justify-center p-4">
                                            <p className="text-[0.85rem] font-bold text-[#506079] mb-1">Change Due</p>
                                            <p className={`text-[3.5rem] font-black tracking-tighter leading-none pt-2 ${changeDue > 0 ? "text-[#ff6b00]" : "text-[#cbd5e1]"}`}>
                                                ${changeDue.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    className={`w-full h-16 text-[1.35rem] font-black rounded-[2rem] mt-8 transition-colors ${cashAmount < total || total === 0
                                            ? 'bg-[#ffcba6] text-white hover:bg-[#ffcba6] opacity-100 cursor-not-allowed border-none shadow-none'
                                            : 'bg-[#ff6b00] text-white hover:bg-[#ff6b00]/90 shadow-lg shadow-orange-500/30 border-none'
                                        }`}
                                    disabled={cashAmount < total || total === 0}
                                    onClick={() => {
                                        onComplete();
                                        onClose();
                                        setCashGiven("");
                                    }}
                                >
                                    Complete Print & Purchase
                                </Button>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                                <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center animate-pulse">
                                    <svg className="w-12 h-12 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="text-2xl font-black text-[#432311]">Waiting for Card...</h3>
                                    <p className="text-[#506079] font-medium text-lg">Please tap, insert, or swipe card on the terminal.</p>
                                </div>
                                <div className="w-full max-w-sm pt-4">
                                    <Button
                                        className="w-full h-16 text-xl font-bold rounded-3xl bg-[#5c3111] text-white hover:bg-[#5c3111]/90 shadow-lg shadow-orange-900/20"
                                        disabled={total === 0}
                                        onClick={() => {
                                            onComplete();
                                            onClose();
                                        }}
                                    >
                                        Mock Terminal Success
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
