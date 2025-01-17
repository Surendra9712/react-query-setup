import Skeleton from "./Skeleton.tsx";

export default function PostSkeleton(){
    return (
        <div className="space-y-4">
            <div className="border shadow rounded-md p-3 w-full">
                <Skeleton/>
            </div>
            <div className="border shadow rounded-md p-3 w-full">
                <Skeleton/>
            </div>
            <div className="border shadow rounded-md p-3 w-full">
                <Skeleton/>
            </div>
            <div className="border shadow rounded-md p-3 w-full">
                <Skeleton/>
            </div>
            <div className="border shadow rounded-md p-3 w-full">
                <Skeleton/>
            </div>
            <div className="border shadow rounded-md p-3 w-full">
                <Skeleton/>
            </div>
        </div>
    )
}