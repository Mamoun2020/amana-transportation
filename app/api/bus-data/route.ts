import { NextResponse } from 'next/server';
import { fallbackBusData } from '../../lib/fallback-data';

export async function GET() {
  try {
    const response = await fetch('https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Amana-Transportation-App/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=30, s-maxage=30',
      },
    });
  } catch (error) {
    console.error('Error fetching bus data, using fallback data:', error);
    
    // Return fallback data instead of error
    return NextResponse.json(fallbackBusData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=30, s-maxage=30',
        'X-Data-Source': 'fallback',
      },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
