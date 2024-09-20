import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  location: string;
  setLocation: (location: string) => void;
}

export default function SearchBar({ location, setLocation }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(location); // Sync with location state
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Sync inputValue with location state whenever location changes
    setInputValue(location);
  }, [location]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (inputValue.trim()) {
      setLocation(inputValue);
      setIsEditing(false);
    } else {
      alert("Please enter a valid location.");
    }
  };

  return (
    <div className="w-full max-w-md mb-4 flex-col items-center">
      <span className="text-xs opacity-75">
        Search by city, state, or by zip code
      </span>

      {!isEditing ? (
        <div className="relative w-full flex items-center group">
          <span className="text-2xl bg-transparent">{location}</span>
          <button
            className="ml-2 md:opacity-0 group-hover:opacity-100 transition duration-75 ease-in-out"
            onClick={handleEdit}
            aria-label="Edit location"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      ) : (
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="w-full p-2 text-2xl bg-transparent border-b-2 border-green-400  focus:outline-none focus:ring-0 placeholder-white"
            aria-label="Edit location"
          />
          <button
            onClick={handleSave}
            className="ml-2 text-green-400 transition duration-300 ease-in-out"
            aria-label="Save location"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}
    </div>
  );
}
