import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CountryInfoModal from './CountryInfoModal';

interface Country {
  name: string;
  flag: string;
  tuitionCost: number;
  livingCost: number;
  description: string;
  details: {
    universities: string[];
    requirements: string[];
    benefits: string[];
  };
}

const countries: Country[] = [
  {
    name: 'Germany',
    flag: '🇩🇪',
    tuitionCost: 300,
    livingCost: 11000,
    description: 'World-class education with minimal tuition fees and strong economy.',
    details: {
      universities: ['Technical University of Munich', 'University of Heidelberg', 'RWTH Aachen University', 'University of Berlin'],
      requirements: ['APS Certificate', 'IELTS 6.5+ or equivalent', 'Relevant academic qualifications', 'Proof of financial resources'],
      benefits: ['Low tuition fees', 'Strong job market', 'Work opportunities during study', 'Path to permanent residency']
    }
  },
  {
    name: 'Hungary',
    flag: '🇭🇺',
    tuitionCost: 1500,
    livingCost: 8000,
    description: 'Affordable education in the heart of Europe with rich cultural heritage.',
    details: {
      universities: ['University of Debrecen', 'Eötvös Loránd University', 'Budapest University of Technology', 'University of Szeged'],
      requirements: ['IELTS 6.0+ or equivalent', 'High school diploma', 'Entrance examination (some courses)', 'Health insurance'],
      benefits: ['Affordable living costs', 'EU degree recognition', 'Central European location', 'Scholarship opportunities']
    }
  },
  {
    name: 'Croatia',
    flag: '🇭🇷',
    tuitionCost: 2000,
    livingCost: 9000,
    description: 'Beautiful Mediterranean country with growing education sector.',
    details: {
      universities: ['University of Zagreb', 'University of Split', 'University of Rijeka', 'University of Osijek'],
      requirements: ['IELTS 6.0+ or equivalent', 'Academic transcripts', 'Letter of motivation', 'Health certificate'],
      benefits: ['Beautiful coastal cities', 'Growing IT sector', 'EU membership benefits', 'Moderate living costs']
    }
  },
  {
    name: 'France',
    flag: '🇫🇷',
    tuitionCost: 3000,
    livingCost: 12000,
    description: 'Prestigious universities and rich cultural experience in the heart of Europe.',
    details: {
      universities: ['Sorbonne University', 'École Normale Supérieure', 'Sciences Po', 'University of Lyon'],
      requirements: ['DELF/DALF or IELTS 6.5+', 'Academic transcripts', 'Campus France application', 'Financial proof'],
      benefits: ['World-renowned universities', 'Rich cultural heritage', 'Strong research opportunities', 'Gateway to Europe']
    }
  },
  {
    name: 'Denmark',
    flag: '🇩🇰',
    tuitionCost: 0,
    livingCost: 15000,
    description: 'High quality of life and free education for EU students.',
    details: {
      universities: ['University of Copenhagen', 'Technical University of Denmark', 'Aarhus University', 'Aalborg University'],
      requirements: ['IELTS 6.5+ or equivalent', 'Academic transcripts', 'Letter of motivation', 'Financial documentation'],
      benefits: ['Free tuition for EU students', 'High quality of life', 'Strong social support', 'English-taught programs']
    }
  }
];

const CountryTiles = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <section id="countries" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Popular Study Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the costs and opportunities in top European countries for international students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {countries.map((country) => (
            <Card 
              key={country.name}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 btn-hover-lift"
              onClick={() => setSelectedCountry(country)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{country.flag}</div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{country.name}</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Tuition:</span> €{country.tuitionCost.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Living:</span> €{country.livingCost.toLocaleString()}
                  </p>
                  <div className="pt-2 border-t border-border">
                    <p className="font-semibold text-primary">
                      Total: €{(country.tuitionCost + country.livingCost).toLocaleString()}/year
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                  {country.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedCountry && (
        <CountryInfoModal
          country={selectedCountry}
          isOpen={!!selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </section>
  );
};

export default CountryTiles;