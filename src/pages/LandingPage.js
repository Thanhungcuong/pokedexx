import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import CardPokemon from '../components/CardPokemon';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const [allPokemon, setAllPokemon] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null); 

      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=456');
        const pokemonList = response.data.results;
        const updatedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const pokemonDataResponse = await axios.get(pokemon.url);
            return {
              ...pokemon,
              imageUrl: pokemonDataResponse.data.sprites.front_default,
            };
          })
        );

        setAllPokemon(updatedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setError('Failed to load Pokemon data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []);

      const handleCardClick = (name) => {
        Navigate(`/detail/${name}`)
      }
  return (
    <div className="container mx-auto text-center p-4 mb-20">
        <h1 className='font-bold text-2xl justify-center mb-12'>Pokedex</h1>
      {isLoading && <p>Loading Pokemon...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-4 gap-4">
          {allPokemon.map((pokemon) => (
            <CardPokemon 
            key={pokemon.name} 
            name={pokemon.name} 
            imageUrl={pokemon.imageUrl} 
            url={pokemon.url} 
            onClick={() => handleCardClick(pokemon.name)}
          />
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
