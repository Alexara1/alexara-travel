# Alexara Travel — SEO Fix Package

## Files Changed / Added

| File | Status | What Changed |
|------|--------|--------------|
| `hooks/useSEO.ts` | **NEW** | Per-page dynamic meta tags, canonical, OG, Twitter, JSON-LD schema injection |
| `pages/BlogPost.tsx` | Updated | Uses useSEO() — unique title, description, canonical, Article schema per post |
| `pages/DestinationDetail.tsx` | Updated | Uses useSEO() — unique title, TouristDestination schema, no lorem ipsum |
| `context/SiteContext.tsx` | Updated | Fixed canonical URL bug (missing https://) |
| `index.html` | Updated | Added TravelAgency schema, WebSite schema, OG tags, preconnect hints |
| `robots.txt` | Updated | Correct sitemap URL |
| `api/sitemap.xml.js` | Updated | Added all 8 static pages with lastmod, priority, changefreq, Cache-Control |

## How to Use useSEO in Other Pages

Add to any page component:

```tsx
import { useSEO } from '../hooks/useSEO';

// Inside your component:
useSEO({
  title: 'Page Title | Alexara Travel',
  description: 'Up to 160 characters describing this specific page.',
  canonical: '/your-page-path',
  ogImage: 'https://example.com/image.jpg',
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Title"
  }
});
```

## Next Priority Actions (Manual)

1. **Add SSR/prerendering** — React SPA is partially invisible to Googlebot
2. **Expand sitemap** — add /blog/:slug, /destinations/:slug, /deals/:slug URLs
3. **Set up Google Search Console** — use Admin > Custom Scripts field
4. **Add favicon** — place favicon.ico in /public, add <link rel="icon"> to index.html
5. **Secure admin password** — never ship credentials in client-side JS

## Recommended Title Formats

- Homepage: `Alexara Travel | Curated Destinations, Deals & Travel Guides`
- Destination: `[City] Travel Guide 2026 | [Continent] | Alexara Travel`  
- Blog post: `[Post Title] | Alexara Travel`
- Deals: `Best Flight Deals to [Destination] 2026 | Alexara Travel`
