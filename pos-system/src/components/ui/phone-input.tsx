import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { COUNTRIES, type Country } from "../../mock/countries"

export interface PhoneInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    defaultCountryIso?: string
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ className, defaultCountryIso = "IN", ...props }, ref) => {
        const defaultCountry = COUNTRIES.find((c) => c.iso === defaultCountryIso) || COUNTRIES[0]
        const [selectedCountry, setSelectedCountry] = React.useState<Country>(defaultCountry)

        return (
            <div className="relative group flex w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="flex gap-1.5 h-10 px-3 rounded-l-md border border-r-0 bg-muted/50 hover:bg-muted transition-colors font-bold text-xs"
                        >
                            <span className="text-base">{selectedCountry.flag}</span>
                            <span className="text-muted-foreground">{selectedCountry.code}</span>
                            <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto rounded-xl shadow-2xl border-2">
                        {COUNTRIES.map((country) => (
                            <DropdownMenuItem
                                key={country.iso}
                                onClick={() => setSelectedCountry(country)}
                                className="flex items-center justify-between px-3 py-2 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{country.flag}</span>
                                    <span className="text-sm font-medium">{country.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">{country.code}</span>
                                    {selectedCountry.iso === country.iso && (
                                        <Check className="h-3 w-3 text-primary" />
                                    )}
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Input
                    type="tel"
                    className={cn("rounded-l-none border-l-0 focus-visible:ring-offset-0", className)}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
