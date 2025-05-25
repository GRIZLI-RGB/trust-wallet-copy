"use client";

import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

import { walletHistory as walletHistoryApi } from "@/app/utils/api";
import { _globalLoading_ } from "@/app/utils/store";
import { WalletHistoryItemType } from "@/app/utils/types";

export default function WalletHistoryPage() {
	const [walletHistory, setWalletHistory] = useState<WalletHistoryItemType[]>(
		[]
	);

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => {
		setGlobalLoading(true);

		walletHistoryApi()
			.then((res) => setWalletHistory(res.data.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const groupedByDate = Array.isArray(walletHistory)
		? walletHistory.reduce<Record<string, WalletHistoryItemType[]>>(
				(acc, tx) => {
					const date = tx.formatted_date;
					if (!acc[date]) acc[date] = [];
					acc[date].push(tx);
					return acc;
				},
				{}
		  )
		: {};

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] px-4 pt-4 pb-20">
			<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
				<div className="flex w-8 justify-start"></div>
				<div className="flex-grow text-center overflow-hidden mx-4">
					<h5 className="typography-header-18 text-utility-1-default font-semibold truncate  text-unset  ">
						History
					</h5>
				</div>
				<div className="flex w-8 justify-end"></div>
			</div>
			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
				<div className="infinite-scroll-component__outerdiv">
					<div
						className="infinite-scroll-component tw-scrollbar"
						style={{
							overflowY: "auto",
							display: "flex",
							flexDirection: "column",
						}}
					>
						{/* <div className="flex flex-col space-y-4 mb-3">
							<div>
								<div className="my-2 flex flex-col space-y-4 pb-2">
									<p
										data-testid="category-title"
										className="body-text text-textThird font-medium   text-unset  "
									>
										May 1, 2025
									</p>
									<div
										data-testid="tx-item"
										role="button"
										className="outline-0  cursor-pointer"
										tabIndex={0}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="flex w-9 h-9 justify-center items-center">
													<div className="flex w-full justify-center items-center h-full bg-bg3 rounded-full">
														<svg
															className="text-iconNormal"
															fill="none"
															width="20"
															height="20"
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
													</div>
												</div>
												<div className="flex flex-col space-y-1">
													<div className="flex items-center space-x-1">
														<p
															data-testid="tx-type"
															className="body-text text-utility-1-default font-medium   text-unset  "
														>
															Send
														</p>
													</div>
													<p
														data-testid="tx-item-subtitle"
														className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "
													>
														To: TEaDT5N...wsgGLgW
													</p>
												</div>
											</div>
											<div>
												<p
													data-testid="tx-amount"
													className="body-text text-utility-1-default font-medium   text-unset  "
												>
													-610 USDT
												</p>
											</div>
										</div>
									</div>
									<div
										data-testid="tx-item"
										role="button"
										className="outline-0  cursor-pointer"
										tabIndex={0}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="flex w-9 h-9 justify-center items-center">
													<div className="flex w-full justify-center items-center h-full bg-bg3 rounded-full">
														<svg
															className="text-iconNormal"
															fill="none"
															width="20"
															height="20"
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
													</div>
												</div>
												<div className="flex flex-col space-y-1">
													<div className="flex items-center space-x-1">
														<p
															data-testid="tx-type"
															className="body-text text-utility-1-default font-medium   text-unset  "
														>
															Receive
														</p>
													</div>
													<p
														data-testid="tx-item-subtitle"
														className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "
													>
														From: TEPSrSY...pMkRGfn
													</p>
												</div>
											</div>
											<div>
												<p
													data-testid="tx-amount"
													className="body-text text-success-1-default font-medium   text-unset  "
												>
													+19.265929 TRX
												</p>
											</div>
										</div>
									</div>
									<div
										data-testid="tx-item"
										role="button"
										className="outline-0  cursor-pointer"
										tabIndex={0}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="flex w-9 h-9 justify-center items-center">
													<div className="flex w-full justify-center items-center h-full bg-bg3 rounded-full">
														<svg
															className="text-iconNormal"
															fill="none"
															width="20"
															height="20"
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
													</div>
												</div>
												<div className="flex flex-col space-y-1">
													<div className="flex items-center space-x-1">
														<p
															data-testid="tx-type"
															className="body-text text-utility-1-default font-medium   text-unset  "
														>
															Receive
														</p>
													</div>
													<p
														data-testid="tx-item-subtitle"
														className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "
													>
														From: TU4vEru...Nr7Pvaa
													</p>
												</div>
											</div>
											<div>
												<p
													data-testid="tx-amount"
													className="body-text text-success-1-default font-medium   text-unset  "
												>
													+620 USDT
												</p>
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
										<div
											className="flex w-auto"
											data-tooltip-id="default-tooltip"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												data-testid="show-more-btn"
												type="button"
												className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4  tiny-button  w-auto  "
											>
												Load more
											</button>
										</div>
									</div>
								</div>
							</div>
						</div> */}

						<div className="flex flex-col space-y-4 mb-3">
							{walletHistory.length === 0 ? (
								<p className="text-center text-textThird font-medium py-4">
									No transactions
								</p>
							) : (
								Object.entries(groupedByDate).map(
									([date, transactions]) => (
										<div key={date}>
											<p className="body-text text-textThird font-medium my-2">
												{date}
											</p>

											<div className="flex flex-col space-y-4 pb-2">
												{transactions.map((tx) => (
													<div
														key={tx.id}
														data-testid="tx-item"
														role="button"
														className="outline-0 cursor-pointer"
														tabIndex={0}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-3">
																<div className="flex w-9 h-9 justify-center items-center">
																	<div className="flex w-full justify-center items-center h-full bg-bg3 rounded-full">
																		<svg
																			className="text-iconNormal"
																			fill="none"
																			width="20"
																			height="20"
																			viewBox="0 0 20 20"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				fillRule="evenodd"
																				clipRule="evenodd"
																				d={
																					tx.transaction_type ===
																						"withdrawal" ||
																					tx.transaction_type ===
																						"exchange_out"
																						? "M10.002 2.49903L15.8945 8.39158L14.4214 9.86472L11.0426 6.48597L11.0426 17.4998L8.95931 17.4998L8.95931 6.48697L5.58156 9.86472L4.10842 8.39158L10.001 2.49903L10.0015 2.49953L10.002 2.49903Z"
																						: "M9.99803 17.4993L4.10547 11.6067L5.57861 10.1336L8.95736 13.5123L8.95736 2.49845L11.0407 2.49845L11.0407 13.5113L14.4184 10.1336L15.8916 11.6067L9.99902 17.4993L9.99852 17.4988L9.99803 17.4993Z"
																				}
																				fill="currentColor"
																			/>
																		</svg>
																	</div>
																</div>
																<div className="flex flex-col space-y-1">
																	<div className="flex items-center space-x-1">
																		<p className="body-text text-utility-1-default font-medium">
																			{
																				tx.type_text
																			}
																		</p>
																	</div>
																	<p className="typography-body-14 text-utility-1-opacity-1 font-normal">
																		{tx.transaction_type ===
																			"withdrawal" ||
																		tx.transaction_type ===
																			"exchange_out"
																			? `To: ${tx.address_to}`
																			: `From: ${tx.address_from}`}
																	</p>
																</div>
															</div>
															<div>
																<p
																	className={`body-text font-medium ${
																		tx.transaction_type ===
																			"withdrawal" ||
																		tx.transaction_type ===
																			"exchange_out"
																			? "text-utility-1-default"
																			: "text-success-1-default"
																	}`}
																>
																	{tx.transaction_type ===
																		"withdrawal" ||
																	tx.transaction_type ===
																		"exchange_out"
																		? `-${tx.amount} ${tx.crypto.symbol}`
																		: `+${tx.amount} ${tx.crypto.symbol}`}
																</p>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									)
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
