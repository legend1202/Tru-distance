import React, { useMemo, useState, ReactNode, createContext } from 'react';

export interface GlobalDataContextType {
  currentStep: number;
  workflows: any;
  currentWorkflow: any;
  setCurrentWorkflow: (workflows: any) => void;
  setWorkflows: (workflow: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

export const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

interface GlobalDataProviderProps {
  children: ReactNode;
}

const workFlowDataStructure = {
  1: { status: 1 },
  2: { status: 1 },
  3: { status: 1 },
  4: { status: 0 },
  5: { status: 0 },
  6: { status: 0 },
  7: { status: 0 },
  8: { status: 0 },
};

export const GlobalDataProvider: React.FC<GlobalDataProviderProps> = ({ children }) => {
  const totalSteps = 9;
  const [currentStep, setCurrentStep] = useState(0);
  const [workflows, setWorkflows] = useState([]);
  const [currentWorkflow, setCurrentWorkflow] = useState(workFlowDataStructure);

  const nextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev >= 1 ? prev - 1 : prev));
  };

  const setStep = (step: number) => {
    if (step >= 0 && step <= totalSteps) setCurrentStep(step);
  };

  const value = useMemo(
    () => ({
      currentStep,
      workflows,
      currentWorkflow,
      setWorkflows,
      setCurrentWorkflow,
      nextStep,
      prevStep,
      setStep,
    }),
    [currentStep]
  );

  return <GlobalDataContext.Provider value={value}>{children}</GlobalDataContext.Provider>;
};
