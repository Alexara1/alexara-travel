
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

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    nav_home: "Home", nav_planner: "AI Planner", nav_destinations: "Destinations", nav_deals: "Deals", nav_blog: "Blog", nav_gear: "Gear", nav_about: "About", nav_contact: "Contact", btn_book: "Book Now",
    hero_badge: "Architecting the Future of Travel", hero_title_1: "Explore the", hero_title_2: "Uncharted.", search_placeholder: "Where shall we fly you to?", search_btn: "Begin Synthesis",
    home_innovation_badge: "Next-Generation Travel Intelligence", home_innovation_title_1: "Architecture for", home_innovation_title_2: "Modern Explorers.", home_innovation_desc: "Beyond simple booking. We utilize advanced grounding models to synthesize millions of data points.",
    home_trending_title: "Trending Destinations", home_exclusive_title: "Exclusive Collections", footer_desc: "Inspiring wanderlust and connecting you with the world's most breathtaking destinations.",
    footer_quick_links: "Quick Links", footer_contact: "Contact Us", footer_newsletter: "Newsletter", footer_subscribe: "Subscribe",
    footer_legal: "Legal & Trust", footer_privacy: "Privacy Policy", footer_terms: "Terms of Service", footer_disclaimer: "Affiliate Disclaimer",
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
    home_trending_title: "Destinos de Tendencia", home_exclusive_title: "Colecciones Exclusivas", footer_desc: "Inspirando el deseo de viajar y conectándote con los destinos más impresionantes del mundo.",
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
    home_trending_title: "Destinations Tendances", home_exclusive_title: "Collections Exclusives", footer_desc: "Inspirer l'envie de voyager et vous connecter aux destinations les plus époustouflantes du monde.",
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
    home_trending_title: "Trendziele", home_exclusive_title: "Exklusive Kollektionen", footer_desc: "Fernweh wecken und Sie mit den atemberaubendsten Zielen der Welt verbinden.",
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
    home_trending_title: "注目の目的地", home_exclusive_title: "独占コレクション", footer_desc: "旅心を刺激し、世界で最も息をのむような目的地とあなたを繋ぎます。",
    footer_quick_links: "クイックリンク", footer_contact: "お問い合わせ", footer_newsletter: "ニュースレター", footer_subscribe: "購読する",
    footer_legal: "法的情報と信頼", footer_privacy: "プライバシーポリシー", footer_terms: "利用規約", footer_disclaimer: "アフィリエイトに関する開示",
    dest_title: "目的地を探す", dest_subtitle: "賑やかな街から静かなビーチまで、あなたにぴったりの場所を見つけてください。", dest_featured_title: "フランス", dest_featured_desc: "世界で最も訪問者の多い国。芸術、歴史、そしてリビエラが楽しめます。", dest_find_deals: "のお得な情報を探す",
    gear_title: "必須ギア", gear_subtitle: "厳選されたテックとアクセサリーで、よりスマートに、より軽く旅をしましょう。", gear_check_price: "価格を確認", gear_no_results: "ギアが見つかりませんでした。",
    blog_title: "アレクサラ・ジャーナル", blog_subtitle: "現代の旅行者のためのストーリー、ガイド、そしてインスピレーション。", blog_read_full: "記事全文を読む", blog_read_more: "続きを読む",
    contact_title: "お問い合わせ", contact_info_title: "連絡先情報", form_first_name: "名", form_last_name: "姓", form_email: "メールアドレス", form_subject: "件名", form_message: "メッセージ", form_submit: "メッセージを送信",
    about_mission_title: "私たちの使命", about_who_we_are: "私たちについて", about_team: "ビジョナリーに会う",
    about_feature_1: "プレミアム・キュレーション", about_feature_2: "ニューラル・プランニング", about_feature_3: "グローバル・サポート",
    cat_hotel: "ホテル", cat_hostel: "ホステル", cat_restaurant: "レストラン", cat_nightclub: "ナイトクラブ", cat_beach: "ビーチ", cat_resort: "リゾート", cat_activity: "アクティビティ", cat_ticket: "チケット", cat_package: "パッケージ",
    Europe: "ヨーロッパ", Asia: "アジア", Oceania: "オセアニア", Africa: "アフリカ", Americas: "アメリカ"
  },
  RU: {
    nav_home: "Главная", nav_planner: "ИИ-Планировщик", nav_destinations: "Направления", nav_deals: "Предложения", nav_blog: "Блог", nav_gear: "Снаряжение", nav_about: "О нас", nav_contact: "Контакты", btn_book: "Забронировать",
    hero_badge: "Проектируем будущее путешествий", hero_title_1: "Исследуй", hero_title_2: "Неизведанное.", search_placeholder: "Куда полетим сегодня?", search_btn: "Начать синтез",
    home_innovation_badge: "Интеллект для путешествий нового поколения", home_innovation_title_1: "Архитектура для", home_innovation_title_2: "Современных исследователей.", home_innovation_desc: "Больше, чем просто бронирование. Мы используем передовые модели для анализа миллионов данных.",
    home_trending_title: "Популярные направления", home_exclusive_title: "Эксклюзивные коллекции", footer_desc: "Вдохновляем на путешествия и открываем для вас самые захватывающие уголки мира.",
    footer_quick_links: "Быстрые ссылки", footer_contact: "Связаться с нами", footer_newsletter: "Рассылка", footer_subscribe: "Подписаться",
    footer_legal: "Правовая информация", footer_privacy: "Политика конфиденциальности", footer_terms: "Условия использования", footer_disclaimer: "Отказ от ответственности",
    dest_title: "Поиск направлений", dest_subtitle: "От шумных городов до безмятежных пляжей — найдите свой идеальный уголок.", dest_featured_title: "Франция", dest_featured_desc: "Самая посещаемая страна в мире, предлагающая искусство, историю и Ривьеру.", dest_find_deals: "Найти туры в",
    gear_title: "Снаряжение", gear_subtitle: "Путешествуйте умнее и легче с нашими гаджетами и аксессурами.", gear_check_price: "Узнать цену", gear_no_results: "Ничего не найдено.",
    blog_title: "Журнал Alexara", blog_subtitle: "Истории, путеводители и вдохновение для современного путешественника.", blog_read_full: "Читать полностью", blog_read_more: "Подробнее",
    contact_title: "Связаться с нами", contact_info_title: "Контактная информация", form_first_name: "Имя", form_last_name: "Фамилия", form_email: "Email адрес", form_subject: "Тема", form_message: "Сообщение", form_submit: "Отправить",
    about_mission_title: "Наша миссия", about_who_we_are: "Кто мы", about_team: "Познакомьтесь с визионерами",
    about_feature_1: "Премиальное кураторство", about_feature_2: "Нейронное планирование", about_feature_3: "Глобальная поддержка",
    cat_hotel: "Отель", cat_hostel: "Хостел", cat_restaurant: "Ресторан", cat_nightclub: "Ночной клуб", cat_beach: "Пляж", cat_resort: "Курорт", cat_activity: "Активность", cat_ticket: "Билет", cat_package: "Пакет",
    Europe: "Европа", Asia: "Азия", Oceania: "Океания", Africa: "Африка", Americas: "Америка"
  },
  ZH: {
    nav_home: "首页", nav_planner: "AI 规划师", nav_destinations: "目的地", nav_deals: "优惠方案", nav_blog: "旅游博客", nav_gear: "旅行装备", nav_about: "关于我们", nav_contact: "联系我们", btn_book: "立即预订",
    hero_badge: "构建旅游的未来", hero_title_1: "探索", hero_title_2: "未知领域。", search_placeholder: "我们要飞往哪里？", search_btn: "开始规划",
    home_innovation_badge: "下一代旅行智能", home_innovation_title_1: "为", home_innovation_title_2: "现代探险者设计的架构。", home_innovation_desc: "超越简单的预订。我们利用先进的模型综合数百万个数据点。",
    home_trending_title: "热门目的地", home_exclusive_title: "独家精选", footer_desc: "激发流浪愿望，带您领略全球最令人叹為观止的目的地。",
    footer_quick_links: "快速链接", footer_contact: "联系我们", footer_newsletter: "资讯订阅", footer_subscribe: "立即订阅",
    footer_legal: "法律与信任", footer_privacy: "隐私政策", footer_terms: "服务条款", footer_disclaimer: "附属披露声明",
    dest_title: "探索目的地", dest_subtitle: "从繁华都市到宁静海滩，寻找您的完美背景。", dest_featured_title: "法国", dest_featured_desc: "世界上访问量最大的国家，融合了艺术、历史和里维埃拉风情。", dest_find_deals: "查找优惠：",
    gear_title: "必备装备", gear_subtitle: "使用我们精选的科技配件，让旅行更智能、更轻便。", gear_check_price: "查看价格", gear_no_results: "未找到相关装备。",
    blog_title: "亚历克萨拉杂志", blog_subtitle: "为现代旅行者提供的故事、指南和灵感。", blog_read_full: "阅读全文", blog_read_more: "阅读更多",
    contact_title: "取得联系", contact_info_title: "联系信息", form_first_name: "名", form_last_name: "姓", form_email: "电子邮件", form_subject: "主题", form_message: "内容", form_submit: "提交信息",
    about_mission_title: "我们的使命", about_who_we_are: "关于我们", about_team: "核心团队",
    about_feature_1: "高级策划", about_feature_2: "神经规划", about_feature_3: "全球支持",
    cat_hotel: "酒店", cat_hostel: "旅舍", cat_restaurant: "餐厅", cat_nightclub: "夜总会", cat_beach: "海滩", cat_resort: "度假村", cat_activity: "活动", cat_ticket: "门票", cat_package: "套餐",
    Europe: "欧洲", Asia: "亚洲", Oceania: "大洋洲", Africa: "非洲", Americas: "美洲"
  }
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
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1566054754541-286e1ce2862c?auto=format&fit=crop&w=1200&q=80",
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
