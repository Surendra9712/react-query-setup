import React, {forwardRef, HTMLAttributes, ReactNode, useCallback, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {usePopover} from './PopoverContext';

interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const PopoverContent = forwardRef<{ closePopover: () => void }, PopoverContentProps>(
    ({children, ...props}, ref) => {
        const {isOpen, position, closePopover, triggerRef} = usePopover();
        const contentRef = useRef<HTMLDivElement | null>(null);

        // Memoize the handleClickOutside function to prevent unnecessary re-creations
        const handleClickOutside = useCallback((e: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                closePopover();
            }
        }, [closePopover, triggerRef]);

        useEffect(() => {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }, [handleClickOutside]);

        React.useImperativeHandle(ref, () => ({
            closePopover,
        }));

        if (!isOpen || !triggerRef.current) return null;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        if (!triggerRect) return null;

        // Get available space for popover positioning
        const innerWidth = window.innerWidth - (window.innerWidth - document.documentElement.clientWidth);
        const availableSpace = {
            top: triggerRect.top,
            bottom: window.innerHeight - triggerRect.bottom,
            left: triggerRect.left,
            right: innerWidth - triggerRect.right,
        };

        const addonMargin = 12;
        const calculatePosition = () => {
            let positionStyles: React.CSSProperties = {};
            let arrowPositionStyles: React.CSSProperties = {};
            const handleHorizontalPosition = () => {
                if (availableSpace.left > availableSpace.right) {
                    positionStyles = {...positionStyles, right: availableSpace.right};
                    arrowPositionStyles = {...arrowPositionStyles, right: addonMargin};
                } else {
                    positionStyles = {...positionStyles, left: availableSpace.left};
                    arrowPositionStyles = {...arrowPositionStyles, left: addonMargin};
                }
            };

            const positionTop = () => {
                positionStyles = {...positionStyles, bottom: window.innerHeight - triggerRect.top + addonMargin};
                arrowPositionStyles = {
                    ...arrowPositionStyles,
                    top: '100%',
                    transform: 'rotate(-180deg)',
                }
            };

            const positionBottom = () => {
                positionStyles = {...positionStyles, top: triggerRect.bottom + addonMargin};
                arrowPositionStyles = {
                    ...arrowPositionStyles,
                    bottom: '100%',
                };
            };

            if (!position) {
                if (availableSpace.bottom > availableSpace.top) {
                    positionBottom();
                } else {
                    positionTop();
                }
                handleHorizontalPosition();
            } else {
                switch (position) {
                    case 'top':
                        positionTop();
                        handleHorizontalPosition();
                        break;
                    case 'bottom':
                        positionBottom();
                        handleHorizontalPosition();
                        break;
                    case 'left':
                        positionStyles = {
                            ...positionStyles,
                            top: triggerRect.top + triggerRect.height / 2,
                            transform: 'translateY(-50%)',
                            right: availableSpace.right + triggerRect.width + addonMargin,
                        };
                        arrowPositionStyles = {
                            ...arrowPositionStyles,
                            top: '50%',
                            transform: 'translateY(-50%) rotate(90deg)',
                            left: 'calc(100% - 4px)',
                        };
                        break;
                    case 'right':
                        positionStyles = {
                            ...positionStyles,
                            top: triggerRect.top + triggerRect.height / 2,
                            transform: 'translateY(-50%)',
                            left: triggerRect.right + addonMargin,
                        };
                        arrowPositionStyles = {
                            ...arrowPositionStyles,
                            top: '50%',
                            transform: 'translateY(-50%) rotate(-90deg)',
                            right: 'calc(100% - 4px)',
                        };
                        break;
                }
            }
            return {positionStyles, indicatorPositionStyles: arrowPositionStyles};
        };

        const {positionStyles, indicatorPositionStyles} = calculatePosition();


        return ReactDOM.createPortal(
            <div
                ref={contentRef}
                {...props}
                id="popover-content"
                style={{
                    ...positionStyles,
                    width: 360,
                    backgroundColor: '#fff',
                    padding: 16,
                    boxShadow: '0px 0px 15px 0px rgba(0,0,0,.03),0px 2px 30px 0px rgba(0,0,0,.08),0px 0px 1px 0px rgba(0,0,0,.3)',
                    borderRadius: 8,
                    zIndex: 100,
                    position: 'absolute',
                }}
            >
                {children}
                <span
                    className="absolute size-0 border-x-8 border-b-8 border-x-transparent border-b-neutral-200"
                    style={{...indicatorPositionStyles}}>
                </span>
            </div>,
            document.body
        );
    }
);

export default PopoverContent;
