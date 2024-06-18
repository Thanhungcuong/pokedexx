import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import TypeIcon from "../components/TypeIcon";
import MovesTable from "../components/MovesTable";
import MovesCard from "../components/MovesCard";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import LocationTag from "./LocationTag";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const DetailCard = ({
  pokemonData,
  evolutionData,
  chartData,
  handleTypeClick,
  handleClickLocation,
  handleClickEvolution,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(pokemonData.id);

  useEffect(() => {
    setShowMoreInfo(pokemonData.id);
  }, [pokemonData.id]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleClickEvolutionItem = (evolutionName, evolutionId) => {
    setShowMoreInfo(evolutionId);
  };

  const renderPokemonInfo = (pokemon) => (
    <div className="mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-10 w-full mx-auto rounded-lg">
      <p>
        <strong>ID:</strong> {pokemon.id}
      </p>
      <p className="my-4">
        <strong>Name:</strong> {capitalizeFirstLetter(pokemon.name)}
      </p>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={() => handleClickEvolution(pokemon.name)}
      >
        More information
      </button>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto p-9 max-sm:p-6 max-xl:p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-12 text-left">
        {pokemonData.name.toUpperCase()}
      </h1>
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-md p-10 mx-auto">
        <div className="flex max-xl:flex-col gap-9 max-xl:gap-7 max-sm:gap-6">
          <div className="rounded-lg w-1/3 max-xl:w-full">
            <img
              src={pokemonData.imageUrl}
              alt={pokemonData.name}
              className="w-96 h-96 mx-auto my-auto"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
            />
          </div>
          <div className="w-2/3 max-xl:w-full flex-col">
            <p className="text-left text-2xl font-bold w-fit mx-auto mb-10 text-red-600">
              Chỉ số
            </p>

            {chartData && (
              <div className="mt-10 mx-auto max-2xl:h-full w-full max-2xl:flex justify-center">
                <Radar
                  data={chartData}
                  options={{
                    scales: {
                      r: {
                        angleLines: {
                          display: true,
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            let label = context.dataset.label || "";
                            if (label) {
                              label += ": ";
                            }
                            label += Math.round(context.raw * 100) / 100;
                            return label;
                          },
                        },
                        titleFont: {
                          size: 20,
                        },
                        bodyFont: {
                          size: 20,
                        },
                        padding: 20,
                        boxPadding: 5,
                        usePointStyle: true,
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {pokemonData.moves.length > 0 && (
          <div className="mt-20 max-xl:mt-12 max-sm:mt-6">
            <h2 className="font-bold text-2xl mx-auto w-fit mb-4 text-blue-600">
              Chiêu thức
            </h2>

            <MovesCard data={pokemonData.moves} />

            <MovesTable data={pokemonData.moves} />
          </div>
        )}
        <p className="font-bold text-2xl w-fit mx-auto text-green-600 mt-20 max-xl:mt-12 max-sm:mt-6">
          Tiến hóa
        </p>
        {evolutionData.length > 0 && (
          <div className="container max-sm:flex-col flex justify-b mx-auto mb-10">
            {evolutionData.map((evolution, index) => (
              <div
                key={evolution.id}
                className="flex w-full flex-col justify-between items-center cursor-pointer"
              >
                <div
                  className="flex max-sm:flex-col w-full justify-between items-center cursor-pointer"
                  onClick={() =>
                    handleClickEvolutionItem(evolution.name, evolution.id)
                  }
                >
                  <div>
                    <img
                      src={evolution.imageUrl}
                      alt={evolution.name}
                      className="sm:w-96 sm:h-96 max-sm:w-60 max-sm:h-60 mx-auto"
                    />
                    <p className="text-pink-600 text-xl max-sm:text-base font-bold">
                      {capitalizeFirstLetter(evolution.name)}
                    </p>
                  </div>

                  {index < evolutionData.length - 1 && (
                    <FaArrowRight className="text-2xl mx-2 mb-5 text-gray-500 max-sm:hidden" />
                  )}

                  {index < evolutionData.length - 1 && (
                    <FaArrowDown className="text-2xl mx-2 mb-5 text-gray-500 sm:hidden mt-10" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {renderPokemonInfo(
          evolutionData.find((evolution) => evolution.id === showMoreInfo) ||
            pokemonData,
        )}

        <h2 className="font-bold text-2xl text-nowrap w-fit mx-auto text-orange-600 mt-20 max-xl:mt-12 max-sm:mt-6 pb-12">
          Những thông tin khác
        </h2>
        <div className="flex flex-wrap ml-10">
          <p className="font-bold text-2xl text-nowrap mr-1">
            Khả năng đặc biệt:{" "}
          </p>
          <p className="text-blue-600 text-xl font-bold items-start mr-3 text-justify">
            {pokemonData.abilities.join(", ")}
          </p>
        </div>

        <div className="flex max-sm:flex-col items-center my-4 ml-10">
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

        <p className="text-xl font-bold text-left cursor-pointer flex max-sm:flex-col items-center ml-10">
          Có thể gặp ở:
          <LocationTag
            location={pokemonData.locations}
            onClick={() => handleClickLocation(pokemonData.locations)}
          />
        </p>
      </div>
    </div>
  );
};

export default DetailCard;
