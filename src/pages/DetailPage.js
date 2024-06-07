import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const DetailPage = () => {
  const { name } = useParams(); 
  const [searchTerm, setSearchTerm] = useState(name || ''); 
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      const speciesDataResponse = await axios.get(response.data.species.url);

      const pokemonDetails = {
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
        stats: response.data.stats,
        types: response.data.types,
        evolutionChainUrl: speciesDataResponse.data.evolution_chain.url,
        locations: speciesDataResponse.data.habitat.name,
      };
      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setError('Pokemon không được tìm thấy.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      handleSearchSubmit(); 
    }
  }, [name]);

  const handleTypeClick = (type) => {
    Navigate(`/category/${type}`);
  };
  return (
    <div className="container mx-auto text-center p-4">
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Tìm kiếm Pokemon..."
          className="border p-2 mb-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button onClick={handleSearchSubmit}>Tìm kiếm</Button>
        {isLoading && <Loading/>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {pokemonData && (
        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-md p-4 mt-10 flex">
          <img
            src={pokemonData.imageUrl}
            alt={pokemonData.name}
            className="w-1/3 mx-auto"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200';
            }}
          />
          <div className='w-1/2 my-auto'>
            <h2 className="text-left font-bold text-2xl">Tên: <span className='text-purple-700'>{pokemonData.name}</span></h2>
            <div className="flex flex-col">
              <p className=" text-left text-2xl font-bold">Chỉ số:</p>
              {pokemonData.stats.map((stat) => (
                <p key={stat.stat.name} className="text-left text-3xl text-red-600">
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>
            <div className="flex">
              <p className="font-bold text-xl" >Hệ:</p>
              {pokemonData.types.map((type) => (
                <p key={type.type.name} className="text-green-600 text-xl font-bold items-start mr-3 cursor-pointer" onClick={() => handleTypeClick(type.type.name)}>
                  {type.type.name}
                  
                </p>
              ))}
            </div>
        
            <p className="text-xl font-bold text-left">Có thể gặp ở: <span className='text-orange-400'>{pokemonData.locations}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;