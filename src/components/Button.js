import { gradientStyles } from "../constants/gradientStyles";

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${gradientStyles.indigoToPink500} ${gradientStyles.hoverIndigoToPink400} py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
