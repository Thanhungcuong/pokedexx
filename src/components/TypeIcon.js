import React from "react";
import { typeStyles } from "../constants/typeStyles";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TypeIcon = ({ type, onClick }) => {
  const { bg, text, icon } = typeStyles[type] || {
    bg: "bg-gray-200",
    text: "text-gray-800",
    icon: "❓",
  };

  return (
    <div
      className={`${bg} ${text} py-3 pl-3 pr-4 m-1 rounded cursor-pointer flex justify-center items-center w-fit hover:bg-white`}
      onClick={onClick}
    >
      <span className="mx-auto font-bold text-2xl mr-4">{icon}</span>
      <span className="font-bold">{capitalizeFirstLetter(type)}</span>
    </div>
  );
};

export default TypeIcon;
