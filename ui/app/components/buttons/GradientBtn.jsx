const GradientBtn = ({ text, onClick = null }) => {
  const buttonStyle = {
    background: 'linear-gradient(to right, #5976F9, #04A5D3)',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle}>
      {text}
    </button>
  );
};

export default GradientBtn;