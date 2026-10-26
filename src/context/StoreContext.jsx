import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PRODUCTS, DEFAULT_ORDERS, DEFAULT_SETTINGS, INITIAL_ACTIVITY_LOG } from '../data/defaultData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nocturne_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('nocturne_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nocturne_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('nocturne_settings', JSON.stringify(settings));
  }, [settings]);

  // 3. Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nocturne_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('nocturne_products', JSON.stringify(products));
  }, [products]);

  // 4. Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nocturne_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('nocturne_orders', JSON.stringify(orders));
  }, [orders]);

  // 5. Activity Log
  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem('nocturne_activity');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOG;
  });

  useEffect(() => {
    localStorage.setItem('nocturne_activity', JSON.stringify(activityLog));
  }, [activityLog]);

  const logActivity = (text, type = 'general') => {
    const newEntry = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      time: 'Just now',
      type
    };
    setActivityLog(prev => [newEntry, ...prev.slice(0, 24)]);
  };

  // 6. Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nocturne_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('nocturne_cart', JSON.stringify(cart));
  }, [cart]);

  // 7. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('nocturne_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-7'];
  });

  useEffect(() => {
    localStorage.setItem('nocturne_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 8. Admin Authentication
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('nocturne_admin_auth') === 'true';
  });

  const loginAdmin = (username, password) => {
    if (username.trim() === 'admin' && password === 'admin2008') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('nocturne_admin_auth', 'true');
      logActivity('Admin logged in securely', 'admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('nocturne_admin_auth');
    setCurrentView('storefront');
    showToast('Logged out of Admin Portal', 'info');
  };

  // 9. Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 10. Navigation & Modals State
  const [currentView, setCurrentView] = useState('storefront'); // 'storefront' | 'admin'
  const [adminSection, setAdminSection] = useState('dashboard'); // 'dashboard' | 'orders' | 'products' | 'settings'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  // Cart Operations
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    if (!product || product.stock <= 0) {
      showToast('This piece is currently out of stock', 'error');
      return;
    }

    const size = selectedSize || (product.sizes && product.sizes[0]) || 'One Size';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Standard';
    const cartItemId = `${product.id}-${size}-${color}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        showToast(`Updated quantity in bag (${newQty})`, 'success');
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQty }
            : item
        );
      } else {
        showToast(`Added ${product.name} to bag`, 'success');
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            image: product.image,
            size,
            color,
            quantity: Math.min(quantity, product.stock),
            maxStock: product.stock
          }
        ];
      }
    });
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const qty = Math.min(newQuantity, item.maxStock);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NOCTURNE15') {
      setPromoCode('NOCTURNE15');
      setDiscountPercent(15);
      showToast('Promo code NOCTURNE15 applied (15% off)!', 'success');
      return true;
    } else {
      showToast('Invalid promotional code', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    showToast('Promo code removed', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartDiscount = Number((cartSubtotal * (discountPercent / 100)).toFixed(2));
  const cartDiscountedSubtotal = cartSubtotal - cartDiscount;
  const isFreeShipping = cartDiscountedSubtotal >= (settings.freeShippingThreshold || 250);
  const cartShipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : Number(settings.flatShippingFee || 25));
  const cartTax = cart.length === 0 ? 0 : Number((cartDiscountedSubtotal * ((settings.taxRate || 8.5) / 100)).toFixed(2));
  const cartTotal = Number((cartDiscountedSubtotal + cartShipping + cartTax).toFixed(2));
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      const productName = product ? product.name : 'Piece';
      if (exists) {
        showToast(`Removed from Wishlist: ${productName}`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved to Wishlist: ${productName}`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Product Operations (Admin CRUD)
  const addProduct = (productData) => {
    const newId = `prod-${Date.now()}`;
    const newProduct = {
      ...productData,
      id: newId,
      rating: 5.0,
      reviewsCount: 1,
      sku: productData.sku || `NOC-EX-${Math.floor(100 + Math.random() * 900)}`
    };
    setProducts(prev => [newProduct, ...prev]);
    logActivity(`Added new product: "${newProduct.name}" (${formatPrice(newProduct.price)})`, 'product');
    showToast(`Created product: ${newProduct.name}`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    // Also update any matching item in cart
    setCart(prev =>
      prev.map(item => {
        if (item.productId === id) {
          return {
            ...item,
            name: updatedFields.name !== undefined ? updatedFields.name : item.name,
            price: updatedFields.price !== undefined ? updatedFields.price : item.price,
            image: updatedFields.image !== undefined ? updatedFields.image : item.image,
            maxStock: updatedFields.stock !== undefined ? updatedFields.stock : item.maxStock
          };
        }
        return item;
      })
    );
    const prod = products.find(p => p.id === id);
    const title = updatedFields.name || (prod ? prod.name : 'Product');
    logActivity(`Updated product: "${title}"`, 'product');
    showToast(`Updated product details for ${title}`, 'success');
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    const title = prod ? prod.name : 'Product';
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.productId !== id));
    setWishlist(prev => prev.filter(pId => pId !== id));
    logActivity(`Deleted product: "${title}"`, 'product');
    showToast(`Deleted ${title} from catalog`, 'info');
  };

  const restockProduct = (id, amount = 10) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newStock = p.stock + amount;
          logActivity(`Restocked "${p.name}" (+${amount} units, total: ${newStock})`, 'stock');
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
    showToast(`Restocked +${amount} units successfully`, 'success');
  };

  const toggleFeatured = (id) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newState = !p.isFeatured;
          showToast(`${p.name} ${newState ? 'featured on homepage' : 'removed from featured'}`, 'info');
          return { ...p, isFeatured: newState };
        }
        return p;
      })
    );
  };

  // Order Operations
  const createOrder = (customerData, paymentMethod = 'Credit Card') => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `NOC-${randomNum}`;

    const newOrder = {
      id: orderId,
      customer: customerData,
      date: new Date().toISOString(),
      status: 'Pending',
      paymentMethod,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      shipping: cartShipping,
      total: cartTotal,
      items: cart.map(item => ({
        id: item.productId,
        name: item.name,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
    };

    // Deduct stock for each ordered item
    setProducts(prev =>
      prev.map(prod => {
        const orderedItem = cart.find(c => c.productId === prod.id);
        if (orderedItem) {
          const updatedStock = Math.max(0, prod.stock - orderedItem.quantity);
          return { ...prod, stock: updatedStock };
        }
        return prod;
      })
    );

    // Add to orders list
    setOrders(prev => [newOrder, ...prev]);

    // Log Activity
    logActivity(`New Order #${orderId} placed by ${customerData.name} (${formatPrice(cartTotal)})`, 'order');

    // Clear cart & promo
    clearCart();
    setPromoCode('');
    setDiscountPercent(0);

    // Save last placed order & open success modal
    setLastPlacedOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);

    showToast(`Order #${orderId} confirmed successfully!`, 'success', 5000);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          logActivity(`Order #${orderId} status changed to ${newStatus}`, 'order');
          return { ...o, status: newStatus };
        }
        return o;
      })
    );
    showToast(`Order #${orderId} status set to "${newStatus}"`, 'success');
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    logActivity(`Deleted order #${orderId}`, 'order');
    showToast(`Order #${orderId} deleted permanently`, 'info');
  };

  // Settings & System utilities
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logActivity('Store configuration and commerce rules updated', 'settings');
    showToast('Storefront and commerce settings saved', 'success');
  };

  const resetDemoData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders(DEFAULT_ORDERS);
    setSettings(DEFAULT_SETTINGS);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setCart([]);
    setWishlist(['prod-1', 'prod-7']);
    localStorage.removeItem('nocturne_products');
    localStorage.removeItem('nocturne_orders');
    localStorage.removeItem('nocturne_settings');
    localStorage.removeItem('nocturne_activity');
    localStorage.removeItem('nocturne_cart');
    localStorage.removeItem('nocturne_wishlist');
    showToast('Store reset to original architectural catalog state', 'info', 4000);
  };

  const exportDataJSON = () => {
    const backupData = {
      store: settings.storeName,
      exportedAt: new Date().toISOString(),
      settings,
      products,
      orders,
      activityLog
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nocturne-atelier-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Store backup JSON exported successfully', 'success');
  };

  // Currency Formatter
  const formatPrice = (amount) => {
    const symbol = settings.currencySymbol || '$';
    const num = Number(amount || 0);
    return `${symbol}${num.toLocaleString('en-US', { minimumFractionDigits: num % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
  };

  // Quick View helper
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        settings,
        updateSettings,
        resetDemoData,
        exportDataJSON,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        restockProduct,
        toggleFeatured,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        activityLog,
        logActivity,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        promoCode,
        discountPercent,
        applyPromoCode,
        removePromoCode,
        cartSubtotal,
        cartDiscount,
        cartDiscountedSubtotal,
        isFreeShipping,
        cartShipping,
        cartTax,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        removeToast,
        currentView,
        setCurrentView,
        adminSection,
        setAdminSection,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        openQuickView,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastPlacedOrder,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        isLookbookOpen,
        setIsLookbookOpen,
        formatPrice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
