import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPokemon from "../components/CardPokemon";
import Pagination from "../components/Pagination";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import Breadcrumb from "../components/Breadcrumb";

const CategoryPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useParams();
  const location = useLocation();
  const { pathname } = location;

  const pokemonName =
    pathname.split("/").length > 3 ? pathname.split("/")[2] : null;

  const fetchPokemonByType = async (page, limit) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`,
      );
      const pokemonData = response.data.pokemon;
      const countPokemon = pokemonData.length;
      setCount(countPokemon);

      const startIndex = (page - 1) * limit;
      const selectedPokemon = pokemonData.slice(startIndex, startIndex + limit);

      const pokemonListData = await Promise.all(
        selectedPokemon.map(async (pokemonObj) => {
          const url = pokemonObj.pokemon.url;
          const response = await axios.get(url);
          return {
            name: response.data.name,
            imageUrl: response.data.sprites.front_default,
            url: url,
            types: response.data.types,
          };
        }),
      );
      setPokemonList(pokemonListData);
    } catch (error) {
      console.error("Error fetching Pokémon by type:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonByType(1, 20);
  }, [type]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="max-w-[1440px] container mx-auto text-center p-4 mb-20 ">
      <h1 className="font-bold text-2xl justify-center mb-12">
        {pokemonName ? (
          <>
            Những Pokémon cùng loại{" "}
            <span className="text-blue-600">{type.toUpperCase()}</span> như{" "}
            <span className="text-red-600">
              {capitalizeFirstLetter(pokemonName)}
            </span>
          </>
        ) : (
          <>
            Pokémon thuộc loại{" "}
            <span className="text-blue-600">
              {type ? type.toUpperCase() : ""}
            </span>
          </>
        )}
      </h1>

      {isLoading && <Loading />}
      <Breadcrumb />
      {!isLoading && (
        <div className="max-sm:flex max-sm:flex-col grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2">
          {pokemonList.map((pokemon) => (
            <CardPokemon
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              url={pokemon.url}
              types={pokemon.types}
            />
          ))}
        </div>
      )}
      <Pagination
        totalPokemon={count}
        initialPokemonPerPage={20}
        onPageChange={fetchPokemonByType}
      />
    </div>
  );
};

export default CategoryPage;
