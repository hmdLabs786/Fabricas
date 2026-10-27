// Fabricas - Karachi Based Online E-Commerce Clothing Store

export const DEFAULT_PRODUCTS = [];

export const DEFAULT_ORDERS = [];

export const DEFAULT_CATEGORIES = [
  "Ready to Wear",
  "Kurtas",
  "Unstitched",
  "Bottoms",
  "Shawls & Dupattas",
  "Accessories"
];

export const DEFAULT_SETTINGS = {
  storeName: "Fabricas",
  tagline: "Karachi's Modern Clothing Destination",
  supportEmail: "fabricas@gmail.com",
  whatsappNumber: "+92 3222567147",
  whatsappRaw: "923222567147",
  location: "Karachi, Pakistan",
  currencySymbol: "Rs. ",
  shippingFee: 250,
  freeShippingThreshold: 3500,
  promoBannerText: "FREE EXPRESS DELIVERY ACROSS KARACHI ON ORDERS OVER RS. 3,500 — ORDER VIA WHATSAPP",
  promoBannerEnabled: true,
  adminUsername: "admin",
  categories: DEFAULT_CATEGORIES
};

export const INITIAL_ACTIVITY_LOG = [
  { id: "act-1", text: "Storefront initialized for Fabricas (Karachi, Pakistan)", time: "Just now", type: "system" }
];
