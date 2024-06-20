import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import { gradientStyles } from "../constants/gradientStyles";

const MovesCard = ({ data, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="sm:hidden flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 ">
        {currentData.map((move, index) => (
          <div
            key={index}
            className={`${gradientStyles.indigoToPink500} text-white shadow-lg rounded-lg p-4 w-60`}
          >
            <h3 className="text-lg font-bold mb-2">
              {(currentPage - 1) * itemsPerPage + index + 1}
            </h3>
            <h3 className="text-lg font-bold mb-2">
              {capitalizeFirstLetter(move.name)}
            </h3>
            <p className="text-sm mb-2">{move.description}</p>
            <p className="text-sm mb-2">
              <strong>Accuracy:</strong> {move.accuracy || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Power:</strong> {move.power || "N/A"}
            </p>
          </div>
        ))}
      </div>
      <p className="text-base mt-5">
        Có tổng cộng <span className="font-bold text-base">{data.length}</span>{" "}
        chiêu thức
      </p>
      <div className="flex justify-center items-center mt-4 gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <FaArrowLeft />
        </Button>
        <span className="text-lg font-bold">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default MovesCard;
