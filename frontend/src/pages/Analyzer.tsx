import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';
import StatCard from '@/components/StatCard';
import GameLogTable from '@/components/GameLogTable';
import PerformanceChart from '@/components/PerformanceChart';
import ComparisonChart from '@/components/ComparisonChart';
import LoadingState from '@/components/LoadingState';
import { usePlayerData } from '@/hooks/usePlayerData';
import { Target } from 'lucide-react';

const Analyzer = () => {
  const [selectedChartStat, setSelectedChartStat] = useState<'points' | 'rebounds' | 'assists'>('points');
  
  const {
    playerData,
    isAnalyzing,
    analyze,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedPlayer,
    setSelectedPlayer,
  } = usePlayerData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search Section */}
          <div className="mb-8 animate-fade-in">
            <SearchSection 
              onSearch={analyze}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isSearching={isSearching}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          
          {isAnalyzing ? (
            <LoadingState type="pulse" height="h-[400px]" message="Analyzing player data..." />
          ) : !playerData ? (
            <div className="glass rounded-xl p-12 text-center">
              <h2 className="text-2xl font-merriweather font-bold text-white mb-4">Welcome to the NBA Prop Bet Analyzer</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Search for an NBA player and adjust the filters to analyze their performance data and get prop betting insights.
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Player Overview */}
              <div className="glass rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-merriweather font-bold text-white">
                      {playerData.playerName}
                    </h1>
                    <p className="text-white/70 mt-1">
                      Last {playerData.gameLogs.length} Games
                      {filters.opponent !== 'ANY' && ` vs ${filters.opponent}`}
                      {filters.location !== 'ANY' && ` (${filters.location === 'H' ? 'Home' : 'Away'} Games)`}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className="text-sm text-white/70 flex items-center">
                      <Target className="h-4 w-4 mr-2 text-teal" />
                      Custom Prop Lines: 
                      <span className="ml-2 px-2 py-1 bg-navy-dark/70 rounded text-white text-xs">
                        PTS {filters.betLines.points}
                      </span>
                      <span className="ml-2 px-2 py-1 bg-navy-dark/70 rounded text-white text-xs">
                        REB {filters.betLines.rebounds}
                      </span>
                      <span className="ml-2 px-2 py-1 bg-navy-dark/70 rounded text-white text-xs">
                        AST {filters.betLines.assists}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Stat Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard 
                    title="POINTS" 
                    statType="points" 
                    summary={playerData.stats.points} 
                    betLine={filters.betLines.points} 
                  />
                  <StatCard 
                    title="REBOUNDS" 
                    statType="rebounds" 
                    summary={playerData.stats.rebounds} 
                    betLine={filters.betLines.rebounds} 
                  />
                  <StatCard 
                    title="ASSISTS" 
                    statType="assists" 
                    summary={playerData.stats.assists} 
                    betLine={filters.betLines.assists} 
                  />
                </div>
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Tabs defaultValue="points" onValueChange={(v) => setSelectedChartStat(v as any)}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-merriweather font-bold text-white">Performance Trends</h2>
                      <TabsList className="bg-navy-dark/50">
                        <TabsTrigger value="points" className="data-[state=active]:bg-teal data-[state=active]:text-navy-dark">Points</TabsTrigger>
                        <TabsTrigger value="rebounds" className="data-[state=active]:bg-purple data-[state=active]:text-white">Rebounds</TabsTrigger>
                        <TabsTrigger value="assists" className="data-[state=active]:bg-purple-light data-[state=active]:text-white">Assists</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="points">
                      <PerformanceChart 
                        data={playerData.gameLogs} 
                        betLines={filters.betLines} 
                        selectedStat="points" 
                      />
                    </TabsContent>
                    <TabsContent value="rebounds">
                      <PerformanceChart 
                        data={playerData.gameLogs} 
                        betLines={filters.betLines} 
                        selectedStat="rebounds" 
                      />
                    </TabsContent>
                    <TabsContent value="assists">
                      <PerformanceChart 
                        data={playerData.gameLogs} 
                        betLines={filters.betLines} 
                        selectedStat="assists" 
                      />
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div>
                  <h2 className="text-xl font-merriweather font-bold text-white mb-4">Performance vs. Betting Lines</h2>
                  <ComparisonChart data={playerData.gameLogs} betLines={filters.betLines} />
                </div>
              </div>
              
              {/* Game Log Table */}
              <div>
                <h2 className="text-xl font-merriweather font-bold text-white mb-4">Game Log</h2>
                <GameLogTable data={playerData.gameLogs} betLines={filters.betLines} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analyzer;
