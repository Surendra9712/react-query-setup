import usePost from "../../hooks/use-post.tsx";
import {Link} from "react-router";
import {Suspense, useState} from "react";
import PostSkeleton from "../../components/PostSkeleton.tsx";
import AddEditProduct from "./add-edit-product.tsx";

function PostData() {
    const [offset, setOffset] = useState(1);
    const {GetPosts, DeletePost} = usePost();
    const {data,refetch} = GetPosts();

    const {mutate} = DeletePost();
    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: (data) => {
                refetch();
                console.log(data)
            }, onError: (err) => {
                console.log(err)
            }
        })
    }

    const handleValueChange = (evt: any) => {
        setOffset(evt.target.value)
    }

    return (
        <div className="space-y-4">
            <select className="border w-full py-1 px-2 rounded" value={offset} onChange={handleValueChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(val => <option
                    value={val} key={val}>{val}</option>)}
            </select>
            <AddEditProduct/>
            {data?.map(item => <div className="flex justify-between border shadow rounded-md p-3" key={item.id}>
                <Link to={'/products/' + item.id}>{item.title}</Link>
                <button className="" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>)}
        </div>
    )
}


export default function Product() {
    return (
        <Suspense fallback={<PostSkeleton/>}>
            <PostData/>
        </Suspense>
    )
}