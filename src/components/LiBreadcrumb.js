// LiBreadcrumb.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const LiBreadcrumb = ({ to, isActive, children, hideIcon, label }) => {
  return (
    <li
      className={`breadcrumb-item mx-2 ${isActive ? "text-lg font-bold cursor-default" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      {!hideIcon && <FontAwesomeIcon icon={faChevronRight} className="mx-S2" />}
      {isActive ? (
        <span>{children}</span>
      ) : (
        <Link
          to={to}
          className="text-blue-500 hover:text-blue-900 hover:font-bold text-lg hover:underline"
        >
          {children}
        </Link>
      )}
    </li>
  );
};

export default LiBreadcrumb;
