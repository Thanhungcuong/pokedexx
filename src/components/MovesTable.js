import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from './Button';

const MovesTable = ({ data, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">ID</th>
            <th className="border border-black px-4 py-2">Tên chiêu thức</th>
            <th className="border border-black px-4 py-2">Mô tả</th>
            <th className="border border-black px-4 py-2">Độ chính xác</th>
            <th className="border border-black px-4 py-2">Sức mạnh</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((move, index) => (
            <tr key={index}>
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">{capitalizeFirstLetter(move.name)}</td>
                <td className="border border-black px-4 py-2 text-left">{move.description}</td>
                <td className="border border-black px-4 py-2">{move.accuracy || 'N/A'}</td>
                <td className="border border-black px-4 py-2">{move.power || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <FaArrowLeft />
        </Button>
        {renderPageNumbers().map((number, index) =>
          number === '...' ? (
            <span key={index} className="mx-2 text-gray-500">...</span>
          ) : (
            <Button
              key={index}
              onClick={() => handlePageChange(number)}
              className={number === currentPage ? 'font-bold bg-indigo-900 text-white mx-1' : 'mx-1'}
            >
              {number}
            </Button>
          )
        )}
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default MovesTable;
