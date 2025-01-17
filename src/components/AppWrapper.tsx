import {ReactNode} from "react";

export default function AppWrapper({children}: { children: ReactNode }) {
    return (
        <div className="p-4 max-w-screen-xl mx-auto	">{children}</div>
    )
}