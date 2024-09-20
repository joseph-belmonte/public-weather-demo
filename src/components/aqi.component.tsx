import React from "react";
import SourceLink from "./sourcelink.component";
import { AqiAPIResponse } from "@/types/types";

export default function AQI({ aqiData }: { aqiData: AqiAPIResponse[] | null }) {
  if (!aqiData) {
    return <p>No AQI data available.</p>;
  }

  return (
    <div className="lg:p-6">
      <h3 className="h3-heading">AQI</h3>

      {/* Headers for larger screens */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6 place-items-center underline text-lg mb-6">
        <p>Value</p>
        <p>Pollutant</p>
        <p>Status</p>
        <p>Reporting Area</p>
      </div>

      {aqiData?.map((entry: AqiAPIResponse, index: number) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-4 w-full mb-6 text-left lg:text-center lg:place-items-center gap-y-4 gap-x-6"
        >
          {/* Value */}
          <div className="flex items-center lg:block">
            <span className="lg:hidden font-semibold mr-2">Value:</span>
            <p className="text-sm lg:text-lg">{entry.AQI}</p>
          </div>

          {/* Pollutant */}
          <div className="flex items-center lg:block">
            <span className="lg:hidden font-semibold mr-2">Pollutant:</span>
            <p className="text-sm lg:text-lg">{entry.ParameterName} Level</p>
          </div>

          {/* Status */}
          <div className="flex items-center lg:block">
            <span className="lg:hidden font-semibold mr-2">Status:</span>
            <p
              className={`font-bold text-sm lg:text-lg ${getAQIColor(
                entry.Category.Number
              )}`}
            >
              {entry.Category.Name}
            </p>
          </div>

          {/* Reporting Area */}
          <div className="flex items-center lg:block">
            <span className="lg:hidden font-semibold mr-2">
              Reporting Area:
            </span>
            <p className="text-sm lg:text-lg">
              {entry.ReportingArea}, {entry.StateCode}
            </p>
          </div>
        </div>
      ))}

      <SourceLink url="https://www.airnow.gov/" />
    </div>
  );
}

const getAQIColor = (categoryNumber: number) => {
  switch (categoryNumber) {
    case 1:
      return "text-green-500";
    case 2:
      return "text-yellow-500";
    case 3:
      return "text-orange-500";
    case 4:
      return "text-red-500";
    case 5:
      return "text-purple-500";
    case 6:
      return "text-maroon-500";
    default:
      return "text-gray-500";
  }
};
