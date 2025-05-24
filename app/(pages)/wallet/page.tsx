"use client";

import NumberFlow from "@number-flow/react";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
	walletDashboard,
	walletProfiles as walletProfilesApi,
	walletSetDefaultProfile,
	walletSettings,
} from "@/app/utils/api";
import { _globalLoading_, _userApproved_ } from "@/app/utils/store";
import { CryptoType, WalletProfileType } from "@/app/utils/types";
import clsx from "clsx";

export default function WalletPage() {
	const router = useRouter();

	const setGlobalLoading = useSetAtom(_globalLoading_);
	const [userApproved, setUserApproved] = useAtom(_userApproved_);

	const [wallet, setWallet] = useState<
		WalletProfileType & {
			total_balance: number;
		}
	>();
	const [walletProfiles, setWalletProfiles] = useState<WalletProfileType[]>();
	const [cryptos, setCryptos] = useState<
		{
			id: number;
			wallet_id: number;
			balance: string;
			address: string;
			crypto: CryptoType;
			created_at: Date;
			updated_at: Date;
		}[]
	>();

	const [refresh, setRefresh] = useState(false);

	const handleClick = () => {
		if (refresh) return;

		setRefresh(true);

		walletDashboard()
			.then((res) => {
				setWallet({
					...res.data.data.wallet,
					total_balance: res.data.data.total_balance,
				});
				setCryptos(res.data.data.cryptos);
			})
			.finally(() => {
				setTimeout(() => setRefresh(false), 1000);
			});
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (!userApproved) {
			interval = setInterval(() => {
				walletSettings().then((res) => {
					if (res.data.data.user?.is_approved) {
						setUserApproved(true);
					}
				});
			}, 10000);

			setGlobalLoading(false);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [userApproved]);

	useEffect(() => {
		if (userApproved) {
			walletDashboard().then((res) => {
				setWallet({
					...res.data.data.wallet,
					total_balance: res.data.data.total_balance,
				});
				setCryptos(res.data.data.cryptos);

				walletProfilesApi().then((resp) => {
					setWalletProfiles(resp.data.data);
					setGlobalLoading(false);
				});
			});
		}
	}, [userApproved]);

	const [isWalletsOpen, setIsWalletsOpen] = useState(false);

	const cryptoManageButtons = [
		{
			label: "Send",
			icon: (
				<svg
					className="text-utility-1-default"
					fill="none"
					width="24"
					height="24"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10.002 2.49903L15.8945 8.39158L14.4214 9.86472L11.0426 6.48597L11.0426 17.4998L8.95931 17.4998L8.95931 6.48697L5.58156 9.86472L4.10842 8.39158L10.001 2.49903L10.0015 2.49953L10.002 2.49903Z"
						fill="currentColor"
					></path>
				</svg>
			),
			link: "/wallet/send",
		},
		{
			label: "Receive",
			icon: (
				<svg
					className="text-utility-1-default"
					fill="none"
					width="24"
					height="24"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M9.99803 17.4993L4.10547 11.6067L5.57861 10.1336L8.95736 13.5123L8.95736 2.49845L11.0407 2.49845L11.0407 13.5113L14.4184 10.1336L15.8916 11.6067L9.99902 17.4993L9.99852 17.4988L9.99803 17.4993Z"
						fill="currentColor"
					></path>
				</svg>
			),
			link: "/wallet/receive",
		},
		{
			label: "Swap",
			icon: (
				<svg
					className="text-utility-1-default"
					fill="none"
					width="24"
					height="24"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M2.49984 7.50016L2.49984 5.00016L13.7498 5.00016V2.0835L17.9165 6.25016L13.7498 10.4168V7.50016L2.49984 7.50016ZM17.4998 15.0002V12.5002L5.83317 12.5002L5.83317 9.5835L1.6665 13.7502L5.83317 17.9168L5.83317 15.0002L17.4998 15.0002Z"
						fill="currentColor"
					></path>
				</svg>
			),
			link: "/wallet/swap",
		},
	];

	const handleSetDefaultWalletProfile = (walletId: number) => {
		setGlobalLoading(true);

		setIsWalletsOpen(false);

		walletSetDefaultProfile(walletId).then(() => {
			walletDashboard().then((res) => {
				setWallet({
					...res.data.data.wallet,
					total_balance: res.data.data.total_balance,
				});
				setCryptos(res.data.data.cryptos);

				walletProfilesApi().then((resp) => {
					setWalletProfiles(resp.data.data);
					setGlobalLoading(false);
				});
			});
		});
	};

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] px-4 pt-4">
			<div className="flex flex-col space-y-2">
				<div className="relative flex justify-between items-center mb-2">
					<div className="relative">
						<button
							className="outline-none cursor-pointer hover:opacity-65"
							onClick={() => setIsWalletsOpen((prev) => !prev)}
							type="button"
						>
							<div className="flex items-center">
								<div>
									<svg
										className="text-utility-1-opacity-1"
										fill="none"
										width="20"
										height="20"
										viewBox="0 0 16 16"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M5.6666 2.66675C4.00975 2.66675 2.6666 4.00989 2.6666 5.66675L2.66656 8.65552H4.22578V10.2148H2.66654L2.6665 11.7741H4.22575L4.22578 10.2148L5.78502 10.2148V11.7741L4.22575 11.7741L4.22578 13.3334L13.3333 13.3334V2.66675H5.6666ZM11.3333 4.66675H5.6666C5.11431 4.66675 4.6666 5.11446 4.6666 5.66675C4.6666 6.21903 5.11431 6.66675 5.6666 6.66675H11.3333V4.66675ZM11.3333 8.66675H8.6666V11.3334H11.3333V8.66675Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
								<div className="pl-1 max-w-[100px]">
									<p className="typography-subheader-14 text-utility-1-default font-medium truncate  text-unset  ">
										{wallet?.name || "Your Wallet"}
									</p>
								</div>
								<div>
									<svg
										className="text-utility-1-opacity-1 transition-transform rotate-0"
										fill="none"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M16.5 8.49023V10.7402L12 15.5102L7.5 10.7402V8.49023H16.5Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
						</button>

						{isWalletsOpen && (
							<div
								className="absolute w-full min-w-[406px] mt-2 left-0 z-10 shadow-lg rounded-4 bg-background-2 cursor-default"
								tabIndex={-1}
							>
								<div
									className={clsx(
										"p-4 flex space-x-3",
										userApproved &&
											"border-b border-b-utility-1-opacity-5"
									)}
								>
									<div className="flex w-auto">
										<button
											onClick={() => router.push("/auth")}
											type="button"
											disabled={!userApproved}
											className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:!bg-black/10 dark:hover:!bg-white/10 py-[9px] px-4 text-subheader-14 leading-subheader-14 default-button  w-auto "
										>
											<div className="-mx-0.5">
												<p className="body-text text-utility-1-default font-medium   text-unset  ">
													Add new wallet
												</p>
											</div>
											<span className="pl-1.5">
												<svg
													className="text-utility-1-default"
													fill="none"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M21 11.9988L13.9289 4.92773L12.1612 6.6955L16.2157 10.75L2.99903 10.75L2.99903 13.25L16.2145 13.25L12.1612 17.3033L13.9289 19.0711L21 12L20.9994 11.9994L21 11.9988Z"
														fill="currentColor"
													></path>
												</svg>
											</span>
										</button>
									</div>
								</div>
								{userApproved && (
									<div className="mr-1 pl-2 py-2 tw-scrollbar max-h-[250px]">
										<div className="flex space-y-4 flex-col">
											{(walletProfiles || []).map(
												(walletProfile) => (
													<div
														key={walletProfile.id}
														role="button"
														className="outline-0"
														tabIndex={0}
													>
														<div
															onClick={() =>
																handleSetDefaultWalletProfile(
																	walletProfile.id
																)
															}
															className={clsx(
																"flex items-center py-1.5 p-4 rounded-3",
																!walletProfile.is_default &&
																	"hover:!bg-black/10 dark:hover:!bg-white/10 cursor-pointer"
															)}
														>
															<div>
																<svg
																	className="text-utility-1-opacity-1"
																	fill="none"
																	width="24"
																	height="24"
																	viewBox="0 0 16 16"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		fillRule="evenodd"
																		clipRule="evenodd"
																		d="M5.6666 2.66675C4.00975 2.66675 2.6666 4.00989 2.6666 5.66675L2.66656 8.65552H4.22578V10.2148H2.66654L2.6665 11.7741H4.22575L4.22578 10.2148L5.78502 10.2148V11.7741L4.22575 11.7741L4.22578 13.3334L13.3333 13.3334V2.66675H5.6666ZM11.3333 4.66675H5.6666C5.11431 4.66675 4.6666 5.11446 4.6666 5.66675C4.6666 6.21903 5.11431 6.66675 5.6666 6.66675H11.3333V4.66675ZM11.3333 8.66675H8.6666V11.3334H11.3333V8.66675Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
															<div className="pl-2 flex-grow">
																<p className="typography-subheader-14 text-utility-1-default font-medium  text-unset">
																	{
																		walletProfile.name
																	}
																</p>
															</div>
															<div>
																<div
																	className={clsx(
																		"rounded-full w-5 h-5  border-2 p-[3px]",
																		walletProfile.is_default
																			? "border-accent-light dark:border-accent"
																			: "border-[#535355]"
																	)}
																>
																	{walletProfile.is_default && (
																		<div className="w-full h-full dark:bg-accent bg-accent-light rounded-full" />
																	)}
																</div>
															</div>
														</div>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col space-y-4 pb-3">
				<div className="flex items-center space-x-2">
					<div className="">
						<h2 className="typography-header-32 text-utility-1 text-[32px] font-bold">
							$
							<NumberFlow
								value={wallet?.total_balance || 0}
								className="text-[32px]"
							/>
						</h2>
					</div>

					<div
						data-tooltip-id="default-tooltip"
						data-tooltip-content="Refresh"
					>
						<div className="flex">
							<button
								onClick={handleClick}
								data-testid="refresh-wallet-button"
								type="button"
								className="outline-none bg-transparent text-background-1 p-1.5 icon-circle-button !p-0"
							>
								<svg
									className={`text-utility-1-opacity-2 -scale-100 transition-transform duration-500 ${
										refresh ? "animate-spin" : ""
									}`}
									fill="none"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M16.6631 10.1751C16.6646 10.1169 16.6654 10.0585 16.6654 9.99992C16.6654 9.94134 16.6646 9.88294 16.6631 9.82472V10.1751ZM12.944 12.9475L10.7705 10.774H16.6631V16.6666L14.7116 14.7151C13.5053 15.9209 11.8391 16.6666 9.9987 16.6666C6.89226 16.6666 4.28207 14.5419 3.54203 11.6665H6.1791C6.82204 13.1381 8.29047 14.1666 9.9991 14.1666C11.149 14.1666 12.1901 13.7008 12.944 12.9475ZM16.4553 8.33325C15.7153 5.45787 13.1051 3.33325 9.9987 3.33325C8.15802 3.33325 6.49156 4.07923 5.28518 5.28535L3.33308 3.33325V9.22581H9.22564L7.05315 7.05332C7.80714 6.29949 8.84867 5.83325 9.9991 5.83325C11.7077 5.83325 13.1761 6.86166 13.8191 8.33325H16.4553ZM3.33203 9.99992C3.33203 9.95686 3.33244 9.91391 3.33325 9.87105V10.1288C3.33244 10.0859 3.33203 10.043 3.33203 9.99992Z"
										fill="currentColor"
									></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div>
					<div
						data-testid="dashboard-wallet-board"
						className="flex items-center justify-around"
					>
						{cryptoManageButtons.map(({ label, icon, link }) => (
							<div
								onClick={() => {
									setGlobalLoading(true);
									router.push(link);
								}}
								key={label}
								className={clsx(
									"flex flex-col space-y-2 items-center",
									userApproved
										? "group"
										: "pointer-events-none opacity-70"
								)}
							>
								<div className="flex">
									<button
										type="button"
										className="group-hover:!bg-black/10 dark:group-hover:!bg-white/10 outline-none bg-utility-1-opacity-6 text-utility-1-default p-2.5 icon-circle-button"
									>
										{icon}
									</button>
								</div>

								<div>
									<p className="body-text text-utility-1-default font-medium   text-unset  ">
										{label}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div
				className="grid grid-cols-1 gap-6 h-10  -mx-4 justify-center border-b border-b-utility-1-opacity-5"
				role="tablist"
				aria-orientation="horizontal"
			>
				<button
					data-testid="tab-0"
					className="outline-none flex flex-col items-center justify-center"
					id="headlessui-tabs-tab-«rg»"
					role="tab"
					type="button"
					aria-selected="true"
					tabIndex={0}
					data-headlessui-state="selected"
					data-selected=""
					aria-controls="headlessui-tabs-panel-«rk»"
				>
					<div className="flex items-center h-full">
						<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
							Crypto
						</p>
					</div>
					<div
						data-selected="true"
						className="w-full h-1 rounded-full data-[selected='true']:bg-primary"
					></div>
				</button>
			</div>

			{userApproved && cryptos && (
				<div className="flex flex-1 pt-4 overflow-y-auto scrollbar-hidden">
					<div
						className="flex w-full outline-none"
						role="tabpanel"
						tabIndex={0}
					>
						<div className="relative flex flex-1 w-full">
							<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
								{/* {assets.map((asset) => (
								<div
									key={asset.id}
									role="button"
									className="outline-0 cursor-pointer"
									tabIndex={0}
								>
									<div className="flex justify-between space-x-2 mb-5 cursor-pointer items-center">
										<div>
											<div className="relative min-w-min">
												<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
													<div className="rounded-full overflow-hidden">
														<div className="w-9 h-9 flex items-center">
															<img
																alt={asset.name}
																className="w-full h-full rounded-full"
																src={asset.logo}
															/>
														</div>
													</div>
												</div>
												{asset.networkLogo && (
													<div
														className="absolute -bottom-0.5 -right-0.5"
														data-tooltip-id={`token-network-tooltip-${asset.id}`}
														data-tooltip-content={`${asset.name} on ${asset.networkName}`}
													>
														<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
															<div className="rounded-full overflow-hidden border border-backgroundPrimary bg-backgroundPrimary">
																<div className="w-4 h-4 flex items-center">
																	<img
																		alt={
																			asset.networkName
																		}
																		className="w-full h-full rounded-full"
																		src={
																			asset.networkLogo
																		}
																	/>
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										</div>

										<div className="flex-grow space-y-1">
											<div className="flex flex-row space-x-1 items-center">
												<div>
													<p
														data-testid="asset-symbol"
														className="typography-body-16 text-utility-1-default font-medium"
													>
														{asset.symbol}
													</p>
												</div>
												<div>
													<div className="flex items-center justify-center typography-caption-12 font-medium rounded-6 bg-utility-1-opacity-4 text-utility-1-default px-2 py-0.5 min-h-5 space-x-1">
														{asset.networkName ||
															asset.name}
													</div>
												</div>
											</div>
											<div className="flex flex-row space-x-1 items-center">
												<div>
													<p
														data-testid="asset-fiat-price"
														className="typography-body-14 text-utility-1-opacity-1 font-normal"
													>
														{asset.price}
													</p>
												</div>
												<div>
													<p
														data-testid="asset-fiat-percentage-change"
														className={`typography-body-14 text-${asset.changeType}-1-default font-normal`}
													>
														{asset.change}
													</p>
												</div>
											</div>
										</div>

										<div className="text-right space-y-1">
											<div>
												<p
													data-testid="asset-balance"
													className="typography-body-16 text-utility-1-default font-medium"
												>
													{asset.balance}
												</p>
											</div>
											<div>
												<div
													className="text-textSecondary typography-body-14"
													data-testid="asset-fiat-balance"
												>$123</div>
											</div>
										</div>
									</div>
								</div>
							))} */}

								{cryptos.map((crypto) => (
									<div
										key={crypto.id}
										role="button"
										className="outline-0 cursor-pointer"
										tabIndex={0}
									>
										<div className="flex justify-between space-x-2 mb-5 cursor-pointer items-center">
											<div>
												<div className="relative min-w-min">
													<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
														<div className="rounded-full overflow-hidden">
															<div className="w-9 h-9 flex items-center">
																<img
																	alt={
																		crypto
																			.crypto
																			.name
																	}
																	className="w-full h-full rounded-full"
																	src={`${process.env.NEXT_PUBLIC_SITE_URL}/${crypto.crypto.icon}`}
																/>
															</div>
														</div>
													</div>
													{crypto.crypto
														.network_icon && (
														<div
															className="absolute -bottom-0.5 -right-0.5"
															data-tooltip-id={`default-tooltip`}
															data-tooltip-content={`${crypto.crypto.network_name} on ${crypto.crypto.network_name}`}
														>
															<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																<div className="rounded-full overflow-hidden border border-backgroundPrimary bg-backgroundPrimary">
																	<div className="w-4 h-4 flex items-center">
																		<img
																			alt={
																				crypto
																					.crypto
																					.network_name
																			}
																			className="w-full h-full rounded-full"
																			src={
																				crypto
																					.crypto
																					.network_icon
																			}
																		/>
																	</div>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>

											<div className="flex-grow space-y-1">
												<div className="flex flex-row space-x-1 items-center">
													<div>
														<p
															data-testid="asset-symbol"
															className="typography-body-16 text-utility-1-default font-medium"
														>
															{
																crypto.crypto
																	.symbol
															}
														</p>
													</div>
													<div>
														<div className="flex items-center justify-center typography-caption-12 font-medium rounded-6 bg-utility-1-opacity-4 text-utility-1-default px-2 py-0.5 min-h-5 space-x-1">
															{crypto.crypto
																.network_name ||
																crypto.crypto
																	.name}
														</div>
													</div>
												</div>
												<div className="flex flex-row space-x-1 items-center">
													<div>
														<p
															data-testid="asset-fiat-price"
															className="typography-body-14 text-utility-1-opacity-1 font-normal"
														>
															$
															{
																+crypto.crypto
																	.price
															}
														</p>
													</div>
													{/* <div>
														<p
															className={`typography-body-14 text-${asset.changeType}-1-default font-normal`}
														>
															{asset.change}
														</p>
													</div> */}
												</div>
											</div>

											<div className="text-right space-y-1">
												<div>
													<p
														data-testid="asset-balance"
														className="typography-body-16 text-utility-1-default font-medium"
													>
														{+crypto.balance}
													</p>
												</div>
												<div>
													<div
														className="text-textSecondary typography-body-14"
														data-testid="asset-fiat-balance"
													>
														$
														{+crypto.crypto.price *
															+crypto.balance}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}

								<div className="pb-5">
									<div className="flex w-full">
										<button
											onClick={() => {
												setGlobalLoading(true);
												router.push("/wallet/search");
											}}
											type="button"
											className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
										>
											<p className="body-text text-primary-default font-medium">
												Manage crypto
											</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{!userApproved && (
				<div className="text-center py-4 px-2 opacity-70">
					Please wait, your wallet is loading
				</div>
			)}
		</div>
	);
}
