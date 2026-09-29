import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import { images } from '../data/images.js';
import { useSeo } from '../lib/hooks.js';

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you were looking for could not be found.' });
  return (
    <PageHero
      size="sm"
      image={images.deosai}
      eyebrow="404"
      title={<>This Road Leads <em>Nowhere… Yet</em></>}
      lead="The page you were looking for has moved or no longer exists. Let’s get your journey back on track."
      crumbs={[{ label: 'Page not found' }]}
    >
      <Link to="/" className="btn btn--gold btn--lg">Back to Home <ArrowRight size={18} aria-hidden="true" /></Link>
      <Link to="/destinations" className="btn btn--ghost-light btn--lg">Explore Destinations</Link>
    </PageHero>
  );
}
