import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { images } from '../../data/images.js';

const TILES = [
  { image: images.kaabaClose, place: 'Makkah', note: 'Umrah', to: '/umrah', area: 'a' },
  { image: images.maldives, place: 'The Maldives', note: 'Honeymoons', to: '/international-tours', area: 'b' },
  { image: images.shangrila, place: 'Skardu', note: 'Northern Areas', to: '/pakistan-tours#skardu', area: 'd' },
  { image: images.dubaiSunset, place: 'Dubai', note: 'City & desert', to: '/international-tours#dubai', area: 'h' },
  { image: images.istanbul, place: 'Istanbul', note: 'Türkiye', to: '/international-tours#turkey', area: 'c' },
  { image: images.passu, place: 'Passu', note: 'Upper Hunza', to: '/pakistan-tours#hunza', area: 'e' },
  { image: images.kualaLumpur, place: 'Kuala Lumpur', note: 'Malaysia', to: '/international-tours#malaysia', area: 'g' },
  { image: images.thailand, place: 'Phi Phi', note: 'Thailand', to: '/international-tours#thailand', area: 'f' },
  { image: images.madinahCourtyard, place: 'Madinah', note: 'Ziyarat', to: '/umrah', area: 'i' },
];

/** Image-led bento gallery of destinations. */
export default function PhotoMosaic({ tone = 'ivory' }) {
  return (
    <Section id="gallery" tone={tone} className="mosaic-section">
      <div className="section-head-row">
        <SectionHeading
          eyebrow="In Pictures"
          title={<>A World of <em>Journeys</em></>}
          lead="Sacred cities, mountain valleys, island lagoons and skylines — just some of the places we plan journeys to."
        />
        <Reveal delay={120} className="section-head-row__aside section-head-row__aside--end">
          <Link to="/destinations" className="btn btn--outline">
            All destinations <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
      <ul className="mosaic">
        {TILES.map((t, i) => (
          <Reveal as="li" key={t.place} variant="scale" delay={(i % 4) * 70} className="mosaic__tile" style={{ '--area': t.area }}>
            <Link to={t.to}>
              <Img image={t.image} sizes="(max-width: 760px) 50vw, 33vw" maxWidth={1080} />
              <span className="mosaic__label">
                <span className="mosaic__note"><MapPin size={12} aria-hidden="true" /> {t.note}</span>
                <span className="mosaic__place">{t.place}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
