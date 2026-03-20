import { HeroSection } from "@/components/layout/HeroSection";
import { NavBar } from "@/components/layout/Navbar";
import { AppliedFiltersBar } from "@/components/commerce/AppliedFiltersBar";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { CategoryFilter } from "@/components/commerce/CategoryFilter";
import { PriceFilter } from "@/components/commerce/PriceFilter";
import { ProductsHeader } from "@/components/commerce/ProductsHeader";

export const COMPONENT_MAP: Record<string, any> = {
    HeroSection,
    NavBar,
    AppliedFiltersBar,
    ProductGrid,
    CategoryFilter,
    PriceFilter,
    ProductsHeader,
    div: (props: any) => <div {...props} />,
    aside: (props: any) => <aside {...props} />,
    main: (props: any) => <main {...props} />,
    section: (props: any) => <section {...props} />,
};
