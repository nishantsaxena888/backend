import * as React from "react"
import { DollarSign } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface CurrencyInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    currencySymbol?: string
    side?: "left" | "right"
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ className, currencySymbol = "$", side = "left", ...props }, ref) => {
        const isLeft = side === "left"

        return (
            <div className="relative group w-full">
                <div
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none px-3",
                        isLeft ? "left-0" : "right-0"
                    )}
                >
                    {currencySymbol === "$" ? (
                        <DollarSign className="h-4 w-4 text-muted-foreground/70 group-focus-within:text-primary transition-colors" />
                    ) : (
                        <span className="text-xs font-black text-muted-foreground/70 group-focus-within:text-primary transition-colors uppercase">
                            {currencySymbol}
                        </span>
                    )}
                </div>
                <Input
                    type="number"
                    step="0.01"
                    className={cn(
                        isLeft ? "pl-9" : "pr-9",
                        "font-medium no-spinner",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
