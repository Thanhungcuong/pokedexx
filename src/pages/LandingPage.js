import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPokemon from '../components/CardPokemon';
import Loading from '../components/Loading';

const LandingPage = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const pokemonPerPage = 16;

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const offset = (currentPage - 1) * pokemonPerPage;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`);
        const totalPokemon = response.data.count;
        setTotalPokemonCount(totalPokemon)
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
        console.error('Error fetching Pokemon:', error);
        setError('Failed to load Pokemon data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto text-center p-4 mb-20">
      <h1 className="font-bold text-2xl justify-center ">Pokedex</h1>
      <p className='mb-12'>Có tổng cộng: <span className='font-bold text-3xl text-purple-700'>{totalPokemonCount}</span> Pokemon</p>
      {isLoading && <Loading/>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div>
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
          <div className="mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={allPokemon.length < pokemonPerPage}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
