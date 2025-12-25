
import { BlogPost, Deal, Destination, GearProduct, SiteSettings } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "Alexara",
  logo: "",
  primaryColor: "#0f245a",
  secondaryColor: "#1aaaba",
  accentColor: "#f59e0b",
  fontFamily: "Open Sans",
  heroTitle: "Experience the World Like Never Before",
  heroSubtitle: "Curated journeys, exclusive deals, and the gear you need for your next adventure.",
  metaTitle: "Alexara | Discover the World Through Curated Experiences",
  metaDescription: "Discover hidden destinations, exclusive flight deals, and essential travel gear curated for the modern explorer. Experience the best of global travel with Alexara.",
  metaKeywords: "travel, luxury travel, budget travel, destinations, flight deals",
  searchVisibility: true,
  ads: {
    enabled: true,
    headerBanner: "",
    sidebarBanner: ""
  },
  socialMedia: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "YouTube", url: "https://youtube.com" }
  ],
  contact: {
    address: "123 Adventure Ave, Suite 400\nNew York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "hello@alexara.com"
  },
  adminEmail: "admin@alexara.com",
  adminPassword: "123"
};

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Hidden Beaches in Thailand",
    excerpt: "Discover the untouched paradises that tourists often miss. From Krabi to Koh Lipe, here are our top picks.",
    content: "Thailand is famous for its beaches, but some of the best ones are hidden away. \nKoh Kood is a peaceful island in the eastern Gulf of Thailand, near the Cambodian border. It's often overlooked by travelers heading to the more famous Koh Chang, but those who make the journey are rewarded with crystal-clear waters and white sands. \nAnother gem is Railay Beach in Krabi, accessible only by boat due to the high limestone cliffs cutting off mainland access.",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1439&q=80",
    author: "Sarah Jenkins",
    date: "Oct 12, 2023",
    tags: ["Thailand", "Beaches", "Travel Guide"]
  },
  {
    id: "2",
    title: "How to Travel Europe on a Budget",
    excerpt: "Backpacking through Europe doesn't have to break the bank. Learn the secrets of rail passes and hostels.",
    content: "Europe can be expensive, but with the right planning, you can see it all for less. \nConsider traveling in the shoulder seasons (spring and fall) when prices for accommodation and flights drop significantly. \nUse the Eurail pass if you plan on visiting multiple countries, and look for hostels that offer free breakfast or communal kitchens to save on food costs.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1470&q=80",
    author: "Mike Ross",
    date: "Sep 28, 2023",
    tags: ["Europe", "Budget", "Tips"]
  },
  {
    id: "3",
    title: "The Ultimate Packing List for 2024",
    excerpt: "Don't forget the essentials. We've compiled the definitive checklist for international travel.",
    content: "Packing is an art. Here is exactly what you need to bring for a 2 week trip. \nStart with a high-quality carry-on. Many airlines are becoming stricter with weight limits, so choose a lightweight shell. \nPacking cubes are your best friend for organization. Don't forget a universal travel adapter and a portable power bank, especially if you're navigating using your phone all day.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1470&q=80",
    author: "Alex Chen",
    date: "Nov 05, 2023",
    tags: ["Gear", "Tips", "Preparation"]
  }
];

export const MOCK_DEALS: Deal[] = [
  {
    id: "d1",
    title: "Luxury Escape to Oia Heights",
    location: "Greece",
    city: "Santorini",
    categories: ["Resort", "Hotel"],
    price: 1299,
    originalPrice: 1800,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    affiliateLink: "https://www.agoda.com"
  },
  {
    id: "d2",
    title: "Kyoto Bamboo Grove Ryokan",
    location: "Japan",
    city: "Kyoto",
    categories: ["Hotel", "Activity"],
    price: 1550,
    originalPrice: 2100,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    duration: "7 Days / 6 Nights",
    affiliateLink: "https://www.travelpayouts.com"
  },
  {
    id: "d3",
    title: "Berlin Central Backpackers",
    location: "Germany",
    city: "Berlin",
    categories: ["Hostel", "Activity"],
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1555854817-40e098ee7f55?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    duration: "Per Night",
    affiliateLink: "https://www.hostelworld.com"
  },
  {
    id: "d4",
    title: "Tulum Beachfront Dining Experience",
    location: "Mexico",
    city: "Tulum",
    categories: ["Restaurant", "Beach"],
    price: 145,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    duration: "Full Evening",
    affiliateLink: "https://www.opentable.com"
  },
  {
    id: "d5",
    title: "Ibiza Summer Beats Club Pass",
    location: "Spain",
    city: "Ibiza",
    categories: ["Nightclub", "Ticket"],
    price: 75,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1514525253361-bee8718a300c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    duration: "1 Night Entry",
    affiliateLink: "https://www.ticketmaster.com"
  },
  {
    id: "d6",
    title: "Amalfi Coast Hidden Beach Tour",
    location: "Italy",
    city: "Positano",
    categories: ["Beach", "Activity", "Ticket"],
    price: 320,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    duration: "8 Hours",
    affiliateLink: "https://www.viator.com"
  }
];

export const MOCK_DESTINATIONS: Destination[] = [
  { id: "dest1", name: "Italy", continent: "Europe", description: "Experience the history, world-renowned cuisine, and breathtaking Amalfi Coast architecture.", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80" },
  { id: "dest2", name: "Japan", continent: "Asia", description: "A perfect harmony of ancient tradition and futuristic innovation.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" },
  { id: "dest3", name: "Australia", continent: "Oceania", description: "Vibrant city life meets the wild outback and the Great Barrier Reef.", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80" },
  { id: "dest4", name: "Morocco", continent: "Africa", description: "Wander through colorful souks and sleep under the stars in the Sahara desert.", image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80" },
];

export const MOCK_GEAR: GearProduct[] = [
  { id: "g1", name: "Nomad Carry-On Pro", description: "Ultra-lightweight polycarbonate shell with 360 wheels.", price: 245, image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80", category: "Luggage", affiliateLink: "https://www.amazon.com" },
  { id: "g2", name: "Universal Travel Adapter", description: "Works in 150+ countries with 4 USB ports.", price: 25, image: "https://images.unsplash.com/photo-1563968743333-044cef800494?auto=format&fit=crop&w=800&q=80", category: "Accessories", affiliateLink: "https://www.amazon.com" }
];
