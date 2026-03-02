export interface LiquorProduct {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    abv: number; // Alcohol by volume percentage
    size: string; // e.g. "750ml"
    image: string;
}

export interface LiquorCartItem extends LiquorProduct {
    quantity: number;
}
