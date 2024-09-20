import { useState, useEffect } from "react";
import { saveToCache, loadFromCache } from "@/utils/cache";

const CACHE_KEY_PREFIX = "timezone_";

// Define DST transition window checks
const isNearDSTTransition = (currentDate: Date) => {
  // Calculate the first Sunday in November (Fall back)
  const firstNovemberSunday = new Date(currentDate.getFullYear(), 10, 1);
  while (firstNovemberSunday.getDay() !== 0) {
    firstNovemberSunday.setDate(firstNovemberSunday.getDate() + 1);
  }

  // Calculate the second Sunday in March (Spring forward)
  const secondMarchSunday = new Date(currentDate.getFullYear(), 2, 1);
  while (secondMarchSunday.getDay() !== 0) {
    secondMarchSunday.setDate(secondMarchSunday.getDate() + 1);
  }
  secondMarchSunday.setDate(secondMarchSunday.getDate() + 7);

  // Define the transition windows
  const fallBackWindowStart = new Date(firstNovemberSunday);
  fallBackWindowStart.setDate(fallBackWindowStart.getDate() - 7);
  const fallBackWindowEnd = new Date(firstNovemberSunday);
  fallBackWindowEnd.setDate(fallBackWindowEnd.getDate() + 7);

  const springForwardWindowStart = new Date(secondMarchSunday);
  springForwardWindowStart.setDate(springForwardWindowStart.getDate() - 7);
  const springForwardWindowEnd = new Date(secondMarchSunday);
  springForwardWindowEnd.setDate(springForwardWindowEnd.getDate() + 7);

  // Check if current date falls within the transition windows
  return (
    (currentDate >= fallBackWindowStart && currentDate <= fallBackWindowEnd) ||
    (currentDate >= springForwardWindowStart &&
      currentDate <= springForwardWindowEnd)
  );
};

const useClock = (latitude: number, longitude: number) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    const fetchTimeZone = async () => {
      const cacheKey = `${CACHE_KEY_PREFIX}${latitude}_${longitude}`;

      let cachedTimezone: string | null = null;
      try {
        cachedTimezone = loadFromCache(cacheKey);
      } catch (error) {
        console.error("Error loading timezone from cache:", error);
        cachedTimezone = null;
      }

      const currentDate = new Date();

      // Check if cached data is valid and not during DST transition windows
      if (
        cachedTimezone &&
        typeof cachedTimezone === "string" &&
        cachedTimezone.trim() &&
        !isNearDSTTransition(currentDate)
      ) {
        console.log("Using cached timezone:", cachedTimezone);
        setTimezone(cachedTimezone);
        return;
      }

      try {
        const response = await fetch(
          `/api/timezone?lat=${latitude}&lng=${longitude}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch timezone data");
        }

        const data = await response.json();

        if (data.zoneName && typeof data.zoneName === "string") {
          setTimezone(data.zoneName);
          saveToCache(cacheKey, data.zoneName); // Save timezone to cache
        } else {
          throw new Error("Invalid timezone data received");
        }
      } catch (error) {
        console.error("Error fetching time zone:", error);
        setTimezone(""); // Avoid setting "Unknown" here
      }
    };

    if (latitude !== undefined && longitude !== undefined) {
      fetchTimeZone();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const updateTimeAndDate = () => {
      if (!timezone) return; // Avoid calling Intl.DateTimeFormat with an invalid timezone

      try {
        const now = new Date();

        const options: Intl.DateTimeFormatOptions = {
          timeZone: timezone,
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
        const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
          now
        );

        const formattedDate = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(now);

        setTime(formattedTime);
        setDate(formattedDate);
      } catch (error) {
        console.error("Error formatting date and time:", error);
        // Optional: You can fallback to the local time if timezone fails
      }
    };

    if (timezone) {
      updateTimeAndDate();
      const intervalId = setInterval(updateTimeAndDate, 1000 * 60);

      return () => clearInterval(intervalId);
    }
  }, [timezone]);

  return { time, date, timezone };
};

export default useClock;
