import { LiquorProduct } from "../types";

export const MOCK_LIQUOR_PRODUCTS: LiquorProduct[] = [
    {
        id: "l1",
        name: "Black Label Blended",
        brand: "Johnnie Walker",
        price: 35.99,
        category: "Whiskey",
        abv: 40,
        size: "750ml",
        image: "🥃"
    },
    {
        id: "l2",
        name: "Blue Label Extra",
        brand: "Johnnie Walker",
        price: 199.99,
        category: "Whiskey",
        abv: 40,
        size: "750ml",
        image: "🥃"
    },
    {
        id: "l3",
        name: "Grey Goose Original",
        brand: "Grey Goose",
        price: 29.99,
        category: "Vodka",
        abv: 40,
        size: "750ml",
        image: "🍸"
    },
    {
        id: "l4",
        name: "Tito's Handmade",
        brand: "Tito's",
        price: 21.99,
        category: "Vodka",
        abv: 40,
        size: "1L",
        image: "🍸"
    },
    {
        id: "l5",
        name: "Corona Extra 6-Pack",
        brand: "Corona",
        price: 9.99,
        category: "Beer",
        abv: 4.6,
        size: "12oz",
        image: "🍺"
    },
    {
        id: "l6",
        name: "Captain Morgan Spiced",
        brand: "Captain Morgan",
        price: 16.99,
        category: "Rum",
        abv: 35,
        size: "750ml",
        image: "🍹"
    }
];

export const LIQUOR_CATEGORIES = ["All", "Whiskey", "Vodka", "Beer", "Rum"];
