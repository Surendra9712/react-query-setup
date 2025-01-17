import axios from "axios";
import {useEffect} from "react";
import {BASE_URL} from "../api-config";

const ORIGIN_URL = `${window.location.origin}`;

const api = axios.create({
    baseURL: BASE_URL || ORIGIN_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

function useAxios() {
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            async (config) => {

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Cleanup the interceptor when the component using this hooks unmounts
        return () => {
            api.interceptors.request.eject(requestInterceptor);
        };
    }, []); // Ensure effect re-runs if instance or accounts change

    return api;
}

export default useAxios;
