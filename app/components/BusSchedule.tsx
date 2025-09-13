import { BusLine } from '../types/bus';

interface BusScheduleProps {
  busLine: BusLine;
}

export default function BusSchedule({ busLine }: BusScheduleProps) {
  const formatTime = (timeString: string) => {
    if (timeString === 'N/A') return 'N/A';
    return timeString;
  };

  const getStatusColor = (isNextStop: boolean) => {
    return isNextStop 
      ? 'bg-orange-100 text-orange-800 border-orange-200' 
      : 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Bus Schedule</h2>
        <p className="text-sm text-gray-600">
          {busLine.name} - Route {busLine.route_number}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stop
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Arrival Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coordinates
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {busLine.bus_stops.map((stop, index) => (
              <tr 
                key={stop.id}
                className={`hover:bg-gray-50 transition-colors ${
                  stop.is_next_stop ? 'bg-orange-50' : ''
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        stop.is_next_stop 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {stop.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatTime(stop.estimated_arrival)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                    getStatusColor(stop.is_next_stop)
                  }`}>
                    {stop.is_next_stop ? 'Next Stop' : 'Scheduled'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Route Information */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Total Distance:</span>
            <span className="ml-1 text-gray-600">{busLine.route_info.total_distance} km</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Avg Speed:</span>
            <span className="ml-1 text-gray-600">{busLine.route_info.average_speed} km/h</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Frequency:</span>
            <span className="ml-1 text-gray-600">Every {busLine.route_info.frequency_minutes} min</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Completion:</span>
            <span className="ml-1 text-gray-600">{formatTime(busLine.route_info.estimated_completion)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
