const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
