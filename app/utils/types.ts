type BaseEntityType = {
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
