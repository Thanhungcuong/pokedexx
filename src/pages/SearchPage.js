import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { useParams } from 'react-router-dom'; 
import Loading from '../components/Loading';

const SearchPage = () => {
  const { name } = useParams(); // Lấy tên Pokémon từ URL
  const [searchTerm, setSearchTerm] = useState(name || ''); // Đặt tên Pokémon từ URL vào state
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

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
        id: response.data.id,
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types,
        
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
        {isLoading && <Loading />}
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
          <h2 className="text-left font-bold text-2xl">ID: <span className='text-purple-700'>{pokemonData.id}</span></h2>
            <h2 className="text-left font-bold text-2xl">Tên: <span className='text-purple-700'>{pokemonData.name}</span></h2>
            <div className="flex flex-col">
              <p className=" text-left text-2xl font-bold">Kích thước:</p>
              <h2 className="text-left font-bold text-2xl">Chiều cao: <span className='text-purple-700'>{pokemonData.height}</span></h2>
              <h2 className="text-left font-bold text-2xl">Cân nặng: <span className='text-purple-700'>{pokemonData.weight}</span></h2>
            </div>
            <div className="flex">
              <p className="font-bold text-xl" >Hệ:</p>
              {pokemonData.types.map((type) => (
                <p key={type.type.name} className="text-green-600 text-xl font-bold items-start mr-3">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;