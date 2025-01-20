import * as React from 'react';
import {Connector, StepButton, StepContext, StepperContext} from "./index.ts";

const Step: React.FC<{ label: string, index: number }> = ({
                                                              label = '',
                                                              index = 0,
                                                          }) => {
    const {activeStep, onStepChange} = React.useContext(StepperContext);
    let [active = false, completed = false, disabled = false] = [];
    if (activeStep === index) {
        active = true;
    } else if (activeStep > index) {
        completed = true;
    } else {
        disabled = true;
    }

    const contextValue = {
        completed,
        active,
        disabled,
        index,
    };

    return (
        <StepContext.Provider value={contextValue}>
            {index !== 0 &&
                <Connector/>
            }
            <div className={'flex flex-col items-center'}>
                <StepContext.Provider value={{...contextValue, onStepClicked: onStepChange}}>
                    <StepButton></StepButton>
                </StepContext.Provider>
                {label && (
                    <label
                        className='w-full text-center text-sm mt-2'>{label}</label>
                )}
            </div>
        </StepContext.Provider>
    );
};

export default Step;
