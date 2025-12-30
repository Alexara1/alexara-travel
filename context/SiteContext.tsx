
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, BlogPost, Deal, Destination, GearProduct, SiteContextType, ContactMessage } from '../types';
import { INITIAL_SETTINGS, MOCK_POSTS, MOCK_DEALS, MOCK_DESTINATIONS, MOCK_GEAR, TRANSLATIONS } from '../constants';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (key === 'alexara_settings') {
           return { 
               ...initialValue, 
               ...parsed,
               ads: { ...(initialValue as any).ads, ...parsed.ads },
               contact: { ...(initialValue as any).contact, ...parsed.contact },
           };
        }
        return parsed;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage<SiteSettings>('alexara_settings', INITIAL_SETTINGS);
  const [posts, setPosts] = useLocalStorage<BlogPost[]>('alexara_posts', MOCK_POSTS);
  const [destinations, setDestinations] = useLocalStorage<Destination[]>('alexara_destinations', MOCK_DESTINATIONS);
  const [deals, setDeals] = useLocalStorage<Deal[]>('alexara_deals', MOCK_DEALS);
  const [gear, setGear] = useLocalStorage<GearProduct[]>('alexara_gear', MOCK_GEAR);
  const [messages, setMessages] = useLocalStorage<ContactMessage[]>('alexara_messages', []);
  
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return sessionStorage.getItem('alexara_auth') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.primaryColor);
    root.style.setProperty('--color-secondary', settings.secondaryColor);
    root.style.setProperty('--color-accent', settings.accentColor);
    root.style.setProperty('--font-primary', settings.fontFamily);
    
    // Advanced SEO Injection
    if (settings.metaTitle) document.title = settings.metaTitle;
    
    const metaTags = [
      { name: 'description', content: settings.metaDescription },
      { name: 'keywords', content: settings.metaKeywords },
      { name: 'robots', content: settings.searchVisibility ? 'index, follow' : 'noindex, nofollow' },
      // OpenGraph
      { property: 'og:title', content: settings.metaTitle || settings.siteName },
      { property: 'og:description', content: settings.metaDescription },
      { property: 'og:image', content: settings.ogImage || settings.logo },
      { property: 'og:url', content: settings.canonicalUrl },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: settings.metaTitle },
      { name: 'twitter:description', content: settings.metaDescription },
      { name: 'twitter:image', content: settings.ogImage || settings.logo },
    ];

    metaTags.forEach(tag => {
      if (!tag.content) return;
      let el = tag.name 
        ? document.querySelector(`meta[name="${tag.name}"]`) 
        : document.querySelector(`meta[property="${tag.property}"]`);
      
      if (!el) {
        el = document.createElement('meta');
        if (tag.name) el.setAttribute('name', tag.name);
        if (tag.property) el.setAttribute('property', tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // Canonical Link
    if (settings.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', settings.canonicalUrl);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const t = (key: string): string => {
    const lang = settings.language || 'EN';
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['EN'][key] || key;
  };

  const login = (email: string, pass: string): boolean => {
    if (email === settings.adminEmail && pass === settings.adminPassword) {
      setIsAdminMode(true);
      sessionStorage.setItem('alexara_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminMode(false);
    sessionStorage.removeItem('alexara_auth');
  };

  const createCrud = <T extends { id: string }>(
    state: T[], 
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => ({
    add: (item: T) => setState(prev => [item, ...prev]),
    update: (id: string, updated: Partial<T>) => setState(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p)),
    delete: (id: string) => setState(prev => prev.filter(p => p.id !== id))
  });

  const postCrud = createCrud(posts, setPosts);
  const destCrud = createCrud(destinations, setDestinations);
  const dealCrud = createCrud(deals, setDeals);
  const gearCrud = createCrud(gear, setGear);

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      status: 'new'
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' as const } : m));
  };

  return (
    <SiteContext.Provider value={{
      settings,
      updateSettings,
      t,
      posts,
      addPost: postCrud.add,
      updatePost: postCrud.update,
      deletePost: postCrud.delete,
      destinations,
      addDestination: destCrud.add,
      updateDestination: destCrud.update,
      deleteDestination: destCrud.delete,
      deals,
      addDeal: dealCrud.add,
      updateDeal: dealCrud.update,
      deleteDeal: dealCrud.delete,
      gear,
      addGear: gearCrud.add,
      updateGear: gearCrud.update,
      deleteGear: gearCrud.delete,
      messages,
      addMessage,
      deleteMessage,
      markMessageRead,
      isAdminMode,
      login,
      logout
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
