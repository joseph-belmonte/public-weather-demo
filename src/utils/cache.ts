const CACHE_MINUTES = 30;
const CACHE_EXPIRATION_TIME = CACHE_MINUTES * 60 * 1000;

// Save data to local storage with a timestamp, clearly distinguishing between data and error states
export const saveToCache = (key: string, data: any, isError = false) => {
  try {
    const cacheEntry = { data, error: isError };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
    localStorage.setItem(`${key}_timestamp`, Date.now().toString());
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

export const loadFromCache = (key: string): any | null => {
  const cachedData = localStorage.getItem(key);

  if (!cachedData || isCacheExpired(key)) {
    localStorage.removeItem(key); // Optional: Clean up expired cache
    return null;
  }

  try {
    const parsedData = JSON.parse(cachedData);

    if (parsedData.error) {
      console.warn(`Cache entry for ${key} contains an error.`);
      return null;
    }

    return parsedData.data;
  } catch (error) {
    console.error("Error parsing cached data:", error);
    return null;
  }
};

export const isCacheExpired = (key: string): boolean => {
  const cachedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (!cachedTimestamp) {
    return true; // Expired if no timestamp is found
  }

  const isExpired =
    Date.now() - parseInt(cachedTimestamp, 10) > CACHE_EXPIRATION_TIME;
  return isExpired;
};
