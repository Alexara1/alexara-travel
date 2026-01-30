
import { BlogPost, Deal, Destination, GearProduct, SiteSettings, SupportedLanguage } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "Alexara",
  logo: "",
  primaryColor: "#0f245a",
  secondaryColor: "#1aaaba",
  accentColor: "#f59e0b",
  fontFamily: "Open Sans",
  language: "EN",
  heroTitle: "Experience the World Like Never Before",
  heroSubtitle: "Curated journeys, exclusive deals, and the gear you need for your next adventure.",
  metaTitle: "Alexara | Discover the World Through Curated Experiences",
  metaDescription: "Discover hidden destinations, exclusive flight deals, and essential travel gear curated for the modern explorer. Experience the best of global travel with Alexara.",
  metaKeywords: "travel, luxury travel, budget travel, destinations, flight deals",
  searchVisibility: true,
  robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\n\nSitemap: https://alexara-travel.example.com/sitemap.xml",
  customScripts: "<!-- Add JSON-LD or Analytics scripts here -->",
  blogCategories: ["Travel Guides", "Hotel Reviews", "Travel Tips", "Flight Deals", "Destinations"],
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
    email: "contact@alexaratravel.com"
  },
  adminEmail: "admin@alexara.com",
  adminPassword: "123"
};

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "hidden-gems-of-the-amalfi-coast",
    title: "Hidden Gems of the Amalfi Coast",
    excerpt: "Beyond Positano and Amalfi lie secret coves and quiet villages that offer a true taste of Italian coastal life.",
    content: "The Amalfi Coast is legendary, but most tourists only see the surface. To truly experience the region, you must head to villages like Atrani, the smallest town in Italy, or hike the Path of the Gods for views that defy description.\n\nIn this guide, we explore the lesser-known restaurants where nonnas still hand-roll pasta and the quiet beaches accessible only by boat.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    author: "Elena Rossi",
    date: "Oct 12, 2023",
    tags: ["Travel Guides", "Destinations"]
  },
  {
    id: "2",
    slug: "minimalist-travel-packing-guide",
    title: "The Art of Minimalist Travel",
    excerpt: "How to pack for a two-week journey in a single carry-on without sacrificing style or utility.",
    content: "Packing light is a superpower. It gives you mobility, saves money on baggage fees, and reduces stress. The key is a capsule wardrobe: pieces that all work together.\n\nInvest in high-quality merino wool, use packing cubes religiously, and remember—you can almost always do laundry at your destination.",
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=800&q=80",
    author: "Marcus Vane",
    date: "Nov 05, 2023",
    tags: ["Travel Tips"]
  },
  {
    id: "3",
    slug: "tokyo-nightlife-synthesis",
    title: "Tokyo After Dark: A Synthesis",
    excerpt: "From the neon lights of Shinjuku to the quiet jazz bars of Shimokitazawa, Tokyo's nightlife is a world of its own.",
    content: "When the sun goes down, Tokyo transforms. Golden Gai offers a glimpse into the past with its tiny themed bars, while Shibuya's clubs provide a high-energy dance experience.\n\nDon't miss the hidden vinyl bars where the acoustics are as important as the drinks.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    author: "Julianna Mori",
    date: "Dec 20, 2023",
    tags: ["Destinations", "Travel Guides"]
  }
];

