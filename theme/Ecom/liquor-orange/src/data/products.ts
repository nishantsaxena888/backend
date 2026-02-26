import { Product } from '../App';

export const products: Product[] = [
  // North Indian
  {
    id: '1',
    title: 'Butter Chicken with Naan',
    price: 14.99,
    originalPrice: 17.99,
    rating: 4.8,
    reviews: 1243,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'North Indian',
    isVeg: false,
    spiceLevel: 'medium',
    restaurant: {
      id: 'r1',
      name: 'Spice Palace',
      cuisine: 'North Indian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Creamy tomato-based curry with tender chicken pieces, served with butter naan',
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 4.00 }
      ],
      addons: [
        { name: 'Extra Naan', price: 2.50 },
        { name: 'Raita', price: 1.99 },
        { name: 'Papad', price: 1.50 }
      ],
      options: [
        { name: 'Spice Level', choices: ['Mild', 'Medium', 'Hot', 'Extra Hot'] }
      ]
    }
  },
  {
    id: '2',
    title: 'Paneer Tikka Masala',
    price: 12.99,
    rating: 4.6,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'North Indian',
    isVeg: true,
    spiceLevel: 'medium',
    restaurant: {
      id: 'r1',
      name: 'Spice Palace',
      cuisine: 'North Indian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Grilled paneer cubes in rich tomato gravy with aromatic spices',
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 3.50 }
      ],
      addons: [
        { name: 'Extra Paneer', price: 3.00 },
        { name: 'Garlic Naan', price: 2.99 },
        { name: 'Rice', price: 2.50 }
      ]
    }
  },
  {
    id: '3',
    title: 'Chicken Biryani',
    price: 13.99,
    originalPrice: 16.99,
    rating: 4.9,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'North Indian',
    isVeg: false,
    spiceLevel: 'medium',
    restaurant: {
      id: 'r2',
      name: 'Biryani House',
      cuisine: 'North Indian & Biryani',
      rating: 4.8,
      deliveryTime: '30-35 min',
      deliveryFee: 3.49
    },
    description: 'Fragrant basmati rice layered with spiced chicken, cooked to perfection',
    customizations: {
      sizes: [
        { name: 'Half', price: 0 },
        { name: 'Full', price: 6.00 }
      ],
      addons: [
        { name: 'Raita', price: 1.99 },
        { name: 'Extra Gravy', price: 2.50 },
        { name: 'Boiled Egg', price: 1.50 }
      ],
      options: [
        { name: 'Spice Level', choices: ['Mild', 'Medium', 'Hot'] }
      ]
    }
  },

  // South Indian
  {
    id: '4',
    title: 'Masala Dosa',
    price: 9.99,
    rating: 4.7,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1694170646913-6f896b38e7d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'South Indian',
    isVeg: true,
    restaurant: {
      id: 'r3',
      name: 'South Delight',
      cuisine: 'South Indian',
      rating: 4.6,
      deliveryTime: '20-25 min',
      deliveryFee: 1.99
    },
    description: 'Crispy rice crepe filled with spiced potato masala, served with sambar and chutney',
    customizations: {
      addons: [
        { name: 'Extra Sambar', price: 1.50 },
        { name: 'Coconut Chutney', price: 1.00 },
        { name: 'Tomato Chutney', price: 1.00 }
      ],
      options: [
        { name: 'Dosa Type', choices: ['Paper Dosa', 'Onion Dosa', 'Rava Dosa'] }
      ]
    }
  },
  {
    id: '5',
    title: 'Idli Vada Combo',
    price: 8.99,
    rating: 4.5,
    reviews: 934,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'South Indian',
    isVeg: true,
    restaurant: {
      id: 'r3',
      name: 'South Delight',
      cuisine: 'South Indian',
      rating: 4.6,
      deliveryTime: '20-25 min',
      deliveryFee: 1.99
    },
    description: 'Steamed rice cakes and crispy lentil donuts with sambar and chutney',
    customizations: {
      options: [
        { name: 'Idli Count', choices: ['2 Idlis + 1 Vada', '3 Idlis + 2 Vadas'] }
      ]
    }
  },

  // Chinese
  {
    id: '6',
    title: 'Hakka Noodles with Manchurian',
    price: 11.99,
    rating: 4.6,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Chinese',
    isVeg: true,
    spiceLevel: 'medium',
    restaurant: {
      id: 'r4',
      name: 'China Wok',
      cuisine: 'Chinese',
      rating: 4.5,
      deliveryTime: '30-35 min',
      deliveryFee: 2.49
    },
    description: 'Stir-fried noodles with vegetables, served with crispy manchurian balls',
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 3.50 }
      ],
      options: [
        { name: 'Protein', choices: ['Veg', 'Chicken', 'Shrimp'] },
        { name: 'Spice Level', choices: ['Mild', 'Medium', 'Hot'] }
      ],
      addons: [
        { name: 'Extra Manchurian', price: 3.50 },
        { name: 'Spring Rolls (4 pcs)', price: 4.99 }
      ]
    }
  },
  {
    id: '7',
    title: 'Chicken Fried Rice',
    price: 10.99,
    rating: 4.4,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Chinese',
    isVeg: false,
    restaurant: {
      id: 'r4',
      name: 'China Wok',
      cuisine: 'Chinese',
      rating: 4.5,
      deliveryTime: '30-35 min',
      deliveryFee: 2.49
    },
    description: 'Wok-tossed rice with chicken, eggs, and vegetables',
    customizations: {
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 4.00 }
      ],
      addons: [
        { name: 'Extra Chicken', price: 3.00 },
        { name: 'Fried Egg', price: 1.50 }
      ]
    }
  },

  // Pizza & Italian
  {
    id: '8',
    title: 'Margherita Pizza',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.7,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Pizza & Italian',
    isVeg: true,
    restaurant: {
      id: 'r5',
      name: 'Pizza Milano',
      cuisine: 'Italian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
    customizations: {
      sizes: [
        { name: 'Small (8")', price: 0 },
        { name: 'Medium (12")', price: 4.00 },
        { name: 'Large (16")', price: 8.00 }
      ],
      options: [
        { name: 'Crust', choices: ['Thin Crust', 'Regular', 'Thick Crust', 'Cheese Burst'] }
      ],
      addons: [
        { name: 'Extra Cheese', price: 2.00 },
        { name: 'Mushrooms', price: 1.50 },
        { name: 'Olives', price: 1.50 },
        { name: 'Jalapeños', price: 1.50 }
      ]
    }
  },
  {
    id: '9',
    title: 'Pepperoni Pizza',
    price: 14.99,
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Pizza & Italian',
    isVeg: false,
    restaurant: {
      id: 'r5',
      name: 'Pizza Milano',
      cuisine: 'Italian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Loaded with premium pepperoni slices and mozzarella cheese',
    customizations: {
      sizes: [
        { name: 'Small (8")', price: 0 },
        { name: 'Medium (12")', price: 4.00 },
        { name: 'Large (16")', price: 8.00 }
      ],
      options: [
        { name: 'Crust', choices: ['Thin Crust', 'Regular', 'Thick Crust'] }
      ],
      addons: [
        { name: 'Extra Pepperoni', price: 3.00 },
        { name: 'Extra Cheese', price: 2.00 },
        { name: 'Bell Peppers', price: 1.50 }
      ]
    }
  },
  {
    id: '10',
    title: 'Pasta Alfredo',
    price: 13.99,
    rating: 4.6,
    reviews: 745,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Pizza & Italian',
    isVeg: true,
    restaurant: {
      id: 'r5',
      name: 'Pizza Milano',
      cuisine: 'Italian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Creamy white sauce pasta with parmesan and herbs',
    customizations: {
      options: [
        { name: 'Pasta Type', choices: ['Penne', 'Fettuccine', 'Spaghetti'] },
        { name: 'Protein', choices: ['Veg', 'Chicken', 'Shrimp'] }
      ],
      addons: [
        { name: 'Garlic Bread', price: 3.99 },
        { name: 'Extra Cheese', price: 2.00 }
      ]
    }
  },

  // Burgers & Fast Food
  {
    id: '11',
    title: 'Classic Beef Burger',
    price: 9.99,
    originalPrice: 11.99,
    rating: 4.5,
    reviews: 2567,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Burgers & Fast Food',
    isVeg: false,
    restaurant: {
      id: 'r6',
      name: 'Burger Junction',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-25 min',
      deliveryFee: 1.99
    },
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
    customizations: {
      options: [
        { name: 'Patty', choices: ['Single', 'Double'] },
        { name: 'Cheese', choices: ['No Cheese', 'American', 'Cheddar', 'Swiss'] }
      ],
      addons: [
        { name: 'Bacon', price: 2.50 },
        { name: 'Extra Patty', price: 3.00 },
        { name: 'Fries', price: 2.99 },
        { name: 'Onion Rings', price: 3.49 }
      ]
    }
  },
  {
    id: '12',
    title: 'Veggie Burger',
    price: 8.99,
    rating: 4.4,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Burgers & Fast Food',
    isVeg: true,
    restaurant: {
      id: 'r6',
      name: 'Burger Junction',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-25 min',
      deliveryFee: 1.99
    },
    description: 'Grilled veggie patty with fresh vegetables and mayo',
    customizations: {
      options: [
        { name: 'Patty Type', choices: ['Veggie', 'Black Bean', 'Mushroom'] }
      ],
      addons: [
        { name: 'Cheese', price: 1.50 },
        { name: 'Avocado', price: 2.00 },
        { name: 'Fries', price: 2.99 }
      ]
    }
  },
  {
    id: '13',
    title: 'Chicken Wings (8 pcs)',
    price: 11.99,
    rating: 4.7,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Burgers & Fast Food',
    isVeg: false,
    restaurant: {
      id: 'r6',
      name: 'Burger Junction',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-25 min',
      deliveryFee: 1.99
    },
    description: 'Crispy fried chicken wings with your choice of sauce',
    customizations: {
      options: [
        { name: 'Sauce', choices: ['BBQ', 'Buffalo', 'Honey Mustard', 'Garlic Parmesan'] },
        { name: 'Quantity', choices: ['8 pieces', '12 pieces', '16 pieces'] }
      ],
      addons: [
        { name: 'Ranch Dip', price: 1.50 },
        { name: 'Blue Cheese Dip', price: 1.50 }
      ]
    }
  },

  // Desserts & Sweets
  {
    id: '14',
    title: 'Chocolate Lava Cake',
    price: 6.99,
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Desserts & Sweets',
    isVeg: true,
    restaurant: {
      id: 'r7',
      name: 'Sweet Treats',
      cuisine: 'Desserts',
      rating: 4.7,
      deliveryTime: '15-20 min',
      deliveryFee: 1.49
    },
    description: 'Warm chocolate cake with molten chocolate center',
    customizations: {
      addons: [
        { name: 'Vanilla Ice Cream', price: 2.50 },
        { name: 'Whipped Cream', price: 1.50 }
      ]
    }
  },
  {
    id: '15',
    title: 'Gulab Jamun (4 pcs)',
    price: 5.99,
    rating: 4.6,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1645177628172-a94c30a5e2fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Desserts & Sweets',
    isVeg: true,
    restaurant: {
      id: 'r1',
      name: 'Spice Palace',
      cuisine: 'North Indian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
    customizations: {
      options: [
        { name: 'Quantity', choices: ['4 pieces', '6 pieces', '8 pieces'] }
      ]
    }
  },
  {
    id: '16',
    title: 'New York Cheesecake',
    price: 7.99,
    rating: 4.7,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Desserts & Sweets',
    isVeg: true,
    restaurant: {
      id: 'r7',
      name: 'Sweet Treats',
      cuisine: 'Desserts',
      rating: 4.7,
      deliveryTime: '15-20 min',
      deliveryFee: 1.49
    },
    description: 'Creamy cheesecake with graham cracker crust',
    customizations: {
      options: [
        { name: 'Topping', choices: ['Plain', 'Strawberry', 'Blueberry', 'Chocolate'] }
      ]
    }
  },

  // Beverages
  {
    id: '17',
    title: 'Fresh Lime Soda',
    price: 3.99,
    rating: 4.5,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    isVeg: true,
    restaurant: {
      id: 'r3',
      name: 'South Delight',
      cuisine: 'South Indian',
      rating: 4.6,
      deliveryTime: '20-25 min',
      deliveryFee: 1.99
    },
    description: 'Refreshing lime juice with soda water',
    customizations: {
      options: [
        { name: 'Type', choices: ['Sweet', 'Salty', 'Mix'] },
        { name: 'Size', choices: ['Regular', 'Large'] }
      ]
    }
  },
  {
    id: '18',
    title: 'Mango Lassi',
    price: 4.99,
    rating: 4.7,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Beverages',
    isVeg: true,
    restaurant: {
      id: 'r1',
      name: 'Spice Palace',
      cuisine: 'North Indian',
      rating: 4.7,
      deliveryTime: '25-30 min',
      deliveryFee: 2.99
    },
    description: 'Creamy yogurt drink blended with sweet mangoes',
    customizations: {
      options: [
        { name: 'Size', choices: ['Regular', 'Large'] }
      ]
    }
  },

  // Street Food
  {
    id: '19',
    title: 'Pav Bhaji',
    price: 8.99,
    rating: 4.6,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Street Food',
    isVeg: true,
    spiceLevel: 'medium',
    restaurant: {
      id: 'r8',
      name: 'Street Bites',
      cuisine: 'Street Food',
      rating: 4.5,
      deliveryTime: '25-30 min',
      deliveryFee: 2.49
    },
    description: 'Spiced vegetable curry served with buttered bread rolls',
    customizations: {
      addons: [
        { name: 'Extra Pav (2 pcs)', price: 1.50 },
        { name: 'Extra Butter', price: 1.00 },
        { name: 'Cheese', price: 2.00 }
      ],
      options: [
        { name: 'Spice Level', choices: ['Mild', 'Medium', 'Hot'] }
      ]
    }
  },
  {
    id: '20',
    title: 'Vada Pav (2 pcs)',
    price: 5.99,
    rating: 4.4,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    category: 'Street Food',
    isVeg: true,
    spiceLevel: 'medium',
    restaurant: {
      id: 'r8',
      name: 'Street Bites',
      cuisine: 'Street Food',
      rating: 4.5,
      deliveryTime: '25-30 min',
      deliveryFee: 2.49
    },
    description: 'Spiced potato fritter in bread bun, Mumbai style',
    customizations: {
      options: [
        { name: 'Quantity', choices: ['2 pieces', '4 pieces', '6 pieces'] }
      ],
      addons: [
        { name: 'Fried Green Chili', price: 0.50 }
      ]
    }
  }
];
