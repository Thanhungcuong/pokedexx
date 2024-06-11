import React from "react";
import { useNavigate } from 'react-router-dom';

const CardPokemon = ({ name, imageUrl, url, types, moveType }) => {
  const navigate = useNavigate();
  const id = url.split('/')[6];
  
  const handleCardClick = () => {
    navigate(`/detail/${name}`);
  };

  const handleTypeClick = (type) => {
    navigate(`/category/${type}`);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-md p-4 cursor-pointer flex mb-5" onClick={handleCardClick}>
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 mx-auto"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <div className="">
        <p className="text-gray-600 text-xl text-center">ID: {id}</p>
        <p className="text-center text-xl font-bold">{name}</p>
        <p className="text-center text-lg font-semibold">Move Type: {moveType}</p>
        <div className="flex flex-wrap justify-center mt-2">
          {types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="bg-green-200 text-green-800 rounded px-2 py-1 m-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleTypeClick(typeInfo.type.name);
              }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPokemon;
