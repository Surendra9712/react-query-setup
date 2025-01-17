import React from 'react';

interface IStepperContext {
    activeStep: number;
    onStepChange?: (step: number) => void;
}

const StepperContext = React.createContext<IStepperContext>({
    activeStep: 0,
    onStepChange: (step: number) => step,
});

export default StepperContext;
