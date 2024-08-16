const GradientBtn = ({ text, onClick = null }) => {
  const buttonStyle = {
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} className="hover:opacity-75 bg-custom-gradient">
      {text}
    </button>
  );
};

export default GradientBtn;