import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const [types, setTypes] = useState([]);
  const Navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleTypeClick = (typeName) => {
    Navigate(`/category/${typeName}`);
  };

  return (
    <div className='flex flex-col'>
      <header>
        <nav>
          <ul className='flex w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-20 justify-between'>
            <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/">
              <li>Home</li>
            </Link>

            <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/search">
              <li>Search</li>
            </Link>

            <Link className='text-white text-2xl hover:bg-white hover:text-black mx-auto w-fit my-auto rounded-md p-4' to="/detail">
              <li>Detail</li>
            </Link>

            <div className='relative mx-auto w-fit '>
              <div className='group'>
                <button
                  className='text-white text-2xl hover:bg-white mt-2 hover:text-black rounded-md p-4'
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category
                </button>
                {dropdownOpen && (
                  <ul className='absolute bg-white text-black rounded-md mt-2 p-2 shadow-lg max-h-60 overflow-y-auto'>
                    {types.map(type => (
                      <li key={type.name} className='p-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleTypeClick(type.name)}>
                        {type.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>'
            </div>
          </ul>
        </nav>
      </header>

      <main className='h-full min-h-screen'>
        <Outlet />
      </main>

      <footer className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-20 flex justify-center items-center'>
        <p className='text-white text-xl'>Pokedex made by ThanHungCuong for studying</p>
      </footer>
    </div>
  );
}

export default MainLayout;