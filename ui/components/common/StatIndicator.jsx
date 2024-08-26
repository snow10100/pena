const StatIndicator = ({ criticality, text, number = null, className = "" }) => {
  let colorClass;

  // TODO: edit these keys and vaues
  switch (criticality) {
    case 'low':
      colorClass = 'bg-gray-50 text-gray-800';
      break;
    case 'medium':
      colorClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'high':
      colorClass = 'dark:bg-[#F44336] bg-red-100 text-red-800';
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