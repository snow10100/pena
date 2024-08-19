const StatIndicator = ({ criticality, text, number = null, className = "" }) => {
  let colorClass;

  switch (criticality) {
    case 'low':
      colorClass = 'bg-yellow-50 text-yellow-800';
      break;
    case 'medium':
      colorClass = 'bg-blue-100 text-blue-800';
      break;
    case 'high':
      colorClass = 'bg-red-100 text-red-800';
      break;
    case 'critical':
      colorClass = 'bg-red-200 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-500';
      break;
  }

  return (
    <span className={"m-1 px-4 py-2 inline-flex leading-5 rounded-md " + colorClass + " " + className}>
      {(number || '') + " " + text}
    </span>
  );
};

export default StatIndicator;