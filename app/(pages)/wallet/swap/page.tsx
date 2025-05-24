"use client";

import Modal from "@/app/components/modal";
import { getWalletExchange, makeWalletExchange } from "@/app/utils/api";
import { formatDollars } from "@/app/utils/functions";
import { _globalLoading_ } from "@/app/utils/store";
import { CryptoType } from "@/app/utils/types";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function WalletSwapPage() {
	const router = useRouter();

	const [firstCrypto, setFirstCrypto] = useState<{
		crypto: CryptoType | null;
		amount: string;
	}>({
		crypto: null,
		amount: "",
	});
	const [secondCrypto, setSecondCrypto] = useState<{
		crypto: CryptoType | null;
		amount: string;
	} | null>({
		crypto: null,
		amount: "0",
	});
	const [cryptos, setCryptos] = useState<{
		wallet_cryptos: {
			balance: string;
			crypto_id: number;
			crypto: CryptoType[];
		}[];
		available_cryptos: CryptoType[];
	}>();

	const setGlobalLoading = useSetAtom(_globalLoading_);

	// const handleSwap = () => {
	// 	if (secondCrypto) {
	// 		setFirstCrypto(secondCrypto);
	// 		setSecondCrypto(firstCrypto);
	// 	}
	// };

	const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
	const [cryptoPosition, setCryptoPosition] = useState<"first" | "second">(
		"first"
	);

	const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
	const [networkPosition, setNetworkPosition] = useState<"first" | "second">(
		"first"
	);

	const [firstSelectedNetwork, setFirstSelectedNetwork] = useState<string>();
	const [secondSelectedNetwork, setSecondSelectedNetwork] =
		useState<string>();

	const [networks, setNetworks] = useState<CryptoType[]>([]);

	const [searchTerm, setSearchTerm] = useState("");

	const filteredNetworks = networks.filter((network) =>
		network.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const [searchCrypto, setSearchCrypto] = useState("");

	useEffect(() => {
		setGlobalLoading(true);

		getWalletExchange().then((res) => {
			setCryptos(res.data.data);

			const seen = new Set<string>();
			const unique = res.data.data.available_cryptos.filter(
				(crypto: CryptoType) => {
					if (seen.has(crypto.network_name)) return false;
					seen.add(crypto.network_name);
					return true;
				}
			);

			setNetworks(Array.from(unique));

			setFirstSelectedNetwork(
				res.data.data.available_cryptos[0].network_name
			);
			setSecondSelectedNetwork(
				res.data.data.available_cryptos[0].network_name
			);

			setFirstCrypto((prev) => ({
				...prev,
				crypto: res.data.data.available_cryptos[0] as CryptoType,
			}));

			setGlobalLoading(false);
		});
	}, []);

	const calculatedSecondAmount = useMemo(() => {
		if (!firstCrypto?.crypto?.price || !secondCrypto?.crypto?.price) {
			return null;
		}

		const firstPrice = +firstCrypto.crypto.price;
		const secondPrice = +secondCrypto.crypto.price;

		if (!firstPrice || !secondPrice) return null;

		return Number(
			((+firstCrypto?.amount * firstPrice) / secondPrice).toFixed(6)
		).toString();
	}, [firstCrypto, secondCrypto]);

	useEffect(() => {
		if (!calculatedSecondAmount) return;

		setSecondCrypto((prev) =>
			prev
				? {
						...prev,
						amount: calculatedSecondAmount,
				  }
				: null
		);
	}, [calculatedSecondAmount]);

	const handleSwapBtn = () => {
		setGlobalLoading(true);

		makeWalletExchange({
			from_crypto_id: firstCrypto?.crypto?.id || 0,
			to_crypto_id: secondCrypto?.crypto?.id || 0,
			amount: +firstCrypto.amount,
		})
			.then(() => {
				setGlobalLoading(false);
				alert("Success");
			})
			.catch((err: AxiosError<{ message?: string }>) => {
				setGlobalLoading(false);
				alert(err?.response?.data?.message || "Unknown error");
			});
	};

	if (cryptos && firstCrypto?.crypto) {
		return (
			<>
				<div className="relative flex flex-col flex-1 w-full h-full self-center bg-backgroundSecondary p-4">
					<div className="relative flex flex-1 w-full">
						<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 overflow-y-auto scrollbar-hidden">
							<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2">
								{/* Logo */}
								<div className="flex my-11 justify-center">
									<div
										onClick={() => {
											setGlobalLoading(true);
											router.push("/wallet");
										}}
										role="button"
										className="outline-0 cursor-pointer"
										tabIndex={0}
									>
										<svg
											fill="none"
											width="62"
											height="87"
											viewBox="0 0 62 87"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g clipPath="url(#clip0_26161_83707)">
												<path
													d="M-0.00195312 26.9479L30.5756 16.9648V86.0759C8.73428 76.8606 -0.00195312 59.1989 -0.00195312 49.2159V26.9465V26.9479Z"
													fill="#48FF91"
												/>
												<path
													d="M61.1556 26.9479L30.5781 16.9648V86.0759C52.4194 76.8606 61.1556 59.1989 61.1556 49.2172V26.9479Z"
													fill="url(#paint0_linear_26161_83707)"
												/>
												<path
													d="M12.0561 0.34082H16.3227V2.73096C17.7214 0.582458 19.33 0.34082 21.6857 0.34082V4.56603H20.6128C17.7905 4.56603 16.4387 5.89434 16.4387 8.52474V13.0151H12.0547V0.34082H12.0561Z"
													fill="#48FF91"
												/>
												<path
													d="M35.9252 13.0137H31.5413V11.8055C30.5844 12.917 29.2795 13.3989 27.6709 13.3989C24.6166 13.3989 22.8906 11.5887 22.8906 8.25687V0.34082H27.2746V7.2696C27.2746 8.83818 28.0437 9.75502 29.3486 9.75502C30.6534 9.75502 31.5413 8.86165 31.5413 7.34141V0.34082H35.9252V13.0151V13.0137Z"
													fill="#48FF91"
												/>
												<path
													d="M36.9961 9.10059H41.1012C41.289 10.0174 41.9172 10.4027 43.4319 10.4027C44.6677 10.4027 45.3913 10.1141 45.3913 9.58249C45.3913 9.17101 45.0406 8.9059 44.0395 8.68912L40.7284 7.94073C38.5136 7.43536 37.3938 6.15538 37.3938 4.10215C37.3938 1.39719 39.3752 -0.00292969 43.2221 -0.00292969C47.0689 -0.00292969 48.9578 1.36129 49.2851 4.28303H45.2049C45.1358 3.51117 44.3419 3.03894 43.037 3.03894C41.989 3.03894 41.3124 3.37585 41.3124 3.88398C41.3124 4.31755 41.7543 4.65584 42.6421 4.87539L46.1162 5.72043C48.4 6.27412 49.4977 7.43398 49.4977 9.31738C49.4977 11.9257 47.236 13.4708 43.3905 13.4708C39.545 13.4708 37.0016 11.8056 37.0016 9.10059H36.9975H36.9961Z"
													fill="#48FF91"
												/>
												<path
													d="M61.17 4.28158V0.34082H50.3516V4.28435H53.5798V13.0137H57.9404V4.28158H61.17Z"
													fill="#48FF91"
												/>
												<path
													d="M10.8366 4.28158V0.34082H0.0195312V4.28435H3.24781V13.0137H7.60833V4.28158H10.8366Z"
													fill="#48FF91"
												/>
											</g>
											<defs>
												<linearGradient
													id="paint0_linear_26161_83707"
													x1="29.1518"
													y1="94.7238"
													x2="54.3898"
													y2="3.84876"
													gradientUnits="userSpaceOnUse"
												>
													<stop
														offset="0.26"
														stopColor="#48FF91"
													/>
													<stop
														offset="0.66"
														stopColor="#0094FF"
													/>
													<stop
														offset="0.8"
														stopColor="#0038FF"
													/>
													<stop
														offset="0.89"
														stopColor="#0500FF"
													/>
												</linearGradient>
												<clipPath id="clip0_26161_83707">
													<rect
														width="61.1691"
														height="86.0768"
														fill="white"
													/>
												</clipPath>
											</defs>
										</svg>
									</div>
								</div>

								{/* Swap Container */}
								<div className="flex flex-1 flex-col flex-grow-0 self-center bg-backgroundPrimary border border-line rounded p-0 container">
									{/* Swap Content */}
									<div className="p-6">
										<div className="bg-backgroundPrimary">
											{/* Swap Form */}
											<div className="max-w-[400px] m-auto">
												{/* From Section */}
												<div className="rounded-4 bg-background-2 p-0 border-solid transition w-full">
													<div className="flex flex-col space-y-3 p-4">
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-1">
																<small className="caption-text text-textSecondary font-normal text-unset">
																	From
																</small>
																<div
																	onClick={() => {
																		setNetworkPosition(
																			"first"
																		);
																		setIsNetworkModalOpen(
																			true
																		);
																	}}
																	role="button"
																	className="outline-0 cursor-pointer"
																	tabIndex={0}
																>
																	<div className="flex items-center">
																		<div className="relative min-w-min">
																			<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																				<div className="rounded-full overflow-hidden">
																					<div className="w-4 h-4 flex items-center">
																						<img
																							alt=""
																							className="w-full h-full rounded-full"
																							width="100%"
																							height="100%"
																							src={`${
																								process
																									.env
																									.NEXT_PUBLIC_SITE_URL
																							}/${
																								cryptos?.available_cryptos.find(
																									(
																										crypto
																									) =>
																										crypto.network_name ===
																										firstSelectedNetwork
																								)
																									?.network_icon
																							}`}
																						/>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="ml-1 mr-px">
																			<small className="caption-text text-textSecondary font-medium text-unset">
																				{
																					firstSelectedNetwork
																				}
																			</small>
																		</div>
																		<svg
																			className="text-iconNormal"
																			fill="none"
																			width="16"
																			height="16"
																			viewBox="0 0 24 24"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
																				fill="currentColor"
																			/>
																		</svg>
																	</div>
																</div>
															</div>
															<div className="flex flex-1 items-center justify-end">
																<svg
																	className="text-iconNormal"
																	fill="none"
																	width="16"
																	height="16"
																	viewBox="0 0 16 16"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		fillRule="evenodd"
																		clipRule="evenodd"
																		d="M5.6666 2.66675C4.00975 2.66675 2.6666 4.00989 2.6666 5.66675L2.66656 8.65552H4.22578V10.2148H2.66654L2.6665 11.7741H4.22575L4.22578 10.2148L5.78502 10.2148V11.7741L4.22575 11.7741L4.22578 13.3334L13.3333 13.3334V2.66675H5.6666ZM11.3333 4.66675H5.6666C5.11431 4.66675 4.6666 5.11446 4.6666 5.66675C4.6666 6.21903 5.11431 6.66675 5.6666 6.66675H11.3333V4.66675ZM11.3333 8.66675H8.6666V11.3334H11.3333V8.66675Z"
																		fill="currentColor"
																	/>
																</svg>

																<div className="flex ml-1.25">
																	<small className="caption-text text-textSecondary font-normal text-unset">
																		{
																			+(
																				(
																					cryptos?.wallet_cryptos ||
																					[]
																				).find(
																					(
																						crypto
																					) =>
																						crypto.crypto_id ===
																						(firstCrypto
																							?.crypto
																							?.id ||
																							-1)
																				)
																					?.balance ||
																				0
																			)
																		}
																	</small>
																</div>
															</div>
														</div>

														<div className="flex items-center justify-between space-x-2">
															<div
																className="flex items-center space-x-2.5"
																onClick={() => {
																	setCryptoPosition(
																		"first"
																	);
																	setIsCryptoModalOpen(
																		true
																	);
																}}
															>
																<div className="relative min-w-min">
																	<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																		<div className="rounded-full overflow-hidden">
																			<div className="w-10 h-10 flex items-center">
																				<img
																					alt=""
																					className="w-full h-full rounded-full"
																					width="100%"
																					height="100%"
																					src={`${process.env.NEXT_PUBLIC_SITE_URL}/${firstCrypto?.crypto.icon}`}
																				/>
																			</div>
																		</div>
																	</div>
																</div>
																<div
																	role="button"
																	className="outline-0 cursor-pointer"
																	tabIndex={0}
																>
																	<div className="flex items-center space-x-1">
																		<p className="title-text text-utility-1-default font-semibold text-unset">
																			{
																				firstCrypto
																					?.crypto
																					.name
																			}
																		</p>
																		<svg
																			className="text-iconNormal"
																			fill="none"
																			width="20"
																			height="20"
																			viewBox="0 0 24 24"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
																				fill="currentColor"
																			/>
																		</svg>
																	</div>
																</div>
															</div>
															<div className="flex flex-col w-full items-end space-y-1 overflow-hidden">
																<input
																	className="w-full h-8 text-right p-0 border-0 outline-none bg-transparent text-headline6 leading-headline6 font-semibold text-textPrimary"
																	placeholder="0"
																	type="text"
																	value={
																		firstCrypto?.amount
																	}
																	onChange={(
																		e
																	) => {
																		const raw =
																			e
																				.target
																				.value;

																		// Оставляем только цифры, точки и запятые
																		const filtered =
																			raw.replace(
																				/[^0-9.,]/g,
																				""
																			);

																		// Заменяем все запятые на точки
																		const valueWithDots =
																			filtered.replace(
																				/,/g,
																				"."
																			);

																		setFirstCrypto(
																			(
																				prev
																			) => ({
																				...prev,
																				amount: valueWithDots,
																			})
																		);
																	}}
																/>
																<div className="flex items-center space-x-1">
																	<small className="caption-text text-textSecondary font-normal text-unset">
																		{formatDollars(
																			+(
																				firstCrypto?.amount ||
																				0
																			) *
																				+(
																					firstCrypto
																						?.crypto
																						?.price ||
																					0
																				)
																		)}
																	</small>
																</div>
															</div>
														</div>
													</div>
												</div>

												{/* Swap Arrow */}
												{/* <div className="relative z0 flex w-10 h-10 -my-3 mx-auto rounded-curvy bg-backgroundPrimary">
													<div className="flex w-full">
														<button
															onClick={handleSwap}
															type="button"
															className="outline-none bg-transparent text-background-1 circle-button !p-0 w-full"
														>
															<svg
																className="text-iconNormal hover:!text-accent transition"
																fill="none"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M16.5 21L13.5 21L13.5 2.5L20.5 9.5L16.5 9.5L16.5 21Z"
																	fill="currentColor"
																/>
																<path
																	d="M7.49999 3L10.5 3L10.5 21.5L3.5 14.5L7.49999 14.5L7.49999 3Z"
																	fill="currentColor"
																/>
															</svg>
														</button>
													</div>
												</div> */}

												{/* To Section */}
												<div className="rounded-4 bg-background-2 p-0 border-solid transition w-full mt-2">
													<div className="flex flex-col space-y-3 p-4">
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-1">
																<small className="caption-text text-textSecondary font-normal text-unset">
																	To
																</small>
																<div
																	onClick={() => {
																		setNetworkPosition(
																			"second"
																		);
																		setIsNetworkModalOpen(
																			true
																		);
																	}}
																	role="button"
																	className="outline-0 cursor-pointer"
																	tabIndex={0}
																>
																	<div className="flex items-center">
																		<div className="relative min-w-min">
																			<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																				<div className="rounded-full overflow-hidden">
																					<div className="w-4 h-4 flex items-center">
																						<img
																							alt="Smart Chain"
																							className="w-full h-full rounded-full"
																							width="100%"
																							height="100%"
																							src={`${
																								process
																									.env
																									.NEXT_PUBLIC_SITE_URL
																							}/${
																								cryptos?.available_cryptos.find(
																									(
																										crypto
																									) =>
																										crypto.network_name ===
																										secondSelectedNetwork
																								)
																									?.network_icon
																							}`}
																						/>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="ml-1 mr-px">
																			<small className="caption-text text-textSecondary font-medium text-unset">
																				{
																					secondSelectedNetwork
																				}
																			</small>
																		</div>
																		<svg
																			className="text-iconNormal"
																			fill="none"
																			width="16"
																			height="16"
																			viewBox="0 0 24 24"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
																				fill="currentColor"
																			/>
																		</svg>
																	</div>
																</div>
															</div>
														</div>

														<div className="flex items-center justify-between space-x-2">
															<div
																className="flex items-center space-x-2.5"
																onClick={() => {
																	setCryptoPosition(
																		"second"
																	);
																	setIsCryptoModalOpen(
																		true
																	);
																}}
															>
																<div className="flex">
																	<button
																		type="button"
																		className="outline-none bg-accent/10 text-primary-default hover:bg-primary-opacity-2 active:bg-primary-opacity-3 disabled:bg-primary-opacity-1 p-2.5 icon-circle-button"
																	>
																		{secondCrypto?.crypto ? (
																			<div className="w-4 h-4 flex items-center">
																				<img
																					alt=""
																					className="w-full h-full rounded-full"
																					width="100%"
																					height="100%"
																					src={`${process.env.NEXT_PUBLIC_SITE_URL}/${secondCrypto.crypto.icon}`}
																				/>
																			</div>
																		) : (
																			<svg
																				className="text-primary"
																				fill="none"
																				width="20"
																				height="20"
																				viewBox="0 0 24 24"
																				xmlns="http://www.w3.org/2000/svg"
																			>
																				<path
																					d="M13.5 3H10.5V10.5L3 10.5V13.5H10.5V21H13.5V13.5H21V10.5L13.5 10.5V3Z"
																					fill="currentColor"
																				/>
																			</svg>
																		)}
																	</button>
																</div>

																<div
																	role="button"
																	className="outline-0 cursor-pointer"
																	tabIndex={0}
																>
																	<div className="flex items-center space-x-1">
																		<p className="whitespace-nowrap title-text text-utility-1-default font-semibold text-unset">
																			{secondCrypto?.crypto
																				? secondCrypto
																						.crypto
																						.name
																				: "Select Token"}
																		</p>
																		<svg
																			className="text-iconNormal"
																			fill="none"
																			width="20"
																			height="20"
																			viewBox="0 0 24 24"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
																				fill="currentColor"
																			/>
																		</svg>
																	</div>
																</div>
															</div>
															<div className="flex flex-col w-full items-end space-y-1 overflow-hidden">
																<h3 className="headline-text text-utility-1-default font-semibold   text-unset text-headline6 leading-headline6 ">
																	{
																		secondCrypto?.amount
																	}
																</h3>
																{secondCrypto?.crypto && (
																	<div className="flex items-center space-x-1">
																		<small className="caption-text text-textSecondary font-normal   text-unset  ">
																			{formatDollars(
																				+(
																					secondCrypto?.amount ||
																					0
																				) *
																					+(
																						secondCrypto
																							?.crypto
																							?.price ||
																						0
																					)
																			)}
																		</small>
																	</div>
																)}
															</div>
														</div>
													</div>
												</div>

												{/* Swap Button */}
												<div className="my-6">
													<div className="flex w-full">
														<button
															onClick={
																handleSwapBtn
															}
															type="button"
															disabled={
																(!firstCrypto?.crypto &&
																	!secondCrypto &&
																	+firstCrypto?.amount ===
																		0) ||
																!secondCrypto?.crypto
															}
															className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full"
														>
															Swap
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Modal
					open={isNetworkModalOpen}
					onClose={() => setIsNetworkModalOpen(false)}
				>
					<div className="min-w-[448px]">
						{/* Header */}
						<div className="flex items-center space-x-2">
							<div className="w-6"></div>
							<div className="flex-grow">
								<h5 className="typography-header-18 text-utility-1-default font-semibold text-center">
									Choose network
								</h5>
							</div>
							{/* <div>
								<div className="flex w-full">
									<button
										data-testid="close-modal-button"
										type="button"
										className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
										onClick={() =>
											setIsNetworkModalOpen(false)
										}
									>
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.69611 5.07538L4.57479 7.1967L9.87809 12.5L4.57479 17.8033L6.69611 19.9246L11.9994 14.6213L17.3027 19.9246L19.424 17.8033L14.1207 12.5L19.424 7.1967L17.3027 5.07538L11.9994 10.3787L6.69611 5.07538Z"
												fill="currentColor"
											/>
										</svg>
									</button>
								</div>
							</div> */}
						</div>

						{/* Content */}
						<div className="mt-4">
							<div className="flex flex-col min-h-[400px] space-y-4">
								{/* Search */}
								<div>
									<div className="search-field flex items-center border border-line rounded px-3 py-2">
										<div className="mr-2">
											<svg
												className="text-utility-1-opacity-1"
												fill="none"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M9.16667 5C11.4679 5 13.3333 6.86548 13.3333 9.16667C13.3333 11.4679 11.4679 13.3333 9.16667 13.3333C6.86548 13.3333 5 11.4679 5 9.16667C5 6.86548 6.86548 5 9.16667 5ZM9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667C15.8333 10.3256 15.5376 11.4154 15.0175 12.3649L17.5763 14.9238L16.2505 16.2496L14.9248 17.5753L12.3663 15.0167C11.4166 15.5373 10.3262 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5Z"
													fill="currentColor"
												/>
											</svg>
										</div>
										<input
											className="block flex-1 outline-none bg-transparent typography-subheader-14 font-medium text-left"
											placeholder="Search network"
											spellCheck="false"
											type="text"
											value={searchTerm}
											onChange={(e) =>
												setSearchTerm(e.target.value)
											}
										/>
									</div>
								</div>

								{/* Networks List */}
								<div className="space-y-4 overflow-y-auto max-h-[400px]">
									{filteredNetworks.map((network) => (
										<div
											key={network.name}
											className={`cursor-pointer p-3 hover:bg-background-2 ${
												(networkPosition === "first"
													? firstSelectedNetwork
													: secondSelectedNetwork) ===
												network.network_name
													? "bg-background-2 !rounded"
													: ""
											}`}
											onClick={() => {
												if (
													networkPosition === "first"
												) {
													setFirstSelectedNetwork(
														network.network_name
													);
													setFirstCrypto((prev) => ({
														...prev,
														crypto: cryptos.available_cryptos.find(
															(crypto) =>
																crypto.network_name ===
																network.network_name
														)!,
													}));
												} else {
													setSecondSelectedNetwork(
														network.network_name
													);
													setSecondCrypto((prev) => ({
														amount:
															prev?.amount || "0",
														crypto: cryptos.available_cryptos.find(
															(crypto) =>
																crypto.network_name ===
																network.network_name
														)!,
													}));
												}

												setIsNetworkModalOpen(false);
											}}
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-2">
													<div className="relative min-w-min">
														<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
															<div className="rounded-full overflow-hidden">
																<div className="w-9 h-9 flex items-center">
																	<img
																		alt={
																			network.network_name
																		}
																		className="w-full h-full rounded-full"
																		width="100%"
																		height="100%"
																		src={`${process.env.NEXT_PUBLIC_SITE_URL}/${network.network_icon}`}
																	/>
																</div>
															</div>
														</div>
													</div>
													<p
														className={`title-text font-medium text-unset ${
															(networkPosition ===
															"first"
																? firstSelectedNetwork
																: secondSelectedNetwork) ===
															network.network_name
																? "text-primary"
																: "text-utility-1-default"
														}`}
													>
														{network.network_name}
													</p>
												</div>
												{(networkPosition === "first"
													? firstSelectedNetwork
													: secondSelectedNetwork) ===
													network.network_name && (
													<div className="flex items-center space-x-1">
														<svg
															className="text-primary"
															fill="none"
															width="20"
															height="20"
															viewBox="0 0 20 20"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
																fill="currentColor"
															/>
														</svg>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</Modal>

				<Modal
					open={isCryptoModalOpen}
					onClose={() => setIsCryptoModalOpen(false)}
				>
					<div className="min-w-[448px]">
						{/* Header */}
						<div className="flex items-center space-x-2">
							<div className="w-6"></div>
							<div className="flex-grow">
								<h5 className="typography-header-18 text-utility-1-default font-semibold text-center">
									You{" "}
									{cryptoPosition === "second"
										? "get"
										: "pay"}
								</h5>
							</div>
							{/* <div>
								<div className="flex w-full">
									<button
										data-testid="close-modal-button"
										type="button"
										className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
										onClick={() =>
											setIsCryptoModalOpen(false)
										}
									>
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.69611 5.07538L4.57479 7.1967L9.87809 12.5L4.57479 17.8033L6.69611 19.9246L11.9994 14.6213L17.3027 19.9246L19.424 17.8033L14.1207 12.5L19.424 7.1967L17.3027 5.07538L11.9994 10.3787L6.69611 5.07538Z"
												fill="currentColor"
											/>
										</svg>
									</button>
								</div>
							</div> */}
						</div>

						{/* Content */}
						<div className="mt-4">
							<div className="flex flex-col min-h-[400px] space-y-4">
								{/* Search */}
								<div>
									<div className="search-field flex items-center border border-line rounded px-3 py-2">
										<div className="mr-2">
											<svg
												className="text-utility-1-opacity-1"
												fill="none"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M9.16667 5C11.4679 5 13.3333 6.86548 13.3333 9.16667C13.3333 11.4679 11.4679 13.3333 9.16667 13.3333C6.86548 13.3333 5 11.4679 5 9.16667C5 6.86548 6.86548 5 9.16667 5ZM9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667C15.8333 10.3256 15.5376 11.4154 15.0175 12.3649L17.5763 14.9238L16.2505 16.2496L14.9248 17.5753L12.3663 15.0167C11.4166 15.5373 10.3262 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5Z"
													fill="currentColor"
												/>
											</svg>
										</div>
										<input
											className="block flex-1 outline-none bg-transparent typography-subheader-14 font-medium text-left"
											placeholder="Search crypto"
											spellCheck="false"
											type="text"
											value={searchCrypto}
											onChange={(e) =>
												setSearchCrypto(e.target.value)
											}
										/>
									</div>
								</div>

								<div className="my-2 flex flex-col space-y-4 pb-2">
									<p className="body-text text-textThird font-medium   text-unset  ">
										Rest of crypto
									</p>
									{cryptos.available_cryptos
										.filter(
											(crypto) =>
												crypto.network_name ===
												(networkPosition === "first"
													? firstSelectedNetwork
													: secondSelectedNetwork)
										)
										.filter(
											(crypto) =>
												crypto.full_name.includes(
													searchCrypto
												) ||
												crypto.name.includes(
													searchCrypto
												) ||
												crypto.network_name.includes(
													searchCrypto
												)
										)
										.map((crypto) => (
											<div
												key={crypto.id}
												tabIndex={0}
												className="cursor-pointer"
												onClick={() => {
													if (
														cryptoPosition ===
														"first"
													) {
														setFirstCrypto(
															(prev) => ({
																...prev,
																crypto,
															})
														);
													} else {
														setSecondCrypto(
															(prev) => ({
																amount:
																	prev?.amount ||
																	"0",
																crypto,
															})
														);
													}
													setIsCryptoModalOpen(false);
												}}
												onKeyDown={(e) => {
													if (
														e.key === "Enter" ||
														e.key === " "
													) {
														e.preventDefault();
														if (
															cryptoPosition ===
															"first"
														) {
															setFirstCrypto(
																(prev) => ({
																	...prev,
																	crypto,
																})
															);
														} else {
															setSecondCrypto(
																(prev) => ({
																	amount:
																		prev?.amount ||
																		"0",
																	crypto,
																})
															);
														}
														setIsCryptoModalOpen(
															false
														);
													}
												}}
											>
												<div
													className={`flex items-center justify-between ${
														crypto.id ===
														(cryptoPosition ===
														"first"
															? firstCrypto
																	?.crypto
																	?.id || -1
															: secondCrypto
																	?.crypto
																	?.id || -1)
															? ""
															: "opacity-100"
													}`}
												>
													<div className="flex items-center space-x-2">
														<div className="relative min-w-min">
															<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																<div className="rounded-full overflow-hidden">
																	<div className="w-9 h-9 flex items-center">
																		<img
																			alt={
																				crypto.name
																			}
																			className="w-full h-full rounded-full border border-line"
																			width="100%"
																			height="100%"
																			src={`${process.env.NEXT_PUBLIC_SITE_URL}/${crypto.icon}`}
																		/>
																	</div>
																</div>
															</div>
															<div
																className="absolute -bottom-0.5 -right-0.5"
																data-tooltip-id={`default-tooltip`}
																data-tooltip-content={`${name} on ${crypto.network_name}`}
															>
																<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																	<div className="rounded-full overflow-hidden border border-backgroundPrimary bg-backgroundPrimary">
																		<div className="w-4 h-4 flex items-center">
																			<img
																				alt={
																					crypto.network_name
																				}
																				className="w-full h-full rounded-full border border-line"
																				width="100%"
																				height="100%"
																				src={`${process.env.NEXT_PUBLIC_SITE_URL}/${crypto.network_icon}`}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="flex flex-col">
															<div className="flex items-center space-x-2">
																<p
																	data-testid="asset-record-symbol"
																	className="title-text text-utility-1-default font-medium text-unset"
																>
																	{
																		crypto.symbol
																	}
																</p>
																<span className="inline-block caption-text px-0.75 py-0.5 font-medium rounded bg-backgroundSecondary text-textThird">
																	{
																		crypto.network_name
																	}
																</span>
															</div>
															<p
																data-testid="asset-record-name"
																className="title-text text-textThird font-medium text-unset"
															>
																{crypto.name}
															</p>
														</div>
													</div>
													<div className="flex items-center space-x-1">
														{crypto.id ===
															(cryptoPosition ===
															"first"
																? firstCrypto
																		?.crypto
																		?.id ||
																  -1
																: secondCrypto
																		?.crypto
																		?.id ||
																  -1) && (
															<svg
																className="text-primary"
																fill="none"
																width="20"
																height="20"
																viewBox="0 0 20 20"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
																	fill="currentColor"
																/>
															</svg>
														)}
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</Modal>
			</>
		);
	}
}
