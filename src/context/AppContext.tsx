import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FoodItem, Coupon } from '../data/mockData';

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  date: string;
  address: string;
  paymentMethod: string;
  status: 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

interface AppContextType {
  cart: CartItem[];
  activePage: 'home' | 'menu' | 'cart' | 'checkout' | 'dashboard';
  selectedFood: FoodItem | null;
  orders: Order[];
  activeOrderId: string | null;
  coupon: Coupon | null;
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedCategory: string;
  toasts: Toast[];
  userProfile: UserProfile;
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (address: string, paymentMethod: string) => void;
  applyCouponCode: (code: string) => boolean;
  removeCoupon: () => void;
  toggleTheme: () => void;
  openFoodDetails: (item: FoodItem) => void;
  closeFoodDetails: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  setActivePage: (page: 'home' | 'menu' | 'cart' | 'checkout' | 'dashboard') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activePage, setActivePage] = useState<'home' | 'menu' | 'cart' | 'checkout' | 'dashboard'>('home');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 902-3412',
    address: '1428 Elm Street, Apt 4B, Beverly Hills, CA 90210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  });

  // Apply dark mode class on mount and theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle simulated tracking timer when there is an active order
  useEffect(() => {
    if (!activeOrderId) return;

    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id !== activeOrderId) return order;

          let nextStatus = order.status;
          if (order.status === 'confirmed') {
            nextStatus = 'preparing';
            addToast('Chef has accepted your order and started preparing!', 'info');
          } else if (order.status === 'preparing') {
            nextStatus = 'out-for-delivery';
            addToast('Valet is out for delivery! Food is on the way.', 'info');
          } else if (order.status === 'out-for-delivery') {
            nextStatus = 'delivered';
            addToast('Hooray! Your order has been delivered.', 'success');
            clearInterval(interval);
          }

          return { ...order, status: nextStatus };
        })
      );
    }, 15000); // 15 seconds per status change for quick demo tracking

    return () => clearInterval(interval);
  }, [activeOrderId]);

  // Toast utilities
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (item: FoodItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((ci) => ci.foodItem.id === item.id);
      if (existingItem) {
        addToast(`Increased ${item.name} quantity to ${existingItem.quantity + quantity}`, 'success');
        return prevCart.map((ci) =>
          ci.foodItem.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      addToast(`Added ${item.name} to cart`, 'success');
      return [...prevCart, { foodItem: item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((ci) => ci.foodItem.id === itemId);
      if (item) {
        addToast(`Removed ${item.foodItem.name} from cart`, 'info');
      }
      return prevCart.filter((ci) => ci.foodItem.id !== itemId);
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((ci) => (ci.foodItem.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  // Coupon handling
  const applyCouponCode = (code: string): boolean => {
    const upperCode = code.toUpperCase().trim();
    let foundCoupon: Coupon | null = null;
    
    if (upperCode === 'FEAST20') {
      foundCoupon = { code: 'FEAST20', discountType: 'percentage', discountValue: 20, minOrderValue: 25.00, description: '20% OFF on orders above $25' };
    } else if (upperCode === 'YUMMY50') {
      foundCoupon = { code: 'YUMMY50', discountType: 'flat', discountValue: 5.00, minOrderValue: 15.00, description: 'Flat $5.00 OFF on orders above $15' };
    } else if (upperCode === 'FREEDEL') {
      foundCoupon = { code: 'FREEDEL', discountType: 'flat', discountValue: 2.50, minOrderValue: 20.00, description: 'Free Delivery for orders over $20 (Saves $2.50)' };
    }

    if (foundCoupon) {
      const subtotal = cart.reduce((sum, ci) => sum + ci.foodItem.price * ci.quantity, 0);
      if (subtotal < foundCoupon.minOrderValue) {
        addToast(`Coupon requires min order of $${foundCoupon.minOrderValue.toFixed(2)}`, 'warning');
        return false;
      }
      setCoupon(foundCoupon);
      addToast(`Coupon "${foundCoupon.code}" applied successfully!`, 'success');
      return true;
    }

    addToast('Invalid coupon code!', 'error');
    return false;
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Placing order
  const placeOrder = (address: string, paymentMethod: string) => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, ci) => sum + ci.foodItem.price * ci.quantity, 0);
    const deliveryFee = coupon?.code === 'FREEDEL' ? 0 : 2.50;
    
    let discount = 0;
    if (coupon) {
      if (coupon.discountType === 'percentage') {
        discount = (subtotal * coupon.discountValue) / 100;
      } else {
        discount = coupon.discountValue;
      }
    }
    const total = subtotal + deliveryFee - discount;

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount,
      total,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      address,
      paymentMethod,
      status: 'confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    addToast('Order placed successfully! Check real-time tracking.', 'success');
    setActivePage('dashboard');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openFoodDetails = (item: FoodItem) => {
    setSelectedFood(item);
  };

  const closeFoodDetails = () => {
    setSelectedFood(null);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        activePage,
        selectedFood,
        orders,
        activeOrderId,
        coupon,
        theme,
        searchQuery,
        selectedCategory,
        toasts,
        userProfile,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        applyCouponCode,
        removeCoupon,
        toggleTheme,
        openFoodDetails,
        closeFoodDetails,
        addToast,
        removeToast,
        setActivePage,
        setSearchQuery,
        setSelectedCategory,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
