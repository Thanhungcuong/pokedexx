import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        <nav aria-label="breadcrumb" className="bg-gray-100 p-3 rounded-md w-full">
            <ol className="list-reset flex">
                <li className="breadcrumb-item">
                    <Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link>
                </li>
                {isDetailPage && pokemonName ? (
                    <>
                        <li className="breadcrumb-item mx-2">
                            <span className="mx-2">/</span>
                            <Link to={`/detail/${pokemonName}`} className="text-blue-600 hover:text-blue-700">
                                Pokemon: {pokemonName}
                            </Link>
                        </li>
                        {isCategoryPage && categoryName && (
                            <li className="breadcrumb-item text-gray-500 mx-2" aria-current="page">
                                <span className="mx-2">/</span>Category: {categoryName}
                            </li>
                        )}
                        {isLocationPage && locationName && (
                            <li className="breadcrumb-item text-gray-500 mx-2" aria-current="page">
                                <span className="mx-2">/</span>Location: {locationName}
                            </li>
                        )}
                    </>
                ) : isLocationPage && locationName ? (
                    <li className="breadcrumb-item text-gray-500 mx-2" aria-current="page">
                        <span className="mx-2">/</span>Location: {locationName}
                    </li>
                ) : isCategoryPage && categoryName ? (
                    <li className="breadcrumb-item text-gray-500 mx-2" aria-current="page">
                        <span className="mx-2">/</span>Category: {categoryName}
                    </li>
                ) : (
                    pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;

                        return isLast ? (
                            <li className="breadcrumb-item text-gray-500 mx-2" aria-current="page" key={to}>
                                <span className="mx-2">/</span>{breadcrumbNameMap[to] || value}
                            </li>
                        ) : (
                            <li className="breadcrumb-item mx-2" key={to}>
                                <span className="mx-2">/</span>
                                <Link to={to} className="text-blue-600 hover:text-blue-700">{breadcrumbNameMap[to] || value}</Link>
                            </li>
                        );
                    })
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
