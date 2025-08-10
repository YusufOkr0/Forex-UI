import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrencyCardProps {
  pair: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  volume: string;
  provider: 'TCP' | 'REST';
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({
  pair,
  bid,
  ask,
  change,
  changePercent,
  volume,
  provider
}) => {
  const isPositive = change >= 0;
  const spread = ((ask - bid) / bid * 10000).toFixed(1); // in pips

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-bold text-white">{pair}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            provider === 'TCP' 
              ? 'bg-blue-900 text-blue-300' 
              : 'bg-purple-900 text-purple-300'
          }`}>
            {provider}
          </span>
        </div>
        <div className={`flex items-center space-x-1 ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">BID</p>
          <p className="text-lg font-mono font-bold text-red-400">{bid.toFixed(5)}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">ASK</p>
          <p className="text-lg font-mono font-bold text-green-400">{ask.toFixed(5)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-400">
          <span>Spread: </span>
          <span className="text-white font-medium">{spread} pips</span>
        </div>
        <div className="text-gray-400">
          <span>Vol: </span>
          <span className="text-white font-medium">{volume}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className={`text-sm font-medium ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? '+' : ''}{change.toFixed(5)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
        </div>
      </div>
    </motion.div>
  );
};