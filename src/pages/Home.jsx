import Hero from '../components/sections/Hero.jsx';
import CoreServices from '../components/sections/CoreServices.jsx';
import Packages from '../components/sections/Packages.jsx';
import UmrahTypesBand from '../components/sections/UmrahTypesBand.jsx';
import VisaPreview from '../components/sections/VisaPreview.jsx';
import PakistanGallery from '../components/sections/PakistanGallery.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { useSeo } from '../lib/hooks.js';

/*
 * Kept deliberately short: one section per thing e-Journey sells, each pointing to its own page
 * for the detail. Light and dark surfaces alternate so each band reads as its own chapter.
 */
export default function Home() {
  useSeo({
    description:
      'e-Journey Travel & Tours, Karachi — air tickets, international tour packages, Pakistan tours, visa services, Umrah and travel insurance.',
  });

  return (
    <>
      <Hero />
      <CoreServices />
      <Packages
        limit={6}
        eyebrow="Tour Packages"
        title={<>Holidays Abroad, <em>Ready to Book</em></>}
        lead="Hotels, breakfast, transfers, sightseeing and visa in one price. A few favourites below — see all packages for more."
      />
      <UmrahTypesBand />
      <VisaPreview />
      <PakistanGallery />
      <FinalCTA />
    </>
  );
}
