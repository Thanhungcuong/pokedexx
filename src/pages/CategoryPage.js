import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPokemon from '../components/CardPokemon';
import Pagination from '../components/Pagination';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const CategoryPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useParams();

  const fetchPokemonByType = async (page, limit) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
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
            types: response.data.types
          };
        })
      );
      setPokemonList(pokemonListData);
    } catch (error) {
      console.error('Error fetching Pokémon by type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonByType(1, 16);
  }, [type]);

  return (
    <div className="container mx-auto text-center p-4 mb-20">
      <h1 className='font-bold text-2xl justify-center'>
        Pokémon thuộc loại <span className='text-purple-700 text-2xl'>{type}</span>
      </h1>
      <p className=' justify-center font-bold text-2xl mb-12 '>Có <span className='text-purple-700 font-bold text-2xl'>{count}</span> Pokemon</p>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="grid grid-cols-4 gap-4">
          {pokemonList.map(pokemon => (
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
        initialPokemonPerPage={16}
        onPageChange={fetchPokemonByType}
      />
    </div>
  );
};

export default CategoryPage;
