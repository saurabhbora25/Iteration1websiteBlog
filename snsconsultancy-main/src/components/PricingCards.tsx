import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

interface PricingService {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  free?: boolean;
  countries?: string;
}

const pricingServices: PricingService[] = [
  {
    id: 'free-english',
    title: 'Complete Assistance for English-Speaking Countries',
    description: 'USA, UK, Ireland, Australia, Canada',
    price: 0,
    originalPrice: 0,
    free: true,
    features: [
      'University application assistance',
      'Visa guidance and support', 
      'Document preparation help',
      'Interview preparation',
      'Post-arrival support',
      'Quality assistance at no cost'
    ]
  },
  {
    id: 'documents',
    title: 'Document Accumulation & Test Prep',
    description: 'IELTS/TOEFL assistance, APS for Germany, document compilation',
    price: 10000,
    originalPrice: 12000,
    features: [
      'IELTS/TOEFL preparation guidance',
      'APS certificate assistance (Germany)',
      'Document compilation and verification',
      'Translation services coordination', 
      'Apostille guidance',
      'Timeline planning'
    ]
  },
  {
    id: 'university',
    title: 'University Selection & Applications',
    description: 'Course selection, university shortlisting, SOP drafting, uni-assist support',
    price: 10000,
    originalPrice: 12000,
    features: [
      'Personalized course selection',
      'University shortlisting (5-8 universities)',
      'Statement of Purpose drafting',
      'Uni-assist portal support',
      'Application form completion',
      'Scholarship guidance'
    ]
  },
  {
    id: 'visa',
    title: 'Visa & Immigration Support',
    description: 'Post-acceptance to landing assistance, visa guidance, immigration help',
    price: 10000,
    originalPrice: 12000,
    features: [
      'Visa application guidance',
      'Embassy appointment booking',
      'Interview preparation',
      'Financial documentation help',
      'Pre-departure checklist',
      'Airport and initial settlement guidance'
    ]
  },
  {
    id: 'complete',
    title: 'Complete A-Z Package',
    description: 'All three services combined for worry-free journey',
    price: 25000,
    originalPrice: 30000,
    popular: true,
    features: [
      'Everything from Document Prep package',
      'Everything from University Selection package',
      'Everything from Visa Support package',
      'Priority support and consultation',
      '24/7 WhatsApp support',
      'Guaranteed hand-holding till landing'
    ]
  }
];

const PricingCards = () => {
  const handleBookNow = (serviceId: string, serviceTitle: string) => {
    const event = new CustomEvent('openBookingModal', { 
      detail: { selectedService: serviceId, serviceTitle } 
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="pricing" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services & Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package for your study abroad journey. Quality service, transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Free Service */}
          <div className="lg:col-span-1">
            <Card className={`h-full relative ${pricingServices[0].free ? 'border-success bg-success/5' : ''}`}>
              {pricingServices[0].free && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground">
                  FREE SERVICE
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl leading-tight">{pricingServices[0].title}</CardTitle>
                <CardDescription className="text-sm">{pricingServices[0].description}</CardDescription>
                <div className="py-4">
                  <div className="text-4xl font-bold text-success">FREE</div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    We earn from university commissions, ensuring quality assistance at no cost to students
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {pricingServices[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full btn-hover-lift bg-success hover:bg-success/90"
                  onClick={() => handleBookNow(pricingServices[0].id, pricingServices[0].title)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Other Services Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingServices.slice(1).map((service) => (
                <Card key={service.id} className={`h-full relative ${service.popular ? 'border-primary bg-primary/5' : ''}`}>
                  {service.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      <Star className="w-3 h-3 mr-1" />
                      Popular Choice
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                    <CardDescription className="text-xs">{service.description}</CardDescription>
                    <div className="py-3">
                      <div className="flex items-center justify-center space-x-2">
                        {service.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ₹{service.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-primary">
                          ₹{service.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col">
                    <ul className="space-y-1.5 mb-6 flex-grow">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs">
                          <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-xs text-muted-foreground">
                          +{service.features.length - 4} more features...
                        </li>
                      )}
                    </ul>
                    <Button 
                      className={`w-full btn-hover-lift ${
                        service.popular 
                          ? 'bg-primary hover:bg-primary-hover' 
                          : ''
                      }`}
                      variant={service.popular ? 'default' : 'outline'}
                      onClick={() => handleBookNow(service.id, service.title)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Free service note */}
        {pricingServices[0] && (
          <div className="text-center mt-8 p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> We earn from university commissions, ensuring quality assistance at no cost to students
            </p>
          </div>
        )}
        
        {/* Pricing note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-2">
            All prices are in Indian Rupees (INR). Custom packages available upon request.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
