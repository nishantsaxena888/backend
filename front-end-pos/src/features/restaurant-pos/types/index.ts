export interface RestaurantProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
}

export interface RestaurantCartItem extends RestaurantProduct {
    quantity: number;
}
