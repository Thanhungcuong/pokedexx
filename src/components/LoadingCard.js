import React from "react";

const LoadingCard = () => {
  return (
    <div className="animate-pulse flex flex-col rounded-md p-4 mb-5 bg-gray-200">
      <div className=" mx-auto flex">
        <div className="w-20 h-20 mx-auto my-auto bg-gray-300 rounded-full"></div>
        <div className="flex flex-col justify-center items-center w-full ml-4">
          <div className="w-full h-6 bg-gray-300 mb-2 rounded"></div>
          <div className="w-full h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full m-1"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full m-1"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full m-1"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
