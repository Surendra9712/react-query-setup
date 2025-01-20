import {usePopover} from "./PopoverContext.tsx";
import React, {HTMLAttributes} from "react";
const PopoverClose: React.FC<HTMLAttributes<HTMLButtonElement>> = ({children,...props}) => {
    const {closePopover} = usePopover();

    return (
        <button className="bg-slate-300 px-3 py-1 rounded" {...props} onClick={closePopover}>
            {children ?? 'Close'}
        </button>
    );
};

export default PopoverClose;