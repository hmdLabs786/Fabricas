import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PRODUCTS, DEFAULT_ORDERS, DEFAULT_SETTINGS, INITIAL_ACTIVITY_LOG, DEFAULT_CATEGORIES } from '../data/defaultData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('fabricas_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('fabricas_settings', JSON.stringify(settings));
  }, [settings]);

  // 2. Products State (No dummy data by default)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('fabricas_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('fabricas_products', JSON.stringify(products));
  }, [products]);

  // 3. Orders State (No dummy orders by default)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('fabricas_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('fabricas_orders', JSON.stringify(orders));
  }, [orders]);

  // 4. Activity Log
  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem('fabricas_activity');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOG;
  });

  useEffect(() => {
    localStorage.setItem('fabricas_activity', JSON.stringify(activityLog));
  }, [activityLog]);

  const logActivity = (text, type = 'general') => {
    const newEntry = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      time: 'Just now',
      type
    };
    setActivityLog(prev => [newEntry, ...prev.slice(0, 29)]);
  };

  // 5. Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('fabricas_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fabricas_cart', JSON.stringify(cart));
  }, [cart]);

  // 6. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('fabricas_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fabricas_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 7. Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('fabricas_admin_auth') === 'true';
  });

  const loginAdmin = (username, password) => {
    if (username.trim() === 'admin' && password === 'admin2008') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('fabricas_admin_auth', 'true');
      logActivity('Admin logged into Fabricas CMS', 'admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('fabricas_admin_auth');
    setCurrentView('home');
    showToast('Logged out of Admin Panel', 'info');
  };

  // 8. Toast Notifications
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

  // 9. Navigation & View States
  // 'home' | 'shop' | 'contact' | 'admin'
  const [currentView, setCurrentView] = useState('home');
  // 'dashboard' | 'orders' | 'inventory' | 'settings'
  const [adminSection, setAdminSection] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWhatsAppOrderModalOpen, setIsWhatsAppOrderModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Cart Operations
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    if (!product || product.stock <= 0) {
      showToast('This item is currently out of stock', 'error');
      return;
    }

    const size = product.hasSizes ? (selectedSize || (product.sizes && product.sizes[0]) || '') : '';
    const color = product.hasColors ? (selectedColor || (product.colors && product.colors[0]?.name) || '') : '';
    const cartItemId = `${product.id}-${size || 'std'}-${color || 'std'}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        showToast(`Updated bag quantity (${newQty})`, 'success');
        return prev.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        );
      } else {
        showToast(`Added ${product.name} to bag`, 'success');
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            sku: product.sku || '',
            price: product.price,
            image: product.image,
            size,
            color,
            hasSizes: Boolean(product.hasSizes),
            hasColors: Boolean(product.hasColors),
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
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = cartSubtotal >= (settings.freeShippingThreshold || 3500);
  const cartShipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : (settings.shippingFee || 250));
  const cartTotal = cartSubtotal + cartShipping;
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      const name = product ? product.name : 'Item';
      if (exists) {
        showToast(`Removed from favorites: ${name}`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved to favorites: ${name}`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // WhatsApp Order Creation
  const createWhatsAppOrder = (customerData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `FAB-${randomNum}`;

    const newOrder = {
      id: orderId,
      customer: {
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.address,
        city: customerData.city || 'Karachi'
      },
      notes: customerData.notes || '',
      date: new Date().toISOString(),
      status: 'Pending',
      paymentMethod: 'Cash on Delivery / WhatsApp Confirmation',
      subtotal: cartSubtotal,
      shipping: cartShipping,
      total: cartTotal,
      items: cart.map(item => ({
        id: item.productId,
        name: item.name,
        size: item.size || '',
        color: item.color || '',
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
    };

    // Deduct stock in catalog
    setProducts(prev =>
      prev.map(prod => {
        const matchingCartItems = cart.filter(c => c.productId === prod.id);
        if (matchingCartItems.length > 0) {
          const totalOrdered = matchingCartItems.reduce((acc, it) => acc + it.quantity, 0);
          return { ...prod, stock: Math.max(0, prod.stock - totalOrdered) };
        }
        return prod;
      })
    );

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Format WhatsApp message as requested:
    // Assalam o Alaikum \n\n Customer Name \n Phone \n Address \n\n Cart details
    const itemsText = cart
      .map(item => {
        let details = `• ${item.name} x ${item.quantity} — Rs. ${(item.price * item.quantity).toLocaleString()}`;
        const specs = [];
        if (item.size) specs.push(`Size: ${item.size}`);
        if (item.color) specs.push(`Color: ${item.color}`);
        if (specs.length > 0) details += ` (${specs.join(', ')})`;
        return details;
      })
      .join('\n');

    const whatsappMessage = `Assalam o Alaikum

I would like to place an order from Fabricas:

*Customer Name:* ${customerData.name}
*Phone Number:* ${customerData.phone}
*Delivery Address:* ${customerData.address}${customerData.city ? `, ${customerData.city}` : ', Karachi'}

*Order Items:*
${itemsText}

*Subtotal:* Rs. ${cartSubtotal.toLocaleString()}
*Delivery Fee:* ${cartShipping === 0 ? 'Free' : `Rs. ${cartShipping.toLocaleString()}`}
*Total Amount:* Rs. ${cartTotal.toLocaleString()}

*Order Ref:* #${orderId}
${customerData.notes ? `*Special Notes:* ${customerData.notes}` : ''}

Please confirm my order and share delivery details. Thank you!`;

    const rawPhone = settings.whatsappRaw || '923222567147';
    const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    logActivity(`WhatsApp order #${orderId} placed by ${customerData.name} (Rs. ${cartTotal.toLocaleString()})`, 'order');

    // Clear cart
    clearCart();
    setIsWhatsAppOrderModalOpen(false);
    setIsCartOpen(false);

    // Save for success dialog
    setLastPlacedOrder({
      ...newOrder,
      whatsappUrl,
      whatsappMessage
    });

    // Launch WhatsApp
    window.open(whatsappUrl, '_blank');

    showToast(`Order #${orderId} generated! Opening WhatsApp...`, 'success', 6000);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          logActivity(`Order #${orderId} status updated to "${newStatus}"`, 'order');
          return { ...o, status: newStatus };
        }
        return o;
      })
    );
    showToast(`Order #${orderId} set to "${newStatus}"`, 'success');
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    logActivity(`Deleted order #${orderId}`, 'order');
    showToast(`Order #${orderId} removed`, 'info');
  };

  // Product CRUD (Admin)
  const addProduct = (productData) => {
    const newId = `prod-${Date.now()}`;
    const newProduct = {
      ...productData,
      id: newId,
      sku: productData.sku || `FAB-${Math.floor(100 + Math.random() * 900)}`,
      stock: Number(productData.stock || 0),
      price: Number(productData.price || 0),
      comparePrice: productData.comparePrice ? Number(productData.comparePrice) : null,
      hasSizes: Boolean(productData.hasSizes),
      hasColors: Boolean(productData.hasColors),
      hasFabric: Boolean(productData.hasFabric),
      hasCustomNote: Boolean(productData.hasCustomNote)
    };

    setProducts(prev => [newProduct, ...prev]);

    // Ensure category is in settings categories
    if (productData.category && !settings.categories?.includes(productData.category)) {
      setSettings(s => ({
        ...s,
        categories: [...(s.categories || DEFAULT_CATEGORIES), productData.category]
      }));
    }

    logActivity(`Added product "${newProduct.name}" (Rs. ${newProduct.price.toLocaleString()})`, 'product');
    showToast(`Added ${newProduct.name} to catalog`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    logActivity(`Updated product "${updatedFields.name || 'item'}"`, 'product');
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id) => {
    const p = products.find(prod => prod.id === id);
    const title = p ? p.name : 'Product';
    setProducts(prev => prev.filter(prod => prod.id !== id));
    setCart(prev => prev.filter(item => item.productId !== id));
    setWishlist(prev => prev.filter(pId => pId !== id));
    logActivity(`Deleted product "${title}"`, 'product');
    showToast(`Deleted ${title}`, 'info');
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
    showToast(`Restocked +${amount} units`, 'success');
  };

  const toggleFeatured = (id) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newState = !p.isFeatured;
          showToast(`${p.name} ${newState ? 'featured' : 'unfeatured'}`, 'info');
          return { ...p, isFeatured: newState };
        }
        return p;
      })
    );
  };

  // Categories list derived from settings + products
  const allCategories = Array.from(
    new Set([
      ...(settings.categories || DEFAULT_CATEGORIES),
      ...products.map(p => p.category).filter(Boolean)
    ])
  );

  const addCategory = (categoryName) => {
    const clean = categoryName.trim();
    if (!clean) return;
    if (!settings.categories?.includes(clean)) {
      const updated = [...(settings.categories || DEFAULT_CATEGORIES), clean];
      setSettings(prev => ({ ...prev, categories: updated }));
      showToast(`Added category: ${clean}`, 'success');
    }
  };

  const removeCategory = (categoryName) => {
    const updated = (settings.categories || DEFAULT_CATEGORIES).filter(c => c !== categoryName);
    setSettings(prev => ({ ...prev, categories: updated }));
    showToast(`Removed category: ${categoryName}`, 'info');
  };

  // Settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logActivity('Storefront settings updated', 'settings');
    showToast('Settings saved successfully', 'success');
  };

  const resetDemoData = () => {
    setProducts([]);
    setOrders([]);
    setSettings(DEFAULT_SETTINGS);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem('fabricas_products');
    localStorage.removeItem('fabricas_orders');
    localStorage.removeItem('fabricas_settings');
    localStorage.removeItem('fabricas_cart');
    localStorage.removeItem('fabricas_wishlist');
    showToast('Store catalog and orders reset to fresh state', 'info');
  };

  const exportDataJSON = () => {
    const backup = {
      store: settings.storeName,
      location: settings.location,
      exportedAt: new Date().toISOString(),
      settings,
      products,
      orders,
      activityLog
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fabricas-karachi-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Store JSON backup downloaded', 'success');
  };

  // Currency Formatter in PKR
  const formatPrice = (amount) => {
    const symbol = settings.currencySymbol || 'Rs. ';
    const val = Number(amount || 0);
    return `${symbol}${val.toLocaleString('en-PK')}`;
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
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
        allCategories,
        addCategory,
        removeCategory,
        orders,
        createWhatsAppOrder,
        updateOrderStatus,
        deleteOrder,
        activityLog,
        logActivity,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartShipping,
        isFreeShipping,
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
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isWhatsAppOrderModalOpen,
        setIsWhatsAppOrderModalOpen,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        openQuickView,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
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