export const MOCK_DEALS: Deal[] = [
  {
    id: "d1",
    title: "Luxury Retreat in Santorini",
    location: "Greece",
    city: "Oia",
    categories: ["Hotel", "Resort"],
    price: 450,
    originalPrice: 850,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    duration: "5 Nights",
    affiliateLink: "https://booking.com"
  },
  {
    id: "d2",
    title: "Kyoto Temple Stay Experience",
    location: "Japan",
    city: "Kyoto",
    categories: ["Activity", "Package"],
    price: 220,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    duration: "3 Days",
    affiliateLink: "https://klook.com"
  },
  {
    id: "d3",
    title: "Parisian Rooftop Dining",
    location: "France",
    city: "Paris",
    categories: ["Restaurant"],
    price: 120,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    duration: "Evening",
    affiliateLink: "https://opentable.com"
  }
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest1",
    name: "Japan",
    continent: "Asia",
    description: "A perfect blend of ancient traditions and futuristic technology, from the cherry blossoms of Kyoto to the neon streets of Tokyo.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest2",
    name: "Greece",
    continent: "Europe",
    description: "Cradle of Western civilization, featuring crystal-clear waters, white-washed buildings, and thousands of years of history.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest3",
    name: "France",
    continent: "Europe",
    description: "A global hub of art, fashion, gastronomy, and culture, with diverse landscapes from the Alps to the French Riviera.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest4",
    name: "Iceland",
    continent: "Europe",
    description: "A land of dramatic landscapes with volcanoes, geysers, hot springs, and lava fields, perfectly framed by massive glaciers.",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOCK_GEAR: GearProduct[] = [
  {
    id: "g1",
    name: "Noise-Cancelling Headphones",
    description: "Industry-leading silence for long-haul flights and busy terminals.",
    price: 349,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    category: "Electronics",
    affiliateLink: "https://amazon.com"
  },
  {
    id: "g2",
    name: "Minimalist Carry-On",
    description: "Ultra-durable polycarbonate shell with built-in compression system.",
    price: 275,
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=400&q=80",
    category: "Luggage",
    affiliateLink: "https://awaytravel.com"
  },
  {
    id: "g3",
    name: "Global Travel Adapter",
    description: "Compact all-in-one plug for over 150 countries with 4 USB ports.",
    price: 35,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=400&q=80",
    category: "Accessories",
    affiliateLink: "https://amazon.com"
  }
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    nav_home: "Home", nav_planner: "AI Planner", nav_destinations: "Destinations", nav_deals: "Deals", nav_blog: "Blog", nav_gear: "Gear", nav_about: "About", nav_contact: "Contact", btn_book: "Book Now",
    hero_badge: "Architecting the Future of Travel", hero_title_1: "Explore the", hero_title_2: "Uncharted.", search_placeholder: "Where shall we fly you to?", search_btn: "Begin Synthesis",
    home_innovation_badge: "Next-Generation Travel Intelligence", home_innovation_title_1: "Architecture for", home_innovation_title_2: "Modern Explorers.", home_innovation_desc: "Beyond simple booking. We utilize advanced grounding models to synthesize millions of data points.",
    home_trending_title: "Trending Destinations", home_exclusive_title: "Exclusive Collections", home_reviews_title: "Voices of the Modern Explorer", home_reviews_subtitle: "Real experiences from our global collective of travelers.", 
    review_1_text: "The AI Planner synthesized a 10-day trip to Japan that felt like it was curated by a local historian. Absolutely flawless execution.", review_1_author: "Julianna M.", review_1_loc: "San Francisco, USA",
    review_2_text: "I found a deal for the Amalfi Coast that was 40% cheaper than other platforms. Alexara is now my primary travel resource.", review_2_author: "Marcus V.", review_2_loc: "Berlin, Germany",
    review_3_text: "Modern, fast, and incredibly intuitive. The interface itself makes me want to book my next flight right now.", review_3_author: "Elena R.", review_3_loc: "Madrid, Spain",
    footer_desc: "Inspiring wanderlust and connecting you with the world's most breathtaking destinations.",
    footer_quick_links: "Quick Links", footer_contact: "Contact Us", footer_newsletter: "Newsletter", footer_subscribe: "Subscribe",
    footer_legal: "Legal & Trust", footer_privacy: "Privacy Policy", footer_terms: "Terms of Service", footer_disclaimer: "Affiliate Disclosure",
    dest_title: "Explore Destinations", dest_subtitle: "From bustling cities to serene beaches, find your perfect backdrop.", dest_featured_title: "France", dest_featured_desc: "The world's most visited country, offering art, history, and the Riviera.", dest_find_deals: "Find Deals in",
    gear_title: "Essential Gear", gear_subtitle: "Travel smarter and lighter with our curated tech and accessories.", gear_check_price: "Check Price", gear_no_results: "No gear found.",
    blog_title: "The Alexara Journal", blog_subtitle: "Stories, guides, and inspiration for the modern traveler.", blog_read_full: "Read Full Story", blog_read_more: "Read More",
    contact_title: "Get in Touch", contact_info_title: "Contact Information", form_first_name: "First Name", form_last_name: "Last Name", form_email: "Email Address", form_subject: "Subject", form_message: "Message", form_submit: "Send Message",
    about_mission_title: "Our Mission", about_who_we_are: "Who We Are", about_team: "Meet the Visionaries",
    about_feature_1: "Premium Curation", about_feature_2: "Neural Planning", about_feature_3: "Global Support",
    cat_hotel: "Hotel", cat_hostel: "Hostel", cat_restaurant: "Restaurant", cat_nightclub: "Nightclub", cat_beach: "Beach", cat_resort: "Resort", cat_activity: "Activity", cat_ticket: "Ticket", cat_package: "Package",
    Europe: "Europe", Asia: "Asia", Oceania: "Oceania", Africa: "Africa", Americas: "Americas"
  },
  ES: {
    nav_home: "Inicio", nav_planner: "Planificador AI", nav_destinations: "Destinos", nav_deals: "Ofertas", nav_blog: "Blog", nav_gear: "Equipo", nav_about: "Nosotros", nav_contact: "Contacto", btn_book: "Reservar",
    hero_badge: "Arquitectando el futuro de los viajes", hero_title_1: "Explora lo", hero_title_2: "Inexplorado.", search_placeholder: "¿A dónde te llevamos?", search_btn: "Iniciar Síntesis",
    home_innovation_badge: "Inteligencia de Viajes de Próxima Generación", home_innovation_title_1: "Arquitectura para", home_innovation_title_2: "Exploradores Modernos.", home_innovation_desc: "Más allá de una simple reserva. Utilizamos modelos avanzados para sintetizar millones de datos.",
    home_trending_title: "Destinos de Tendencia", home_exclusive_title: "Colecciones Exclusivas", home_reviews_title: "Voces del Explorador Moderno", home_reviews_subtitle: "Experiencias reales de nuestro colectivo global de viajeros.", 
    review_1_text: "El planificador de IA sintetizó un viaje de 10 día a Japón que parecía curado por un historiador local. Ejecución absolutamente impecable.", review_1_author: "Julianna M.", review_1_loc: "San Francisco, EE. UU.",
    review_2_text: "Encontré una oferta para la costa de Amalfi que era un 40% más barata que en otras plataformas. Alexara es ahora mi recurso principal.", review_2_author: "Marcus V.", review_2_loc: "Berlín, Alemania",
    review_3_text: "Moderno, rápido e increíblemente intuitivo. La propia interfaz me dan ganas de reservar mi próximo vuelo ahora mismo.", review_3_author: "Elena R.", review_3_loc: "Madrid, España",
    footer_desc: "Inspirando el deseo de viajar y conectándote con los destinos más impresionantes del mundo.",
    footer_quick_links: "Enlaces Rápidos", footer_contact: "Contáctenos", footer_newsletter: "Boletín", footer_subscribe: "Suscribirse",
    footer_legal: "Legal y Confianza", footer_privacy: "Política de Privacidad", footer_terms: "Términos de Servicio", footer_disclaimer: "Divulgación de Afiliados",
    dest_title: "Explorar Destinos", dest_subtitle: "Desde ciudades bulliciosas hasta playas serenas, encuentre su escenario perfecto.", dest_featured_title: "Francia", dest_featured_desc: "El país más visitado del mundo, que ofrece arte, historia y la Riviera.", dest_find_deals: "Ver ofertas en",
    gear_title: "Equipo Esencial", gear_subtitle: "Viaje de forma más inteligente y ligera con nuestra selección de tecnología.", gear_check_price: "Consultar Precio", gear_no_results: "No se encontró equipo.",
    blog_title: "El Diario Alexara", blog_subtitle: "Historias, guías e inspiración para el viajero moderno.", blog_read_full: "Leer historia completa", blog_read_more: "Leer más",
    contact_title: "Ponerse en Contacto", contact_info_title: "Información de Contacto", form_first_name: "Nombre", form_last_name: "Apellido", form_email: "Correo Electrónico", form_subject: "Asunto", form_message: "Mensaje", form_submit: "Enviar Mensaje",
    about_mission_title: "Nuestra Misión", about_who_we_are: "Quiénes Somos", about_team: "Conozca a los Visionarios",
    about_feature_1: "Curaduría Premium", about_feature_2: "Planificación Neuronal", about_feature_3: "Soporte Global",
    cat_hotel: "Hotel", cat_hostel: "Hostal", cat_restaurant: "Restaurante", cat_nightclub: "Club Nocturno", cat_beach: "Playa", cat_resort: "Resort", cat_activity: "Actividad", cat_ticket: "Boleto", cat_package: "Paquete",
    Europe: "Europa", Asia: "Asia", Oceania: "Oceanía", Africa: "África", Americas: "Américas"
  },
  FR: {
    nav_home: "Accueil", nav_planner: "Planificateur IA", nav_destinations: "Destinations", nav_deals: "Offres", nav_blog: "Blog", nav_gear: "Équipement", nav_about: "À propos", nav_contact: "Contact", btn_book: "Réserver",
    hero_badge: "Architecturer le futur du voyage", hero_title_1: "Explorez l'", hero_title_2: "Inconnu.", search_placeholder: "Où devrions-nous vous emmener ?", search_btn: "Commencer la synthèse",
    home_innovation_badge: "Intelligence de Voyage de Nouvelle Génération", home_innovation_title_1: "Architecture pour", home_innovation_title_2: "Explorateurs Modernos.", home_innovation_desc: "Bien plus qu'une simple réservation. Nous utilisons des modèles avancés pour synthétiser des millions de données.",
    home_trending_title: "Destinations Tendances", home_exclusive_title: "Collections Exclusives", home_reviews_title: "Voix de l'explorateur moderne", home_reviews_subtitle: "Expériences réelles de notre collectif mondial de voyageurs.", 
    review_1_text: "Le planificateur IA a synthétisé un voyage de 10 jours au Japon qui semblait avoir été organisé par un historien local. Exécution absolument parfaite.", review_1_author: "Julianna M.", review_1_loc: "San Francisco, USA",
    review_2_text: "J'ai trouvé une offre pour la côte amalfitaine qui était 40 % moins chère que sur d'autres plateformes. Alexara est désormais ma ressource de voyage principale.", review_2_author: "Marcus V.", review_2_loc: "Berlin, Allemagne",
    review_3_text: "Moderne, rapide et incroyablement intuitif. L'interface elle-même me donne envie de réserver mon prochain vol dès maintenant.", review_3_author: "Elena R.", review_3_loc: "Madrid, Espagne",
    footer_desc: "Inspirer l'envie de voyager et vous connecter aux destinations les plus époustouflantes du monde.",
    footer_quick_links: "Liens Rapides", footer_contact: "Contactez-nous", footer_newsletter: "Newsletter", footer_subscribe: "S'abonner",
    footer_legal: "Juridique et Confiance", footer_privacy: "Politique de Confidentialité", footer_terms: "Conditions d'Utilisation", footer_disclaimer: "Divulgation d'Affiliation",
    dest_title: "Explorer les Destinations", dest_subtitle: "Des villes animées aux plages sereines, trouvez votre décor idéal.", dest_featured_title: "France", dest_featured_desc: "Le pays le plus visité au monde, offrant art, histoire et la Riviera.", dest_find_deals: "Trouver des offres en",
    gear_title: "Équipement Essentiel", gear_subtitle: "Voyagez plus intelligemment et plus léger avec notre technologie.", gear_check_price: "Vérifier le Prix", gear_no_results: "Aucun équipement trouvé.",
    blog_title: "Le Journal Alexara", blog_subtitle: "Histoires, guides et inspiration pour le voyageur moderne.", blog_read_full: "Lire l'histoire complète", blog_read_more: "Lire la suite",
    contact_title: "Contactez-nous", contact_info_title: "Informations de Contact", form_first_name: "Prénom", form_last_name: "Nom", form_email: "Adresse E-mail", form_subject: "Sujet", form_message: "Message", form_submit: "Envoyer le Message",
    about_mission_title: "Notre Mission", about_who_we_are: "Qui sommes-nous", about_team: "Rencontrez les Visionnaires",
    about_feature_1: "Curation Premium", about_feature_2: "Planificación Neurale", about_feature_3: "Support Mondial",
    cat_hotel: "Hôtel", cat_hostel: "Auberge", cat_restaurant: "Restaurant", cat_nightclub: "Boîte de Nuit", cat_beach: "Plage", cat_resort: "Complexe", cat_activity: "Activité", cat_ticket: "Billet", cat_package: "Forfait",
    Europe: "Europe", Asia: "Asie", Oceania: "Océanie", Africa: "Afrique", Americas: "Amériques"
  },
  DE: {
    nav_home: "Startseite", nav_planner: "KI-Planer", nav_destinations: "Ziele", nav_deals: "Angebote", nav_blog: "Blog", nav_gear: "Ausrüstung", nav_about: "Über uns", nav_contact: "Kontakt", btn_book: "Buchen",
    hero_badge: "Die Zukunft des Reisens gestalten", hero_title_1: "Entdecke das", hero_title_2: "Unbekannte.", search_placeholder: "Wohin sollen wir Sie fliegen?", search_btn: "Synthese starten",
    home_innovation_badge: "Reiseintelligenz der nächsten Generation", home_innovation_title_1: "Architektur für", home_innovation_title_2: "Moderne Entdecker.", home_innovation_desc: "Über einfaches Buchen hinaus. Wir nutzen fortschrittliche Modelle, um Millionen von Datenpunkten zu synthetisieren.",
    home_trending_title: "Trendziele", home_exclusive_title: "Exklusive Kollektionen", home_reviews_title: "Stimmen des modernen Entdeckers", home_reviews_subtitle: "Echte Erfahrungen aus unserem globalen Kollektiv von Reisenden.", 
    review_1_text: "Der KI-Planer hat eine 10-tägige Japan-Reise entworfen, die sich anfühlte, als wäre sie von einem lokalen Historiker kuratiert worden. Absolut makellose Ausführung.", review_1_author: "Julianna M.", review_1_loc: "San Francisco, USA",
    review_2_text: "Ich habe ein Angebot für die Amalfiküste gefunden, das 40 % günstiger war als auf anderen Plattformen. Alexara ist jetzt meine primäre Reiseressource.", review_2_author: "Marcus V.", review_2_loc: "Berlin, Deutschland",
    review_3_text: "Modern, schnell und unglaublich intuitiv. Schon das Interface macht Lust darauf, sofort den nächsten Flug zu buchen.", review_3_author: "Elena R.", review_3_loc: "Madrid, Spanien",
    footer_desc: "Fernweh wecken und Sie mit den atemberaubendsten Zielen der Welt verbinden.",
    footer_quick_links: "Schnellzugriff", footer_contact: "Kontaktieren Sie uns", footer_newsletter: "Newsletter", footer_subscribe: "Abonnieren",
    footer_legal: "Rechtliches & Vertrauen", footer_privacy: "Datenschutzrichtlinie", footer_terms: "Nutzungsbedingungen", footer_disclaimer: "Affiliate-Offenlegung",
    dest_title: "Ziele Erkunden", dest_subtitle: "Von belebten Städten bis hin zu ruhigen Stränden – finden Sie Ihre perfekte Kulisse.", dest_featured_title: "Frankreich", dest_featured_desc: "Das meistbesuchte Land der Welt mit Kunst, Geschichte und der Riviera.", dest_find_deals: "Angebote finden in",
    gear_title: "Grundausrüstung", gear_subtitle: "Reisen Sie smarter und leichter mit unserer kuratierten Technik.", gear_check_price: "Preis Prüfen", gear_no_results: "Keine Ausrüstung gefunden.",
    blog_title: "Das Alexara Journal", blog_subtitle: "Geschichten, Leitfäden und Inspiration für den modernen Reisenden.", blog_read_full: "Ganze Geschichte lesen", blog_read_more: "Mehr lesen",
    contact_title: "Kontakt Aufnehmen", contact_info_title: "Kontaktinformationen", form_first_name: "Vorname", form_last_name: "Nachname", form_email: "E-Mail-Adresse", form_subject: "Betreff", form_message: "Nachricht", form_submit: "Nachricht senden",
    about_mission_title: "Unsere Mission", about_who_we_are: "Wer wir sind", about_team: "Treffen Sie die Visionäre",
    about_feature_1: "Premium Kuratierung", about_feature_2: "Neuronale Planung", about_feature_3: "Globaler Support",
    cat_hotel: "Hotel", cat_hostel: "Hostel", cat_restaurant: "Restaurant", cat_nightclub: "Nachtclub", cat_beach: "Strand", cat_resort: "Resort", cat_activity: "Aktivität", cat_ticket: "Ticket", cat_package: "Paket",
    Europe: "Europa", Asia: "Asien", Oceania: "Ozeanien", Africa: "Afrika", Americas: "Amerika"
  },
  JP: {
    nav_home: "ホーム", nav_planner: "AIプランナー", nav_destinations: "目的地", nav_deals: "お得な情報", nav_blog: "ブログ", nav_gear: "ギア", nav_about: "会社概要", nav_contact: "お問い合わせ", btn_book: "今すぐ予約",
    hero_badge: "旅行の未来を設計する", hero_title_1: "まだ見ぬ", hero_title_2: "世界へ。", search_placeholder: "どこへ飛びたいですか？", search_btn: "合成を開始する",
    home_innovation_badge: "次世代の旅行インテリジェンス", home_innovation_title_1: "現代の探検家のための", home_innovation_title_2: "設計図。", home_innovation_desc: "単なる予約を超えて。高度なモデルを使用して、数百万のデータポイントを統合します。",
    home_trending_title: "注目の目的地", home_exclusive_title: "独占コレクション", home_reviews_title: "現代の探検家の声", home_reviews_subtitle: "世界中の旅行者からの実際の体験談。", 
    review_1_text: "AIプランナーが作成した10日間の日本旅行は、地元の歴史家が監修したかのような内容でした。完璧な出来栄えです。", review_1_author: "Julianna M.", review_1_loc: "サンフランシスコ、アメリカ",
    review_2_text: "アマルフィ海岸のプランを他のプラットフォームより40%も安く見つけられました。今ではAlexaraが私のメインの旅行ツールです。", review_2_author: "Marcus V.", review_2_loc: "ベルリン、ドイツ",
    review_3_text: "モダンで速く、信じられないほど直感的です。インターフェースを見ているだけで、次のフライトを予約したくなります。", review_3_author: "Elena R.", review_3_loc: "マドリード、スペイン",
    footer_desc: "旅心を刺激し、世界で最も息をのむような目的地とあなたを繋ぎます。",
    footer_quick_links: "クイックリンク", footer_contact: "お問い合わせ", footer_newsletter: "ニュースレター", footer_subscribe: "購読する",
    footer_legal: "法的情報と信頼", footer_privacy: "プライバシーポリシー", footer_terms: "利用規約", footer_disclaimer: "アフィリエイトに関する開示",
    dest_title: "目的地を探す", dest_subtitle: "賑やかな街から静かなビーチまで、あなたにぴったりの場所を見つけてください。", dest_featured_title: "フランス", dest_featured_desc: "世界で最も訪問者の多い国。芸術、歴史、そしてリビエラが楽しめます。", dest_find_deals: "のお得な情報を探す",
    gear_title: "必須ギア", gear_subtitle: "厳選されたテックとアクセサリーで、よりスマートに、より軽く旅をしましょう。", gear_check_price: "価格を確認", gear_no_results: "ギアが見つかりませんでした。",
    blog_title: "アレクサラ・ジャーナル", blog_subtitle: "現代の旅行者のためのストーリー、ガイド、 corridors してインスピレーション。", blog_read_full: "記事全文を読む", blog_read_more: "続きを読む",
    contact_title: "お問い合わせ", contact_info_title: "連絡先情報", form_first_name: "名", form_last_name: "姓", form_email: "メールアドレス", form_subject: "件名", form_message: "メッセージ", form_submit: "メッセージを送信",
    about_mission_title: "私たちの使命", about_who_we_are: "私たちについて", about_team: "ビジョナリーに会う",
    about_feature_1: "プレミアム・キュレーション", about_feature_2: "ニューラル・プランニング", about_feature_3: "グローバル・サポート",
    cat_hotel: "ホテル", cat_hostel: "ホステル", cat_restaurant: "レストラン", cat_nightclub: "ナイトクラブ", cat_beach: "ビーチ", cat_resort: "リゾート", cat_activity: "アクティビティ", cat_ticket: "チケット", cat_package: "パッケージ",
    Europe: "ヨーロッパ", Asia: "アジア", Oceania: "オセアニア", Africa: "アフリカ", Americas: "アメリカ"
  },
  RU: {
    nav_home: "Главная", nav_planner: "ИИ-Планировщик", nav_destinations: "Направления", nav_deals: "Предложения", nav_blog: "Блог", nav_gear: "Снаряжение", nav_about: "О нас", nav_contact: "Контакты", btn_book: "Забронировать",
    hero_badge: "Проектируем будущее путешествий", hero_title_1: "Исследуй", hero_title_2: "Неизведанное.", search_placeholder: "Куда полетим сегодня?", search_btn: "Начать синтез",
    home_innovation_badge: "Интеллект для путешествий нового поколения", home_innovation_title_1: "Архитектура для", home_innovation_title_2: "Modern Explorers.", home_innovation_desc: "Beyond simple booking. We utilize advanced grounding models to synthesize millions of data points.",
    home_trending_title: "Trending Destinations", home_exclusive_title: "Exclusive Collections", home_reviews_title: "Voices of the Modern Explorer", home_reviews_subtitle: "Real experiences from our global collective of travelers.", 
    review_1_text: "The AI Planner synthesized a 10-day trip to Japan that felt like it was curated by a local historian. Absolutely flawless execution.", review_1_author: "Julianna M.", review_1_loc: "San Francisco, USA",
    review_2_text: "I found a deal for the Amalfi Coast that was 40% cheaper than other platforms. Alexara is now my primary travel resource.", review_2_author: "Marcus V.", review_2_loc: "Berlin, Germany",
    review_3_text: "Modern, fast, and incredibly intuitive. The interface itself makes me want to book my next flight right now.", review_3_author: "Elena R.", review_3_loc: "Madrid, Spain",
    footer_desc: "Inspiring wanderlust and connecting you with the world's most breathtaking destinations.",
    footer_quick_links: "Quick Links", footer_contact: "Contact Us", footer_newsletter: "Newsletter", footer_subscribe: "Subscribe",
    footer_legal: "Legal & Trust", footer_privacy: "Privacy Policy", footer_terms: "Terms of Service", footer_disclaimer: "Affiliate Disclosure",
    dest_title: "Explore Destinations", dest_subtitle: "From bustling cities to serene beaches, find your perfect backdrop.", dest_featured_title: "France", dest_featured_desc: "The world's most visited country, offering art, history, and the Riviera.", dest_find_deals: "Find Deals in",
    gear_title: "Essential Gear", gear_subtitle: "Travel smarter and lighter with our curated tech and accessories.", gear_check_price: "Check Price", gear_no_results: "No gear found.",
    blog_title: "The Alexara Journal", blog_subtitle: "Stories, guides, and inspiration for the modern traveler.", blog_read_full: "Read Full Story", blog_read_more: "Read More",
    contact_title: "Get in Touch", contact_info_title: "Contact Information", form_first_name: "First Name", form_last_name: "Last Name", form_email: "Email Address", form_subject: "Subject", form_message: "Message", form_submit: "Send Message",
    about_mission_title: "Our Mission", about_who_we_are: "Who We Are", about_team: "Meet the Visionaries",
    about_feature_1: "Premium Curation", about_feature_2: "Neural Planning", about_feature_3: "Global Support",
    cat_hotel: "Hotel", cat_hostel: "Hostel", cat_restaurant: "Restaurant", cat_nightclub: "Nightclub", cat_beach: "Beach", cat_resort: "Resort", cat_activity: "Activity", cat_ticket: "Ticket", cat_package: "Package",
    Europe: "Europe", Asia: "Asia", Oceania: "Oceania", Africa: "Africa", Americas: "Americas"
  },
  ZH: {
    nav_home: "首页", nav_planner: "AI规划师", nav_destinations: "目的地", nav_deals: "特价优惠", nav_blog: "博客", nav_gear: "旅行装备", nav_about: "关于我们", nav_contact: "联系我们", btn_book: "立即预订",
    hero_badge: "勾勒未来旅行图景", hero_title_1: "探索", hero_title_2: "未知的世界。", search_placeholder: "你想飞往哪里？", search_btn: "开始规划",
    home_innovation_badge: "新一代旅行智能", home_innovation_title_1: "专为", home_innovation_title_2: "现代探险家打造。", home_innovation_desc: "超越简单的预订。我们利用先进的模型整合数百万个数据点。",
    home_trending_title: "热门目的地", home_exclusive_title: "独家收藏", home_reviews_title: "现代探险家的心声", home_reviews_subtitle: "来自我们全球旅行者群体的真实体验。", 
    review_1_text: "AI规划师为我制定的10天日本行程就像是当地历史学家精心策划的一样。执行非常完美。", review_1_author: "Julianna M.", review_1_loc: "美国旧金山",
    review_2_text: "我在Alexara上找到了比其他平台便宜40%的阿马尔菲海岸优惠。它现在是我的首选旅行资源。", review_2_author: "Marcus V.", review_2_loc: "德国柏林",
    review_3_text: "现代、快捷且极其直观。界面设计让我忍不住想现在就预订下一趟航班。", review_3_author: "Elena R.", review_3_loc: "西班牙马德里",
    footer_desc: "激发你的旅行欲望，带你领略世界上最令人惊叹的目的地。",
    footer_quick_links: "快速链接", footer_contact: "联系我们", footer_newsletter: "时事通讯", footer_subscribe: "订阅",
    footer_legal: "法律与信任", footer_privacy: "隐私政策", footer_terms: "服务条款", footer_disclaimer: "关联披露",
    dest_title: "探索目的地", dest_subtitle: "从繁华的都市到宁静的海滩，寻找你完美的背景。", dest_featured_title: "法国", dest_featured_desc: "世界上游客最多的国家，拥有艺术、历史和里维埃拉海滨。", dest_find_deals: "查找特价优惠：",
    gear_title: "必备装备", gear_subtitle: "使用我们精选的科技产品和配件，让旅行更智能、更轻便。", gear_check_price: "查看价格", gear_no_results: "未找到相关装备。",
    blog_title: "Alexara 日志", blog_subtitle: "为现代旅行者提供的故事、指南和灵感。", blog_read_full: "阅读完整故事", blog_read_more: "阅读更多",
    contact_title: "保持联系", contact_info_title: "联系信息", form_first_name: "名", form_last_name: "姓", form_email: "电子邮件地址", form_subject: "主题", form_message: "留言", form_submit: "发送消息",
    about_mission_title: "我们的使命", about_who_we_are: "关于我们", about_team: "认识我们的愿景家",
    about_feature_1: "优质策划", about_feature_2: "神经规划", about_feature_3: "全球支持",
    cat_hotel: "酒店", cat_hostel: "旅舍", cat_restaurant: "餐厅", cat_nightclub: "夜总会", cat_beach: "海滩", cat_resort: "度假村", cat_activity: "活动", cat_ticket: "门票", cat_package: "套餐",
    Europe: "欧洲", Asia: "亚洲", Oceania: "大洋洲", Africa: "非洲", Americas: "美洲"
  }
};
