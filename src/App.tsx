import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CurrencyCard } from './components/CurrencyCard';
import { PriceChart } from './components/PriceChart';
import { SystemStatus } from './components/SystemStatus';
import { DataProviderStats } from './components/DataProviderStats';
import { useForexData } from './hooks/useForexData';
import { BarChart3, Activity, Settings, TrendingUp } from 'lucide-react';

function App() {
  const { currencyPairs, priceHistory, systemStatus, providerStats } = useForexData();
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'system' | 'analytics'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'charts', label: 'Charts', icon: BarChart3 },
    { id: 'system', label: 'System', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Currency Pairs Grid */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Live Currency Pairs</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currencyPairs.map((pair) => (
                    <CurrencyCard
                      key={pair.pair}
                      pair={pair.pair}
                      bid={pair.bid}
                      ask={pair.ask}
                      change={pair.change}
                      changePercent={pair.changePercent}
                      volume={pair.volume}
                      provider={pair.provider}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Chart Preview */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Price Movement</h2>
                  <select
                    value={selectedPair}
                    onChange={(e) => setSelectedPair(e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    {currencyPairs.map((pair) => (
                      <option key={pair.pair} value={pair.pair}>
                        {pair.pair}
                      </option>
                    ))}
                  </select>
                </div>
                {priceHistory[selectedPair] && (
                  <PriceChart data={priceHistory[selectedPair]} pair={selectedPair} />
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'charts' && (
            <motion.div
              key="charts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Advanced Charts</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedPair}
                    onChange={(e) => setSelectedPair(e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    {currencyPairs.map((pair) => (
                      <option key={pair.pair} value={pair.pair}>
                        {pair.pair}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {priceHistory[selectedPair] && (
                    <PriceChart data={priceHistory[selectedPair]} pair={selectedPair} />
                  )}
                </div>
                <div className="space-y-6">
                  {currencyPairs
                    .filter(pair => pair.pair === selectedPair)
                    .map((pair) => (
                      <CurrencyCard
                        key={pair.pair}
                        pair={pair.pair}
                        bid={pair.bid}
                        ask={pair.ask}
                        change={pair.change}
                        changePercent={pair.changePercent}
                        volume={pair.volume}
                        provider={pair.provider}
                      />
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-white">System Monitoring</h2>
              <SystemStatus {...systemStatus} />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-white">Data Provider Analytics</h2>
              <DataProviderStats {...providerStats} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              © 2024 Toyota-32Bit Forex Data Integration Platform
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Real-time data powered by Kafka</span>
              <span>•</span>
              <span>Analytics by OpenSearch</span>
              <span>•</span>
              <span>Cached with Redis</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;