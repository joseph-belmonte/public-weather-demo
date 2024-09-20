/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getUVIndexSvg } from "@/helpers/getUVIndexSVG";

import { UviAPIResponse } from "@/types/types";
import SourceLink from "./sourcelink.component";

export default function UVI({ uviData }: { uviData: UviAPIResponse | null }) {
  if (!uviData) {
    return <p>No UV Index data available.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 md:p-6 text-center mx-auto max-w-full md:max-w-md">
      <h3 className="h3-heading">UV Index</h3>

      <div className="weather-icon mb-4">
        <img
          src={getUVIndexSvg(uviData)}
          alt={`UV index is ${uviData.UV_INDEX}`}
          className="w-20 h-20 md:w-24 md:h-24 mb-2"
        />
      </div>

      <div className="flex flex-col items-center w-full">
        <p className="break-words mb-4">
          Today, the UV index will or did reach a high of{" "}
          <span className="font-semibold underline">{uviData.UV_INDEX}</span>.
        </p>

        {uviData.UV_ALERT === "1" && (
          <p className="text-red-500 font-semibold mt-2">UV Alert!</p>
        )}

        <SourceLink url="https://enviro.epa.gov/envirofacts/uv/search" />
      </div>
    </div>
  );
}
