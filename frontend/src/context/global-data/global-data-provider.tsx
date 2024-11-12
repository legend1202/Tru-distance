import React, { useState, ReactNode, createContext } from 'react';

// Define types for the GlobalData
export interface GlobalDataContextType {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

interface GlobalDataProviderProps {
  children: ReactNode;
}

export const GlobalDataProvider: React.FC<GlobalDataProviderProps> = ({ children }) => {
  const totalSteps = 9
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev >= 1 ? prev - 1 : prev));
  };

  const setStep = (step: number) => {
    if (step >= 0 && step <= totalSteps) setCurrentStep(step);
  };

  return (
    <GlobalDataContext.Provider value={{ currentStep, nextStep, prevStep, setStep }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
