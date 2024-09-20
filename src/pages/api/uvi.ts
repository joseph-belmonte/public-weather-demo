import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BASE_URL = "https://data.epa.gov/efservice";

async function getUVIndexData(zipCode: string, city: string, state: string) {
  if (zipCode) {
    return axios.get(`${BASE_URL}/getEnvirofactsUVDaily/ZIP/${zipCode}/JSON`);
  } else if (city && state) {
    return axios.get(
      `${BASE_URL}/getEnvirofactsUVDaily/CITY/${city}/STATE/${state}/JSON`
    );
  } else {
    throw new Error("Invalid parameters");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { zipCode, city, state } = req.query;

  if (
    (typeof zipCode !== "string" || zipCode.length === 0) &&
    (!city || !state || typeof city !== "string" || typeof state !== "string")
  ) {
    return res
      .status(400)
      .json({ error: "Either zipCode or city and state are required." });
  }

  try {
    const response = await getUVIndexData(
      zipCode as string,
      city as string,
      state as string
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching UV Index data:", error);
    res.status(500).json({ error: "Failed to fetch UV Index data" });
  }
}
