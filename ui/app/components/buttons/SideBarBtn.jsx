const RoundedButton = ({ icon, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-12 h-12 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white
                bg-gray-100 dark:bg-gray-700
                focus:ring-gray-200 dark:focus:ring-gray-600
                hover:bg-gray-200 dark:hover:bg-gray-500 group-hover:bg-gray-300 dark:group-hover:bg-gray-900
                  ${disabled ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' : ''}`}
    >
      {icon}
    </button>
  );
};

export default RoundedButton;
