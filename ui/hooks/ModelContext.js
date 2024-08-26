import React, { createContext, useState, useContext } from 'react';

// Create the context
const ModelContext = createContext();

// Create a provider component
export function ModelProvider({ children }) {
  const [modelStatus, setModelStatus] = useState('idle');
  const [modelSummary, setModelSummary] = useState([]);

  // Value object to be provided to consuming components
  const value = {
    modelStatus,
    setModelStatus,
    modelSummary,
    setModelSummary,
  };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}

// Custom hook for using the context
export function useModelContext() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
}