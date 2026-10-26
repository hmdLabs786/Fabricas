export const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Sartorial Cashmere Trench Coat",
    sku: "NOC-OT-001",
    category: "Outerwear",
    price: 890,
    comparePrice: 1050,
    stock: 8,
    rating: 4.9,
    reviewsCount: 38,
    isFeatured: true,
    isNew: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#2B2D2F" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Obsidian", hex: "#0B0B0C" }
    ],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
    description: "Architectural proportions meet supreme tactile comfort. Cut from double-faced pure Mongolian cashmere with drop-shoulder tailoring, storm flaps, and horn buttons.",
    fabricCare: "100% Virgin Cashmere. Cupro lined. Specialist dry clean only. Made in Florence."
  },
  {
    id: "prod-2",
    name: "Sculpted Structured Wool Blazer",
    sku: "NOC-OT-002",
    category: "Outerwear",
    price: 620,
    comparePrice: null,
    stock: 4, // Low stock alert
    rating: 4.8,
    reviewsCount: 24,
    isFeatured: true,
    isNew: true,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Noir Black", hex: "#111112" },
      { name: "Chalk White", hex: "#EBEBE6" }
    ],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    description: "Exaggerated hourglass silhouette with sharp razor-edge peak lapels. Canvas-interfaced construction designed for a commanding presence.",
    fabricCare: "95% Extrafine Merino Wool, 5% Silk. Viscose lining. Dry clean only. Handcrafted in Milan."
  },
  {
    id: "prod-3",
    name: "Oversized Shearling Aviator Jacket",
    sku: "NOC-OT-003",
    category: "Outerwear",
    price: 1150,
    comparePrice: 1300,
    stock: 6,
    rating: 5.0,
    reviewsCount: 19,
    isFeatured: false,
    isNew: false,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Espresso", hex: "#3D2E24" },
      { name: "Onyx", hex: "#161616" }
    ],
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    description: "Plush Spanish shearling with a crackled leather patina exterior. Heavyweight antique brass industrial hardware and buckle collar.",
    fabricCare: "100% Spanish Lambskin Shearling. Leather specialist clean only."
  },
  {
    id: "prod-4",
    name: "Brushed Mohair Funnel Neck",
    sku: "NOC-KN-001",
    category: "Knitwear",
    price: 380,
    comparePrice: null,
    stock: 14,
    rating: 4.7,
    reviewsCount: 31,
    isFeatured: true,
    isNew: true,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cobalt", hex: "#1A44C2" },
      { name: "Heather Grey", hex: "#7E8287" },
      { name: "Alabaster", hex: "#F3F2EE" }
    ],
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
    description: "Intensely brushed high-gauge mohair offering ethereal lightness and rich chromatic depth. Finished with raw tubular cuffs.",
    fabricCare: "67% Superkid Mohair, 28% Polyamide, 5% Wool. Hand wash cold, dry flat."
  },
  {
    id: "prod-5",
    name: "Deconstructed Ribbed Turtleneck",
    sku: "NOC-KN-002",
    category: "Knitwear",
    price: 340,
    comparePrice: 420,
    stock: 9,
    rating: 4.9,
    reviewsCount: 42,
    isFeatured: false,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bone White", hex: "#E9E8E3" },
      { name: "Mineral Olive", hex: "#4B5340" }
    ],
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
    description: "Multi-directional rib patterning with subtle lateral slash detailing. An essential layering foundation for modern tailoring.",
    fabricCare: "100% Heavy Merino Wool. Cold gentle hand wash."
  },
  {
    id: "prod-6",
    name: "Architectural Open-Knit Cardigan",
    sku: "NOC-KN-003",
    category: "Knitwear",
    price: 410,
    comparePrice: null,
    stock: 3, // Low stock alert
    rating: 4.6,
    reviewsCount: 17,
    isFeatured: false,
    isNew: true,
    sizes: ["XS", "S", "M"],
    colors: [
      { name: "Midnight Navy", hex: "#161D2B" },
      { name: "Champagne", hex: "#D8C6A5" }
    ],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80",
    description: "Hand-loomed textured knit with concealed magnetic front closure and elongated drapery through the sleeves.",
    fabricCare: "70% Organic Cotton, 30% Mulberry Silk. Dry clean recommended."
  },
  {
    id: "prod-7",
    name: "Pleated Wide-Leg Drape Trousers",
    sku: "NOC-TL-001",
    category: "Tailoring",
    price: 460,
    comparePrice: 520,
    stock: 11,
    rating: 4.9,
    reviewsCount: 56,
    isFeatured: true,
    isNew: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Slate Grey", hex: "#54575E" },
      { name: "Sandstone", hex: "#C7C0B3" },
      { name: "Pitch Black", hex: "#0C0C0D" }
    ],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    description: "Deep twin reverse pleats that billow with kinetic motion. Crafted from high-twist wool gabardine with internal waistband adjusters.",
    fabricCare: "100% High-Twist Wool Gabardine. Dry clean only. Made in Portugal."
  },
  {
    id: "prod-8",
    name: "Double-Breasted Silk Kimono Suit",
    sku: "NOC-TL-002",
    category: "Tailoring",
    price: 980,
    comparePrice: null,
    stock: 5,
    rating: 4.8,
    reviewsCount: 15,
    isFeatured: true,
    isNew: true,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Deep Graphite", hex: "#22252A" },
      { name: "Pearl Stone", hex: "#D6D4CE" }
    ],
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
    description: "East-meets-West sartorial hybrid. Shawl collar crossover with inner tie closure and matching fluid tapered trousers.",
    fabricCare: "60% Raw Slub Silk, 40% Virgin Wool. Dry clean only."
  },
  {
    id: "prod-9",
    name: "Minimalist Asymmetrical Waistcoat",
    sku: "NOC-TL-003",
    category: "Tailoring",
    price: 290,
    comparePrice: 350,
    stock: 2, // Low stock alert
    rating: 4.6,
    reviewsCount: 19,
    isFeatured: false,
    isNew: false,
    sizes: ["XS", "S", "M"],
    colors: [
      { name: "Raven", hex: "#1C1C1E" },
      { name: "Champagne", hex: "#E1D2BA" }
    ],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
    description: "Off-center angled placket with horn button fastening and back cinch adjuster. Layer bare or over crisp poplin shirts.",
    fabricCare: "100% Fine Tropical Wool. Lined with Japanese Bemberg."
  },
  {
    id: "prod-10",
    name: "Heavyweight Loopback Boxy Hoodie",
    sku: "NOC-ST-001",
    category: "Streetwear",
    price: 260,
    comparePrice: null,
    stock: 18,
    rating: 4.9,
    reviewsCount: 68,
    isFeatured: true,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Anthracite", hex: "#353839" },
      { name: "Vintage Cream", hex: "#EAE6DF" },
      { name: "Cobalt", hex: "#1A44C2" }
    ],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
    description: "520 GSM Japanese organic French terry. Double-layered hood without drawstrings for an uncompromising architectural drape.",
    fabricCare: "100% Organic Combed Cotton (520 GSM). Pre-shrunk. Machine wash cold inside out."
  },
  {
    id: "prod-11",
    name: "Modular Cargo Silhouette Pant",
    sku: "NOC-ST-002",
    category: "Streetwear",
    price: 390,
    comparePrice: 450,
    stock: 7,
    rating: 4.8,
    reviewsCount: 33,
    isFeatured: false,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Iron Grey", hex: "#464A4D" },
      { name: "Desert Dust", hex: "#C2B5A3" }
    ],
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80",
    description: "Technical ripstop cotton with magnetic bellow pockets and cinch ankle toggles to transition between wide and tapered fits.",
    fabricCare: "70% Cotton Ripstop, 30% Cordura Nylon. Water-repellent DWR finish."
  },
  {
    id: "prod-12",
    name: "Architectural Sculpted Leather Tote",
    sku: "NOC-AC-001",
    category: "Accessories",
    price: 720,
    comparePrice: null,
    stock: 0, // Sold out test case
    rating: 5.0,
    reviewsCount: 29,
    isFeatured: true,
    isNew: false,
    sizes: ["One Size"],
    colors: [
      { name: "Black Chrome", hex: "#0E0E10" },
      { name: "Burnished Chestnut", hex: "#4E2B1E" }
    ],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
    description: "Geometric hand-finished full grain saddle leather. Magnetic origami fold top closure with silver-embossed architectural emblem.",
    fabricCare: "100% Full-grain Tuscan Calf Leather. Hand-waxed edges. Includes raw canvas dust bag."
  }
];

