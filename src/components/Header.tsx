import React from 'react';
import { TrendingUp, Activity, Database, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TOYOTA-32BIT</h1>
              <p className="text-sm text-gray-400">Forex Data Integration Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Data</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4" />
              <span>Kafka Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <Database className="w-4 h-4" />
              <span>PostgreSQL</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span>Redis Cache</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};