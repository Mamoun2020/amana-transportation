import { BusData } from '../types/bus';

export const fallbackBusData: BusData = {
  message: "Amana Transportation bus data retrieved successfully (Demo Mode)",
  company_info: {
    name: "Amana Transportation",
    founded: "2019",
    headquarters: "Kuala Lumpur, Malaysia",
    industry: "Public Transportation",
    description: "Modern public bus service connecting key areas in Kuala Lumpur and surrounding regions, focused on reliability and passenger comfort."
  },
  bus_lines: [
    {
      id: 1,
      name: "KLCC - Petaling Jaya Express",
      route_number: "B101",
      current_location: {
        latitude: 3.158,
        longitude: 101.711,
        address: "Jalan Ampang, near KLCC Twin Towers, Kuala Lumpur"
      },
      status: "Active",
      passengers: {
        current: 32,
        capacity: 45,
        utilization_percentage: 71
      },
      driver: {
        name: "Ahmad Rahman",
        id: "DRV001",
        shift_start: "06:00",
        shift_end: "18:00"
      },
      bus_stops: [
        {
          id: 1,
          name: "KLCC Station",
          latitude: 3.1578,
          longitude: 101.7114,
          estimated_arrival: "14:20",
          is_next_stop: true
        },
        {
          id: 2,
          name: "Pavilion KL",
          latitude: 3.149,
          longitude: 101.7101,
          estimated_arrival: "14:28",
          is_next_stop: false
        },
        {
          id: 3,
          name: "Mid Valley Megamall",
          latitude: 3.1177,
          longitude: 101.6774,
          estimated_arrival: "14:42",
          is_next_stop: false
        },
        {
          id: 4,
          name: "KL Sentral",
          latitude: 3.1338,
          longitude: 101.6869,
          estimated_arrival: "14:50",
          is_next_stop: false
        },
        {
          id: 5,
          name: "Universiti Malaya",
          latitude: 3.1204,
          longitude: 101.6535,
          estimated_arrival: "15:05",
          is_next_stop: false
        },
        {
          id: 6,
          name: "Petaling Jaya SS2",
          latitude: 3.1147,
          longitude: 101.624,
          estimated_arrival: "15:18",
          is_next_stop: false
        },
        {
          id: 7,
          name: "1 Utama Shopping Centre",
          latitude: 3.1502,
          longitude: 101.6154,
          estimated_arrival: "15:35",
          is_next_stop: false
        }
      ],
      incidents: [],
      vehicle_info: {
        license_plate: "WKL 2891",
        model: "Scania K230UB",
        year: 2019,
        fuel_level: 75,
        last_maintenance: "2024-12-01"
      },
      route_info: {
        total_distance: 28.5,
        average_speed: 25,
        estimated_completion: "16:00",
        frequency_minutes: 20
      }
    },
    {
      id: 2,
      name: "Old Town - Mont Kiara Connector",
      route_number: "B205",
      current_location: {
        latitude: 3.139,
        longitude: 101.6869,
        address: "KL Sentral Transportation Hub, Kuala Lumpur"
      },
      status: "Active",
      passengers: {
        current: 28,
        capacity: 40,
        utilization_percentage: 70
      },
      driver: {
        name: "Siti Aminah",
        id: "DRV002",
        shift_start: "05:30",
        shift_end: "17:30"
      },
      bus_stops: [
        {
          id: 1,
          name: "KL Sentral",
          latitude: 3.1338,
          longitude: 101.6869,
          estimated_arrival: "14:15",
          is_next_stop: false
        },
        {
          id: 2,
          name: "Central Market",
          latitude: 3.1427,
          longitude: 101.6964,
          estimated_arrival: "14:25",
          is_next_stop: true
        },
        {
          id: 3,
          name: "Chinatown",
          latitude: 3.1436,
          longitude: 101.6958,
          estimated_arrival: "14:30",
          is_next_stop: false
        },
        {
          id: 4,
          name: "Titiwangsa LRT",
          latitude: 3.1729,
          longitude: 101.7016,
          estimated_arrival: "14:45",
          is_next_stop: false
        },
        {
          id: 5,
          name: "Mont Kiara",
          latitude: 3.1727,
          longitude: 101.6509,
          estimated_arrival: "15:00",
          is_next_stop: false
        },
        {
          id: 6,
          name: "Sri Hartamas",
          latitude: 3.1653,
          longitude: 101.6493,
          estimated_arrival: "15:10",
          is_next_stop: false
        }
      ],
      incidents: [
        {
          id: 1,
          type: "Route",
          description: "Route deviation",
          reported_by: "Driver-2A",
          reported_time: "1:34 PM",
          status: "Reported",
          priority: "High"
        }
      ],
      vehicle_info: {
        license_plate: "WKL 1547",
        model: "Mercedes-Benz Citaro",
        year: 2020,
        fuel_level: 60,
        last_maintenance: "2024-11-28"
      },
      route_info: {
        total_distance: 22.3,
        average_speed: 22,
        estimated_completion: "15:30",
        frequency_minutes: 25
      }
    },
    {
      id: 3,
      name: "Airport - City Circle",
      route_number: "B350",
      current_location: {
        latitude: 2.7456,
        longitude: 101.7072,
        address: "KLIA Express Station, Sepang, Selangor"
      },
      status: "Active",
      passengers: {
        current: 15,
        capacity: 50,
        utilization_percentage: 30
      },
      driver: {
        name: "Lim Wei Ming",
        id: "DRV003",
        shift_start: "04:00",
        shift_end: "16:00"
      },
      bus_stops: [
        {
          id: 1,
          name: "KLIA Terminal 1",
          latitude: 2.7456,
          longitude: 101.7072,
          estimated_arrival: "14:30",
          is_next_stop: false
        },
        {
          id: 2,
          name: "KLIA Terminal 2",
          latitude: 2.7389,
          longitude: 101.6997,
          estimated_arrival: "14:40",
          is_next_stop: false
        },
        {
          id: 3,
          name: "Putrajaya Central",
          latitude: 2.9264,
          longitude: 101.6964,
          estimated_arrival: "15:10",
          is_next_stop: true
        },
        {
          id: 4,
          name: "Cyberjaya",
          latitude: 2.9213,
          longitude: 101.6543,
          estimated_arrival: "15:25",
          is_next_stop: false
        },
        {
          id: 5,
          name: "Bandar Tun Razak",
          latitude: 3.0733,
          longitude: 101.7317,
          estimated_arrival: "15:55",
          is_next_stop: false
        },
        {
          id: 6,
          name: "KL City Centre",
          latitude: 3.1519,
          longitude: 101.7077,
          estimated_arrival: "16:20",
          is_next_stop: false
        }
      ],
      incidents: [],
      vehicle_info: {
        license_plate: "WKL 3429",
        model: "Volvo B8RLE",
        year: 2018,
        fuel_level: 40,
        last_maintenance: "2024-12-03"
      },
      route_info: {
        total_distance: 85.2,
        average_speed: 35,
        estimated_completion: "17:30",
        frequency_minutes: 45
      }
    }
  ],
  operational_summary: {
    total_buses: 3,
    active_buses: 3,
    maintenance_buses: 0,
    out_of_service_buses: 0,
    total_capacity: 135,
    current_passengers: 75,
    average_utilization: 56
  },
  filters: {
    available_statuses: ["Active", "Maintenance", "Out of Service"],
    available_routes: ["B101", "B205", "B350"],
    applied: {
      status: null,
      busId: null,
      routeNumber: null
    }
  }
};
