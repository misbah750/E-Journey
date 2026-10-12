import Hero from '../components/sections/Hero.jsx';
import TrustBar from '../components/sections/TrustBar.jsx';
import PlacesMarquee from '../components/sections/PlacesMarquee.jsx';
import AboutIntro from '../components/sections/AboutIntro.jsx';
import ServicesGrid from '../components/sections/ServicesGrid.jsx';
import Destinations from '../components/sections/Destinations.jsx';
import Packages from '../components/sections/Packages.jsx';
import PakistanGallery from '../components/sections/PakistanGallery.jsx';
import TripBuilderSection from '../components/sections/TripBuilderSection.jsx';
import { Honeymoon, Family } from '../components/sections/Lifestyle.jsx';
import CorporateBand from '../components/sections/CorporateBand.jsx';
import HajjBand from '../components/sections/HajjBand.jsx';
import VisaBand from '../components/sections/VisaBand.jsx';
import Accommodation from '../components/sections/Accommodation.jsx';
import WhyUs from '../components/sections/WhyUs.jsx';
import PhotoMosaic from '../components/sections/PhotoMosaic.jsx';
import Process from '../components/sections/Process.jsx';
import Testimonials from '../components/sections/Testimonials.jsx';
import FAQ from '../components/sections/FAQ.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import { faqs } from '../data/content.js';
import { faqJsonLd, useSeo } from '../lib/hooks.js';

/* Section order alternates light and dark surfaces so each band reads as its own chapter. */
export default function Home() {
  useSeo({
    description:
      'e-Journey Travel & Tours — a Karachi tour operator for Pakistan tours, Hunza & Skardu holidays, international tour packages, Hajj & Umrah, visa assistance, hotels, flights and corporate travel.',
    jsonLd: faqJsonLd(faqs),
  });

  return (
    <>
      <Hero />
      <TrustBar />
      <PlacesMarquee />
      <AboutIntro />
      <ServicesGrid />
      <Destinations />
      <Packages />
      <PakistanGallery />
      <TripBuilderSection />
      <HajjBand />
      <Honeymoon />
      <Family />
      <CorporateBand />
      <VisaBand />
      <Accommodation />
      <WhyUs />
      <PhotoMosaic />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
