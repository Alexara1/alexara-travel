export default function handler(req, res) {

const baseUrl = "https://www.alexaratravel.com";
const today = new Date().toISOString().split('T')[0];

// Static high-priority pages
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/destinations", priority: "0.9", changefreq: "weekly" },
  { path: "/deals", priority: "0.9", changefreq: "daily" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/gear", priority: "0.8", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/ai-planner", priority: "0.8", changefreq: "weekly" },
];

let urls = staticPages.map(page => `
<url>
  <loc>${baseUrl}${page.path}</loc>
  <lastmod>${today}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

res.setHeader("Content-Type", "text/xml");
res.setHeader("Cache-Control", "public, s-maxage=86400");
res.write(sitemap);
res.end();

}
