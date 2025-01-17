import {usePopover} from "./PopoverContext.tsx";

const ClosePopover: React.FC<{ label?: string }> = ({label = 'Close'}) => {
    const {closePopover} = usePopover();

    return (
        <button className="bg-slate-300 px-3 py-1 rounded" onClick={closePopover}>
            {label}
        </button>
    );
};

export default ClosePopover;