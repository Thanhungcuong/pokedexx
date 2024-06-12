import React from 'react';

const typeStyles = {
  normal: {
    bg: 'bg-gray-200',
    text: 'text-gray-800',
    icon: '⬜',
  },
  fire: {
    bg: 'bg-red-200',
    text: 'text-red-800',
    icon: '🔥',
  },
  water: {
    bg: 'bg-blue-200',
    text: 'text-blue-800',
    icon: '💧',
  },
  electric: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-800',
    icon: '⚡',
  },
  grass: {
    bg: 'bg-green-200',
    text: 'text-green-800',
    icon: '🍃',
  },
  ice: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    icon: '❄️',
  },
  fighting: {
    bg: 'bg-orange-200',
    text: 'text-orange-800',
    icon: '🥊',
  },
  poison: {
    bg: 'bg-purple-200',
    text: 'text-purple-800',
    icon: '☠️',
  },
  ground: {
    bg: 'bg-yellow-300',
    text: 'text-yellow-900',
    icon: '🌍',
  },
  flying: {
    bg: 'bg-indigo-200',
    text: 'text-indigo-800',
    icon: '🕊️',
  },
  psychic: {
    bg: 'bg-pink-200',
    text: 'text-pink-800',
    icon: '🔮',
  },
  bug: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    icon: '🐛',
  },
  rock: {
    bg: 'bg-gray-300',
    text: 'text-gray-900',
    icon: '🪨',
  },
  ghost: {
    bg: 'bg-purple-300',
    text: 'text-purple-900',
    icon: '👻',
  },
  dragon: {
    bg: 'bg-indigo-300',
    text: 'text-indigo-900',
    icon: '🐉',
  },
  dark: {
    bg: 'bg-gray-300',
    text: 'text-black',
    icon: '🌑',
  },
  steel: {
    bg: 'bg-gray-400',
    text: 'text-gray-900',
    icon: '⚙️',
  },
  fairy: {
    bg: 'bg-pink-300',
    text: 'text-pink-900',
    icon: '🧚',
  },
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const TypeIcon = ({ type, onClick }) => {
  const { bg, text, icon } = typeStyles[type] || {
    bg: 'bg-gray-200',
    text: 'text-gray-800',
    icon: '❓',
  };

  return (
    <div
      className={`${bg} ${text} py-3 pl-3 pr-4 m-1 rounded cursor-pointer flex justify-center items-center w-fit hover:bg-white`}
      onClick={onClick}
    >
      <span className="mx-auto font-bold text-2xl">{icon}</span>
      <span className='font-bold'>{capitalizeFirstLetter(type)}</span>
    </div>
  );
};

export default TypeIcon;
