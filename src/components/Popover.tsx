import React, { CSSProperties, ReactNode, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

interface PopoverPositionInterface {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    transform?: string;
    margin?: CSSProperties['margin'];
}

// Type for Popover Component Props
interface PopoverProps {
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

interface PopoverHandle {
    closePopover: () => void;
}

const Popover = forwardRef<PopoverHandle, PopoverProps>(({ children, position }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null); // To reference the trigger element

    // Expose the closePopover method to parent via ref
    useImperativeHandle(ref, () => ({
        closePopover: () => setIsOpen(false),
    }));

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={popoverRef} style={{ position: 'relative' }}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child as React.ReactElement, {
                    isOpen,
                    togglePopover: () => setIsOpen((prev) => !prev),
                    position,
                    triggerRef, // Pass the trigger reference to the PopoverTrigger
                })
            )}
        </div>
    );
});

Popover.displayName = 'Popover';

// Type for PopoverTrigger Props
interface PopoverTriggerProps {
    children: ReactNode;
    togglePopover?: () => void;
    triggerRef?: React.RefObject<HTMLDivElement>;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, togglePopover, triggerRef }) => {
    return (
        <div onClick={togglePopover} ref={triggerRef} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
};

// Type for PopoverContent Props
interface PopoverContentProps {
    children: ReactNode;
    isOpen?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
    triggerRef?: React.RefObject<HTMLDivElement>;
}

const PopoverContent: React.FC<PopoverContentProps> = ({ children, isOpen, position, triggerRef }) => {
    if (!isOpen) return null;

    // Get the position of the trigger element
    const triggerRect = triggerRef?.current?.getBoundingClientRect();
    if (!triggerRect) return null;

    // Calculate the available space in the window
    const innerWidth = window.innerWidth - (window.innerWidth - document.documentElement.clientWidth);
    const availableSpace = {
        top: triggerRect.top,
        bottom: window.innerHeight - triggerRect.bottom,
        left: triggerRect.left,
        right: innerWidth - triggerRect.right,
    };

    // Default position if none is provided
    let positionStyles: PopoverPositionInterface = {};

    // Decide position dynamically if not specified
    if (!position) {
        if (availableSpace.bottom > availableSpace.top) {
            positionStyles = { ...positionStyles, top: '100%', margin: '10px 0 0 0' }; // Open below
        } else {
            positionStyles = { ...positionStyles, bottom: '100%', margin: '0 0 10px 0' }; // Open above
        }

        if (availableSpace.left > availableSpace.right) {
            positionStyles = { ...positionStyles, right: 0 };
        } else {
            positionStyles = { ...positionStyles, left: 0 };
        }
    } else {
        // Handle predefined positions: 'top', 'bottom', 'left', 'right'
        if (position === 'top') {
            positionStyles = { ...positionStyles, top: 'auto', bottom: '100%', margin: '0 0 10px 0' }; // Open above
        } else if (position === 'bottom') {
            positionStyles = { ...positionStyles, top: '100%', margin: '10px 0 0 0' }; // Open below
        } else if (position === 'left') {
            positionStyles = {
                ...positionStyles, top: '50%',
                transform: 'translateY(-50%)', left: 'auto', right: '100%',
                margin: '0 10px 0 0',
            }; // Open left
        } else if (position === 'right') {
            positionStyles = {
                ...positionStyles,
                top: '50%',
                transform: 'translateY(-50%)',
                left: '100%',
                right: 'auto',
                margin: '0 0 0 10px',
            }; // Open right
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                ...positionStyles,
                width: 360,
                padding: 16,
                backgroundColor: '#fff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                zIndex: 100,
            }}
        >
            {children}
        </div>
    );
};
export { Popover, PopoverTrigger, PopoverContent };