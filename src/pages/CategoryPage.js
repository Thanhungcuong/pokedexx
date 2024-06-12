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
  const [moveType, setMoveType] = useState('All');

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
          const moveResponse = await axios.get(response.data.moves[0].move.url);
          return {
            name: response.data.name,
            imageUrl: response.data.sprites.front_default,
            url: url,
            types: response.data.types,
            moveType: moveResponse.data.damage_class.name
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
    fetchPokemonByType(1, 20);
  }, [type]);

  return (
    <div className="container mx-auto text-center p-4 mb-20">
      <h1 className='font-bold text-2xl justify-center mb-12'>
        Pokémon thuộc loại <span className='text-purple-700 text-2xl'>{type.toUpperCase()}</span>
      </h1>
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
              moveType={pokemon.moveType} 
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