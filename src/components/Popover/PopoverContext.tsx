import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface PopoverContextType {
    isOpen: boolean;
    togglePopover: () => void;
    closePopover: () => void;
    position?: 'top' | 'bottom' | 'left' | 'right';
    setPosition: (position: 'top' | 'bottom' | 'left' | 'right') => void;
    triggerRef: React.RefObject<HTMLDivElement>; // Add triggerRef to context
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const usePopover = (): PopoverContextType => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error('usePopover must be used within a PopoverProvider');
    }
    return context;
};

interface PopoverProviderProps {
    children: ReactNode;
    initialPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const PopoverProvider: React.FC<PopoverProviderProps> = ({ children,initialPosition }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'|undefined>(initialPosition);
    const triggerRef = useRef<HTMLDivElement | null>(null); // Create triggerRef here

    const togglePopover = () => setIsOpen((prev) => !prev);
    const closePopover = () => setIsOpen(false);

    return (
        <PopoverContext.Provider value={{ isOpen, togglePopover, closePopover, position, setPosition, triggerRef }}>
            {children}
        </PopoverContext.Provider>
    );
};
