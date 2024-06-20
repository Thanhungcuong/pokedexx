import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gradientStyles } from "../constants/gradientStyles";

const MainLayout = () => {
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLocationOpen, setDropdownLocationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownLocationRef = useRef(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        setTypes(response.data.results);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon-habitat",
        );
        setLocations(response.data.results);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleTypeClick = (typeName) => {
    navigate(`/category/${typeName}`);
    setDropdownOpen(false);
  };

  const handleLocationClick = (locationName) => {
    navigate(`/location/${locationName}`);
    setDropdownLocationOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (
      dropdownLocationRef.current &&
      !dropdownLocationRef.current.contains(event.target)
    ) {
      setDropdownLocationOpen(false);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <header className={`w-full ${gradientStyles.indigoToPink500} h-20`}>
        <nav className="">
          <ul className="flex max-w-[1440px] mx-auto justify-between px-4">
            <Link
              className="text-white text-2xl max-sm:text-lg hover:bg-white hover:text-black w-fit my-auto rounded-md p-4 mt-2"
              to="/"
            >
              <li>Home</li>
            </Link>

            <div className="relative mx-auto w-fit" ref={dropdownRef}>
              <div className="group">
                <button
                  className="text-white text-2xl max-sm:text-lg hover:bg-white mt-2 hover:text-black rounded-md p-4"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Category
                </button>
                {dropdownOpen && (
                  <ul className="absolute bg-white text-black rounded-md mt-2 shadow-lg max-h-60 overflow-y-auto w-full">
                    {types.map((type) => (
                      <li
                        key={type.name}
                        className={`p-2  text-white cursor-pointer text-center ${gradientStyles.indigoToPink500} ${gradientStyles.hoverIndigoToPink400} hover:font-bold hover:text-black py-4`}
                        onClick={() => handleTypeClick(type.name)}
                      >
                        {capitalizeFirstLetter(type.name)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="relative  w-fit" ref={dropdownLocationRef}>
              <div className="group">
                <button
                  className="text-white text-2xl max-sm:text-lg hover:bg-white mt-2  hover:text-black rounded-md p-4"
                  onClick={() => setDropdownLocationOpen(!dropdownLocationOpen)}
                >
                  Location
                </button>
                {dropdownLocationOpen && (
                  <ul className="absolute bg-white text-black rounded-md mt-2 shadow-lg max-h-60 overflow-y-auto w-full">
                    {locations.map((location) => (
                      <li
                        key={location.name}
                        className={`text-white cursor-pointer text-center ${gradientStyles.indigoToPink500} ${gradientStyles.hoverIndigoToPink400} hover:font-bold hover:text-black py-4`}
                        onClick={() => handleLocationClick(location.name)}
                      >
                        {capitalizeFirstLetter(location.name)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </ul>
        </nav>
      </header>
      <main className="h-full min-h-screen">
        <Outlet />
      </main>
      <footer
        className={`${gradientStyles.indigoToPink500} text-white w-full h-20 flex justify-center items-center`}
      >
        <p className="text-white text-xl max-sm:text-center max-sm:w-[18rem]">
          Pokedex made by ThanHungCuong for studying
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
