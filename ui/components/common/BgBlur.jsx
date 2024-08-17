
const BokehBackground = ({ baseColor = '#0a0a0c', spotColor = '0,0,255', blur = 10 }) => {
  // Base styles for the background (tailwind)
  const baseStyles = `
    fixed inset-0 
    -z-10 
    bg-no-repeat 
    bg-cover
  `;

  // Function to that creates gradient spots 
  const createSpot = (position, size) => 
    `radial-gradient(circle at ${position}, rgba(${spotColor},0.2) 0%, rgba(${spotColor},0) ${size}%)`;

  // Combine multiple spots
  const gradientString = [
    createSpot('20% 30%', 20),
    createSpot('70% 60%', 25),
    createSpot('40% 80%', 15)
  ].join(',');

  // Styles that need to be applied inline
  const inlineStyles = {
    backgroundColor: baseColor,
    backgroundImage: gradientString,
    filter: `blur(${blur}px)`
  };

  return (
    <div className={baseStyles} style={inlineStyles}></div>
  );
};

export default BokehBackground;