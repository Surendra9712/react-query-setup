import {IUseApi, QueryArgs} from "../interfaces/IUseApi.tsx";
import {fetchApiData, useApi} from "./use-api.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";

export function useSuspenseApi({
                                   endpoint,
                                   staleTime,
                                   cacheTime,
                                   refetchInterval,
                                   refetchOnWindowFocus = false,
                                   queryKey
                               }: IUseApi) {
    const apiBase = useApi({
        endpoint,
        staleTime,
        cacheTime,
        refetchInterval,
        queryKey
    });

    // Query function for suspense useSuspenseQuery
    const useQueryHelper = (args?: QueryArgs) => {
        return useSuspenseQuery({
            queryKey: args?.id ? [queryKey,endpoint, args.id, args.queryParams] : [queryKey,endpoint, args?.queryParams],
            queryFn: () => fetchApiData(apiBase.api, endpoint, args),
            staleTime,
            retry: 3,
            gcTime: cacheTime,
            refetchInterval,
            refetchOnWindowFocus
        });
    };

    return {
        get: useQueryHelper,
        post: apiBase.post,
    };
}
