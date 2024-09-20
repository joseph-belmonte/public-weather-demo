import React from "react";

interface SourceLinkProps {
  url: string;
}

const SourceLink: React.FC<SourceLinkProps> = ({ url }) => {
  return (
    <span className="text-xs inline-block w-full">
      Source:{" "}
      <a
        href={url}
        className="inline-block truncate w-full hover:text-green-300"
      >
        {url}
      </a>
    </span>
  );
};

export default SourceLink;
