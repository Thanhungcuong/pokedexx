import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbNameMap = {
        '/': 'Home',
        '/category': 'Category',
        '/location': 'Location'
    };

    const isDetailPage = pathnames.includes('detail');
    const isLocationPage = pathnames.includes('location');
    const isCategoryPage = pathnames.includes('category');

    const pokemonName = isDetailPage ? pathnames[pathnames.indexOf('detail') + 1] : null;
    const locationName = isLocationPage ? pathnames[pathnames.indexOf('location') + 1] : null;
    const categoryName = isCategoryPage ? pathnames[pathnames.indexOf('category') + 1] : null;

    return (
        <nav aria-label="breadcrumb" className="max-w-[1440px] p-3 rounded-md">
            <ol className="list-reset flex">
                <li className="breadcrumb-item">
                    <Link
                        to="/"
                        className={location.pathname === '/'
                            ? 'breadcrumb-item mx-2 text-lg font-bold cursor-default'
                            : 'text-blue-500 hover:text-blue-900 hover:font-bold text-lg hover:underline'}
                    >
                        <FontAwesomeIcon icon={faHome} /> Home
                    </Link>
                </li>
                {isDetailPage && pokemonName ? (
                    <>
                        <li className="breadcrumb-item mx-2 ">
                            <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
                            <Link
                                to={`/detail/${pokemonName}`}
                                className={location.pathname === `/detail/${pokemonName}`
                                    ? 'breadcrumb-item mx-2 text-lg font-bold cursor-default'
                                    : 'text-blue-500 hover:text-blue-900 hover:font-bold text-lg hover:underline'}
                            >
                                Pokemon: {capitalizeFirstLetter(pokemonName)}
                            </Link>
                        </li>
                        {isCategoryPage && categoryName && (
                            <li className="breadcrumb-item mx-2 text-lg font-bold cursor-default" aria-current="page">
                                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />Category: {capitalizeFirstLetter(categoryName)}
                            </li>
                        )}
                        {isLocationPage && locationName && (
                            <li className="breadcrumb-item mx-2 text-lg font-bold cursor-default" aria-current="page">
                                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />Location: {capitalizeFirstLetter(locationName)}
                            </li>
                        )}
                    </>
                ) : isLocationPage && locationName ? (
                    <li className="breadcrumb-item mx-2 text-lg font-bold cursor-default" aria-current="page">
                        <FontAwesomeIcon icon={faChevronRight} className="mx-2" />Location: {capitalizeFirstLetter(locationName)}
                    </li>
                ) : isCategoryPage && categoryName ? (
                    <li className="breadcrumb-item mx-2 text-lg font-bold cursor-default" aria-current="page">
                        <FontAwesomeIcon icon={faChevronRight} className="mx-2" />Category: {capitalizeFirstLetter(categoryName)}
                    </li>
                ) : (
                    pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;

                        return isLast ? (
                            <li className="breadcrumb-item mx-2 text-lg font-bold" aria-current="page" key={to}>
                                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />{breadcrumbNameMap[to] || value}
                            </li>
                        ) : (
                            <li className="breadcrumb-item mx-2" key={to}>
                                <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
                                <Link to={to} className="text-blue-600 hover:text-blue-700 text-lg hover:underline">{breadcrumbNameMap[to] || value}</Link>
                            </li>
                        );
                    })
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
