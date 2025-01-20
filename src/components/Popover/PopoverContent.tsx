import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {usePopover} from './PopoverContext';

interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const PopoverContent = forwardRef<{ closePopover: () => void }, PopoverContentProps>(({children, ...props}, ref) => {
    const {isOpen, position, closePopover, triggerRef} = usePopover();

    const contentRef = useRef<HTMLDivElement | null>(null);

    React.useImperativeHandle(ref, () => ({
        closePopover
    }))
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                closePopover();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [closePopover]);

    if (!isOpen) return null;
    const triggerRect = triggerRef.current?.getBoundingClientRect();
    if (!triggerRect) return null;

    const innerWidth = window.innerWidth - (window.innerWidth - document.documentElement.clientWidth);
    const availableSpace = {
        top: triggerRect.top,
        bottom: window.innerHeight - triggerRect.bottom,
        left: triggerRect.left,
        right: innerWidth - triggerRect.right,
    };

    let positionStyles: React.CSSProperties = {};
    const addonMargin = 10;
    const handleHorizontalPosition = () => {
        if (availableSpace.left > availableSpace.right) {
            positionStyles = {...positionStyles, right: availableSpace.right};
        } else {
            positionStyles = {...positionStyles, left: availableSpace.left};
        }
    };

    if (!position) {
        if (availableSpace.bottom > availableSpace.top) {
            positionStyles = {...positionStyles, top: triggerRect.bottom + addonMargin};
        } else {
            positionStyles = {...positionStyles, bottom: window.innerHeight - triggerRect.top + addonMargin};
        }
        handleHorizontalPosition();
    } else {
        if (position === 'top') {
            positionStyles = {...positionStyles, bottom: window.innerHeight - triggerRect.top + addonMargin};
            handleHorizontalPosition();
        } else if (position === 'bottom') {
            positionStyles = {...positionStyles, top: triggerRect.bottom + addonMargin};
            handleHorizontalPosition();
        } else if (position === 'left') {
            positionStyles = {
                ...positionStyles,
                top: triggerRect.top + triggerRect.height / 2,
                transform: 'translateY(-50%)',
                right: availableSpace.right + triggerRect.width + addonMargin,
            };
        } else if (position === 'right') {
            positionStyles = {
                ...positionStyles,
                top: triggerRect.top + triggerRect.height / 2,
                transform: 'translateY(-50%)',
                left: triggerRect.right + addonMargin,
            };
        }
    }
    return ReactDOM.createPortal(
        <div
            ref={contentRef}
            {...props}
            style={{
                ...positionStyles,
                width: 360,
                padding: 16,
                backgroundColor: '#fff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                zIndex: 100,
                position: 'absolute',
            }}
        >
            {children}
        </div>,
        document.body
    );
});

export default PopoverContent;