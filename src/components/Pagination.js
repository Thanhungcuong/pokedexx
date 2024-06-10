import React, { useState, useEffect } from 'react';
import Button from './Button';

const Pagination = ({ totalPokemon, initialPokemonPerPage = 16, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(initialPokemonPerPage);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalPokemon / initialPokemonPerPage));
  const [inputValue, setInputValue] = useState(initialPokemonPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(totalPokemon / pokemonPerPage));
    onPageChange(currentPage, pokemonPerPage); 
  }, [pokemonPerPage, totalPokemon]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, pokemonPerPage);
  };

  const handleInputChange = (e) => {
    setInputValue(Number(e.target.value));
  };

  const handleApplyChange = () => {
    setPokemonPerPage(inputValue);
    setCurrentPage(1);
    onPageChange(1, inputValue);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    if (currentPage > 3) pageNumbers.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push('...');
    if (totalPages > 1) pageNumbers.push(totalPages);
    return pageNumbers;
  };

  return (
    <div className="pagination-container mt-4 flex flex-col items-center">
      <div className="pagination-controls mb-4">
        <label htmlFor="pokemonPerPage">Pokémon per page: </label>
        <input
          type="number"
          id="pokemonPerPage"
          value={inputValue}
          onChange={handleInputChange}
          min="1"
          className="border rounded p-1 mx-2"
        />
        <Button onClick={handleApplyChange}>Apply</Button>
      </div>
      <div className="pagination-buttons flex space-x-2">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        {renderPageNumbers().map((number, index) =>
          number === '...' ? (
            <span key={index} className="text-gray-500">...</span>
          ) : (
            <Button
              key={index}
              onClick={() => handlePageChange(number)}
              className={number === currentPage ? 'font-bold bg-blue-900' : ''}
            >
              {number}
            </Button>
          )
        )}
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
