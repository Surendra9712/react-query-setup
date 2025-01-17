import {forwardRef, HTMLAttributes, ReactNode} from 'react';
import {PopoverProvider} from './PopoverContext.tsx';

interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(({children, position}, ref) => {
    return (
        <PopoverProvider initialPosition={position}>
            <div ref={ref}>{children}</div>
        </PopoverProvider>
    );
});

Popover.displayName = 'Popover';

export default Popover;