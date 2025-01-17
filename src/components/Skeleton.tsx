import {cn} from "../utilities/utils.ts";

export default function Skeleton({className}: { className?: string }) {
    return (
        <div className={cn('h-4 w-full bg-slate-200 rounded-full animate-pulse', className)}></div>
    );
}
