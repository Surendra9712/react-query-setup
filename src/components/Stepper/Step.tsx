import * as React from 'react';

import StepperContext from './StepperContext.ts';
import {StepProps} from '../Step/StepTypes.ts';
import StepContext from './StepContext.ts';
import StepButton from "./StepButton.tsx";
import Connector from "./Connector.tsx";

const Step: React.FC<StepProps> = ({
                                       label = '',
                                       completed: completedProp,
                                       active: activeProp,
                                       disabled: disabledProp,
                                       index = 0,
                                   }) => {
    const {activeStep,onStepChange} = React.useContext(StepperContext);
    let [active = false, completed = false, disabled = false] = [
        activeProp,
        completedProp,
        disabledProp,
    ];
    if (activeStep === index) {
        active = activeProp !== undefined ? activeProp : true;
    } else if (activeStep > index) {
        completed = completedProp !== undefined ? completedProp : true;
    } else {
        disabled = disabledProp !== undefined ? disabledProp : true;
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
                <StepContext.Provider value={{...contextValue,onStepClicked:onStepChange}}>
                    <StepButton onClick={()=>console.log('clicked')}></StepButton>
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
