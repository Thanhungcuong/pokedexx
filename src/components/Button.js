const Button = ({ onClick, children, className }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-indigo-100 hover:bg-cyan-500 text-black font-bold py-2 px-4 rounded ${className}`}
      >
        {children}
      </button>
    );
  };
export default Button;