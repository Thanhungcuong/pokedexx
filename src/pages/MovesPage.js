import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const MovesPage = () => {
  const { name } = useParams();
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonMoves = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const fetchMoveDetails = async (moveUrl) => {
          try {
            const moveResponse = await axios.get(moveUrl);
            const effectEntry = moveResponse.data.effect_entries.find(entry => entry.language.name === 'en');
            return {
              name: moveResponse.data.name,
              description: effectEntry ? effectEntry.short_effect : 'No description available',
              accuracy: moveResponse.data.accuracy,
              power: moveResponse.data.power,
            };
          } catch (moveError) {
            console.error('Error fetching move details:', moveError);
            return {
              name: 'N/A',
              description: 'N/A',
              accuracy: 'N/A',
              power: 'N/A',
            };
          }
        };

        const moves = await Promise.allSettled(
          response.data.moves.map(async (move) => {
            return await fetchMoveDetails(move.move.url);
          })
        );

        const moveResults = moves.map((result) => {
          if (result.status === "fulfilled") {
            return result.value;
          } else {
            console.error('Error fetching move details:', result.reason);
            return {
              name: 'N/A',
              description: 'N/A',
              accuracy: 'N/A',
              power: 'N/A',
            };
          }
        });

        setPokemonMoves(moveResults);
      } catch (error) {
        console.error('Error fetching moves:', error);
        setError('Error fetching moves data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonMoves();
  }, [name]);

  return (
    <div className="container mx-auto text-center p-4">
      {isLoading && <Loading />}
      <h1 className="text-3xl font-bold mb-4">Chiêu thức của {name}</h1>
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && pokemonMoves.length > 0 && (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Tên chiêu thức</th>
              <th className="border px-4 py-2">Mô tả</th>
              <th className="border px-4 py-2">Độ chính xác</th>
              <th className="border px-4 py-2">Sức mạnh</th>
            </tr>
          </thead>
          <tbody>
            {pokemonMoves.map((move, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{move.name}</td>
                <td className="border px-4 py-2">{move.description}</td>
                <td className="border px-4 py-2">{move.accuracy !== null ? move.accuracy : 'N/A'}</td>
                <td className="border px-4 py-2">{move.power !== null ? move.power : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovesPage;
