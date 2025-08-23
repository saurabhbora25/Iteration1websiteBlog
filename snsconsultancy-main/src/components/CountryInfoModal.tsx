import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, GraduationCap, FileCheck, Star } from 'lucide-react';

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

interface CountryInfoModalProps {
  country: Country;
  isOpen: boolean;
  onClose: () => void;
}

const CountryInfoModal = ({ country, isOpen, onClose }: CountryInfoModalProps) => {
  if (!isOpen) return null;

  const handleBookCall = () => {
    // This will be connected to the booking modal
    onClose();
    // Trigger booking modal here
    const event = new CustomEvent('openBookingModal', { 
      detail: { selectedCountry: country.name } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <CardTitle className="text-2xl">{country.name}</CardTitle>
              <p className="text-muted-foreground">{country.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-secondary">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Tuition Fees</h4>
                <p className="text-2xl font-bold text-primary">€{country.tuitionCost.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per year</p>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Living Costs</h4>
                <p className="text-2xl font-bold text-warning">€{country.livingCost.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per year</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/10 border-primary">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-sm text-primary mb-2">Total Cost</h4>
                <p className="text-2xl font-bold text-primary">
                  €{(country.tuitionCost + country.livingCost).toLocaleString()}
                </p>
                <p className="text-xs text-primary">per year</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Universities */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Top Universities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {country.details.universities.map((uni, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                      <span>{uni}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <FileCheck className="h-5 w-5 text-primary" />
                  <span>Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {country.details.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {country.details.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 shrink-0"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <h3 className="font-semibold text-lg text-foreground mb-2">
              Ready to start your journey to {country.name}?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our experts can guide you through every step of the process, from application to landing.
            </p>
            <Button 
              size="lg"
              onClick={handleBookCall}
              className="btn-hover-lift"
            >
              Book a Call with Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryInfoModal;