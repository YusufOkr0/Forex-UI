import { useState, useEffect } from 'react';

export interface CurrencyPair {
  pair: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  volume: string;
  provider: 'TCP' | 'REST';
  lastUpdate: string;
}

export interface PriceData {
  time: string;
  bid: number;
  ask: number;
  volume: number;
}

export interface SystemStatus {
  kafkaStatus: 'online' | 'offline' | 'warning';
  redisStatus: 'online' | 'offline' | 'warning';
  postgresStatus: 'online' | 'offline' | 'warning';
  opensearchStatus: 'online' | 'offline' | 'warning';
  tcpProviderStatus: 'online' | 'offline' | 'warning';
  restProviderStatus: 'online' | 'offline' | 'warning';
}

export interface ProviderStats {
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

// Simulated data - in real implementation, this would connect to your Kafka/WebSocket
export const useForexData = () => {
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
  const [priceHistory, setPriceHistory] = useState<{ [key: string]: PriceData[] }>({});
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    kafkaStatus: 'online',
    redisStatus: 'online',
    postgresStatus: 'online',
    opensearchStatus: 'online',
    tcpProviderStatus: 'online',
    restProviderStatus: 'online',
  });
  const [providerStats, setProviderStats] = useState<ProviderStats>({
    tcpStats: {
      messagesPerSecond: 45,
      totalMessages: 1250000,
      uptime: '2d 14h 32m',
      activePairs: 8,
    },
    restStats: {
      requestsPerMinute: 120,
      totalRequests: 890000,
      uptime: '2d 14h 32m',
      activePairs: 6,
    },
  });

  // Initialize currency pairs based on your README
  useEffect(() => {
    const initialPairs: CurrencyPair[] = [
      {
        pair: 'EUR/USD',
        bid: 1.08450,
        ask: 1.08470,
        change: 0.00125,
        changePercent: 0.115,
        volume: '2.4M',
        provider: 'TCP',
        lastUpdate: new Date().toISOString(),
      },
      {
        pair: 'GBP/USD',
        bid: 1.26780,
        ask: 1.26800,
        change: -0.00340,
        changePercent: -0.268,
        volume: '1.8M',
        provider: 'TCP',
        lastUpdate: new Date().toISOString(),
      },
      {
        pair: 'USD/TRY',
        bid: 32.4580,
        ask: 32.4620,
        change: 0.1250,
        changePercent: 0.386,
        volume: '890K',
        provider: 'REST',
        lastUpdate: new Date().toISOString(),
      },
      {
        pair: 'EUR/TRY',
        bid: 35.2145,
        ask: 35.2190,
        change: 0.0890,
        changePercent: 0.253,
        volume: '650K',
        provider: 'TCP',
        lastUpdate: new Date().toISOString(),
      },
      {
        pair: 'GBP/TRY',
        bid: 41.1580,
        ask: 41.1630,
        change: -0.2150,
        changePercent: -0.521,
        volume: '420K',
        provider: 'REST',
        lastUpdate: new Date().toISOString(),
      },
      {
        pair: 'USD/JPY',
        bid: 149.850,
        ask: 149.870,
        change: 0.450,
        changePercent: 0.301,
        volume: '3.1M',
        provider: 'TCP',
        lastUpdate: new Date().toISOString(),
      },
    ];

    setCurrencyPairs(initialPairs);

    // Initialize price history
    const history: { [key: string]: PriceData[] } = {};
    initialPairs.forEach(pair => {
      history[pair.pair] = generatePriceHistory(pair.bid, pair.ask);
    });
    setPriceHistory(history);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrencyPairs(prev => prev.map(pair => {
        const volatility = Math.random() * 0.001 - 0.0005; // Random price movement
        const newBid = pair.bid + volatility;
        const newAsk = pair.ask + volatility;
        const change = newBid - (pair.bid - pair.change);
        const changePercent = (change / pair.bid) * 100;

        return {
          ...pair,
          bid: newBid,
          ask: newAsk,
          change,
          changePercent,
          lastUpdate: new Date().toISOString(),
        };
      }));

      // Update price history
      setPriceHistory(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(pairName => {
          const currentPair = currencyPairs.find(p => p.pair === pairName);
          if (currentPair) {
            const newPoint: PriceData = {
              time: new Date().toISOString(),
              bid: currentPair.bid,
              ask: currentPair.ask,
              volume: Math.floor(Math.random() * 1000000),
            };
            updated[pairName] = [...updated[pairName].slice(-49), newPoint]; // Keep last 50 points
          }
        });
        return updated;
      });

      // Update provider stats
      setProviderStats(prev => ({
        tcpStats: {
          ...prev.tcpStats,
          messagesPerSecond: Math.floor(Math.random() * 20) + 35,
          totalMessages: prev.tcpStats.totalMessages + Math.floor(Math.random() * 50) + 20,
        },
        restStats: {
          ...prev.restStats,
          requestsPerMinute: Math.floor(Math.random() * 30) + 100,
          totalRequests: prev.restStats.totalRequests + Math.floor(Math.random() * 10) + 5,
        },
      }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [currencyPairs]);

  return {
    currencyPairs,
    priceHistory,
    systemStatus,
    providerStats,
  };
};

// Helper function to generate initial price history
const generatePriceHistory = (initialBid: number, initialAsk: number): PriceData[] => {
  const history: PriceData[] = [];
  let currentBid = initialBid;
  let currentAsk = initialAsk;

  for (let i = 49; i >= 0; i--) {
    const time = new Date(Date.now() - i * 2000).toISOString();
    const volatility = Math.random() * 0.001 - 0.0005;
    currentBid += volatility;
    currentAsk += volatility;

    history.push({
      time,
      bid: currentBid,
      ask: currentAsk,
      volume: Math.floor(Math.random() * 1000000),
    });
  }

  return history;
};