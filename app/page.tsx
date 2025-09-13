'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BusSelector from './components/BusSelector';
import BusSchedule from './components/BusSchedule';
import Header from './components/Header';
import { BusData, BusLine } from './types/bus';

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import('./components/BusMap'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
});

export default function Home() {
  const [busData, setBusData] = useState<BusData | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusLine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchBusData = async () => {
    try {
      const response = await fetch('/api/bus-data');
      if (!response.ok) {
        throw new Error('Failed to fetch bus data');
      }
      const data = await response.json();
      
      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.message || data.error);
      }
      
      // Check if we're using fallback data
      const isFallback = response.headers.get('X-Data-Source') === 'fallback';
      setIsDemoMode(isFallback);
      
      setBusData(data);
      if (data.bus_lines && data.bus_lines.length > 0) {
        setSelectedBus(data.bus_lines[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchBusData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bus data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchBusData}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!busData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header companyInfo={busData.company_info} />
      
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Demo Mode:</strong> The external API is not accessible. Showing sample data for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bus Selection Panel */}
          <div className="lg:col-span-1">
            <BusSelector 
              busLines={busData.bus_lines}
              selectedBus={selectedBus}
              onBusSelect={setSelectedBus}
            />
          </div>

          {/* Map and Schedule */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedBus ? `${selectedBus.name} - Live Map` : 'Select a Bus Route'}
                </h2>
              </div>
              <div className="h-96">
                {selectedBus ? (
                  <DynamicMap busLine={selectedBus} />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Please select a bus route to view the map</p>
                  </div>
                )}
              </div>
            </div>

            {/* Schedule Table */}
            {selectedBus && (
              <BusSchedule busLine={selectedBus} />
            )}
          </div>
        </div>

        {/* Operational Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Operational Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{busData.operational_summary.total_buses}</div>
              <div className="text-sm text-gray-600">Total Buses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{busData.operational_summary.active_buses}</div>
              <div className="text-sm text-gray-600">Active Buses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{busData.operational_summary.current_passengers}</div>
              <div className="text-sm text-gray-600">Current Passengers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{busData.operational_summary.average_utilization}%</div>
              <div className="text-sm text-gray-600">Avg Utilization</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
