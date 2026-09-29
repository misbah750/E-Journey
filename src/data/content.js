import {
  Headset, Globe2, Route, BriefcaseBusiness, Stamp, Award, Sparkles, Waypoints, HandCoins,
  LifeBuoy, HeartHandshake, Star, Plane, Clock,
} from 'lucide-react';
import { KaabaIcon } from '../components/ui/BrandIcons.jsx';

export const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  {
    to: '/services',
    label: 'Services',
    children: [
      { to: '/services', label: 'All Services', desc: 'Our complete travel portfolio' },
      { to: '/hotels', label: 'Hotels & Accommodation', desc: 'Budget stays to deluxe hotels' },
      { to: '/travel-insurance', label: 'Travel Insurance', desc: 'Cover for every kind of trip' },
      { to: '/plan-your-trip', label: 'Custom Trip Builder', desc: 'Design a journey around you' },
    ],
  },
  {
    to: '/destinations',
    label: 'Destinations',
    children: [
      { to: '/destinations', label: 'All Destinations', desc: 'Signature packages & inspiration' },
      { to: '/pakistan-tours', label: 'Pakistan Tours', desc: 'Northern Areas & beyond' },
      { to: '/international-tours', label: 'International Tours', desc: 'The Gulf, Asia & Europe' },
    ],
  },
  { to: '/hajj-umrah', label: 'Hajj & Umrah' },
  { to: '/corporate-travel', label: 'Corporate' },
  { to: '/visa-assistance', label: 'Visa Assistance' },
  { to: '/contact', label: 'Contact' },
];

export const trustItems = [
  { icon: Headset, title: 'Experienced Travel Consultants', text: 'Knowledgeable staff behind every booking' },
  { icon: Globe2, title: 'Domestic & International Travel', text: 'Pakistan and worldwide' },
  { icon: Route, title: 'Customized Travel Solutions', text: 'Independent tours or group departures' },
  { icon: BriefcaseBusiness, title: 'Corporate Travel Support', text: 'Cost-effective business travel' },
  { icon: KaabaIcon, title: 'Hajj & Umrah Specialists', text: 'Scholar-guided pilgrimages' },
  { icon: Stamp, title: 'Visa Assistance', text: 'Guidance at every step' },
];

export const aboutPillars = [
  'Experienced Travel Team',
  'Domestic & International',
  'Customized Journeys',
  'Corporate Solutions',
  'Hajj & Umrah Services',
];

export const audiences = [
  'Individuals', 'Families', 'Honeymoon couples', 'Students', 'Groups',
  'Companies', 'International travellers', 'Pakistanis living abroad', 'Pilgrims',
];

export const whyUs = [
  { icon: Award, title: 'Expertise', text: 'Experienced travel professionals who know the destinations, the airlines and the details that matter.' },
  { icon: Sparkles, title: 'Personalization', text: 'Travel solutions designed around individual needs — never a one-size-fits-all itinerary.' },
  { icon: Waypoints, title: 'Flexibility', text: 'Choose a customized independent tour or join a packaged group departure.' },
  { icon: HandCoins, title: 'Value', text: 'Cost-conscious solutions built on strong airline and hotel relationships.' },
  { icon: LifeBuoy, title: 'Support', text: 'Responsive travel assistance before you leave and while you are away.' },
  { icon: HeartHandshake, title: 'Care', text: 'A genuine commitment to journeys you will remember for the right reasons.' },
];

export const processSteps = [
  { no: '01', title: 'Tell Us Your Plan', text: 'Share your destination, dates, travellers and preferences.' },
  { no: '02', title: 'We Design Your Journey', text: 'Our travel consultants build the right solution for you.' },
  { no: '03', title: 'Confirm Your Arrangements', text: 'Tickets, hotels, tours, visas and supporting services are coordinated.' },
  { no: '04', title: 'Travel With Confidence', text: 'Receive assistance throughout your journey.' },
];

/**
 * PLACEHOLDER testimonials — replace with verified customer feedback before launch.
 * Set `verified: true` on an entry once it is real, and the placeholder label disappears.
 */
export const testimonials = [
  {
    quote: 'A wonderful experience from planning to arrival. The team made everything simple.',
    name: 'Customer name',
    trip: 'Family holiday',
    destination: 'Destination',
    verified: false,
  },
  {
    quote: 'Every detail was taken care of, so we could focus on the journey itself.',
    name: 'Customer name',
    trip: 'Umrah',
    destination: 'Makkah & Madinah',
    verified: false,
  },
  {
    quote: 'Clear advice, quick responses and a trip that matched exactly what we asked for.',
    name: 'Customer name',
    trip: 'Honeymoon',
    destination: 'Destination',
    verified: false,
  },
];

export const faqs = [
  { q: 'Can I customize my tour?', a: 'Yes. We offer both customized independent tours designed entirely around you and packaged group departures. Share your plans and a consultant will shape the itinerary with you.' },
  { q: 'Do you provide domestic travel services?', a: 'Yes. We provide domestic travel services — including tours of Pakistan’s Northern Areas, domestic ticketing and hotels — as well as international travel.' },
  { q: 'Do you provide Hajj and Umrah services?', a: 'Yes. e-Journey provides pilgrimage packages and related travel, accommodation and support services, with religious scholars providing guidance before and during Hajj and Umrah.' },
  { q: 'Do you provide visa assistance?', a: 'Yes. Our visa assistance includes guidance through the application process and the relevant requirements, and we keep you informed at each stage. Final decisions always rest with the embassy or consulate concerned.' },
  { q: 'Do you provide corporate travel services?', a: 'Yes. Our corporate travel services include travel management, ticketing, hotels, visa services, insurance and emergency travel support.' },
  { q: 'Can you arrange hotels?', a: 'Yes. We arrange accommodation across categories — from budget stays and self-catering units to premium and deluxe hotels and resorts.' },
];

export const coreValues = [
  { icon: Star, title: 'First-Class Service', text: 'Premier standards, seamless logistics and personal attention on every trip.' },
  { icon: HandCoins, title: 'Cost-Saving Solutions', text: 'Maximum value for money across accommodation and travel options.' },
  { icon: Plane, title: 'Strong Airline Ties', text: 'Direct relationships with airlines for flexible ticketing and reliable seats.' },
  { icon: Clock, title: '24/7 Dedicated Support', text: 'A multi-skilled team available around the clock when you need us.' },
];

export const travelTypes = [
  'Holiday', 'Honeymoon', 'Family', 'Corporate', 'Group', 'Hajj', 'Umrah',
  'Visa', 'Flights', 'Hotel', 'Travel Insurance', 'Other',
];

export const budgetRanges = [
  'Under PKR 150,000',
  'PKR 150,000 – 300,000',
  'PKR 300,000 – 600,000',
  'PKR 600,000 – 1,000,000',
  'Above PKR 1,000,000',
  'Not sure yet',
];

export const accommodationPrefs = ['Budget', 'Mid-range', 'Premium', 'Luxury', 'Resort', 'No preference'];
