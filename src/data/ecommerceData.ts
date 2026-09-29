export interface Product {
  id: string;
  name: string;
  category: 'audio' | 'living' | 'workspace' | 'apparel';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeType?: 'hot' | 'new' | 'sale';
  description: string;
  features: string[];
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  image: string;
  slug: 'all' | 'audio' | 'living' | 'workspace' | 'apparel';
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Audio & Acoustics',
    description: 'Precision engineering with studio-grade spatial clarity.',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    slug: 'audio',
  },
  {
    id: 'cat-2',
    name: 'Minimal Living',
    description: 'Consciously designed home artifacts for calmer spaces.',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    slug: 'living',
  },
  {
    id: 'cat-3',
    name: 'Workspace & Desk',
    description: 'Ergonomic tools tailored for focus and creative flow.',
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    slug: 'workspace',
  },
  {
    id: 'cat-4',
    name: 'Modern Apparel',
    description: 'Sustainable organic textiles cut with architectural lines.',
    itemCount: 32,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
    slug: 'apparel',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura Studio Wireless ANC Headphones',
    category: 'audio',
    categoryLabel: 'Audio & Acoustics',
    price: 249,
    originalPrice: 329,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    badgeType: 'hot',
    description: 'Active hybrid noise-cancelling headphones featuring 40mm beryllium drivers, 38-hour battery longevity, and memory foam lambskin pads.',
    features: ['Active Noise Cancellation', '38-hour playback', 'Bluetooth 5.3 Multipoint', 'Aircraft-grade aluminum'],
    stock: 14,
  },
  {
    id: 'prod-2',
    name: 'Nordic Walnut Desk Organizer Tray',
    category: 'workspace',
    categoryLabel: 'Workspace & Desk',
    price: 68,
    originalPrice: 85,
    rating: 4.8,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    badgeType: 'hot',
    description: 'Solid FSC-certified American walnut carved with dedicated magnetic channels for fountain pens, wireless earbuds, and daily EDC carry.',
    features: ['Solid FSC American Walnut', 'Magnetic alignment docks', 'Natural wax matte finish', 'Anti-scratch cork base'],
    stock: 22,
  },
  {
    id: 'prod-3',
    name: 'Sculptural Ceramic Carafe & Tumbler Set',
    category: 'living',
    categoryLabel: 'Minimal Living',
    price: 88,
    originalPrice: 110,
    rating: 4.7,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
    badge: '20% OFF',
    badgeType: 'sale',
    description: 'Hand-thrown stoneware carafe with two matching nesting tumblers. Finished in non-toxic matte speckled glaze with textured sand base.',
    features: ['Handcrafted stoneware', 'Dishwasher & microwave safe', '1.2 Liter capacity', 'Nesting compact profile'],
    stock: 9,
  },
  {
    id: 'prod-4',
    name: 'Merino Wool Architectural Cardigan',
    category: 'apparel',
    categoryLabel: 'Modern Apparel',
    price: 145,
    originalPrice: 175,
    rating: 4.9,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
    badge: 'New Arrival',
    badgeType: 'new',
    description: 'Spun from 100% extra-fine Australian Merino wool. Engineered with dropped shoulders, horn buttons, and breathable gauge knit.',
    features: ['100% Extra-fine Merino wool', 'Thermal adaptive warmth', 'Biodegradable bio-resin buttons', 'Seamless tubular knit'],
    stock: 18,
  },
  {
    id: 'prod-5',
    name: 'Horizon Matte Aluminum LED Task Light',
    category: 'workspace',
    categoryLabel: 'Workspace & Desk',
    price: 135,
    originalPrice: 160,
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    badge: 'Top Pick',
    badgeType: 'hot',
    description: 'Minimalist desktop luminaire with stepless 2700K-5000K circadian temperature adjustment, high CRI > 96, and gentle touch dimming.',
    features: ['CRI > 96 True-color gamut', 'Touch capacitive bar', 'Zero blue-light flicker', 'Rotatable 180° swing arm'],
    stock: 12,
  },
  {
    id: 'prod-6',
    name: 'Kanso Ambient Ultrasonic Diffuser',
    category: 'living',
    categoryLabel: 'Minimal Living',
    price: 74,
    originalPrice: 95,
    rating: 4.6,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    badge: 'Limited',
    badgeType: 'sale',
    description: 'Ceramic matte stone casing with whisper-quiet 2.4MHz ultrasonic misting. Features subtle amber glow nightlight and auto-shutoff safety.',
    features: ['Whisper-quiet (<20dB)', 'Real stone ceramic hood', 'Up to 10 hours continuous mist', 'Ambient warm glow'],
    stock: 7,
  },
  {
    id: 'prod-7',
    name: 'Acoustic Portable Bluetooth Speaker',
    category: 'audio',
    categoryLabel: 'Audio & Acoustics',
    price: 129,
    originalPrice: 159,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    badge: 'Staff Pick',
    badgeType: 'new',
    description: 'IP67 water-resistant cylindrical speaker wrapped in recycled wool knit. Dual passive radiators deliver 360-degree room-filling low end.',
    features: ['IP67 Waterproof & dustproof', '18-hour continuous battery', 'True Wireless Stereo pairing', 'Recycled Kvadrat textile'],
    stock: 25,
  },
  {
    id: 'prod-8',
    name: 'Heavyweight Supima Relaxed Overshirt',
    category: 'apparel',
    categoryLabel: 'Modern Apparel',
    price: 110,
    originalPrice: 130,
    rating: 4.7,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    badgeType: 'hot',
    description: 'Dense 280 GSM American Supima cotton twill. Garment dyed for a softly faded vintage patina and relaxed layering silhouette.',
    features: ['100% Supima long-staple cotton', 'Heavyweight 280 GSM twill', 'Chest patch pockets', 'Pre-shrunk finish'],
    stock: 15,
  },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    author: 'Elena Vance',
    role: 'Architect & Interior Designer',
    comment: 'The craftsmanship of the desk organizer and LED task light elevated my home studio. Clean lines, honest materials, and immaculate detailing.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Copenhagen, Denmark',
  },
  {
    id: 't-2',
    author: 'Marcus Sterling',
    role: 'Creative Director',
    comment: 'The Aura Studio headphones sound as pristine as they look. Seamless pairing, phenomenal noise isolation, and truly zero listener fatigue.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'London, UK',
  },
  {
    id: 't-3',
    author: 'Sora Takahashi',
    role: 'Industrial Designer',
    comment: 'Lumina represents what modern e-commerce should feel like: calm, purposeful products without sensory overload. Delivery to Tokyo arrived in 3 days.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    location: 'Tokyo, Japan',
  },
];

export const VALUE_PROPS = [
  {
    title: 'Complimentary Global Shipping',
    description: 'Carbon-neutral tracked transit on all orders over $75 with recycled protective packaging.',
    icon: 'Truck',
  },
  {
    title: '30-Day In-Home Trial',
    description: 'Experience items in your personal sanctuary. Seamless, hassle-free returns guaranteed.',
    icon: 'RotateCcw',
  },
  {
    title: 'Ethical & Certified Craft',
    description: 'Direct collaboration with verified artisans adhering to strict fair-trade standards.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Dedicated Concierge',
    description: 'Prompt human support around the clock via live chat, audio, or email inquiry.',
    icon: 'Headphones',
  },
];
