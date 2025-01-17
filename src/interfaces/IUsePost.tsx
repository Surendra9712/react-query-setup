import {UseMutationResult, UseSuspenseQueryResult} from "@tanstack/react-query";
import {PostType} from "../types/post.type.ts";
import {QueryArgs} from "./IUseApi.tsx";

export interface IUsePost {
    GetPosts: (args?: QueryArgs) => UseSuspenseQueryResult<PostType[], Error>;
    GetPostDetails: (args?:QueryArgs) => UseSuspenseQueryResult<PostType, Error>;
    CreatePost: () => UseMutationResult<PostType, Error>;
    UpdatePost: () => UseMutationResult<PostType, Error,any,unknown>;
    DeletePost: () => UseMutationResult<boolean, Error, any, unknown>;
}