export const DEFAULT_ORDERS = [
  {
    id: "NOC-8492",
    customer: {
      name: "Elena Rostova",
      email: "elena.rostova@atelier.ch",
      phone: "+41 79 432 8901",
      address: "Seestrasse 142",
      city: "Zurich",
      country: "Switzerland"
    },
    date: "2026-10-25T14:32:00Z",
    status: "Delivered",
    paymentMethod: "Credit Card (Visa •••• 4910)",
    subtotal: 1350,
    discount: 202.5,
    tax: 97.54,
    shipping: 0,
    total: 1245.04,
    items: [
      {
        id: "prod-1",
        name: "Sartorial Cashmere Trench Coat",
        size: "M",
        color: "Charcoal",
        price: 890,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "prod-7",
        name: "Pleated Wide-Leg Drape Trousers",
        size: "S",
        color: "Pitch Black",
        price: 460,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8491",
    customer: {
      name: "Marcus Sterling",
      email: "m.sterling@studio-arch.com",
      phone: "+1 (415) 890-2134",
      address: "740 Sansome St, Suite 400",
      city: "San Francisco",
      country: "United States"
    },
    date: "2026-10-25T09:15:00Z",
    status: "Shipped",
    paymentMethod: "Apple Pay",
    subtotal: 890,
    discount: 0,
    tax: 75.65,
    shipping: 0,
    total: 965.65,
    items: [
      {
        id: "prod-1",
        name: "Sartorial Cashmere Trench Coat",
        size: "L",
        color: "Obsidian",
        price: 890,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8490",
    customer: {
      name: "Sophia Chen",
      email: "sophia.chen@galerie-art.fr",
      phone: "+33 6 12 34 56 78",
      address: "18 Rue de Turenne",
      city: "Paris",
      country: "France"
    },
    date: "2026-10-24T18:45:00Z",
    status: "Processing",
    paymentMethod: "Credit Card (Mastercard •••• 8821)",
    subtotal: 640,
    discount: 96.0,
    tax: 46.24,
    shipping: 0,
    total: 590.24,
    items: [
      {
        id: "prod-4",
        name: "Brushed Mohair Funnel Neck",
        size: "S",
        color: "Cobalt",
        price: 380,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "prod-10",
        name: "Heavyweight Loopback Boxy Hoodie",
        size: "M",
        color: "Anthracite",
        price: 260,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8489",
    customer: {
      name: "Julian Vance",
      email: "julian@vance-capital.co.uk",
      phone: "+44 20 7946 0912",
      address: "12 Berkeley Square",
      city: "London",
      country: "United Kingdom"
    },
    date: "2026-10-24T11:20:00Z",
    status: "Pending",
    paymentMethod: "Credit Card (Amex •••• 1004)",
    subtotal: 1150,
    discount: 0,
    tax: 97.75,
    shipping: 0,
    total: 1247.75,
    items: [
      {
        id: "prod-3",
        name: "Oversized Shearling Aviator Jacket",
        size: "L",
        color: "Espresso",
        price: 1150,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8488",
    customer: {
      name: "Aurelia Dupont",
      email: "aurelia.dupont@mode-lyon.fr",
      phone: "+33 6 88 12 99 43",
      address: "4 Place Bellecour",
      city: "Lyon",
      country: "France"
    },
    date: "2026-10-23T16:10:00Z",
    status: "Delivered",
    paymentMethod: "Apple Pay",
    subtotal: 460,
    discount: 69.0,
    tax: 33.24,
    shipping: 0,
    total: 424.24,
    items: [
      {
        id: "prod-7",
        name: "Pleated Wide-Leg Drape Trousers",
        size: "M",
        color: "Slate Grey",
        price: 460,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8487",
    customer: {
      name: "David Thorne",
      email: "d.thorne@monocle.media",
      phone: "+1 (212) 555-0199",
      address: "150 Mercer Street, Loft 6B",
      city: "New York",
      country: "United States"
    },
    date: "2026-10-23T13:05:00Z",
    status: "Shipped",
    paymentMethod: "Credit Card (Visa •••• 3021)",
    subtotal: 1240,
    discount: 0,
    tax: 105.4,
    shipping: 0,
    total: 1345.4,
    items: [
      {
        id: "prod-2",
        name: "Sculpted Structured Wool Blazer",
        size: "L",
        color: "Noir Black",
        price: 620,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8486",
    customer: {
      name: "Valerie Knight",
      email: "valerie@knight-interiors.de",
      phone: "+49 30 2234 8812",
      address: "Torstrasse 109",
      city: "Berlin",
      country: "Germany"
    },
    date: "2026-10-22T17:50:00Z",
    status: "Cancelled",
    paymentMethod: "Credit Card (Mastercard •••• 5543)",
    subtotal: 720,
    discount: 0,
    tax: 61.2,
    shipping: 0,
    total: 781.2,
    items: [
      {
        id: "prod-12",
        name: "Architectural Sculpted Leather Tote",
        size: "One Size",
        color: "Black Chrome",
        price: 720,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  {
    id: "NOC-8485",
    customer: {
      name: "Lucas Moreau",
      email: "lucas.moreau@bruxelles.be",
      phone: "+32 2 543 9012",
      address: "Avenue Louise 240",
      city: "Brussels",
      country: "Belgium"
    },
    date: "2026-10-22T08:30:00Z",
    status: "Processing",
    paymentMethod: "Credit Card (Visa •••• 9102)",
    subtotal: 380,
    discount: 57.0,
    tax: 27.46,
    shipping: 0,
    total: 350.46,
    items: [
      {
        id: "prod-4",
        name: "Brushed Mohair Funnel Neck",
        size: "M",
        color: "Heather Grey",
        price: 380,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  }
];

export const DEFAULT_SETTINGS = {
  storeName: "NOCTURNE ATELIER",
  tagline: "Architecture for the Modern Silhouette.",
  supportEmail: "concierge@nocturneatelier.com",
  promoBannerText: "COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER $250 — CODE: NOCTURNE15",
  promoBannerEnabled: true,
  currencySymbol: "$",
  taxRate: 8.5, // 8.5%
  flatShippingFee: 25,
  freeShippingThreshold: 250,
  adminUsername: "admin",
  maintenanceMode: false
};

export const INITIAL_ACTIVITY_LOG = [
  { id: "act-1", text: "New Order #NOC-8492 placed by Elena Rostova ($1,245.04)", time: "10 mins ago", type: "order" },
  { id: "act-2", text: "Stock updated: Sculpted Structured Wool Blazer low stock (4 remaining)", time: "2 hours ago", type: "stock" },
  { id: "act-3", text: "Order #NOC-8491 marked as Shipped (Marcus Sterling)", time: "4 hours ago", type: "order" },
  { id: "act-4", text: "Store settings updated: Free Shipping threshold set to $250", time: "Yesterday", type: "settings" },
  { id: "act-5", text: "Autumn / Winter Archive catalog refreshed with 12 new items", time: "2 days ago", type: "product" }
];

export const PRESET_IMAGES = [
  {
    label: "Trench / Coat",
    url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Tailored Blazer",
    url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Cashmere Knit",
    url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Draped Trousers",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Streetwear Hoodie",
    url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Minimal Tote Bag",
    url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Leather Jacket",
    url: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80"
  },
  {
    label: "Editorial Portrait",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80"
  }
];
