export type BaseEntityType = {
	id: number;
	created_at: Date;
	updated_at: Date;
};

export type WalletProfileType = BaseEntityType & {
	user_id: number;
	name: string;
	is_default: boolean;
};

export type ThemeType = "light" | "dark";

export type CryptoType = BaseEntityType & {
	symbol: string;
	name: string;
	full_name: string;
	network_name: string;
	icon: string;
	network_icon: string;
	is_active: boolean;
	address: string;
	qr_code: string;
	price: number;
};

export type WalletHistoryItemType = BaseEntityType & {
	user_id: number;
	crypto_id: number;
	transaction_type:
		| "deposit"
		| "withdrawal"
		| "staking"
		| "unstaking"
		| "exchange_in"
		| "exchange_out";
	amount: number;
	tx_hash: string;
	address_from: string;
	address_to: string;
	status: "pending" | "completed" | "failed";
	notes: string;
	details: string;
	crypto: CryptoType;
	formatted_date: string;
	icon_class: string;
	type_text: string;
	status_text: string;
};
