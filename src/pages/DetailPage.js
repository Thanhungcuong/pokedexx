import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import TypeIcon from '../components/TypeIcon';

const DetailPage = () => {
  const { name } = useParams();
  const [searchTerm, setSearchTerm] = useState(name || '');
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionData, setEvolutionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 

  const handleSearchSubmit = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      const speciesDataResponse = await axios.get(response.data.species.url);

      const evolutionChainUrl = speciesDataResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);

      const fetchEvolutionData = async (evolution) => {
        const evoResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`);
        return {
          name: evolution.species.name,
          imageUrl: evoResponse.data.sprites.front_default,
          id: evoResponse.data.id,
        };
      };

      const evolutionChain = [];
      let evolutionData = evolutionChainResponse.data.chain;

      while (evolutionData) {
        const evoData = await fetchEvolutionData(evolutionData);
        evolutionChain.push(evoData);
        evolutionData = evolutionData.evolves_to[0];
      }

      const pokemonDetails = {
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
        stats: response.data.stats,
        types: response.data.types,
        evolutionChain,
        locations: speciesDataResponse.data.habitat ? speciesDataResponse.data.habitat.name : 'Unknown',
        moves: response.data.moves.map(move => capitalizeFirstLetter(move.move.name)),
      abilities: response.data.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)),
      };

      setPokemonData(pokemonDetails);
      setEvolutionData(evolutionChain);
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
    navigate(`/category/${type}`);
  };

  const handleClickLocation = (location) => {
    navigate(`/location/${location}`)
  }

  const handleClickEvolution = (name) => {
    navigate(`/detail/${name}`);
    window.location.reload()
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mx-auto text-center p-4">
      {isLoading && <Loading />}
      {pokemonData && (
        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-md p-4 mt-10 flex">
          <img
            src={pokemonData.imageUrl}
            alt={pokemonData.name}
            className="w-96 h-96 my-auto mx-auto"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200';
            }}
          />
          <div className="w-1/2 my-auto">
            <h2 className="text-left font-bold text-2xl">
              Tên: <span className="text-purple-700">{capitalizeFirstLetter(pokemonData.name)}</span>
            </h2>
            <div className="flex flex-col">
              <p className="text-left text-2xl font-bold">Chỉ số:</p>
              {pokemonData.stats.map((stat) => (
                <p key={stat.stat.name} className="text-left text-3xl text-red-600">
                  {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap">
              <p className="font-bold text-xl mr-1">Khả năng đặc biệt: </p>
              <p className="text-blue-600 text-xl font-bold items-start mr-3 text-justify">
                {pokemonData.abilities.join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap">
              <p className="font-bold text-xl">Chiêu thức:</p>
              <p className="text-cyan-600 text-xl font-bold items-start mr-3 text-justify">
                 {pokemonData.moves.join(', ')}
              </p>
            </div>

            <div className="flex items-center">
              <p className="font-bold text-xl mr-1">Hệ:</p>
              {pokemonData.types.map((type) => (
                <TypeIcon
                  key={type.type.name}
                  type={type.type.name}
                  onClick={() => handleTypeClick(type.type.name)}
                >
                  {type.type.name}
                </TypeIcon>
              ))}
            </div>

            <p className="text-xl font-bold text-left cursor-pointer" onClick={() => handleClickLocation (pokemonData.locations)}>
              Có thể gặp ở: <span className="text-orange-400">{capitalizeFirstLetter(pokemonData.locations)}</span>
            </p>

            {evolutionData.length > 0 && (
        <div className="flex">
          <p className="text-left font-bold text-xl">Tiến hóa:</p> 
          {evolutionData.map((evolution, index) => (
            <div key={evolution.id} className=" flex items-center cursor-pointer" >
              <div onClick={() => handleClickEvolution(evolution.name)}>
              <img
                src={evolution.imageUrl}
                alt={evolution.name}
                className="h-40 w-40 mx-auto"
              />
              <p className="text-pink-600 text-xl font-bold">{capitalizeFirstLetter(evolution.name)}</p>
              
              </div>
              {index < evolutionData.length - 1 && <p className="text-xl mx-2">→</p>}
            </div>
          ))}
        </div>
      )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default DetailPage;
