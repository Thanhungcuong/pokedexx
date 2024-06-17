import React, { useState } from "react";
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
  handleMoreInformation,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState({});

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleMoreInfo = (id, event) => {
    event.stopPropagation();
    setShowMoreInfo((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-md max-w-[1440px] p-9 max-sm:p-6 max-xl:p-8 mx-auto">
      <h1 className="text-3xl font-bold text-purple-600 w-fit mx-auto mb-12">
        {pokemonData.name.toUpperCase()}
      </h1>

      <div className="flex max-xl:flex-col">
        <div className="flex items-center  rounded-lg bg-gray-400 w-1/3 max-xl:w-full">
          <img
            src={pokemonData.imageUrl}
            alt={pokemonData.name}
            className="w-96 h-96 mx-auto my-auto "
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200";
            }}
          />
        </div>
        <div className="w-2/3 max-xl:w-full  flex-col">
          <p className="text-left text-2xl font-bold w-fit mx-auto mb-10   text-red-600">
            Chỉ số
          </p>
          <div className="overflow-x-auto container">
            <table className=" table-auto border-collapse w-min  mx-auto mt-2 ">
              <thead>
                <tr>
                  {pokemonData.stats.map((stat) => (
                    <th
                      key={stat.stat.name}
                      className="border border-black px-4 py-2 text-2xl"
                    >
                      {capitalizeFirstLetter(stat.stat.name)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {pokemonData.stats.map((stat) => (
                    <td
                      key={stat.stat.name}
                      className="border border-black px-4 py-2 text-3xl text-red-600 font-bold"
                    >
                      {stat.base_stat}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
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
        <div className="mt-10">
          <h2 className=" font-bold text-2xl mx-auto w-fit mb-4 text-blue-600">
            Chiêu thức
          </h2>
          <MovesTable data={pokemonData.moves} />
        </div>
      )}
      <p className="font-bold text-2xl w-fit mx-auto text-green-600 mt-12">
        Tiến hóa
      </p>
      {evolutionData.length > 0 && (
        <div className="container max-sm:flex-col flex my-12 justify-b mx-auto ">
          {evolutionData.map((evolution, index) => (
            <div
              key={evolution.id}
              className="flex w-full flex-col justify-between items-center cursor-pointer"
            >
              <div
                key={evolution.id}
                className="flex max-sm:flex-col w-full justify-between items-center cursor-pointer"
              >
                <div onClick={() => handleClickEvolution(evolution.name)}>
                  <img
                    src={evolution.imageUrl}
                    alt={evolution.name}
                    className="sm:w-96 sm:h-96 max-sm:w-60 max-sm:h-60 mx-auto"
                  />
                  <p className="text-pink-600 text-xl max-sm:text-base font-bold">
                    {capitalizeFirstLetter(evolution.name)}
                  </p>
                  <button
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                    onClick={(event) => toggleMoreInfo(evolution.id, event)}
                  >
                    More information
                  </button>
                  {showMoreInfo[evolution.id] && (
                    <div className="mt-2 p-2 bg-gray-200 rounded w-fit mx-auto">
                      <p>
                        <strong>ID:</strong> {evolution.id}
                      </p>
                      <p>
                        <strong>Name:</strong>{" "}
                        {capitalizeFirstLetter(evolution.name)}
                      </p>
                      <p>
                        <strong>Weight:</strong> {evolution.weight}
                      </p>
                      <p>
                        <strong>Height:</strong> {evolution.height}
                      </p>
                    </div>
                  )}
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

      <h2 className="font-bold text-2xl w-fit mx-auto text-orange-600 my-12">
        Những thông tin khác
      </h2>
      <div className="flex flex-wrap">
        <p className="font-bold text-xl mr-1">Khả năng đặc biệt: </p>
        <p className="text-blue-600 text-xl font-bold items-start mr-3 text-justify">
          {pokemonData.abilities.join(", ")}
        </p>
      </div>

      <div className="flex items-center my-4">
        <p className="font-bold text-xl mr-1 ">Hệ:</p>
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

      <p className="text-xl font-bold text-left cursor-pointer flex items-center">
        Có thể gặp ở:
        <LocationTag
          location={pokemonData.locations}
          onClick={() => handleClickLocation(pokemonData.locations)}
        />
      </p>
    </div>
  );
};

export default DetailCard;
