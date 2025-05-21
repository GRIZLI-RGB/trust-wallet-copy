import axios, { AxiosInstance } from "axios";
import { ThemeType } from "./types";

const api: AxiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/`,
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

export const authLogout = async () => await api.post("auth/logout");

export const walletSettings = async () => await api.get("wallet/settings");

export const walletDashboard = async () => await api.get("wallet/dashboard");

export const walletProfiles = async () => await api.get("wallet/profiles");

export const walletCreateProfile = async (data: {
	name?: string;
	password?: string;
	method: "create" | "import";
	seed_words?: string;
}) => await api.post("wallet/profiles", data);

export const walletSetDefaultProfile = async (walletId: number) =>
	api.post(`wallet/profiles/${walletId}/set-default`);

export const walletSetTheme = async (newTheme: ThemeType) =>
	await api.post("wallet/settings/theme", {
		theme: newTheme,
	});

export const walletHistory = async () => await api.get("wallet/history");

export const getStaking = async () => await api.get("staking");

export const getStakingOne = async (symbol: string) =>
	await api.get(`staking/${symbol}`);

export const sendStakingOne = async (symbol: string) =>
	await api.post(`staking/${symbol}/stake`);

export const outStakingOne = async (id: number) =>
	await api.post(`staking/unstake/${id}`);

export const getWalletExchange = async () => await api.get("/wallet/exchange");

export const makeWalletExchange = async (data: {
	from_crypto_id: number;
	to_crypto_id: number;
	amount: number;
}) => await api.post("/wallet/exchange", data);

export const getWalletReceiveList = async () =>
	api.get("/wallet/crypto/receive-list");

export const getWalletReceiveAddress = async (symbol: string) =>
	api.get(`/wallet/crypto/receive/${symbol}`);

export const getWalletSendList = async () =>
	api.get("/wallet/crypto/send-list");

export const getWalletSendData = async (symbol: string) =>
	api.get(`/wallet/crypto/send/${symbol}`);

export const sendCrypto = async (symbol: string) =>
	await api.post(`/wallet/crypto/send/${symbol}`);
