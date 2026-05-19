
/**
 * useSEO — per-page dynamic meta tag injection
 * Drops into any page component to override title, description, OG tags, and inject JSON-LD schema.
 *
 * Usage:
 *   useSEO({
 *     title: 'Bali Travel Guide | Alexara',
 *     description: 'Discover the best temples, beaches and food in Bali...',
 *     canonical: 'https://www.alexaratravel.com/destinations/bali',
 *     ogImage: 'https://...',
 *     schema: { "@context": "https://schema.org", "@type": "TouristDestination", ... }
 *   });
 */

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = 'https://www.alexaratravel.com';

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    // --- Title ---
    if (title) document.title = title;

    // --- Helper to set/create meta tags ---
    const setMeta = (selector: string, content: string, attr = 'content') => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('="');
        el.setAttribute(attrName, attrVal.replace('"', ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    const setMetaName = (name: string, content: string) => setMeta(`meta[name="${name}"]`, content);
    const setMetaProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // --- Description ---
    if (description) {
      setMetaName('description', description);
      setMetaProp('og:description', description);
      setMetaName('twitter:description', description);
    }

    // --- Robots ---
    setMetaName('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // --- OG / Twitter ---
    if (title) {
      setMetaProp('og:title', title);
      setMetaName('twitter:title', title);
    }
    setMetaProp('og:type', ogType);
    if (ogImage) {
      setMetaProp('og:image', ogImage);
      setMetaName('twitter:image', ogImage);
    }
    setMetaName('twitter:card', 'summary_large_image');

    // --- Canonical ---
    const canonicalHref = canonical
      ? canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`
      : null;

    if (canonicalHref) {
      setMetaProp('og:url', canonicalHref);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalHref);
    }

    // --- JSON-LD Schema ---
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s, i) => {
        const id = `schema-ld-${i}`;
        let script = document.getElementById(id);
        if (!script) {
          script = document.createElement('script');
          script.id = id;
          script.setAttribute('type', 'application/ld+json');
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(s);
      });
    }

    // Cleanup JSON-LD on unmount
    return () => {
      if (schema) {
        const schemas = Array.isArray(schema) ? schema : [schema];
        schemas.forEach((_, i) => {
          document.getElementById(`schema-ld-${i}`)?.remove();
        });
      }
    };
  }, [title, description, canonical, ogImage, ogType, noindex, schema]);
}
