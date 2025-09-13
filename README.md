# Amana Transportation - Bus Tracking System

A real-time bus tracking and route information system for Amana Transportation in Malaysia. This Next.js application provides an interactive map interface showing live bus locations, routes, and schedules.

## Features

- 🚌 **Real-time Bus Tracking**: Live location updates for all active buses
- 🗺️ **Interactive Map**: Leaflet.js-powered map with bus stops and routes
- 📊 **Route Information**: Detailed schedules and arrival times
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Auto-refresh**: Data updates every 30 seconds
- 🎨 **Modern UI**: Clean, intuitive interface based on Figma design

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet.js with React-Leaflet
- **Data Source**: Real-time API from Amana Transportation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd amana-transportation
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The application fetches real-time data from:
```
https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation
```

**CORS Solution**: Due to CORS restrictions, the app uses a Next.js API route (`/api/bus-data`) that acts as a proxy to fetch data server-side, avoiding browser CORS issues.

**Fallback Data**: If the external API is unavailable, the application automatically falls back to sample data to ensure the demo remains functional.

This API provides:
- Company information
- Live bus locations and status
- Route details and bus stops
- Passenger capacity data
- Driver information
- Incident reports

## Project Structure

```
app/
├── api/
│   └── bus-data/
│       └── route.ts        # API proxy route for CORS handling
├── components/
│   ├── BusMap.tsx          # Interactive map component
│   ├── BusSelector.tsx     # Bus route selection
│   ├── BusSchedule.tsx     # Schedule table
│   └── Header.tsx          # Application header
├── lib/
│   └── fallback-data.ts    # Fallback data for demo mode
├── types/
│   └── bus.ts              # TypeScript type definitions
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Main page component
```

## Key Components

### BusMap
- Interactive Leaflet map
- Real-time bus location markers
- Bus stop markers with arrival times
- Route visualization with polylines
- Custom icons for buses and stops

### BusSelector
- List of available bus routes
- Real-time status indicators
- Passenger capacity information
- Incident alerts

### BusSchedule
- Detailed stop-by-stop schedule
- Next stop highlighting
- Route statistics
- Time estimates

## Features in Detail

### Real-time Updates
- Automatic data refresh every 30 seconds
- Live passenger capacity tracking
- Current location updates
- Status change notifications

### Interactive Map
- Click on buses to see detailed information
- Click on stops to view arrival times
- Zoom and pan functionality
- Responsive design for all screen sizes

### Route Management
- Select any active bus route
- View complete stop schedule
- Track current progress
- See estimated completion times

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

Build for production:
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of the Amana Bootcamp program.

## Acknowledgments

- Amana Transportation for providing the API data
- Leaflet.js community for the mapping library
- Next.js team for the excellent framework
