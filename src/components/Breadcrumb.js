// Breadcrumb.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import LiBreadcrumb from "./LiBreadcrumb";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = {
    "/": "Home",
    "/category": "Category",
    "/location": "Location",
  };

  const isDetailPage = pathnames.includes("detail");
  const isLocationPage = pathnames.includes("location");
  const isCategoryPage = pathnames.includes("category");

  const pokemonName = isDetailPage
    ? pathnames[pathnames.indexOf("detail") + 1]
    : null;
  const locationName = isLocationPage
    ? pathnames[pathnames.indexOf("location") + 1]
    : null;
  const categoryName = isCategoryPage
    ? pathnames[pathnames.indexOf("category") + 1]
    : null;

  return (
    <nav aria-label="breadcrumb" className="max-w-[1440px] p-3 rounded-md">
      <ol className="list-reset flex">
        <LiBreadcrumb to="/" isActive={location.pathname === "/"} hideIcon>
          <FontAwesomeIcon icon={faHome} /> Home
        </LiBreadcrumb>
        {isDetailPage && pokemonName ? (
          <>
            <LiBreadcrumb
              to={`/detail/${pokemonName}`}
              isActive={location.pathname === `/detail/${pokemonName}`}
            >
              Pokemon: {capitalizeFirstLetter(pokemonName)}
            </LiBreadcrumb>
            {isCategoryPage && categoryName && (
              <LiBreadcrumb to="#" isActive>
                Category: {capitalizeFirstLetter(categoryName)}
              </LiBreadcrumb>
            )}
            {isLocationPage && locationName && (
              <LiBreadcrumb to="#" isActive>
                Location: {capitalizeFirstLetter(locationName)}
              </LiBreadcrumb>
            )}
          </>
        ) : isLocationPage && locationName ? (
          <LiBreadcrumb to="#" isActive>
            Location: {capitalizeFirstLetter(locationName)}
          </LiBreadcrumb>
        ) : isCategoryPage && categoryName ? (
          <LiBreadcrumb to="#" isActive>
            Category: {capitalizeFirstLetter(categoryName)}
          </LiBreadcrumb>
        ) : (
          pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <LiBreadcrumb key={to} to={to} isActive={isLast}>
                {breadcrumbNameMap[to] || value}
              </LiBreadcrumb>
            );
          })
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
