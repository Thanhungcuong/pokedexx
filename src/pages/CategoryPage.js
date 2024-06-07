import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardPokemon from '../components/CardPokemon';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const CategoryPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(16);
  const { type } = useParams();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonByType = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const pokemonData = response.data.pokemon;
        const countPokemon = pokemonData.length;
        setCount(countPokemon);
        const pokemonUrls = response.data.pokemon.map(pokemon => pokemon.pokemon.url);
        const pokemonListData = await Promise.all(
          pokemonUrls.map(async url => {
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

    fetchPokemonByType();
  }, [type]);


  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemonList = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);


  const handleNextPage = () => {
    if (currentPage < Math.ceil(pokemonList.length / pokemonPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto text-center p-4 mb-20">
      <h1 className='font-bold text-2xl justify-center'>
        Pokémon thuộc loại <span className='text-purple-700 text-2xl'>{type}</span>
      </h1>
      <p className=' justify-center font-bold text-2xl mb-12 '>Có <span className='text-purple-700 font-bold text-2xl'>{count}</span> Pokemon</p>
      {isLoading && <Loading/>}
      <div className="grid grid-cols-4 gap-4">
        {currentPokemonList.map(pokemon => (
          <CardPokemon
            key={pokemon.name}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            url={pokemon.url}
            types={pokemon.types}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:bg-gray-400"
        >
          Prev
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage >= Math.ceil(pokemonList.length / pokemonPerPage)}
          className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
