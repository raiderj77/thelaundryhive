/**
 * AI Route Optimizer Utility
 * Uses Mapbox Optimized Trips API to calculate the most efficient sequence
 * for laundry pickups and deliveries.
 */

export const optimizeRoute = async (locations: { lat: number; lng: number }[]) => {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  if (!MAPBOX_TOKEN) {
    console.error("Mapbox Token missing. Route optimization will use sequential fallback.");
    return locations;
  }

  // Format coordinates for Mapbox: longitude,latitude;longitude,latitude...
  const coordinates = locations
    .map(loc => `${loc.lng},${loc.lat}`)
    .join(';');

  try {
    const response = await fetch(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates}?access_token=${MAPBOX_TOKEN}&overview=full&steps=true`
    );

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // The 'waypoints' array in the response contains the re-ordered indices
    // of the original locations in their optimal order.
    return data;
  } catch (error) {
    console.error("Optimization failed:", error);
    return null;
  }
};
