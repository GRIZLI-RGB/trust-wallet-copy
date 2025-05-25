"use client";

import Input from "@/app/components/input";
import Modal from "@/app/components/modal";
import { getWalletSendList, sendCrypto } from "@/app/utils/api";
import { formatDollars } from "@/app/utils/functions";
import { _globalLoading_ } from "@/app/utils/store";
import { BaseEntityType, CryptoType } from "@/app/utils/types";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ReceiveItem = BaseEntityType & {
	wallet_i: number;
	crypto_id: number;
	balance: string;
	address: string;
	crypto: CryptoType;
};

export default function WalletSendPage() {
	const router = useRouter();

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [sendList, setSendList] = useState<ReceiveItem[]>();

	useEffect(() => {
		setGlobalLoading(true);

		getWalletSendList()
			.then((res) => setSendList(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const [search, setSearch] = useState("");

	const [selectedCrypto, setSelectedCrypto] = useState<ReceiveItem>();

	const [tab, setTab] = useState<"choose-crypto" | "enter-data" | "confirm">(
		"choose-crypto"
	);

	const [recipientAddress, setRecipientAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [password, setPassword] = useState("");
	const [isOpenModalEnterPassword, setIsOpenModalEnterPassword] =
		useState(false);
	const [passwordError, setPasswordError] = useState("");

	const getAddress = useMemo(() => {
		if (selectedCrypto) {
			return (
				selectedCrypto?.address ||
				selectedCrypto?.crypto?.address ||
				"Unknown address"
			);
		} else {
			return "Unknown address";
		}
	}, [selectedCrypto]);

	const handleConfirm = () => {
		setGlobalLoading(true);

		sendCrypto({
			symbol: selectedCrypto?.crypto.symbol || "",
			address: recipientAddress,
			amount: +(amount || 0),
			password,
		})
			.then(() => {
				router.push("/wallet");
				setGlobalLoading(false);
			})
			.catch((err: AxiosError<{ message?: string }>) => {
				setGlobalLoading(false);
				const errMessage = err?.response?.data?.message;
				if (errMessage === "Invalid password") {
					setPasswordError("Invalid password");
				} else {
					alert(errMessage || "Unknown error");
				}
			});
	};

	return (
		<>
			<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
				<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
					<div className="flex w-8 justify-start">
						<div className="flex ">
							<button
								onClick={() => {
									if (tab === "choose-crypto") {
										router.back();
									}

									if (tab === "enter-data") {
										setTab("choose-crypto");
									}

									if (tab === "confirm") {
										setTab("enter-data");
									}
								}}
								type="button"
								className="cursor-pointer outline-none bg-transparent text-background-1 p-1.5 icon-square-button !p-0   "
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
										fillRule="evenodd"
										clipRule="evenodd"
										d="M3.00001 12.2722L10.0711 5.20117L11.8388 6.96894L7.78434 11.0234L21.001 11.0234L21.001 13.5234L7.78554 13.5234L11.8388 17.5767L10.0711 19.3445L3.00001 12.2734L3.00061 12.2728L3.00001 12.2722Z"
										fill="currentColor"
									></path>
								</svg>
							</button>
						</div>
					</div>
					<div className="flex-grow text-center overflow-hidden mx-4">
						<h5 className="typography-header-18 text-utility-1-default font-semibold truncate  text-unset  ">
							{
								{
									confirm: "Confirm",
									"choose-crypto": "Select asset to send",
									"enter-data": `Send ${selectedCrypto?.crypto.symbol}`,
								}[tab]
							}
						</h5>
					</div>
					<div className="flex w-8 justify-end opacity-0">
						<div
							data-tooltip-id="default-tooltip"
							data-tooltip-content="Import your crypto"
						>
							<div
								className="flex "
								data-tooltip-id="default-tooltip"
								data-tooltip-place="top-end"
								data-tooltip-role="tooltip"
							>
								<button
									data-testid="import-asset-info-action"
									type="button"
									className="outline-none bg-transparent text-background-1 p-1.5 icon-square-button !p-0   "
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
											d="M13.5 3H10.5V10.5L3 10.5V13.5H10.5V21H13.5V13.5H21V10.5L13.5 10.5V3Z"
											fill="currentColor"
										></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
					{tab === "choose-crypto" && (
						<div>
							<div className="search-field">
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
										></path>
									</svg>
								</div>
								<input
									className="block flex-1 outline-none bg-transparent typography-subheader-14 font-medium text-left"
									placeholder="Token name or contract address"
									type="text"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
					)}

					{tab === "choose-crypto" && (
						<div className="mt-4">
							<div>
								<div className="infinite-scroll-component overflow-y-auto scrollbar-hidden">
									<div className="flex flex-col space-y-5">
										{(sendList || [])
											.filter(
												(item) =>
													item.crypto.full_name.includes(
														search
													) ||
													item.crypto.name.includes(
														search
													) ||
													item.crypto.network_name.includes(
														search
													)
											)
											.map((item) => (
												<div
													onClick={() => {
														console.log(item);
														setSelectedCrypto(item);
														setTab("enter-data");
													}}
													key={item.crypto_id}
													role="button"
													className="outline-0 cursor-pointer"
													tabIndex={0}
												>
													<div className="flex justify-between space-x-2 items-center">
														<div className="opacity-100">
															<div className="relative min-w-min">
																<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																	<div className="rounded-full overflow-hidden  ">
																		<div className="w-9 h-9 flex items-center">
																			<img
																				alt=""
																				className="w-full h-full rounded-full"
																				width="100%"
																				height="100%"
																				src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.crypto.icon}`}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="flex-grow opacity-100">
															<div className="flex flex-row space-x-1 items-center ">
																<div>
																	<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
																		{
																			item
																				.crypto
																				.name
																		}
																	</p>
																</div>
																<div>
																	<div
																		data-testid="asset-type"
																		className="flex items-center justify-center typography-caption-12 font-medium rounded-6 bg-utility-1-opacity-4 text-utility-1-default px-2 py-0.5 min-h-5 space-x-1"
																	>
																		{
																			item
																				.crypto
																				.network_name
																		}
																	</div>
																</div>
															</div>
															<div className="flex flex-row space-x-1">
																<p className="typography-body-14 text-utility-1-default font-normal   text-unset  ">
																	{
																		item
																			.crypto
																			.full_name
																	}
																</p>
															</div>
														</div>
														<div className="opacity-100">
															<button
																className="switch"
																id="headlessui-switch-«r1s»"
																role="switch"
																type="button"
																tabIndex={0}
																aria-checked="true"
															>
																<span className="sr-only">
																	{
																		item
																			.crypto
																			.full_name
																	}
																</span>
																<span
																	aria-hidden="true"
																	className="switch__toggle"
																/>
															</button>
														</div>
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					)}

					{tab === "enter-data" && (
						<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
							<div className="relative flex flex-1 w-full">
								<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
									{/* Network Info */}
									<div className="flex flex-col space-y-1 text-center pb-4">
										<div className="flex justify-center">
											<div className="relative min-w-min">
												<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
													<div className="rounded-full overflow-hidden">
														<div className="w-9 h-9 flex items-center">
															<img
																alt={""}
																className="w-full h-full rounded-full"
																width="100%"
																height="100%"
																src={`${process.env.NEXT_PUBLIC_SITE_URL}/${selectedCrypto?.crypto.icon}`}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal text-unset">
											on{" "}
											{
												selectedCrypto?.crypto
													.network_name
											}{" "}
											Network
										</p>
									</div>

									{/* Recipient Address Input */}
									<div className="pb-4">
										<div className="text-start">
											<div className="mb-3">
												<div>
													<p
														data-testid="input-label"
														className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset"
													>
														Recipient Address
													</p>
												</div>
											</div>
											<div className="input-field space-x-1 h-14 border-primary">
												<input
													data-testid="input-recipient"
													className="ph-no-capture w-full block flex-1 outline-none bg-transparent typography-subheader-16 font-medium text-left"
													placeholder="Type or paste a valid address"
													spellCheck="false"
													type="text"
													value={recipientAddress}
													onChange={(e) =>
														setRecipientAddress(
															e.target.value
														)
													}
												/>
												{/* <div className="flex space-x-2">
													<div className="flex items-center">
														<div
															className="flex w-full"
															data-tooltip-id="button-tooltip-27"
															data-tooltip-place="top-end"
														>
															<button
																data-testid="input-action-address-input-action-address-book"
																type="button"
																className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
																tabIndex={-1}
															>
																<svg
																	className="text-primary"
																	fill="none"
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<g id="ic/sub-account-f">
																		<path
																			id="Union"
																			fillRule="evenodd"
																			clipRule="evenodd"
																			d="M10 7.08329C10 8.69412 8.69416 9.99996 7.08333 9.99996C5.4725 9.99996 4.16667 8.69412 4.16667 7.08329C4.16667 5.47246 5.4725 4.16663 7.08333 4.16663C8.69416 4.16663 10 5.47246 10 7.08329ZM2.5 14.6666C2.5 13.0098 3.84315 11.6666 5.5 11.6666H8.66667C10.3235 11.6666 11.6667 13.0098 11.6667 14.6666V16.6666H2.5V14.6666ZM17.5 4.16663H13.3333V6.66663H17.5V4.16663ZM17.5 8.33492H13.3333V10.8349H17.5V8.33492ZM13.3333 12.5032H17.5V15.0032H13.3333V12.5032Z"
																			fill="currentColor"
																		></path>
																	</g>
																</svg>
															</button>
														</div>
													</div>
												</div> */}
											</div>
											<div className="mt-2">
												<small
													data-testid="input-subtitle"
													className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
												></small>
											</div>
										</div>
									</div>

									{/* Amount Input */}
									<div className="pb-4">
										<Input
											label="Amount"
											placeholder="Type or paste a valid amount"
											value={amount}
											onChange={setAmount}
											type="number"
											maxValue={
												+(selectedCrypto?.balance || 0)
											}
										/>
										<div className="flex space-x-1">
											<small className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset">
												Balance:
											</small>
											<small
												data-testid="account-balance"
												className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
											>
												{
													+(
														selectedCrypto?.balance ||
														0
													)
												}{" "}
												{selectedCrypto?.crypto.symbol}
											</small>
										</div>
									</div>
								</div>
							</div>

							<div className="flex w-full">
								<button
									onClick={() => setTab("confirm")}
									type="button"
									disabled={!amount || !recipientAddress}
									className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  "
								>
									Preview
								</button>
							</div>
						</div>
					)}

					{tab === "confirm" && (
						<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 md:max-w-[438px]">
							{/* Token Info */}
							<div className="flex items-center space-x-2">
								<div>
									<div className="relative min-w-min">
										<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
											<div className="rounded-full overflow-hidden">
												<div className="w-9 h-9 flex items-center">
													<img
														alt={""}
														className="w-full h-full rounded-full"
														width="100%"
														height="100%"
														src={`${process.env.NEXT_PUBLIC_SITE_URL}/${selectedCrypto?.crypto.icon}`}
													/>
												</div>
											</div>
										</div>
										<div
											className="absolute -bottom-0.5 -right-0.5"
											data-tooltip-id="default-tooltip"
											data-tooltip-content={`${selectedCrypto?.crypto.name} on ${selectedCrypto?.crypto.network_name}`}
										>
											<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
												<div className="rounded-full overflow-hidden border border-backgroundPrimary bg-backgroundPrimary">
													<div className="w-4 h-4 flex items-center">
														<img
															alt={""}
															className="w-full h-full rounded-full"
															width="100%"
															height="100%"
															src={`${process.env.NEXT_PUBLIC_SITE_URL}/${selectedCrypto?.crypto.network_icon}`}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col space-y-2">
									<div role="status">
										<h5 className="typography-header-18 text-utility-1-default font-semibold text-unset">
											{amount}{" "}
											{selectedCrypto?.crypto.symbol}
										</h5>
									</div>
									<div role="status">
										<p
											data-testid="send-fiat-amount"
											className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset"
										>
											≈{" "}
											{formatDollars(
												+amount *
													+(
														selectedCrypto?.crypto
															.price || 0
													)
											)}
										</p>
									</div>
								</div>
							</div>

							{/* Transaction Details */}
							<div className="relative flex flex-1 w-full">
								<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
									<div className="mt-4"></div>

									<div className="bg-background-2 rounded-4 py-1 space-y-1">
										{/* Token */}
										<div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														Token
													</p>
												</div>
												<p
													data-testid="send-token-symbol"
													className="body-text text-utility-1-default font-medium text-unset"
												>
													{
														selectedCrypto?.crypto
															.symbol
													}
												</p>
											</div>
										</div>

										{/* From */}
										<div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														From
													</p>
												</div>
												<div className="flex items-center space-x-1">
													<div>
														<p className="body-text text-utility-1-default font-medium text-unset">
															{`${getAddress.substring(
																0,
																12
															)}...${getAddress.substring(
																getAddress.length -
																	12
															)}`}
														</p>
													</div>
													{/* <div>
														<a
															className="text-utility-1-opacity-1"
															href={`https://tronscan.org/address/${getAddress}`}
															target="_blank"
															rel="noopener noreferrer"
														>
															<svg
																fill="none"
																width="15"
																height="15"
																viewBox="0 0 22 22"
																xmlns="http://www.w3.org/2000/svg"
															>
																<rect
																	width="5"
																	height="2.5"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 20 20)"
																	fill="currentColor"
																></rect>
																<rect
																	width="16"
																	height="2.5"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 6.5 20)"
																	fill="currentColor"
																></rect>
																<rect
																	width="2.5"
																	height="16"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 20 20)"
																	fill="currentColor"
																></rect>
																<rect
																	width="2.5"
																	height="5"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 9 6.5)"
																	fill="currentColor"
																></rect>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M16.9822 5.23223L8.49695 13.7175L10.2647 15.4853L18.75 7L17.8661 6.11612L16.9822 5.23223Z"
																	fill="currentColor"
																></path>
																<path
																	d="M20 12L20 4L12 4L20 12Z"
																	fill="currentColor"
																></path>
															</svg>
														</a>
													</div> */}
												</div>
											</div>
										</div>

										{/* To */}
										<div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														To
													</p>
												</div>
												<div className="flex items-center space-x-1">
													<div>
														<p
															data-testid="send-token-recipient"
															className="body-text text-utility-1-default font-medium text-unset"
														>
															{`${recipientAddress.substring(
																0,
																12
															)}...${recipientAddress.substring(
																recipientAddress.length -
																	12
															)}`}
														</p>
													</div>
													{/* <div>
														<a
															className="text-utility-1-opacity-1"
															href={`https://tronscan.org/address/${recipientAddress}`}
															target="_blank"
															rel="noopener noreferrer"
														>
															<svg
																fill="none"
																width="15"
																height="15"
																viewBox="0 0 22 22"
																xmlns="http://www.w3.org/2000/svg"
															>
																<rect
																	width="5"
																	height="2.5"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 20 20)"
																	fill="currentColor"
																></rect>
																<rect
																	width="16"
																	height="2.5"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 6.5 20)"
																	fill="currentColor"
																></rect>
																<rect
																	width="2.5"
																	height="16"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 20 20)"
																	fill="currentColor"
																></rect>
																<rect
																	width="2.5"
																	height="5"
																	transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 9 6.5)"
																	fill="currentColor"
																></rect>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M16.9822 5.23223L8.49695 13.7175L10.2647 15.4853L18.75 7L17.8661 6.11612L16.9822 5.23223Z"
																	fill="currentColor"
																></path>
																<path
																	d="M20 12L20 4L12 4L20 12Z"
																	fill="currentColor"
																></path>
															</svg>
														</a>
													</div> */}
												</div>
											</div>
										</div>

										{/* Amount */}
										<div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														Amount
													</p>
												</div>
												<p
													data-testid="send-token-amount"
													className="body-text text-utility-1-default font-medium text-unset"
												>
													{amount}{" "}
													{
														selectedCrypto?.crypto
															.symbol
													}
												</p>
											</div>
										</div>

										{/* Network */}
										<div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														Network
													</p>
												</div>
												<p
													data-testid="network-name"
													className="body-text text-utility-1-default font-medium text-unset"
												>
													{
														selectedCrypto?.crypto
															.network_name
													}
												</p>
											</div>
										</div>

										{/* Network Fee */}
										{/* <div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														Estimated Network Fee
													</p>
													<button
														className="outline-0 cursor-pointer"
														tabIndex={0}
													>
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
																d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.75 15.5V18H13.25V15.5H10.75ZM10.75 6V13H13.25V6H10.75Z"
																fill="currentColor"
															></path>
														</svg>
													</button>
												</div>
												<div className="flex flex-col text-right space-y-1">
													<p
														data-testid="network-fee"
														className="body-text text-utility-1-default font-medium text-unset"
													>
														{networkFee}
													</p>
													<div className="flex flex-row justify-end">
														<span className="inline-block caption-text px-0.75 py-0.5 font-medium rounded bg-backgroundSecondary text-textThird">
															{discount}
														</span>
													</div>
												</div>
											</div>
										</div> */}

										{/* Total USD */}
										<div className="flex flex-col">
											<div className="p-4 space-x-2 flex items-center py-2">
												<div className="flex-grow flex items-center space-x-1">
													<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset">
														Total USD
													</p>
													<div
														className="inline"
														data-tooltip-id="default-tooltip"
														data-tooltip-content="Total transaction amount in USD after including network fees."
														data-tooltip-place="top"
													>
														<svg
															className="text-utility-1-opacity-1"
															fill="none"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.75 15.5V18H13.25V15.5H10.75ZM10.75 6V13H13.25V6H10.75Z"
																fill="currentColor"
															></path>
														</svg>
													</div>
												</div>
												<p className="body-text text-utility-1-default font-medium text-unset">
													{formatDollars(
														+amount *
															+(
																selectedCrypto
																	?.crypto
																	.price || 0
															)
													)}
												</p>
											</div>
										</div>
									</div>

									{/* Error Message */}
									<div className="mt-auto">
										{/* <div className="pb-4">
											<div className="danger-alert space-x-2 items-start">
												<svg
													className="text-textSell"
													fill="none"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.75 15.5V18H13.25V15.5H10.75ZM10.75 6V13H13.25V6H10.75Z"
														fill="currentColor"
													></path>
												</svg>
												<div className="text-utility-1-default typography-body-12 flex-1 text-start">
													{errorMessage}
												</div>
											</div>
										</div> */}

										{/* Confirm Button */}
										<div className="flex w-full">
											<button
												onClick={() =>
													setIsOpenModalEnterPassword(
														true
													)
												}
												type="button"
												disabled={false}
												className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full"
											>
												Confirm
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<Modal
				open={isOpenModalEnterPassword}
				onClose={() => setIsOpenModalEnterPassword(false)}
			>
				<div className="pb-6 px-14 max-sm:px-4 max-sm:pb-4">
					<div className="pt-6 mb-4">
						<Input
							label="Password"
							value={password}
							onChange={(value) => {
								setPasswordError("");
								setPassword(value);
							}}
							type="password"
							error={
								passwordError !== "" ? passwordError : undefined
							}
						/>
					</div>

					<div className="flex w-full">
						<button
							onClick={handleConfirm}
							disabled={!password}
							className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full h-[52px]"
						>
							Submit
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}
