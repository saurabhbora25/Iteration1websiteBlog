import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToPricing = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#pricing';
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', action: scrollToPricing },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S&S</span>
            </div>
            <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              Study & Settle Abroad
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border modal-backdrop">
            <nav className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-sm font-medium py-2 px-4 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? 'text-primary bg-secondary'
                          : 'text-foreground hover:text-primary hover:bg-secondary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="block w-full text-left text-sm font-medium py-2 px-4 rounded-md text-foreground hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;