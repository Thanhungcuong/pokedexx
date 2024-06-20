import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPokemon from "../components/CardPokemon";
import Pagination from "../components/Pagination";
import { useParams, useLocation } from "react-router-dom";
import LoadingCard from "../components/LoadingCard";
import Breadcrumb from "../components/Breadcrumb";
import GoToTopButton from "../components/GoToTopButton";
const LocationPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { location: locationParam } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const pokemonName =
    pathname.split("/").length > 3 ? pathname.split("/")[2] : null;

  const fetchPokemonByLocation = async (page, limit) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-habitat/${locationParam}`,
      );
      const pokemonData = response.data.pokemon_species;
      const countPokemon = pokemonData.length;
      setCount(countPokemon);

      const startIndex = (page - 1) * limit;
      const selectedPokemon = pokemonData.slice(startIndex, startIndex + limit);

      const pokemonListData = await Promise.all(
        selectedPokemon.map(async (pokemonObj) => {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemonObj.name}`;
          const response = await axios.get(url);
          const moveResponse =
            response.data.moves.length > 0
              ? await axios.get(response.data.moves[0].move.url)
              : { data: { damage_class: { name: "unknown" } } };
          return {
            name: response.data.name,
            imageUrl: response.data.sprites.front_default,
            url: pokemonObj.url,
            types: response.data.types,
            moveType: moveResponse.data.damage_class.name,
          };
        }),
      );
      setPokemonList(pokemonListData);
    } catch (error) {
      console.error("Error fetching Pokémon by location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonByLocation(1, 20);
  }, [locationParam]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="max-w-[1440px] container mx-auto text-center p-4 mb-20">
      <h1 className="font-bold text-2xl justify-center mb-12">
        {pokemonName ? (
          <>
            Những Pokémon có thể gặp ở{" "}
            <span className="text-blue-600">{locationParam.toUpperCase()}</span>{" "}
            cùng với{" "}
            <span className="text-red-600">
              {capitalizeFirstLetter(pokemonName)}
            </span>
          </>
        ) : (
          <>
            Những Pokémon có thể gặp ở{" "}
            <span className="text-blue-600">{locationParam.toUpperCase()}</span>
          </>
        )}
      </h1>

      <Breadcrumb />
      {isLoading && (
        <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2">
          {Array.from({ length: 20 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="max-sm:flex max-sm:flex-col grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2">
          {pokemonList.map((pokemon) => (
            <CardPokemon
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              url={pokemon.url}
              types={pokemon.types}
              moveType={pokemon.moveType}
            />
          ))}
        </div>
      )}
      <Pagination
        totalPokemon={count}
        initialPokemonPerPage={20}
        onPageChange={fetchPokemonByLocation}
      />
      <GoToTopButton />
    </div>
  );
};

export default LocationPage;
