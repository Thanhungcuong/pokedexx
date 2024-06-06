import React from "react";

const CardPokemon = ({ name, imageUrl, url, onClick }) => {
  const id = url.split('/')[6];

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-md p-4 cursor-pointer flex" onClick={onClick}>
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
      </div>
    </div>
  );
};

export default CardPokemon;