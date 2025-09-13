import { BusLine } from '../types/bus';

interface BusSelectorProps {
  busLines: BusLine[];
  selectedBus: BusLine | null;
  onBusSelect: (bus: BusLine) => void;
}

export default function BusSelector({ busLines, selectedBus, onBusSelect }: BusSelectorProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out of service':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCapacityColor = (utilization: number) => {
    if (utilization >= 80) return 'text-red-600';
    if (utilization >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Select Bus Route</h2>
        <p className="text-sm text-gray-600">Choose a bus to view its route and schedule</p>
      </div>
      
      <div className="p-4 space-y-3">
        {busLines.map((bus) => (
          <div
            key={bus.id}
            onClick={() => onBusSelect(bus)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedBus?.id === bus.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{bus.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(bus.status)}`}>
                {bus.status}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Route:</span> {bus.route_number}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-gray-500">Passengers:</span>
                  <span className={`ml-1 font-medium ${getCapacityColor(bus.passengers.utilization_percentage)}`}>
                    {bus.passengers.current}/{bus.passengers.capacity}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Capacity:</span>
                  <span className="ml-1 font-medium">{bus.passengers.utilization_percentage}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              <div>Driver: {bus.driver.name}</div>
              <div>Vehicle: {bus.vehicle_info.license_plate}</div>
            </div>
            
            {bus.incidents.length > 0 && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                <div className="text-xs text-red-600 font-medium">
                  ⚠️ {bus.incidents.length} incident(s) reported
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
