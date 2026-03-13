import { z } from "zod";

export const AttributeSchema = z.object({
    name: z.string().min(1, "Attribute name is required"),
    value: z.string().min(1, "Attribute value is required"),
});

export const ProductSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    shortDescription: z.string().default(""),

    // Pricing
    regularPrice: z.number().min(0, "Price must be positive"),
    salePrice: z.number().min(0).optional(),
    taxClass: z.string().default("standard"),
    currency: z.string().default("USD"),

    // Inventory
    sku: z.string().min(1, "SKU is required"),
    stockQuantity: z.number().min(0, "Stock cannot be negative"),
    manageStock: z.boolean().default(true),
    stockStatus: z.enum(["instock", "outofstock", "onbackorder"]).default("instock"),
    lowStockThreshold: z.number().default(2),

    // Category
    categories: z.array(z.string()).min(1, "At least one category is required"),

    // Images
    mainImage: z.string().default(""),
    gallery: z.array(z.string()).default([]),

    // Attributes
    attributes: z.array(AttributeSchema).default([]),

    // Shipping
    shipping: z.object({
        weight: z.number().optional(),
        length: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
    }).optional(),

    // SEO
    seo: z.object({
        metaTitle: z.string().default(""),
        metaDescription: z.string().default(""),
        slug: z.string().min(1, "Slug is required"),
    }),

    // Status
    status: z.enum(["publish", "draft", "scheduled"]).default("draft"),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Attribute = z.infer<typeof AttributeSchema>;
