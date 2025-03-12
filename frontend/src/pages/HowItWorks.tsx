
import { Link } from 'react-router-dom';
import { ArrowRight, LineChart, Filter, Gauge, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-white text-center">
            How Our <span className="text-gradient">Analysis Works</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto text-center">
            Our NBA Prop Bet Analyzer uses advanced statistical methods to help you make informed betting decisions.
          </p>
          
          {/* Methodology steps */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="glass rounded-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-purple/10 text-purple-light flex items-center justify-center">
                      <Database size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-merriweather font-bold text-white mb-3">1. Data Collection</h3>
                    <p className="text-white/70 leading-relaxed">
                      We aggregate player performance data from official NBA statistics sources, including game logs from the current and previous seasons. Our system collects comprehensive statistics for points, rebounds, assists, and other relevant metrics.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="glass rounded-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                      <Filter size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-merriweather font-bold text-white mb-3">2. Contextual Filtering</h3>
                    <p className="text-white/70 leading-relaxed">
                      Our system allows you to apply specific filters to isolate the most relevant data for your analysis. Filter by opponent team, game location (home/away), recency (last n games), and other factors that might affect player performance.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="glass rounded-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-purple/10 text-purple-light flex items-center justify-center">
                      <LineChart size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-merriweather font-bold text-white mb-3">3. Statistical Analysis</h3>
                    <p className="text-white/70 leading-relaxed">
                      We calculate a range of statistical measures for each performance metric, including averages, medians, minimum and maximum values, and standard deviations. We also analyze trends over time to identify patterns and potential regression.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="glass rounded-xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                      <Gauge size={32} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-merriweather font-bold text-white mb-3">4. Confidence Assessment</h3>
                    <p className="text-white/70 leading-relaxed">
                      We evaluate your specified betting lines against our statistical analysis to determine the likelihood of over/under outcomes. Our confidence indicators take into account historical performance, consistency, matchup factors, and recent trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-white/70 mb-6">
                Ready to apply these analytical methods to your betting decisions?
              </p>
              <Link to="/analyzer">
                <Button className="text-navy-dark bg-teal hover:bg-teal-light px-8 py-6 font-bold text-lg transition-all duration-300 rounded-lg">
                  Try the Analyzer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Stats Explanation */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="glass rounded-xl p-8 md:p-12 bg-gradient-to-br from-navy-light/50 to-navy-dark/90">
            <h2 className="text-3xl font-merriweather font-bold text-white mb-8 text-center">
              Understanding Our Statistical Measures
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Average (Mean)</h3>
                <p className="text-white/70">
                  The sum of all values divided by the number of games. Provides a general measure of central tendency but can be skewed by outlier performances.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Median</h3>
                <p className="text-white/70">
                  The middle value when all performances are arranged in order. Often more representative than the average when there are outlier games.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Over Percentage</h3>
                <p className="text-white/70">
                  The percentage of games where the player exceeded the current betting line. A higher percentage indicates a stronger tendency to go over.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Recent Trend</h3>
                <p className="text-white/70">
                  Analysis of the player's last five games compared to their season average, indicating whether they're trending up, down, or stable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 md:py-12 px-6 border-t border-white/5">
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

export default HowItWorks;
