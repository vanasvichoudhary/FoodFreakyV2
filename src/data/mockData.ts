export interface FoodCategory {
  id: string;
  name: string;
  icon: string; // Emoji or Lucide icon identifier
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface FoodReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  ingredients: string[];
  nutrition: NutritionInfo;
  prepTime: string;
  deliveryTime: string;
  isPopular: boolean;
  isVegetarian: boolean;
  reviews: FoodReview[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewsCount: number;
  cuisines: string[];
  deliveryTime: string;
  minOrder: number;
  deliveryFee: number;
  offers: string;
  description: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

export const categories: FoodCategory[] = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'biryani', name: 'Biryani', icon: '🍛' },
  { id: 'chinese', name: 'Chinese', icon: '🥢' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'healthy', name: 'Healthy Food', icon: '🥗' },
];

export const foodItems: FoodItem[] = [
  // Pizza
  {
    id: 'p1',
    name: 'Margherita Double Cheese Pizza',
    description: 'A classic delight with 100% real mozzarella cheese, rich herb-infused tomato sauce, and fresh basil leaves on a hand-stretched sourdough crust.',
    price: 12.99,
    rating: 4.8,
    reviewsCount: 320,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Mozzarella Cheese', 'Sourdough Crust', 'Basil Leaves', 'San Marzano Tomato Sauce', 'Extra Virgin Olive Oil'],
    nutrition: { calories: 850, protein: 32, carbs: 110, fats: 28 },
    prepTime: '15 mins',
    deliveryTime: '25 mins',
    isPopular: true,
    isVegetarian: true,
    reviews: [
      { id: 'r1', userName: 'John Doe', userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', rating: 5, date: 'May 28, 2026', comment: 'Absolutely the best pizza ever! The crust is so airy and delicious.' },
      { id: 'r2', userName: 'Sarah Jenkins', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', rating: 4.5, date: 'May 24, 2026', comment: 'Lots of cheese and fast delivery. Highly recommended.' }
    ]
  },
  {
    id: 'p2',
    name: 'Ultimate Pepperoni Feast',
    description: 'Thick-cut spicy pepperoni slices layered with gooey mozzarella cheese, Parmesan, and premium pizza sauce, baked to crispy perfection.',
    price: 15.49,
    rating: 4.9,
    reviewsCount: 450,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Spicy Pepperoni', 'Mozzarella Cheese', 'Parmesan', 'Rustic Tomato Sauce', 'Oregano'],
    nutrition: { calories: 1100, protein: 46, carbs: 98, fats: 48 },
    prepTime: '18 mins',
    deliveryTime: '30 mins',
    isPopular: true,
    isVegetarian: false,
    reviews: [
      { id: 'r3', userName: 'Mike Miller', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', rating: 5, date: 'May 26, 2026', comment: 'Loaded with pepperoni, super crispy edges. Will order again!' }
    ]
  },
  // Burgers
  {
    id: 'b1',
    name: 'Classic Smash Cheeseburger',
    description: 'Double flame-grilled Angus beef patties, melted cheddar cheese, house burger sauce, dill pickles, and crisp lettuce on a toasted brioche bun.',
    price: 9.99,
    rating: 4.7,
    reviewsCount: 280,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Angus Beef', 'Brioche Bun', 'Cheddar Cheese', 'Pickles', 'House Burger Sauce', 'Lettuce'],
    nutrition: { calories: 720, protein: 38, carbs: 45, fats: 36 },
    prepTime: '10 mins',
    deliveryTime: '20 mins',
    isPopular: true,
    isVegetarian: false,
    reviews: [
      { id: 'r4', userName: 'Alex Rivera', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', rating: 5, date: 'May 29, 2026', comment: 'The patties are incredibly juicy. Perfect burger!' }
    ]
  },
  {
    id: 'b2',
    name: 'Gourmet Crispy Avocado Burger',
    description: 'A crisp panko-breaded vegetable patty topped with sliced avocados, spicy jalapeño aioli, vine-ripened tomatoes, and baby arugula.',
    price: 11.29,
    rating: 4.6,
    reviewsCount: 150,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Panko Veg Patty', 'Sliced Avocado', 'Jalapeño Aioli', 'Brioche Bun', 'Vine Tomatoes', 'Arugula'],
    nutrition: { calories: 580, protein: 14, carbs: 62, fats: 24 },
    prepTime: '12 mins',
    deliveryTime: '22 mins',
    isPopular: false,
    isVegetarian: true,
    reviews: [
      { id: 'r5', userName: 'Emma Watson', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rating: 4, date: 'May 22, 2026', comment: 'Really fresh avocado and the aioli gives a nice kick.' }
    ]
  },
  // Biryani
  {
    id: 'by1',
    name: 'Royal Hyderabadi Chicken Biryani',
    description: 'Fragrant, long-grain basmati rice layered with juicy, marinated chicken, saffron-infused milk, caramelized onions, and hand-ground spices, slow-cooked in a traditional handi.',
    price: 14.99,
    rating: 4.9,
    reviewsCount: 680,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Chicken', 'Basmati Rice', 'Saffron', 'Caramelized Onions', 'Indian Spices', 'Ghee'],
    nutrition: { calories: 920, protein: 42, carbs: 120, fats: 26 },
    prepTime: '25 mins',
    deliveryTime: '35 mins',
    isPopular: true,
    isVegetarian: false,
    reviews: [
      { id: 'r6', userName: 'Rahul Sharma', userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rating: 5, date: 'May 30, 2026', comment: 'Authentic Hyderabadi flavor! The chicken is fall-off-the-bone tender.' }
    ]
  },
  {
    id: 'by2',
    name: 'Kashmiri Veg Dum Biryani',
    description: 'Fragrant basmati rice layered with seasonal garden vegetables, pomegranate seeds, paneer cubes, cashews, and aromatic spices cooked under light pressure (dum).',
    price: 11.99,
    rating: 4.7,
    reviewsCount: 190,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Basmati Rice', 'Mixed Vegetables', 'Paneer Cubes', 'Cashews', 'Kashmiri Spices', 'Mint'],
    nutrition: { calories: 750, protein: 18, carbs: 110, fats: 20 },
    prepTime: '20 mins',
    deliveryTime: '32 mins',
    isPopular: false,
    isVegetarian: true,
    reviews: []
  },
  // Chinese
  {
    id: 'c1',
    name: 'Szechuan Chili Garlic Noodles',
    description: 'Stir-fried wheat noodles tossed in a spicy, home-style chili oil garlic sauce, loaded with bell peppers, spring onions, and roasted peanuts.',
    price: 10.49,
    rating: 4.5,
    reviewsCount: 220,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Wheat Noodles', 'Szechuan Chili Paste', 'Garlic', 'Spring Onions', 'Bell Peppers', 'Roasted Peanuts'],
    nutrition: { calories: 610, protein: 12, carbs: 88, fats: 18 },
    prepTime: '10 mins',
    deliveryTime: '25 mins',
    isPopular: false,
    isVegetarian: true,
    reviews: [
      { id: 'r7', userName: 'David Lee', userAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', rating: 4, date: 'May 18, 2026', comment: 'Nice and spicy! Hits the spot if you like garlic and heat.' }
    ]
  },
  {
    id: 'c2',
    name: 'Steamed Crystal Dim Sums',
    description: 'Delicate translucent wrappers filled with seasoned minced vegetables and wild mushrooms, steamed to soft perfection, served with garlic soy sauce.',
    price: 8.99,
    rating: 4.8,
    reviewsCount: 140,
    category: 'chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Translucent Wrappers', 'Minced Vegetables', 'Shiitake Mushrooms', 'Ginger', 'Garlic Soy Sauce'],
    nutrition: { calories: 340, protein: 8, carbs: 54, fats: 4 },
    prepTime: '15 mins',
    deliveryTime: '25 mins',
    isPopular: true,
    isVegetarian: true,
    reviews: []
  },
  // Desserts
  {
    id: 'd1',
    name: 'Chocolate Lava Funtasy Cake',
    description: 'Decadent chocolate cake with a molten liquid dark chocolate center, dusted with powdered sugar, served warm.',
    price: 6.99,
    rating: 4.9,
    reviewsCount: 510,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Dark Chocolate', 'Butter', 'Cocoa Powder', 'Sugar', 'Flour'],
    nutrition: { calories: 450, protein: 6, carbs: 52, fats: 25 },
    prepTime: '8 mins',
    deliveryTime: '18 mins',
    isPopular: true,
    isVegetarian: true,
    reviews: [
      { id: 'r8', userName: 'Laura Chen', userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', rating: 5, date: 'May 27, 2026', comment: 'Pure chocolate heaven! It was still warm when it arrived.' }
    ]
  },
  {
    id: 'd2',
    name: 'Gourmet Chocolate Glazed Donuts',
    description: 'Freshly baked yeast donuts dipped in rich Belgian chocolate ganache and decorated with colorful sprinkles.',
    price: 5.49,
    rating: 4.7,
    reviewsCount: 95,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Yeast Dough', 'Belgian Chocolate Ganache', 'Sprinkles', 'Sugar Glaze'],
    nutrition: { calories: 380, protein: 5, carbs: 48, fats: 16 },
    prepTime: '5 mins',
    deliveryTime: '15 mins',
    isPopular: false,
    isVegetarian: true,
    reviews: []
  },
  // Beverages
  {
    id: 'bv1',
    name: 'Caramel Macchiato Cold Brew',
    description: 'Slow-steeped cold brew coffee mixed with premium whole milk and sweet vanilla syrup, finished with a buttery caramel drizzle.',
    price: 4.99,
    rating: 4.8,
    reviewsCount: 310,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Cold Brew Coffee', 'Whole Milk', 'Vanilla Syrup', 'Caramel Drizzle', 'Ice'],
    nutrition: { calories: 220, protein: 6, carbs: 32, fats: 7 },
    prepTime: '4 mins',
    deliveryTime: '15 mins',
    isPopular: true,
    isVegetarian: true,
    reviews: []
  },
  {
    id: 'bv2',
    name: 'Zesty Fresh Lime Mojito',
    description: 'A refreshing fizzy drink made with freshly muddled lime wedges, fresh mint leaves, cane sugar, and chilled sparkling club soda.',
    price: 4.49,
    rating: 4.6,
    reviewsCount: 160,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Fresh Lime Juice', 'Mint Leaves', 'Sparkling Soda', 'Cane Sugar', 'Crushed Ice'],
    nutrition: { calories: 95, protein: 0, carbs: 24, fats: 0 },
    prepTime: '3 mins',
    deliveryTime: '15 mins',
    isPopular: false,
    isVegetarian: true,
    reviews: []
  },
  // Healthy
  {
    id: 'h1',
    name: 'Greek Avocado Harvest Salad',
    description: 'Crisp romaine lettuce, cucumber slices, cherry tomatoes, Kalamata olives, diced avocado, and crumbled feta cheese tossed in a herb vinaigrette.',
    price: 9.49,
    rating: 4.7,
    reviewsCount: 210,
    category: 'healthy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Avocado', 'Romaine Lettuce', 'Feta Cheese', 'Kalamata Olives', 'Tomatoes', 'Herb Vinaigrette'],
    nutrition: { calories: 380, protein: 9, carbs: 18, fats: 30 },
    prepTime: '8 mins',
    deliveryTime: '20 mins',
    isPopular: true,
    isVegetarian: true,
    reviews: [
      { id: 'r9', userName: 'Sophia Taylor', userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80', rating: 5, date: 'May 25, 2026', comment: 'Incredibly fresh dressing. The avocado was perfectly ripe.' }
    ]
  },
  {
    id: 'h2',
    name: 'Superfood Quinoa Energy Bowl',
    description: 'Fluffy white quinoa loaded with steamed edamame, roasted sweet potato cubes, shredded purple cabbage, baby spinach, and rich almond butter dressing.',
    price: 10.99,
    rating: 4.8,
    reviewsCount: 145,
    category: 'healthy',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Quinoa', 'Edamame', 'Sweet Potato', 'Spinach', 'Purple Cabbage', 'Almond Butter Dressing'],
    nutrition: { calories: 420, protein: 14, carbs: 54, fats: 16 },
    prepTime: '10 mins',
    deliveryTime: '22 mins',
    isPopular: true,
    isVegetarian: true,
    reviews: []
  }
];

export const restaurants: Restaurant[] = [
  {
    id: 'res1',
    name: 'The Italiano Pizzeria',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 1200,
    cuisines: ['Italian', 'Pizza', 'Desserts'],
    deliveryTime: '25-30 mins',
    minOrder: 15.00,
    deliveryFee: 1.99,
    offers: '20% OFF on orders above $30',
    description: 'Bringing authentic Napoletana sourdough pizzas and delicious gelato right to your doorstep.'
  },
  {
    id: 'res2',
    name: 'Burger Palace & Bistro',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 850,
    cuisines: ['Burgers', 'American', 'Beverages'],
    deliveryTime: '15-20 mins',
    minOrder: 10.00,
    deliveryFee: 0.99,
    offers: 'Free Delivery on first order',
    description: 'Juicy, flame-grilled burgers crafted from premium organic beef with gourmet toppings.'
  },
  {
    id: 'res3',
    name: 'Biryani Durbar',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 2300,
    cuisines: ['Indian', 'Biryani', 'Curries'],
    deliveryTime: '30-35 mins',
    minOrder: 12.00,
    deliveryFee: 2.49,
    offers: 'Flat $5 OFF with code ROYAL5',
    description: 'Legendary clay-pot dum biryani and Mughlai specialties simmered slowly by master chefs.'
  },
  {
    id: 'res4',
    name: 'Healthy Greens Cafe',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 520,
    cuisines: ['Healthy', 'Salads', 'Juices'],
    deliveryTime: '20-25 mins',
    minOrder: 12.00,
    deliveryFee: 0.00,
    offers: 'Buy 1 Get 1 on Avocado salads',
    description: 'Nutrient-rich, delicious bowls, cold-pressed juices, and healthy snacks designed for wellness.'
  }
];

export const coupons: Coupon[] = [
  { code: 'FEAST20', discountType: 'percentage', discountValue: 20, minOrderValue: 25.00, description: '20% OFF on orders above $25' },
  { code: 'YUMMY50', discountType: 'flat', discountValue: 5.00, minOrderValue: 15.00, description: 'Flat $5.00 OFF on orders above $15' },
  { code: 'FREEDEL', discountType: 'flat', discountValue: 2.50, minOrderValue: 20.00, description: 'Free Delivery for orders over $20 (Saves $2.50)' }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Emily Watson',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    comment: 'The interface is exceptionally slick! Ordering takes just three clicks, and the real-time delivery animation is so fun to watch. 10/10 UX.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Delicious food delivered hot. The dark mode is extremely eye-friendly, and the meal nutrition facts modal is incredibly detailed!',
    rating: 5
  },
  {
    id: 't3',
    name: 'Jessica Vance',
    role: 'Fitness Coach',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'I love the healthy filter section. Detailed macros (protein, carbs) help me log my meals easily. Best food ordering app hands down!',
    rating: 4.8
  }
];
