import React, { useState, useEffect } from 'react';

const statusConfig = new Map([
  ['supervisor', { colorClass: 'bg-yellow-100 text-yellow-800', text: 'Supervising' }],
  ['pentester', { colorClass: 'bg-blue-100 text-blue-800', text: 'Pentesting' }],
  ['evaluator', { colorClass: 'bg-purple-100 text-purple-800', text: 'Evaluating' }],
  ['tools_node', { colorClass: 'bg-purple-100 text-purple-800', text: 'Evaluating' }],
  ['Done', { colorClass: 'bg-green-100 text-green-800', text: 'Done' }]
]);

const ModelStatus = ({ status }) => {
  const [dots, setDots] = useState('');
  console.log('status:', status);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const { colorClass, text } = statusConfig.get(status) || { colorClass: 'dark:bg-slate-400 bg-slate-400 text-white', text: 'idle' };

  return (
    <span className={"m-1 px-4 py-2 inline-flex leading-5 rounded-md " + colorClass}>
      {text}{(status === 'Done' || status === 'idle') ? '' : dots}
    </span>
  );
};

export default ModelStatus;