import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';
import CardPokemon from '../components/CardPokemon';
import Loading from '../components/Loading';

const LandingPage = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);

  useEffect(() => {
    const fetchTotalPokemonCount = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1');
        setTotalPokemonCount(response.data.count);
      } catch (error) {
        console.error('Error fetching total Pokémon count:', error);
      }
    };

    fetchTotalPokemonCount();
  }, []);

  const fetchPokemon = async (page, limit) => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonList = response.data.results;
      const updatedPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const pokemonDataResponse = await axios.get(pokemon.url);
          return {
            ...pokemon,
            imageUrl: pokemonDataResponse.data.sprites.front_default,
            types: pokemonDataResponse.data.types,
          };
        })
      );

      setAllPokemon(updatedPokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setError('Failed to load Pokémon data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto text-center p-4 mb-20">
      <h1 className="font-bold text-2xl justify-center">Pokedex</h1>
      <p className='mb-12'>Có tổng cộng: <span className='font-bold text-3xl text-purple-700'>{totalPokemonCount}</span> Pokemon</p>
      {isLoading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div className="grid grid-cols-4 gap-4">
          {allPokemon.map((pokemon) => (
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
        totalPokemon={totalPokemonCount}
        initialPokemonPerPage={16}
        onPageChange={fetchPokemon}
      />
    </div>
  );
};

export default LandingPage;
