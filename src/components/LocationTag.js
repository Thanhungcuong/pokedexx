import React from 'react';

const locationStyles = {
    cave: {
        bg: 'bg-gray-400',
        text: 'text-gray-900',
        icon: '🕳️',
      },
      forest: {
        bg: 'bg-green-200',
        text: 'text-green-800',
        icon: '🌲',
      },
      grassland: {
        bg: 'bg-green-100',
        text: 'text-green-900',
        icon: '🌾',
      },
      mountain: {
        bg: 'bg-brown-200',
        text: 'text-brown-800',
        icon: '⛰️',
      },
      rare: {
        bg: 'bg-purple-200',
        text: 'text-purple-800',
        icon: '⭐',
      },
      'rough-terrain': {
        bg: 'bg-red-200',
        text: 'text-red-800',
        icon: '🪨',
      },
      sea: {
        bg: 'bg-blue-200',
        text: 'text-blue-800',
        icon: '🌊',
      },
      urban: {
        bg: 'bg-gray-300',
        text: 'text-gray-800',
        icon: '🏙️',
      },
      'waters-edge': {
        bg: 'bg-blue-300',
        text: 'text-blue-900',
        icon: '🏖️',
      },
      default: {
        bg: 'bg-gray-200',
        text: 'text-gray-800',
        icon: '📍',
      }
    };


const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const LocationTag = ({ location, onClick }) => {
  const { bg, text, icon } = locationStyles[location] || locationStyles.default;

  return (
    <div
      className={`${bg} ${text} py-2 px-3 m-1 rounded cursor-pointer flex justify-center items-center w-fit hover:bg-white`}
      onClick={onClick}
    >
      <span className="mx-auto font-bold text-2xl mr-2">{icon}</span>
      <span className='font-bold'>{capitalizeFirstLetter(location)}</span>
    </div>
  );
};

export default LocationTag;
