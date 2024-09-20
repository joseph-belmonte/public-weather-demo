import axios from "axios";

const GEOCODING_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export const geocodeLocation = async (
  location: string
): Promise<[number, number]> => {
  const mapboxToken = process.env.MAPBOX_TOKEN;
  if (!mapboxToken) {
    throw new Error("Mapbox token is not set");
  }

  const geocodeURL = `${GEOCODING_BASE_URL}/${encodeURIComponent(
    location
  )}.json?access_token=${mapboxToken}`;

  const geocodeResponse = await axios.get(geocodeURL);
  if (geocodeResponse.data.features.length === 0) {
    throw new Error("Location not found");
  }

  const [lng, lat] = geocodeResponse.data.features[0].center;
  return [lng, lat];
};
