import { RestaurantProduct } from "../types";

export const MOCK_RESTAURANT_PRODUCTS: RestaurantProduct[] = [
    {
        id: "r1",
        name: "Classic Cheeseburger",
        price: 12.99,
        category: "Burger",
        image: "🍔",
        description: "Angus beef patty with cheddar cheese, lettuce, tomato, and house sauce"
    },
    {
        id: "r2",
        name: "Double Bacon Burger",
        price: 15.99,
        category: "Burger",
        image: "🍔",
        description: "Double patty, crispy bacon, american cheese, caramelized onions"
    },
    {
        id: "r3",
        name: "Margherita Pizza",
        price: 18.50,
        category: "Pizza",
        image: "🍕",
        description: "Fresh mozzarella, tomatoes, fresh basil, san marzano tomato sauce"
    },
    {
        id: "r4",
        name: "Pepperoni Pizza",
        price: 20.00,
        category: "Pizza",
        image: "🍕",
        description: "Classic pepperoni with mozzarella and house tomato sauce"
    },
    {
        id: "r5",
        name: "Spaghetti Carbonara",
        price: 16.99,
        category: "Pasta",
        image: "🍝",
        description: "Pancetta, egg yolk, pecorino romano, black pepper"
    },
    {
        id: "r6",
        name: "Fettuccine Alfredo",
        price: 15.50,
        category: "Pasta",
        image: "🍝",
        description: "Rich parmesan cream sauce, fresh fettuccine"
    },
    {
        id: "r7",
        name: "Coca-Cola",
        price: 2.99,
        category: "Cold Drink",
        image: "🥤",
        description: "Classic cola"
    },
    {
        id: "r8",
        name: "Iced Tea",
        price: 2.50,
        category: "Cold Drink",
        image: "🧋",
        description: "Fresh brewed sweet iced tea"
    }
];

export const RESTAURANT_CATEGORIES = ["All", "Burger", "Pizza", "Pasta", "Cold Drink"];
