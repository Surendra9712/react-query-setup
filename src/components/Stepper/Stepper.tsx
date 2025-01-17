import React from 'react';
import Step from './Step.tsx';
import {StepperProps} from './StepperTypes';
import StepperContext from './StepperContext';

const Stepper: React.FC<StepperProps> = ({
                                             steps,
                                             activeStep = 0,
                                             stepClicked
                                         }) => {
    const contextValue = React.useMemo(() => ({activeStep}), [activeStep]);
    const stepsToRender = steps.map((step, index) => {
        return (
            <div className='flex-1 relative px-2' key={index}>
                <Step index={index} {...(typeof step === 'object' ? step : {})} />
            </div>
        );
    });

    return (
        <StepperContext.Provider value={{...contextValue, onStepChange: stepClicked}}>
            <div className="flex">
                {stepsToRender}
            </div>
        </StepperContext.Provider>
    );
};

export default Stepper;
