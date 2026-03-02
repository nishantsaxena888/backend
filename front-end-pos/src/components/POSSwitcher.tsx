import { useNavigate, useLocation } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function POSSwitcher() {
    const navigate = useNavigate();
    const location = useLocation();

    let currentModule = "";
    if (location.pathname.startsWith("/restaurant")) currentModule = "/restaurant";
    else if (location.pathname.startsWith("/warehouse")) currentModule = "/warehouse";
    else if (location.pathname.startsWith("/liquor")) currentModule = "/liquor";

    if (!currentModule) return null;

    return (
        <div className="ml-4">
            <Select value={currentModule} onValueChange={(val) => navigate(val)}>
                <SelectTrigger className="w-[180px] bg-background border-border/50 font-bold rounded-xl h-10">
                    <SelectValue placeholder="Select Module" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50">
                    <SelectItem value="/restaurant" className="rounded-lg cursor-pointer">Restaurant POS</SelectItem>
                    <SelectItem value="/warehouse" className="rounded-lg cursor-pointer">Warehouse POS</SelectItem>
                    <SelectItem value="/liquor" className="rounded-lg cursor-pointer">Liquor POS</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
