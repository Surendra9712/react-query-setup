import React from 'react';
import clsx from 'clsx';
import StepContext from './StepContext.ts';

const Connector: React.FC = () => {

    const {completed, active} = React.useContext(StepContext);

    return (
        <div className="absolute top-[calc((2.5rem-1px)/2)] left-[calc(-50%+2.5rem-8px)] right-[calc(50%+2.5rem-8px)]">
          <span
              className={clsx('border-t-2 block transition-colors duration-500',
                  {'border-green-700': completed},
                  {'border-violet-700': active}
              )}></span>
        </div>
    );
};

export default Connector;
