"use client";

import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getStaking } from "@/app/utils/api";
import { _globalLoading_ } from "@/app/utils/store";
import { CryptoType } from "@/app/utils/types";

export default function WalletEarnPage() {
	const router = useRouter();

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [cryptos, setCryptos] = useState<CryptoType[]>([]);

	useEffect(() => {
		setGlobalLoading(true);

		getStaking().then((res) => {
			setCryptos(res.data.data);
			setGlobalLoading(false);
		});
	}, []);

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] px-4 pt-4">
			<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
				<div className="flex w-8 justify-start"></div>
				<div className="flex-grow text-center overflow-hidden mx-4">
					<h5 className="typography-header-18 text-utility-1-default font-semibold truncate text-unset">
						Native staking
					</h5>
				</div>
				<div className="flex w-8 justify-end"></div>
			</div>
			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
				<div className="relative flex flex-1 w-full">
					<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 overflow-y-auto scrollbar-hidden">
						<div className="flex flex-col space-y-5">
							{/* <ul className="space-y-5">
								<div
									role="button"
									className="outline-0 cursor-pointer"
									tabIndex={0}
								>
									<div className="rounded-4 bg-background-2 px-4 py-2 border-solid transition w-full">
										<div className="flex items-center space-x-2.5">
											<svg
												width="63"
												height="63"
												viewBox="0 0 63 63"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>

											</svg>
											<div className="flex flex-col space-y-2">
												<p className="subtitle-text text-utility-1-default font-medium text-unset">
													Stake Your ETH with Trust
												</p>
												<div className="flex items-center space-x-1">
													<small className="caption-text text-primary font-medium text-unset">
														Stake now
													</small>
													<svg
														className="text-primary"
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
												</div>
											</div>
										</div>
									</div>
								</div>
							</ul> */}
							<ul className="space-y-5 pb-5">
								{cryptos.map((crypto) => (
									<li key={crypto.id}>
										<div
											onClick={() =>
												router.push(
													`/wallet/earn/${crypto.symbol}`
												)
											}
											role="button"
											className="outline-0 cursor-pointer"
											tabIndex={0}
										>
											<div className="flex items-center justify-between space-x-2">
												<div className="flex items-center space-x-2">
													<div className="relative min-w-min">
														<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
															<div className="rounded-full overflow-hidden">
																<div className="w-10 h-10 flex items-center">
																	<img
																		alt={
																			crypto.symbol
																		}
																		className="w-full h-full rounded-full"
																		width="100%"
																		height="100%"
																		src={`${process.env.NEXT_PUBLIC_SITE_URL}${crypto.icon}`}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="flex flex-col">
														<p className="title-text text-utility-1-default font-medium text-unset">
															{crypto.symbol}
														</p>
														<div className="flex items-center space-x-2">
															<p className="subtitle-text text-utility-1-default font-normal text-unset">
																{crypto.name}
															</p>
														</div>
													</div>
												</div>
												{/* <div>
													<p className="subtitle-text text-textSecondary font-normal text-unset">
														APR +
														<span className="body-text text-primary font-medium">
															{option.apr}
														</span>
														%
													</p>
												</div> */}
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
