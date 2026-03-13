import * as React from "react"
import { Hash } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface NumberInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="relative group">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                    type="number"
                    className={cn("pl-10", className)}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
