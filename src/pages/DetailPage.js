import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Breadcrumb from "../components/Breadcrumb";
import DetailCard from "../components/DetailCard";

const DetailPage = () => {
  const { name } = useParams();
  const [searchTerm, setSearchTerm] = useState(name || "");
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionData, setEvolutionData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchSubmit = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`,
      );
      const speciesDataResponse = await axios.get(response.data.species.url);

      const evolutionChainUrl = speciesDataResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);

      const fetchEvolutionData = async (evolution) => {
        const evoResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`,
        );
        return {
          name: evolution.species.name,
          imageUrl: evoResponse.data.sprites.front_default,
          id: evoResponse.data.id,
          stats: evoResponse.data.stats,
          weight: evoResponse.data.weight,
          height: evoResponse.data.height,
        };
      };

      const evolutionChain = [];
      let evolutionData = evolutionChainResponse.data.chain;

      while (evolutionData) {
        const evoData = await fetchEvolutionData(evolutionData);
        evolutionChain.push(evoData);
        evolutionData = evolutionData.evolves_to[0];
      }

      const fetchMoveDetails = async (moveUrl) => {
        try {
          const moveResponse = await axios.get(moveUrl);
          const effectEntry = moveResponse.data.effect_entries.find(
            (entry) => entry.language.name === "en",
          );
          return {
            name: moveResponse.data.name,
            description: effectEntry
              ? effectEntry.short_effect
              : "No description available",
            accuracy: moveResponse.data.accuracy,
            power: moveResponse.data.power,
          };
        } catch (moveError) {
          console.error("Error fetching move details:", moveError);
          return {
            name: "N/A",
            description: "N/A",
            accuracy: "N/A",
            power: "N/A",
          };
        }
      };

      const moves = await Promise.allSettled(
        response.data.moves.map(
          async (move) => await fetchMoveDetails(move.move.url),
        ),
      );

      const moveResults = moves.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error("Error fetching move details:", result.reason);
          return {
            name: "N/A",
            description: "N/A",
            accuracy: "N/A",
            power: "N/A",
          };
        }
      });

      const pokemonDetails = {
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
        stats: response.data.stats,
        types: response.data.types,
        evolutionChain,
        locations: speciesDataResponse.data.habitat
          ? speciesDataResponse.data.habitat.name
          : "Unknown",
        moves: moveResults,
        abilities: response.data.abilities.map((ability) =>
          capitalizeFirstLetter(ability.ability.name),
        ),
      };

      const labels = pokemonDetails.stats.map((stat) =>
        capitalizeFirstLetter(stat.stat.name),
      );
      const colors = [
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ];

      const datasets = evolutionChain.map((evo, index) => ({
        label: capitalizeFirstLetter(evo.name),
        data: evo.stats.map((stat) => stat.base_stat),
        fill: true,
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length].replace("0.2", "1"),
        pointBackgroundColor: colors[index % colors.length].replace("0.2", "1"),
      }));

      setChartData({
        labels,
        datasets,
      });

      setPokemonData(pokemonDetails);
      setEvolutionData(evolutionChain);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setError("Pokemon không được tìm thấy.");
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
    navigate(`/detail/${name}/category/${type}`);
  };

  const handleClickLocation = (location) => {
    navigate(`/detail/${name}/location/${location}`);
  };

  const handleClickEvolution = (name) => {
    navigate(`/detail/${name}`);
    window.location.reload();
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mx-auto text-center ">
      {isLoading && <Loading />}
      <Breadcrumb className="mt-10" />
      {pokemonData && (
        <DetailCard
          pokemonData={pokemonData}
          evolutionData={evolutionData}
          chartData={chartData}
          handleTypeClick={handleTypeClick}
          handleClickLocation={handleClickLocation}
          handleClickEvolution={handleClickEvolution}
        />
      )}
    </div>
  );
};

export default DetailPage;
