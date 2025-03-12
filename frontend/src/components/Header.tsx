
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="w-full py-4 px-6 backdrop-blur-lg bg-navy-dark/80 border-b border-white/5 fixed top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple to-teal flex items-center justify-center shadow-lg group-hover:shadow-teal/20 transition-all duration-300">
            <span className="text-white font-merriweather font-bold text-lg">NP</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white">NBA PROP</h1>
            <span className="text-xs font-medium opacity-70 -mt-1">BET ANALYZER</span>
          </div>
        </Link>

        {isMobile ? (
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        ) : (
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors duration-200">Home</Link>
            <Link to="/analyzer" className="text-white/70 hover:text-white transition-colors duration-200">Analyzer</Link>
            <Link to="/how-it-works" className="text-white/70 hover:text-white transition-colors duration-200">How It Works</Link>
          </div>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-navy-dark/95 backdrop-blur-lg border-b border-white/5 animate-slide-down">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className="text-white/70 hover:text-white transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/analyzer" className="text-white/70 hover:text-white transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Analyzer
            </Link>
            <Link to="/how-it-works" className="text-white/70 hover:text-white transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
