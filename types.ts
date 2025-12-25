
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  duration: string;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  video?: string;
  author: string;
  date: string;
  tags: string[];
}

export interface Deal {
  id: string;
  title: string;
  location: string; // This acts as Country
  city: string;
  categories: ('Hotel' | 'Hostel' | 'Restaurant' | 'Nightclub' | 'Beach' | 'Resort' | 'Activity' | 'Ticket' | 'Package')[];
  price: number;
  originalPrice: number;
  image: string;
  video?: string;
  rating: number;
  duration: string;
  affiliateLink: string;
}

export interface GearProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  video?: string;
  category: string;
  affiliateLink: string;
}

export interface Destination {
  id: string;
  name: string;
  continent: string;
  description: string;
  image: string;
  video?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: 'Open Sans' | 'Roboto' | 'Helvetica';
  heroTitle: string;
  heroSubtitle: string;
  // SEO & Social
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  searchVisibility?: boolean; // robots index/noindex
  // Monetization
  ads: {
    enabled: boolean;
    headerBanner?: string; 
    sidebarBanner?: string; 
  };
  // Social Media
  socialMedia: SocialLink[];
  // Contact Info
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  // Admin Auth
  adminEmail?: string;
  adminPassword?: string;
}

export interface SiteContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  // Blog
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;

  // Destinations
  destinations: Destination[];
  addDestination: (dest: Destination) => void;
  updateDestination: (id: string, dest: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  // Deals
  deals: Deal[];
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;

  // Gear
  gear: GearProduct[];
  addGear: (item: GearProduct) => void;
  updateGear: (id: string, item: Partial<GearProduct>) => void;
  deleteGear: (id: string) => void;

  // Messages
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;

  isAdminMode: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}
