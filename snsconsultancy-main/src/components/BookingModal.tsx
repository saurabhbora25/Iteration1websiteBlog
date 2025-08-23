import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
  preSelectedCountry?: string;
}

const europeanCountries = [
  'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Austria', 
  'Switzerland', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Poland', 'Czech Republic', 
  'Hungary', 'Croatia', 'Slovenia', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 
  'Portugal', 'Ireland', 'Luxembourg', 'Malta', 'Cyprus', 'Bulgaria', 'Romania', 'Greece'
];

const services = [
  { id: 'free-english', name: 'Complete help for English-speaking nations (FREE)' },
  { id: 'documents', name: 'Document Accumulation & Test Prep (EUR countries)' },
  { id: 'university', name: 'University Selection & Applications (EUR countries)' },
  { id: 'visa', name: 'Visa & Immigration Support (EUR countries)' },
  { id: 'complete', name: 'Complete A-Z Package (EUR countries)' },
  { id: 'custom', name: 'Custom' }
];

const BookingModal = ({ isOpen, onClose, preSelectedService, preSelectedCountry }: BookingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: preSelectedCountry || '',
    otherCountry: '',
    education: '',
    service: preSelectedService || '',
    customService: '',
    comments: ''
  });
  
  const [showOtherCountry, setShowOtherCountry] = useState(false);
  const [showCustomService, setShowCustomService] = useState(false);

  useEffect(() => {
    if (preSelectedCountry) {
      setFormData(prev => ({ ...prev, country: preSelectedCountry }));
    }
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedCountry, preSelectedService]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'country') {
      setShowOtherCountry(value === 'other');
      if (value !== 'other') {
        setFormData(prev => ({ ...prev, otherCountry: '' }));
      }
    }
    
    if (field === 'service') {
      setShowCustomService(value === 'custom');
      if (value !== 'custom') {
        setFormData(prev => ({ ...prev, customService: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.country || !formData.education || !formData.service) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_forms')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            custom_country: formData.otherCountry || null,
            education_level: formData.education,
            preferred_service: formData.service,
            custom_service: formData.customService || null,
            additional_comments: formData.comments || null
          }
        ]);

      if (error) {
        throw error;
      }

      // Success message
      toast({
        title: "Success!",
        description: "Your consultation request has been submitted. We'll contact you soon!",
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        otherCountry: '',
        education: '',
        service: '',
        customService: '',
        comments: ''
      });
      setShowOtherCountry(false);
      setShowCustomService(false);
      onClose();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <CardTitle className="text-2xl">Book Your Consultation</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            {/* Country Selection */}
            <div>
              <Label htmlFor="country">Country of Choice *</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred country" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {europeanCountries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Other Country */}
            {showOtherCountry && (
              <div>
                <Label htmlFor="otherCountry">Please specify country *</Label>
                <Input
                  id="otherCountry"
                  value={formData.otherCountry}
                  onChange={(e) => handleInputChange('otherCountry', e.target.value)}
                  placeholder="Enter your preferred country"
                  required
                />
              </div>
            )}

            {/* Education Level */}
            <div>
              <Label htmlFor="education">Level of Education *</Label>
              <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelor's</SelectItem>
                  <SelectItem value="masters">Master's</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service Selection */}
            <div>
              <Label htmlFor="service">Preferred Service *</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Custom Service */}
            {showCustomService && (
              <div>
                <Label htmlFor="customService">Custom Service Requirements *</Label>
                <Textarea
                  id="customService"
                  value={formData.customService}
                  onChange={(e) => handleInputChange('customService', e.target.value)}
                  placeholder="Please describe your custom service requirements"
                  rows={3}
                  required
                />
              </div>
            )}

            {/* Additional Comments */}
            <div>
              <Label htmlFor="comments">Additional Comments (Optional)</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                placeholder="Any additional information or questions..."
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full btn-hover-lift">
              Submit Booking Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingModal;