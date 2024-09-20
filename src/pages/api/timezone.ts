import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng } = req.query;
  const apiKey = process.env.TIMEZONEDB_API_KEY;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required." });
  }

  try {
    const response = await axios.get(
      "https://api.timezonedb.com/v2.1/get-time-zone",
      {
        params: {
          key: apiKey,
          format: "json",
          by: "position",
          lat,
          lng,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Failed to fetch time zone data:", error);
    res.status(500).json({ error: "Failed to fetch time zone data" });
  }
}
