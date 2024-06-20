import React from "react";
import { locationStyles } from "../constants/locationStyles";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const LocationTag = ({ location, onClick }) => {
  const { bg, text, icon } = locationStyles[location] || locationStyles.default;

  return (
    <div
      className={`${bg} ${text} py-2 px-3 m-1 rounded cursor-pointer flex justify-center items-center w-fit hover:bg-white`}
      onClick={onClick}
    >
      <span className="mx-auto font-bold text-2xl mr-2">{icon}</span>
      <span className="font-bold">{capitalizeFirstLetter(location)}</span>
    </div>
  );
};

export default LocationTag;
