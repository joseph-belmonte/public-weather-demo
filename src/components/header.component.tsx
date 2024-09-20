import React from "react";
import useClock from "@/hooks/useClock";
import SearchBar from "./searchbar.component";

interface HeaderProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  coordinates: number[] | null;
  isLoading: boolean;
}

export default function Header({
  location,
  setLocation,
  coordinates,
  isLoading,
}: HeaderProps) {
  // Call useClock unconditionally but handle cases where coordinates might be null
  const { time, date, timezone } = useClock(
    coordinates ? coordinates[1] : 40.7128,
    coordinates ? coordinates[0] : 73.935242
  );

  return (
    <div id="header" className="self-start bg-transparent p-4">
      {!coordinates && (
        <p className="text-red-500">Coordinates not available.</p>
      )}

      {coordinates && !isLoading && (
        <div className="clock text-2xl py-2 flex flex-col">
          <span>Local Time:</span>
          <span>
            {time} {timezone.replace("_", " ")}
          </span>
          <span>{date}</span>
        </div>
      )}

      <SearchBar location={location} setLocation={setLocation} />
    </div>
  );
}
