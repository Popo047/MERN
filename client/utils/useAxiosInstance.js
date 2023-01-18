import axios from "axios";
import { useEffect } from "react";
import { axiosInstance } from "./axiosInstance";

export default function useAxiosInstance() {
	useEffect(() => {
		const requestInterceptor = axiosInstance.interceptors.request.use(
			(config) => {
				if (!config.headers["accessToken"])
					config.headers["accessToken"] = sessionStorage.getItem("accessToken");
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error) => {
				if (
					error?.response?.status === 401 ||
					error?.response?.status === 403
				) {
					response.headers["accessToken"] =
						sessionStorage.getItem("accessToken");
					return axiosInstance(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.request.eject(requestInterceptor);
			axios.interceptors.request.eject(responseInterceptor);
		};
	}, []);
	return axiosInstance;
}
