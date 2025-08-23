import { Button } from '@/components/ui/button';

interface HeroProps {
  onScrollToCountries: () => void;
}

const Hero = ({ onScrollToCountries }: HeroProps) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Want to study abroad?{' '}
            <span className="text-primary">We can help.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Thinking about building a life overseas? We don't sell promises, 
            we guide you to make it real.
          </p>

          <Button
            size="lg"
            onClick={onScrollToCountries}
            className="btn-hover-lift text-lg px-8 py-6 h-auto"
          >
            Explore Countries
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;