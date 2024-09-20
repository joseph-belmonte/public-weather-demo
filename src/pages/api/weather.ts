import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { geocodeLocation } from "@/helpers/geocodeLocation";

const NWS_BASE_URL = "https://api.weather.gov";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { location } = req.query;

  if (!location || typeof location !== "string") {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const [lng, lat] = await geocodeLocation(location);

    const WxOfficeURL = `${NWS_BASE_URL}/points/${lat},${lng}`;
    const officeResponse = await axios.get(WxOfficeURL);
    const forecastURL = officeResponse.data.properties.forecast;
    const forecastResponse = await axios.get(forecastURL);

    if (forecastResponse.data && forecastResponse.data.properties) {
      res.status(200).json({
        weatherData: forecastResponse.data.properties,
        latitude: lat,
        longitude: lng,
      });
    } else {
      throw new Error("Unexpected data format from weather service");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
