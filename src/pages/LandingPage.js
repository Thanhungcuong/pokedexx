import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';
import CardPokemon from '../components/CardPokemon';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPokemonCount, setTotalPokemonCount] = useState(0);
  const [filteredPokemonCount, setFilteredPokemonCount] = useState(0);
  const [moveTypeFilter, setMoveTypeFilter] = useState('');
  const [pokemonPerPage, setPokemonPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalPokemonCount = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1');
        setTotalPokemonCount(response.data.count);
        setFilteredPokemonCount(response.data.count); 
      } catch (error) {
        console.error('Error fetching total Pokémon count:', error);
      }
    };

    fetchTotalPokemonCount();
  }, []);

  const fetchPokemon = async (page, limit, moveType = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonList = response.data.results;
      const updatedPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const pokemonDataResponse = await axios.get(pokemon.url);
          const moveTypeData = pokemonDataResponse.data.moves.length > 0 
            ? await axios.get(pokemonDataResponse.data.moves[0].move.url) 
            : { data: { damage_class: { name: 'unknown' }}};
          return {
            ...pokemon,
            imageUrl: pokemonDataResponse.data.sprites.front_default,
            types: pokemonDataResponse.data.types,
            moveType: moveTypeData.data.damage_class.name,
          };
        })
      );

      const filteredPokemon = moveType ? updatedPokemonList.filter(pokemon => pokemon.moveType === moveType) : updatedPokemonList;
      setAllPokemon(filteredPokemon);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setError('Failed to load Pokémon data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredPokemonCount = async (moveType) => {
    if (!moveType) {
      setFilteredPokemonCount(totalPokemonCount);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/move-damage-class/${moveType}`);
      const moveTypePokemonList = response.data.moves;
      setFilteredPokemonCount(moveTypePokemonList.length);
    } catch (error) {
      console.error('Error fetching filtered Pokémon count:', error);
      setError('Failed to load Pokémon data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyMoveTypeFilter = () => {
    if (!moveTypeFilter) {
      return allPokemon;
    }
    return allPokemon.filter(pokemon => pokemon.moveType === moveTypeFilter);
  };

  const handleMoveTypeFilterChange = (selectedMoveType) => {
    setMoveTypeFilter(selectedMoveType);
    setCurrentPage(1); 
    fetchFilteredPokemonCount(selectedMoveType);
  };

  const filteredPokemon = applyMoveTypeFilter();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = () => {
    if (searchTerm) {
      navigate(`/detail/${searchTerm}`);
    }
  }
  return (
    <div className="container mx-auto text-center p-4 mb-20">
      <h1 className="font-bold text-3xl justify-center">Pokedex</h1>
      {isLoading && <Loading />}
      <div className='flex mb-12'>
       <div className="flex mr-auto items-center">
        <input
          type="text"
          placeholder="Tìm kiếm Pokemon..."
          className="border p-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button onClick={handleSearchSubmit}>Tìm kiếm</Button>
        {isLoading && <Loading />}
        {error && <p className="text-red-500">{error}</p>}
      </div> 

      <div className=" ml-auto">
            Lọc theo move type:
            <select
              className="ml-2 p-2 border border-gray-300 rounded"
              value={moveTypeFilter}
              onChange={(e) => handleMoveTypeFilterChange(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="physical">Physical</option>
              <option value="special">Special</option>
              <option value="status">Status</option>
            </select>
          </div>
      </div>
      


      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div>
          
          <div className="grid grid-cols-4 gap-4">
            {filteredPokemon.map((pokemon) => (
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
        </div>
      )}
      
  
  <div className=" text-center">
    <Pagination
      totalPokemon={moveTypeFilter ? filteredPokemonCount : totalPokemonCount}
      initialPokemonPerPage={pokemonPerPage}
      onPageChange={(page, perPage) => {
        setCurrentPage(page);
        setPokemonPerPage(perPage);
        fetchPokemon(page, perPage, moveTypeFilter);
      }}
    />
  </div>

      
    </div>
  );
};

export default LandingPage;
