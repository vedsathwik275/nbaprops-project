
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award, Target, ChartBar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';

const features = [
  {
    title: 'Advanced Statistics',
    description: 'Get detailed analytics on player performance including averages, medians, and over/under percentages.',
    icon: ChartBar,
    color: 'bg-teal/10 text-teal',
  },
  {
    title: 'Trend Analysis',
    description: 'Track performance trends over time to identify patterns and spot opportunities for successful bets.',
    icon: TrendingUp,
    color: 'bg-purple/10 text-purple-light',
  },
  {
    title: 'Precise Filtering',
    description: 'Filter by opponent, game location, number of games, and more to get the most relevant insights.',
    icon: Target,
    color: 'bg-teal/10 text-teal',
  },
  {
    title: 'Confidence Indicators',
    description: 'Clear recommendations with confidence levels to help you make informed betting decisions.',
    icon: Award,
    color: 'bg-purple/10 text-purple-light',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero section - reduced vertical padding */}
        <section className="max-w-7xl mx-auto px-6 py-10 md:py-16 flex flex-col items-center text-center">
          <div className="inline-block mb-4 animate-fade-in">
            <div className="px-4 py-1 bg-white/5 backdrop-blur-md rounded-full text-white/70 text-sm font-medium">
              Elevate Your Prop Betting Strategy
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-merriweather font-bold text-white animate-slide-up" style={{ animationDelay: '100ms' }}>
            NBA Prop Bet <span className="text-gradient">Analyzer</span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            Make smarter NBA prop bets with data-driven insights. Analyze player performance, identify trends, and gain a competitive edge.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/analyzer">
              <Button className="text-navy-dark bg-teal hover:bg-teal-light px-8 py-6 font-bold text-lg transition-all duration-300 rounded-lg">
                Start Analyzing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" className="bg-transparent border border-white/20 hover:bg-white/5 text-white px-8 py-6 font-bold text-lg">
                How It Works
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Features section - reduced vertical padding */}
        <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-white">
              Data-Driven <span className="text-gradient">Insights</span>
            </h2>
            <p className="mt-3 text-lg text-white/70 max-w-2xl mx-auto">
              Our analyzer provides comprehensive tools to help you make informed decisions on NBA prop bets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover-scale"
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-merriweather font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA section - reduced vertical padding */}
        <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
          <div className="glass rounded-xl p-8 md:p-10 bg-gradient-to-br from-navy-light/50 to-navy-dark/90">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-merriweather font-bold text-white mb-3">
                  Ready to elevate your betting strategy?
                </h2>
                <p className="text-white/70 max-w-xl">
                  Start analyzing NBA player performance data now and gain a competitive edge in your prop betting.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/analyzer">
                  <Button className="text-navy-dark bg-teal hover:bg-teal-light px-8 py-6 font-bold text-lg transition-all duration-300 rounded-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer - reduced vertical padding */}
      <footer className="py-6 md:py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-teal flex items-center justify-center">
              <span className="text-white font-merriweather font-bold text-sm">NP</span>
            </div>
            <span className="text-sm text-white/70">NBA Prop Bet Analyzer © 2023</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
