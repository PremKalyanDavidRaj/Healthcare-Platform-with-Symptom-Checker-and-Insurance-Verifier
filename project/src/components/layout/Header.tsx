import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">HealthAssist</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary' : 'text-text'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/symptom-checker" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/symptom-checker' ? 'text-primary' : 'text-text'
                  }`}
                >
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link 
                  to="/insurance-checker" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/insurance-checker' ? 'text-primary' : 'text-text'
                  }`}
                >
                  Insurance Checker
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="hidden md:block">
            <Link 
              to="/symptom-checker" 
              className="btn btn-primary mr-2"
            >
              Check Symptoms
            </Link>
            <Link 
              to="/insurance-checker" 
              className="btn btn-outline"
            >
              Verify Insurance
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden text-text" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full animate-fade-in bg-white p-4 shadow-md md:hidden">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/' ? 'text-primary' : 'text-text'
                  }`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/symptom-checker" 
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/symptom-checker' ? 'text-primary' : 'text-text'
                  }`}
                  onClick={closeMenu}
                >
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link 
                  to="/insurance-checker" 
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/insurance-checker' ? 'text-primary' : 'text-text'
                  }`}
                  onClick={closeMenu}
                >
                  Insurance Checker
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  to="/symptom-checker" 
                  className="btn btn-primary w-full"
                  onClick={closeMenu}
                >
                  Check Symptoms
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  to="/insurance-checker" 
                  className="btn btn-outline w-full"
                  onClick={closeMenu}
                >
                  Verify Insurance
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;