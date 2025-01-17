import React from 'react';

interface IStepContext {
    completed: boolean;
    active: boolean;
    disabled: boolean;
    index: number;
    onStepClicked?: (step: number) => void;
}

const StepContext = React.createContext<IStepContext>({
    completed: false,
    active: false,
    disabled: false,
    index: 0,
    onStepClicked: (step: number) => step
});

export default StepContext;
