import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import FloatingActions from './components/layout/FloatingActions.jsx';
import ScrollManager from './components/layout/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import { BrandEmblem } from './components/ui/Logo.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Destinations = lazy(() => import('./pages/Destinations.jsx'));
const PakistanTours = lazy(() => import('./pages/PakistanTours.jsx'));
const InternationalTours = lazy(() => import('./pages/InternationalTours.jsx'));
const Umrah = lazy(() => import('./pages/Umrah.jsx'));
const Corporate = lazy(() => import('./pages/Corporate.jsx'));
const Visa = lazy(() => import('./pages/Visa.jsx'));
const Ticketing = lazy(() => import('./pages/Ticketing.jsx'));
const Hotels = lazy(() => import('./pages/Hotels.jsx'));
const Insurance = lazy(() => import('./pages/Insurance.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const PlanTrip = lazy(() => import('./pages/PlanTrip.jsx'));
const PackageDetail = lazy(() => import('./pages/PackageDetail.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  const location = useLocation();
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} key={location.pathname} className="page">
        <Suspense fallback={<div className="page-loading" aria-busy="true"><BrandEmblem light className="page-loading__emblem" /></div>}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/pakistan-tours" element={<PakistanTours />} />
            <Route path="/international-tours" element={<InternationalTours />} />
            <Route path="/umrah" element={<Umrah />} />
            <Route path="/hajj-umrah" element={<Navigate to="/umrah" replace />} />
            <Route path="/corporate-travel" element={<Corporate />} />
            <Route path="/visa-assistance" element={<Visa />} />
            <Route path="/visa" element={<Navigate to="/visa-assistance" replace />} />
            <Route path="/ticketing" element={<Ticketing />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/travel-insurance" element={<Insurance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plan-your-trip" element={<PlanTrip />} />
            <Route path="/packages/:slug" element={<PackageDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
