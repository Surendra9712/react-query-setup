import {GET_POST_ENDPOINT} from "../api-config.ts";
import {IUsePost} from "../interfaces/IUsePost.tsx";
import {useSuspenseApi} from "./use-suspense-api.tsx";
import {useApi} from "./use-api.tsx";

const usePost = (): IUsePost => {
    const {get: GetPosts} = useSuspenseApi({endpoint: GET_POST_ENDPOINT,queryKey:"allProducts"});
    const {get: GetPostDetails} = useSuspenseApi({endpoint: GET_POST_ENDPOINT, queryKey: "productDetails"});
    const {post: CreatePost} = useApi({endpoint: GET_POST_ENDPOINT, queryKey: "productCreate"});
    const {update: UpdatePost} = useApi({endpoint: GET_POST_ENDPOINT, queryKey: "productUpdate"});
    const {delete: DeletePost} = useApi({endpoint: GET_POST_ENDPOINT});
    return {
        GetPosts,
        GetPostDetails,
        CreatePost,
        UpdatePost,
        DeletePost,
    };
};

export default usePost;
