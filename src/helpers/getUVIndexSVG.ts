import { UviAPIResponse } from "@/types/types";

export const getUVIndexSvg = (response: UviAPIResponse | null): string => {
  if (!response || !response.UV_INDEX) {
    // Default icon when data is not available
    return `/weather-svgs/uv-index.svg`;
  }

  const uvIndex = parseInt(response.UV_INDEX, 10);

  if (uvIndex >= 1 && uvIndex <= 11) {
    return `/weather-svgs/uv-index-${uvIndex}.svg`;
  } else {
    return `/weather-svgs/uv-index.svg`;
  }
};
