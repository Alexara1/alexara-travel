
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { SiteProvider, useSite } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIConcierge from './components/AIConcierge';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Gear from './pages/Gear';
import GearDetail from './pages/GearDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/admin/Login';
import SearchResults from './pages/Search';
import NotFound from './pages/NotFound';
import AIPlanner from './pages/AIPlanner';

const GlobalShortcuts: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Alt + A to jump to Admin
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
       <Navbar />
       <main className="flex-grow">
        {children}
       </main>
       <Footer />
       <AIConcierge />
    </div>
  );
};

const AppContent: React.FC = () => {
    const { isAdminMode } = useSite();

    return (
        <Router>
            <ScrollToTop />
            <GlobalShortcuts />
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/destinations" element={<Layout><Destinations /></Layout>} />
                <Route path="/destinations/:slug" element={<Layout><DestinationDetail /></Layout>} />
                <Route path="/deals" element={<Layout><Deals /></Layout>} />
                <Route path="/deals/:slug" element={<Layout><DealDetail /></Layout>} />
                <Route path="/ai-planner" element={<Layout><AIPlanner /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
                <Route path="/gear" element={<Layout><Gear /></Layout>} />
                <Route path="/gear/:slug" element={<Layout><GearDetail /></Layout>} />
                <Route path="/search" element={<Layout><SearchResults /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                <Route path="/terms" element={<Layout><Terms /></Layout>} />
                <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />
                <Route path="/admin" element={isAdminMode ? <AdminDashboard /> : <Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
        <AppContent />
    </SiteProvider>
  );
};

export default App;
