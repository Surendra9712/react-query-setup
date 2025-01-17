import React, {HTMLAttributes, ReactNode} from 'react';
import {usePopover} from './PopoverContext';

interface PopoverTriggerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({children, ...props}) => {
    const {togglePopover, triggerRef} = usePopover();

    return (
        <div {...props} ref={triggerRef} onClick={togglePopover} style={{cursor: 'pointer'}}>
            {children}
        </div>
    );
};

export default PopoverTrigger;
