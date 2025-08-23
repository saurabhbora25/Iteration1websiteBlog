import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S&S</span>
              </div>
              <span className="font-semibold text-lg text-foreground">
                S&S Abroad Consultancy
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Guiding students to study and settle abroad with honest, practical support.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:info@studynsettleabroad.com" 
                  className="hover:text-primary transition-colors"
                >
                  info@studynsettleabroad.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <button 
                onClick={() => {
                  if (location.pathname !== '/') {
                    window.location.href = '/#pricing';
                  } else {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
              >
                Pricing
              </button>
              <Link 
                to="/blog" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Complete Assistance for English-Speaking Countries</li>
              <li>Document Preparation & Test Prep</li>
              <li>University Selection & Applications</li>
              <li>Visa & Immigration Support</li>
              <li>Complete A-Z Package</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} S&S Abroad Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;