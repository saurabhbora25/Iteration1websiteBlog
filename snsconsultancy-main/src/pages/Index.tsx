import { useRef } from 'react';
import Hero from '../components/Hero';
import CountryTiles from '../components/CountryTiles';
import PricingCards from '../components/PricingCards';

const Index = () => {
  const countriesRef = useRef<HTMLDivElement>(null);

  const scrollToCountries = () => {
    countriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToCountries={scrollToCountries} />
      <div ref={countriesRef}>
        <CountryTiles />
      </div>
      <PricingCards />
    </div>
  );
};

export default Index;
