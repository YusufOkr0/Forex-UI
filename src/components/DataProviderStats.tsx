import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface DataProviderStatsProps {
  tcpStats: {
    messagesPerSecond: number;
    totalMessages: number;
    uptime: string;
    activePairs: number;
  };
  restStats: {
    requestsPerMinute: number;
    totalRequests: number;
    uptime: string;
    activePairs: number;
  };
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

export const DataProviderStats: React.FC<DataProviderStatsProps> = ({ tcpStats, restStats }) => {
  const throughputData = [
    { name: 'TCP Provider', value: tcpStats.messagesPerSecond, color: '#3B82F6' },
    { name: 'REST Provider', value: restStats.requestsPerMinute / 60, color: '#8B5CF6' },
  ];

  const distributionData = [
    { name: 'TCP Messages', value: tcpStats.totalMessages, color: '#3B82F6' },
    { name: 'REST Requests', value: restStats.totalRequests, color: '#8B5CF6' },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Throughput Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Real-Time Throughput</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          Messages/Requests per second
        </div>
      </motion.div>

      {/* Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Data Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          {distributionData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Provider Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Provider Statistics</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* TCP Provider */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-blue-400">TCP Data Provider</h4>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Messages/sec:</span>
                <span className="text-white font-mono">{tcpStats.messagesPerSecond}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Messages:</span>
                <span className="text-white font-mono">{tcpStats.totalMessages.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Pairs:</span>
                <span className="text-white font-mono">{tcpStats.activePairs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime:</span>
                <span className="text-white font-mono">{tcpStats.uptime}</span>
              </div>
            </div>
          </div>

          {/* REST Provider */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-purple-400">REST Data Provider</h4>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Requests/min:</span>
                <span className="text-white font-mono">{restStats.requestsPerMinute}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Requests:</span>
                <span className="text-white font-mono">{restStats.totalRequests.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Pairs:</span>
                <span className="text-white font-mono">{restStats.activePairs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime:</span>
                <span className="text-white font-mono">{restStats.uptime}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};