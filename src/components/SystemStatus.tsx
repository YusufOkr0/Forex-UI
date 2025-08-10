import React from 'react';
import { Server, Database, Zap, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SystemStatusProps {
  kafkaStatus: 'online' | 'offline' | 'warning';
  redisStatus: 'online' | 'offline' | 'warning';
  postgresStatus: 'online' | 'offline' | 'warning';
  opensearchStatus: 'online' | 'offline' | 'warning';
  tcpProviderStatus: 'online' | 'offline' | 'warning';
  restProviderStatus: 'online' | 'offline' | 'warning';
}

const StatusIndicator: React.FC<{ status: 'online' | 'offline' | 'warning' }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'offline': return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="text-xs font-medium capitalize">{status}</span>
    </div>
  );
};

export const SystemStatus: React.FC<SystemStatusProps> = ({
  kafkaStatus,
  redisStatus,
  postgresStatus,
  opensearchStatus,
  tcpProviderStatus,
  restProviderStatus
}) => {
  const services = [
    { name: 'Kafka', icon: Activity, status: kafkaStatus, description: 'Message Broker' },
    { name: 'Redis', icon: Zap, status: redisStatus, description: 'Cache Layer' },
    { name: 'PostgreSQL', icon: Database, status: postgresStatus, description: 'Database' },
    { name: 'OpenSearch', icon: Server, status: opensearchStatus, description: 'Analytics' },
    { name: 'TCP Provider', icon: Server, status: tcpProviderStatus, description: 'Data Source' },
    { name: 'REST Provider', icon: Server, status: restProviderStatus, description: 'Data Source' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6"
    >
      <h3 className="text-lg font-bold text-white mb-6">System Status</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <service.icon className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">{service.name}</span>
              </div>
              <StatusIndicator status={service.status} />
            </div>
            <p className="text-xs text-gray-400">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Last Updated:</span>
          <span className="text-white font-mono">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </motion.div>
  );
};