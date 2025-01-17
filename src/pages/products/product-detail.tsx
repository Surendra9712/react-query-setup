import {useParams} from "react-router";
import {Suspense} from "react";
import usePost from "../../hooks/use-post.tsx";
import Skeleton from "../../components/Skeleton.tsx";
import AddEditProduct from "./add-edit-product.tsx";

function PostDetailContent() {
    const {id} = useParams();
    const {GetPostDetails} = usePost();
    const {data} = GetPostDetails({id: Number(id)});

    return (
        <div className="space-y-4">
            <AddEditProduct formData={data}/>
            <h4>{data?.title}</h4>
            <div>
                <h6>Description:</h6>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                    {data.images.map((img, index) => <img
                        className="w-full h-full object-cover"
                        src={img}
                        key={index}
                        alt=""/>)}
                </div>
                <div>{data?.description}</div>
            </div>
        </div>
    );
}

export default function ProductDetail() {
    return (
        <Suspense fallback={<div className="space-y-4">
            <Skeleton className="h-5 max-w-xl"></Skeleton>
            <div className="space-y-4">
                <Skeleton className="max-w-32"></Skeleton>
                <Skeleton className="h-3 max-w-full"></Skeleton>
                <Skeleton className="h-3 max-w-full"></Skeleton>
                <Skeleton className="h-3 max-w-full"></Skeleton>
                <Skeleton className="h-3 max-w-full"></Skeleton>
                <Skeleton className="h-3 max-w-full"></Skeleton>
            </div>
        </div>}>
            <PostDetailContent/>
        </Suspense>
    )
}