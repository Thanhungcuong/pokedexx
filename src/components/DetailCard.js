import React, { useState, useEffect, useRef } from "react";
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
import { useSpring, animated } from "react-spring";
import TypeIcon from "../components/TypeIcon";
import MovesTable from "../components/MovesTable";
import MovesCard from "../components/MovesCard";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import LocationTag from "./LocationTag";
import { gradientStyles } from "../constants/gradientStyles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const Accordion = ({ title, isOpen, onClick, children }) => {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  const animation = useSpring({
    maxHeight,
    opacity: isOpen ? 1 : 0,
    overflow: "hidden",
  });

  return (
    <div>
      <h2
        className="font-bold text-2xl mx-auto w-fit cursor-pointer mb-10 mt-20 max-xl:mt-12 max-sm:mt-6"
        onClick={onClick}
      >
        {title}
      </h2>
      <animated.div style={animation}>
        <div ref={contentRef}>{children}</div>
      </animated.div>
    </div>
  );
};

const DetailCard = ({
  pokemonData,
  evolutionData,
  chartData,
  handleTypeClick,
  handleClickLocation,
  handleClickEvolution,
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(pokemonData.id);
  const [openSections, setOpenSections] = useState({ stats: true });

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

  const handleToggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderPokemonInfo = (pokemon) => (
    <div
      className={`mt-2 ${gradientStyles.indigoToPink500} text-white p-10 lg:w-2/3 mx-auto rounded-lg`}
    >
      <p>
        <strong>ID:</strong> {pokemon.id}
      </p>
      <p className="my-4">
        <strong>Name:</strong> {capitalizeFirstLetter(pokemon.name)}
      </p>
      <p className="max-sm:text-center">
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
      <div className="flex items-center">
        <p className="text-3xl font-bold text-purple-600 text-left">
          {pokemonData.name.toUpperCase()}
        </p>
        <div className="rounded-lg w-1/3 max-xl:w-full mb-12 ">
          <img
            src={pokemonData.imageUrl}
            alt={pokemonData.name}
            className="w-96 h-96 max-sm:w-1/2 max-sm:h-1/2"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200";
            }}
          />
        </div>
      </div>

      <div
        className={`${gradientStyles.indigoToPink100} to-pink-100 rounded-md py-10 px-2 mx-auto`}
      >
        <div className="w-2/3 mx-auto max-xl:w-full flex-col mb-10">
          <Accordion
            title="Chỉ số"
            isOpen={openSections.stats}
            onClick={() => handleToggleSection("stats")}
          >
            {chartData && (
              <div className=" mx-auto w-2/3 max-sm:w-full max-sm:h-full max-2xl:flex justify-center mb-10">
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
                          beforeLabel: function (context) {
                            let datasetIndex = context.datasetIndex;
                            let datasetLabel =
                              context.chart.data.datasets[datasetIndex].label;
                            let labels = context.chart.data.labels;
                            let data =
                              context.chart.data.datasets[datasetIndex].data;
                            let label = `Pokemon: ${datasetLabel}\n`;
                            label += `HP: ${data[labels.indexOf("Hp")]}\n`;
                            label += `Attack: ${data[labels.indexOf("Attack")]}\n`;
                            label += `Defense: ${data[labels.indexOf("Defense")]}\n`;
                            label += `Special-attack: ${data[labels.indexOf("Special-attack")]}\n`;
                            label += `Special-defense: ${data[labels.indexOf("Special-defense")]}\n`;
                            label += `Speed: ${data[labels.indexOf("Speed")]}`;
                            return label;
                          },
                          label: function () {
                            return "";
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
          </Accordion>
        </div>

        {pokemonData.moves.length > 0 && (
          <Accordion
            title="Chiêu thức"
            isOpen={openSections.moves}
            onClick={() => handleToggleSection("moves")}
            className="mt-20 max-xl:mt-12 max-sm:mt-6"
          >
            <div className="">
              <MovesCard data={pokemonData.moves} />
              <MovesTable data={pokemonData.moves} />
            </div>
          </Accordion>
        )}

        {evolutionData.length > 0 && (
          <Accordion
            title="Tiến hóa"
            isOpen={openSections.evolution}
            onClick={() => handleToggleSection("evolution")}
          >
            <div className="max-lg:hidden">
              <div className="container max-sm:flex-col flex justify-between mx-auto mb-10">
                {evolutionData.map((evolution, index) => (
                  <div
                    key={evolution.id}
                    className="flex w-full flex-col justify-between items-center cursor-pointer"
                    onClick={() =>
                      handleClickEvolutionItem(evolution.name, evolution.id)
                    }
                  >
                    <div className="flex w-full justify-between items-center cursor-pointer">
                      <div className="text-center">
                        <img
                          src={evolution.imageUrl}
                          alt={evolution.name}
                          className="sm:w-96 sm:h-96 mx-auto"
                        />
                        <p className="text-pink-600 text-xl font-bold">
                          {capitalizeFirstLetter(evolution.name)}
                          {evolution.id === showMoreInfo && (
                            <FaArrowDown className="inline-block ml-4 text-gray-500" />
                          )}
                        </p>
                      </div>

                      {index < evolutionData.length - 1 && (
                        <FaArrowRight className="text-2xl mx-2 mb-5 text-gray-500 " />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {renderPokemonInfo(
                evolutionData.find(
                  (evolution) => evolution.id === showMoreInfo,
                ) || pokemonData,
              )}
            </div>

            <div className="lg:hidden ">
              <Swiper
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                navigation={true}
                pagination={{ clickable: true }}
                mousewheel={true}
                keyboard={true}
                className="mySwiper "
              >
                {evolutionData.map((evolution) => (
                  <SwiperSlide key={evolution.id}>
                    <div
                      className="flex flex-col justify-between py-10 items-center cursor-pointer w-2/3 mx-auto"
                      onClick={() =>
                        handleClickEvolutionItem(evolution.name, evolution.id)
                      }
                    >
                      <div className="text-center">
                        <img
                          src={evolution.imageUrl}
                          alt={evolution.name}
                          className="w-48 h-48 mx-auto"
                        />
                        <p className="text-pink-600 text-xl font-bold">
                          {capitalizeFirstLetter(evolution.name)}
                        </p>
                      </div>
                      {renderPokemonInfo(evolution)}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Accordion>
        )}

        <Accordion
          title="Những thông tin khác"
          isOpen={openSections.other}
          onClick={() => handleToggleSection("other")}
        >
          <div className="p-10">
            <p className="font-bold text-xl text-left mr-1 mb-5">
              Khả năng đặc biệt:
            </p>
            <div className={`text-white flex flex-col gap-5 w-fit mx-auto`}>
              {pokemonData.abilities.map((ability, index) => (
                <div
                  key={ability.id}
                  className={`${gradientStyles.indigoToPink500} border p-4 rounded-lg shadow-lg`}
                >
                  <p>
                    <strong>STT:</strong> {index + 1}
                  </p>
                  <p>
                    <strong>ID:</strong> {ability.id}
                  </p>
                  <p>
                    <strong>Tên:</strong> {ability.name}
                  </p>
                  <p>
                    <strong>Hiệu ứng:</strong> {ability.effect}
                  </p>
                  <p>
                    <strong>Thế hệ:</strong> {ability.generation}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <div className="flex max-sm:flex-col gap-4">
                <p className="font-bold text-xl text-left cursor-pointer flex max-sm:flex-col items-center">
                  Hệ:
                </p>
                <div className="flex max-sm:flex-col items-center my-4">
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
              </div>

              <p className="font-bold text-xl text-left cursor-pointer flex max-sm:flex-col items-center gap-4">
                Có thể gặp ở:
                <LocationTag
                  location={pokemonData.locations}
                  onClick={() => handleClickLocation(pokemonData.locations)}
                />
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default DetailCard;
