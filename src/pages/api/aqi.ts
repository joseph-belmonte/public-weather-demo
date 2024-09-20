import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const AQI_BASE_URL =
  "https://www.airnowapi.org/aq/observation/latLong/current/";
const AQI_API_KEY = process.env.AIR_NOW_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const url = `${AQI_BASE_URL}?format=application/json&latitude=${latitude}&longitude=${longitude}&distance=25&API_KEY=${AQI_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    res.status(500).json({ error: "Failed to fetch AQI data" });
  }
}
