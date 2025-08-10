import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface PriceData {
  time: string;
  bid: number;
  ask: number;
  volume: number;
}

interface PriceChartProps {
  data: PriceData[];
  pair: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
        <p className="text-gray-300 text-sm mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-red-400 text-sm">
            Bid: <span className="font-mono">{payload[0]?.value?.toFixed(5)}</span>
          </p>
          <p className="text-green-400 text-sm">
            Ask: <span className="font-mono">{payload[1]?.value?.toFixed(5)}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const PriceChart: React.FC<PriceChartProps> = ({ data, pair }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">{pair} Price Chart</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-300">Bid</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-300">Ask</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              domain={['dataMin - 0.0001', 'dataMax + 0.0001']}
              tickFormatter={(value) => value.toFixed(5)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="bid"
              stroke="#F87171"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#F87171' }}
            />
            <Line
              type="monotone"
              dataKey="ask"
              stroke="#34D399"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#34D399' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};