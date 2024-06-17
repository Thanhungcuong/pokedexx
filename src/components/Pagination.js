import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "./Button";

const Pagination = ({
  totalPokemon,
  initialPokemonPerPage = 20,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(initialPokemonPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalPokemon / initialPokemonPerPage),
  );

  useEffect(() => {
    setTotalPages(Math.ceil(totalPokemon / pokemonPerPage));
    onPageChange(currentPage, pokemonPerPage);
  }, [pokemonPerPage, totalPokemon]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, pokemonPerPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push("...");
    if (totalPages > 1) pageNumbers.push(totalPages);
    return pageNumbers;
  };

  const handlePerPageChange = (e) => {
    const perPage = Number(e.target.value);
    setPokemonPerPage(perPage);
    setCurrentPage(1);
    onPageChange(1, perPage);
  };

  return (
    <div className="flex max-w-[1440px] max-lg:flex-col max-lg:gap-6 justify-between items-center">
      <p className="flex-1 text-left">
        Có tổng cộng: <span className="font-bold">{totalPokemon}</span> Pokemon
      </p>
      <div className="flex-1 text-left">
        <label htmlFor="pokemonPerPage">Pokémon per page: </label>
        <select
          id="pokemonPerPage"
          value={pokemonPerPage}
          onChange={handlePerPageChange}
          className="border rounded p-1 mx-2"
        >
          <option value="20">20</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
      </div>
      <div className="flex-right text-right flex space-x-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </Button>
        {renderPageNumbers().map((number, index) =>
          number === "..." ? (
            <span key={index} className="text-gray-500">
              ...
            </span>
          ) : (
            <Button
              key={index}
              onClick={() => handlePageChange(number)}
              className={
                number === currentPage
                  ? "font-bold bg-indigo-900 text-white"
                  : ""
              }
            >
              {number}
            </Button>
          ),
        )}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
