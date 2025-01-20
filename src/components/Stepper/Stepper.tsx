import React from 'react';
import {Step, StepperContext, StepperProps} from './index.ts';

const Stepper: React.FC<StepperProps> = ({
                                             steps,
                                             activeStep = 0,
                                             stepClicked
                                         }) => {
    const contextValue = React.useMemo(() => ({activeStep}), [activeStep]);
    const stepsToRender = steps.map((step, index) => {
        return (
            <div className='flex-1 relative px-2' key={index}>
                <Step index={index} label={step}/>
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
