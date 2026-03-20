import { COMPONENT_MAP } from './ComponentRegistry';

export interface SectionConfig {
    id: string;
    type: string;
    props?: Record<string, any>;
    children?: SectionConfig[];
    className?: string;
}

interface DynamicRendererProps {
    sections: SectionConfig[];
    context?: Record<string, any>;
}

export function DynamicRenderer({ sections, context = {} }: DynamicRendererProps) {
    const CUSTOM_COMPONENTS = ['HeroSection', 'NavBar', 'AppliedFiltersBar', 'ProductGrid', 'CategoryFilter', 'PriceFilter', 'ProductsHeader'];

    return (
        <>
            {sections.map((section) => {
                const Component = COMPONENT_MAP[section.type];
                
                if (!Component) {
                    console.warn(`Component type "${section.type}" not found in ComponentRegistry`);
                    return null;
                }

                const isCustom = CUSTOM_COMPONENTS.includes(section.type);
                
                // For custom components, merge section props with dynamic context
                // For native elements (div, aside, etc.), only use section props and className
                const mergedProps = isCustom 
                    ? { ...section.props, ...context } 
                    : { ...section.props };

                const content = section.children ? (
                    <DynamicRenderer sections={section.children} context={context} />
                ) : null;

                return (
                    <Component 
                        key={section.id} 
                        className={section.className}
                        {...mergedProps}
                    >
                        {content}
                    </Component>
                );
            })}
        </>
    );
}
