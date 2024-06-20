import React from "react";
import { useNavigate } from "react-router-dom";
import TypeIcon from "./TypeIcon";
import { gradientStyles } from "../constants/gradientStyles";

const CardPokemon = ({ name, imageUrl, url, types, moveType }) => {
  const navigate = useNavigate();
  const id = url.split("/")[6];

  const handleCardClick = () => {
    navigate(`/detail/${name}`);
  };

  const handleTypeClick = (name, type) => {
    navigate(`/detail/${name}/category/${type}`);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className={`${gradientStyles.indigoToPink100} flex flex-col rounded-md p-4 cursor-pointer mb-5`}
      onClick={handleCardClick}
    >
      <div className="w-fit mx-auto flex">
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 mx-auto my-auto"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />

        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-center text-xl font-bold">{name.toUpperCase()}</p>
          <p className="text-center text-lg font-semibold">
            Move Type: {capitalizeFirstLetter(moveType)}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-center mt-2">
          {types.map((typeInfo) => (
            <TypeIcon
              key={typeInfo.type.name}
              type={typeInfo.type.name}
              onClick={(e) => {
                e.stopPropagation();
                handleTypeClick(name, typeInfo.type.name);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPokemon;
