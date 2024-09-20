import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GEOCODE_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { location } = req.query;

  if (!location || typeof location !== "string") {
    return res
      .status(400)
      .json({ error: "Location query parameter is required." });
  }

  if (!MAPBOX_TOKEN) {
    return res
      .status(500)
      .json({ error: "Mapbox token is not set in environment variables." });
  }

  try {
    // Construct the Mapbox Geocoding URL
    const geocodeURL = `${GEOCODE_BASE_URL}/${encodeURIComponent(
      location
    )}.json?access_token=${MAPBOX_TOKEN}`;



    // Make a request to Mapbox API
    const response = await axios.get(geocodeURL);

    // Check if we have received any features from the API response
    if (response.data.features.length === 0) {
      return res.status(404).json({ error: "Location not found." });
    }

    // Extract longitude and latitude from the first feature's center property
    const [longitude, latitude] = response.data.features[0].center;



    // Respond with the coordinates
    res.status(200).json({ longitude, latitude });
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    res.status(500).json({ error: "Failed to fetch geocode data." });
  }
}
