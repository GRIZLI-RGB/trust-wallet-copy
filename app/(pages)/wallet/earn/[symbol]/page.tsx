"use client";

import Input from "@/app/components/input";
import { getStakingOne, sendStakingOne } from "@/app/utils/api";
import { _globalLoading_ } from "@/app/utils/store";
import { BaseEntityType, CryptoType } from "@/app/utils/types";
import { useSetAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WalletEarnSymbolPage() {
	const params = useParams();
	const router = useRouter();

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [crypto, setCrypto] = useState<{
		crypto: CryptoType;
		wallet_crypto: BaseEntityType & {
			wallet_id: number;
			crypto_id: number;
			balance: string;
			address: string;
		};
		staking_setting: BaseEntityType & {
			user_id: number | null;
			crypto_id: number;
			min_stake_amount: string;
			apr: string;
			lock_time_days: number;
		};
		active_stake:
			| (BaseEntityType & {
					user_id: number;
					crypto_id: number;
					wallet_id: number;
					amount: string;
					apr: string;
					lock_time_days: number;
					start_date: Date;
					end_date: Date;
					profit: string;
					is_active: boolean;
					last_profit_calculation: string;
					profit_snapshot: {
						total_profit: string;
					};
					crypto: CryptoType;
			  })
			| null;
	}>();

	useEffect(() => {
		const symbol = params?.symbol;

		if (typeof symbol === "string") {
			getStakingOne(symbol).then((res) => {
				setCrypto(res.data.data);
				setGlobalLoading(false);
			});
		}
	}, [params]);

	const [tab, setTab] = useState<"stake-info" | "stake-enter">("stake-info");

	const [amount, setAmount] = useState("");

	const handleStakeNow = () => {
		setGlobalLoading(true);

		sendStakingOne({ symbol: crypto!.crypto.symbol, amount: +amount })
			.then(() => {
				setGlobalLoading(false);
				alert("Success");
			})
			.catch(() => {
				setGlobalLoading(false);
				alert("Unknown error");
			});
	};

	if (crypto) {
		return (
			<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
				{/* Header */}
				<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
					{/* Back button */}
					<div className="flex w-8 justify-start">
						<div className="flex">
							<button
								onClick={() => router.back()}
								type="button"
								className=" cursor-pointer outline-none bg-transparent text-background-1 p-1.5 icon-square-button !p-0"
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
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Title */}
					<div className="flex-grow text-center overflow-hidden mx-4">
						<h5 className="typography-header-18 text-utility-1-default font-semibold truncate text-unset">
							{crypto.crypto.full_name} ({crypto.crypto.symbol})
						</h5>
					</div>

					{/* Info button */}
					<div className="opacity-0 flex w-8 justify-end">
						<div
							className="flex w-full"
							data-tooltip-id="button-tooltip-87"
							data-tooltip-place="top-end"
							data-tooltip-role="tooltip"
						>
							<button
								type="button"
								className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
							>
								<svg
									className="text-iconNormal"
									fill="none"
									width="24"
									height="24"
									viewBox="0 0 16 16"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM7.16667 5.66667V4H8.83333V5.66667H7.16667ZM7.16667 12V7.33333H8.83333V12H7.16667Z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Content */}
				{tab === "stake-info" && (
					<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 md:max-w-[438px]">
						<div className="relative flex flex-1 w-full">
							<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
								<div className="flex flex-col space-y-3">
									{/* Stats card */}
									<div className="mb-5">
										<div className="rounded-4 bg-background-2 px-4 py-2 border-solid transition w-full">
											<div className="flex flex-col space-y-0.5">
												{/* Staked */}
												<div className="flex justify-between">
													<div className="flex">
														<p className="title-text text-utility-1-default font-normal text-unset">
															Staked
														</p>
													</div>
													<div className="flex">
														<p className="title-text text-utility-1-default font-medium text-unset">
															{crypto
																?.active_stake
																?.amount ??
																0}{" "}
															{
																crypto.crypto
																	.symbol
															}
														</p>
													</div>
												</div>

												{/* Available */}
												<div className="flex justify-between">
													<div className="flex">
														<p className="title-text text-utility-1-default font-normal text-unset">
															Available
														</p>
													</div>
													<div className="flex">
														<p className="title-text text-utility-1-default font-medium text-unset">
															{crypto
																.wallet_crypto
																.balance ??
																0}{" "}
															{
																crypto.crypto
																	.symbol
															}
														</p>
													</div>
												</div>

												{/* Minimum Amount */}
												<div className="flex justify-between">
													<div className="flex">
														<p className="title-text text-utility-1-default font-normal text-unset">
															Minimum Amount
														</p>
													</div>
													<div className="flex">
														<p className="title-text text-utility-1-default font-medium text-unset">
															{
																+crypto
																	.staking_setting
																	.min_stake_amount
															}{" "}
															{
																crypto.crypto
																	.symbol
															}
														</p>
													</div>
												</div>

												{/* APR */}
												<div className="flex justify-between">
													<div className="flex">
														<p className="title-text text-utility-1-default font-normal text-unset">
															APR
														</p>
													</div>
													<div className="flex">
														<p className="title-text text-utility-1-default font-medium text-unset">
															{
																+crypto
																	.staking_setting
																	.apr
															}
															%
														</p>
													</div>
												</div>

												{/* Lock Time */}
												<div className="flex justify-between">
													<div className="flex">
														<p className="title-text text-utility-1-default font-normal text-unset">
															Lock Time
														</p>
													</div>
													<div className="flex">
														<p className="title-text text-utility-1-default font-medium text-unset">
															~
															{
																crypto
																	.staking_setting
																	.lock_time_days
															}{" "}
															days
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Stake button */}
									<div className="flex w-full justify-between">
										<button
											onClick={() =>
												setTab("stake-enter")
											}
											type="button"
											className="w-full flex items-center outline-none bg-transparent text-primary py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 !justify-between"
										>
											<p className="body-text text-primary font-medium text-unset">
												Stake
											</p>
											<svg
												fill="none"
												width="24"
												height="24"
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
										</button>
									</div>

									<hr
										className="border-line w-full last-of-type:!mb-5"
										id="divider"
									/>
									<div className="mt-auto"></div>
								</div>
							</div>
						</div>
					</div>
				)}

				{tab === "stake-enter" && (
					<>
						<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 md:max-w-[438px]">
							<div className="flex flex-col space-y-4">
								{/* Amount Input */}
								<Input
									label="Amount"
									value={amount}
									onChange={setAmount}
									type="number"
									maxValue={+crypto.wallet_crypto.balance}
								/>

								{/* <div className="-mt-3">
									<small
										data-testid="input-subtitle"
										className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
									>
										≈ $0.00
									</small>
								</div> */}

								{/* Validator Selection */}
								{/* <div className="flex flex-col space-y-4">
									<p className="body-text text-utility-1-default font-medium text-unset">
										Choose validator(s)
									</p>

									<div
										role="button"
										className="outline-0 cursor-pointer"
										tabIndex={0}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-2">
												<div className="relative min-w-min">
													<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
														<div className="rounded-full overflow-hidden">
															<div className="w-10 h-10 flex items-center">
																<img
																	alt="Trust Nodes"
																	className="w-full h-full rounded-full border-1"
																	width="100%"
																	height="100%"
																	src="https://assets-cdn.trustwallet.com/blockchains/ethereum/validators/assets/0x2401c39d7ba9E283668a53fcC7B8F5FD9e716fdf/logo.png"
																/>
															</div>
														</div>
													</div>
												</div>

												<div className="flex flex-col space-y-0.5">
													<p className="title-text text-utility-1-default font-medium text-unset">
														Trust Nodes
													</p>
												</div>
											</div>

											<div className="flex items-center space-x-2">
												<div className="flex items-center space-x-2">
													<p className="subtitle-text text-textSecondary font-normal text-unset">
														APR:
													</p>
													<p className="subtitle-text text-primary font-normal text-unset">
														2.64%
													</p>
												</div>

												<p className="subtitle-text text-utility-1-default font-normal text-unset">
													{" "}
												</p>

												<div>
													<svg
														fill="none"
														width="24"
														height="24"
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
								</div> */}
							</div>
						</div>

						<div className="flex flex-col w-full self-center items-stretch justify-stretch flex-shrink-0 md:max-w-[438px]">
							<div className="my-4">
								<div className="rounded-4 bg-background-2 px-4 py-2  border-solid transition w-full">
									<div className="flex flex-col  ">
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														Earning starts one day
														after staking
													</small>
												</div>
											</div>
										</div>
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														Staked funds are
														accessible ~
														{
															crypto
																.staking_setting
																.lock_time_days
														}{" "}
														days after unstaking
													</small>
												</div>
											</div>
										</div>
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														Rewards are calculated
														and credited after
														unstake
													</small>
												</div>
											</div>
										</div>
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														You can unstake any time
													</small>
												</div>
											</div>
										</div>
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														Normal network fees
														apply
													</small>
												</div>
											</div>
										</div>
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														{crypto.crypto.symbol}{" "}
														pooled staking provided
														by Kiln
													</small>
												</div>
											</div>
										</div>
										<div className="flex">
											•{" "}
											<div className="pl-2 ">
												<div className="flex items-center space-x-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														APR is an estimate and
														may fluctuate
													</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full">
								<button
									onClick={handleStakeNow}
									type="button"
									disabled={
										+amount <
											+crypto.staking_setting
												.min_stake_amount ||
										+amount > +crypto.wallet_crypto.balance
									}
									className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  "
								>
									Stake now
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
}
