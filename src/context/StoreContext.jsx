import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PRODUCTS, DEFAULT_ORDERS, DEFAULT_SETTINGS, INITIAL_ACTIVITY_LOG } from '../data/defaultData';

const StoreContext = createContext();

// Safe LocalStorage helpers to prevent QuotaExceededError or JSON parse crashes
const safeSetStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[Fabricas Storage] Could not persist ${key}:`, err);
    // If quota is exceeded, clear ephemeral activity log and retry
    try {
      localStorage.removeItem('fabricas_activity');
      localStorage.setItem(key, JSON.stringify(value));
      console.info(`[Fabricas Storage] Successfully recovered and saved ${key} after clearing activity cache.`);
    } catch (retryErr) {
      console.warn(`[Fabricas Storage] Second write attempt failed for ${key}:`, retryErr);
    }
  }
};

const safeGetStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`[Fabricas Storage] Error reading ${key}:`, err);
    return fallback;
  }
};

export function StoreProvider({ children }) {
  // 1. Settings State
  const [settings, setSettings] = useState(() => safeGetStorage('fabricas_settings', DEFAULT_SETTINGS));

  useEffect(() => {
    safeSetStorage('fabricas_settings', settings);
  }, [settings]);

  // 2. Products State (Instant in-memory catalog, purging any legacy bloated base64 storage)
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem('fabricas_products');
      if (raw && (raw.includes('data:image/') || raw.length > 300000)) {
        localStorage.removeItem('fabricas_products');
      }
    } catch (e) {}

    const CATALOG_VERSION = 'v1.3-fast-catalog';
    const storedVersion = localStorage.getItem('fabricas_catalog_ver');
    const stored = safeGetStorage('fabricas_products', null);

    if (storedVersion !== CATALOG_VERSION || !Array.isArray(stored) || stored.length === 0) {
      localStorage.setItem('fabricas_catalog_ver', CATALOG_VERSION);
      return DEFAULT_PRODUCTS;
    }
    return stored;
  });

  useEffect(() => {
    // Only write to localStorage if products differ from default (e.g. admin created/updated products)
    if (products !== DEFAULT_PRODUCTS) {
      safeSetStorage('fabricas_products', products);
    }
  }, [products]);

  // 3. Orders State (No dummy orders by default)
  const [orders, setOrders] = useState(() => safeGetStorage('fabricas_orders', DEFAULT_ORDERS));

  useEffect(() => {
    safeSetStorage('fabricas_orders', orders);
  }, [orders]);

  // 4. Cart State
  const [cart, setCart] = useState(() => safeGetStorage('fabricas_cart', []));

  useEffect(() => {
    safeSetStorage('fabricas_cart', cart);
  }, [cart]);

  // 5. Wishlist State
  const [wishlist, setWishlist] = useState(() => safeGetStorage('fabricas_wishlist', []));

  useEffect(() => {
    safeSetStorage('fabricas_wishlist', wishlist);
  }, [wishlist]);

  // 6. Activity Feed Log
  const [activityLog, setActivityLog] = useState(() => safeGetStorage('fabricas_activity', INITIAL_ACTIVITY_LOG));

  useEffect(() => {
    safeSetStorage('fabricas_activity', activityLog);
  }, [activityLog]);

  const logActivity = (text, type = 'info') => {
    const newEntry = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text,
      time: 'Just now',
      type
    };
    setActivityLog(prev => [newEntry, ...prev.slice(0, 49)]);
  };

  // 7. Admin Auth Gate (Strict: admin / admin2008)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('fabricas_admin_auth') === 'true';
  });

  const loginAdmin = (username, password) => {
    if (username === 'admin' && password === 'admin2008') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('fabricas_admin_auth', 'true');
      logActivity('Admin logged into workspace', 'auth');
      showToast('Welcome to Fabricas Admin Portal', 'success');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('fabricas_admin_auth');
    logActivity('Admin logged out', 'auth');
    showToast('Signed out of Admin Portal', 'info');
  };

  // 8. Navigation & Modal States
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'contact' | 'admin'
  const [adminSection, setAdminSection] = useState('dashboard'); // 'dashboard' | 'orders' | 'inventory' | 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals / Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWhatsAppOrderModalOpen, setIsWhatsAppOrderModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Cart Operations (No artificial stock caps)
  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    if (!product) return;

    const size = product.hasSizes ? (selectedSize || (product.sizes && product.sizes[0]) || '') : '';
    const color = product.hasColors ? (selectedColor || (product.colors && product.colors[0]?.name) || '') : '';
    const cartItemId = `${product.id}-${size || 'std'}-${color || 'std'}`;
    const displayImg = (product.images && product.images[0]) || product.image || '';

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        const newQty = existing.quantity + quantity;
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
            image: displayImg,
            size,
            color,
            hasSizes: Boolean(product.hasSizes),
            hasColors: Boolean(product.hasColors),
            quantity: quantity
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
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Removed item from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const isFreeShipping = cartSubtotal >= (settings.freeShippingThreshold || 3500);
  const cartShipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : (settings.shippingFee || 250));
  const cartTotal = cartSubtotal + cartShipping;
  const cartItemCount = cart.reduce((sum, it) => sum + it.quantity, 0);

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to favorites', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Direct WhatsApp Checkout Engine (Replaces traditional checkout)
  const createWhatsAppOrder = (customerData) => {
    if (cart.length === 0) return null;

    const orderId = `FAB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: {
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.address,
        city: customerData.city || 'Karachi',
        notes: customerData.notes || ''
      },
      subtotal: cartSubtotal,
      shipping: cartShipping,
      total: cartTotal,
      status: 'Pending',
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

    // Save order directly without depleting stock
    setOrders(prev => [newOrder, ...prev]);

    // Format WhatsApp message
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

    const rawPhone = settings.whatsappRaw || '923222567147';
    const whatsappMessage = `Assalam o Alaikum Fabricas Team! 🌸

I would like to place an order:
Order ID: #${orderId}

Customer Details:
• Name: ${customerData.name}
• Phone: ${customerData.phone}
• Delivery Address: ${customerData.address}, ${customerData.city || 'Karachi'}
${customerData.notes ? `• Special Notes: ${customerData.notes}\n` : ''}
Items Ordered:
${itemsText}
--------------------------
Subtotal: Rs. ${cartSubtotal.toLocaleString()}
Delivery: ${isFreeShipping ? 'FREE (Complimentary)' : `Rs. ${cartShipping.toLocaleString()}`}
Total Payable: Rs. ${cartTotal.toLocaleString()} (Cash on Delivery)`;

    const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Store in order record
    newOrder.whatsappUrl = whatsappUrl;
    newOrder.whatsappMessage = whatsappMessage;

    logActivity(`New WhatsApp order placed: #${orderId} by ${customerData.name} (Rs. ${cartTotal.toLocaleString()})`, 'order');

    // Clear cart and display success
    clearCart();
    setIsWhatsAppOrderModalOpen(false);
    setIsCartOpen(false);
    setLastPlacedOrder(newOrder);

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    logActivity(`Order #${orderId} marked as ${newStatus}`, 'order');
    showToast(`Order #${orderId} updated to ${newStatus}`, 'success');
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    logActivity(`Deleted order #${orderId}`, 'order');
    showToast(`Order #${orderId} removed`, 'info');
  };

  // Product CRUD (Admin)
  const addProduct = (productData) => {
    try {
      const newId = `prod-${Date.now()}`;
      const name = (productData.name || 'Garment').trim();
      const price = Number(productData.price) || 0;
      const imagesList = Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : [productData.image].filter(Boolean);

      const newProduct = {
        ...productData,
        id: newId,
        name,
        sku: productData.sku || `FAB-${Math.floor(100 + Math.random() * 900)}`,
        price,
        comparePrice: productData.comparePrice ? Number(productData.comparePrice) : null,
        images: imagesList,
        image: imagesList[0] || productData.image || '',
        hoverImage: imagesList[1] || productData.hoverImage || imagesList[0] || '',
        hasSizes: Boolean(productData.hasSizes),
        sizes: Array.isArray(productData.sizes) ? productData.sizes : ['S', 'M', 'L'],
        hasColors: Boolean(productData.hasColors),
        colors: Array.isArray(productData.colors) ? productData.colors : [{ name: 'Default', hex: '#0F766E' }],
        hasFabric: Boolean(productData.hasFabric),
        fabric: productData.fabric || '',
        hasCustomNote: Boolean(productData.hasCustomNote),
        customNote: productData.customNote || '',
        inStock: true
      };

      setProducts(prev => [newProduct, ...(prev || [])]);
      logActivity(`Added product "${name}" (Rs. ${price.toLocaleString()})`, 'product');
      showToast(`Added ${name} to catalog`, 'success');
      return newProduct;
    } catch (err) {
      console.error('Error adding product to catalog:', err);
      showToast('Error saving product. Please try again.', 'error');
      return null;
    }
  };

  const updateProduct = (id, updatedFields) => {
    try {
      setProducts(prev =>
        (prev || []).map(p => {
          if (p.id === id) {
            const imgs = updatedFields.images || p.images || [];
            return {
              ...p,
              ...updatedFields,
              images: imgs,
              image: (imgs && imgs[0]) || updatedFields.image || p.image || '',
              hoverImage: (imgs && imgs[1]) || updatedFields.hoverImage || p.hoverImage || ''
            };
          }
          return p;
        })
      );
      logActivity(`Updated product "${updatedFields.name || 'item'}"`, 'product');
      showToast('Product updated successfully', 'success');
      return true;
    } catch (err) {
      console.error('Error updating product:', err);
      showToast('Error updating product', 'error');
      return false;
    }
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

  // Settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logActivity('Storefront settings updated', 'settings');
    showToast('Settings saved successfully', 'success');
  };

  const resetDemoData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders([]);
    setCart([]);
    setWishlist([]);
    setSettings(DEFAULT_SETTINGS);
    safeSetStorage('fabricas_products', DEFAULT_PRODUCTS);
    localStorage.removeItem('fabricas_orders');
    localStorage.removeItem('fabricas_cart');
    localStorage.removeItem('fabricas_wishlist');
    localStorage.removeItem('fabricas_settings');
    logActivity('Official 11-product catalog restored', 'system');
    showToast('Official catalog restored successfully', 'info');
  };

  const exportDataJSON = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      store: settings.storeName,
      products,
      orders,
      settings
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `fabricas_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Store data downloaded as JSON', 'success');
  };

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
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
        toggleFeatured,
        allCategories: [],
        addCategory: () => {},
        removeCategory: () => {},
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
