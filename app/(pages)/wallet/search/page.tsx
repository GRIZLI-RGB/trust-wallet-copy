"use client";

import { _globalLoading_ } from "@/app/utils/store";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WalletSearchPage() {
	const router = useRouter();

	const [search, setSearch] = useState("");

	const setGlobalLoading = useSetAtom(_globalLoading_);

	useEffect(() => setGlobalLoading(false), []);

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4 pb-20">
			<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
				<div className="flex w-8 justify-start">
					<div className="flex">
						<button
							onClick={() => router.back()}
							type="button"
							className="outline-none bg-transparent text-background-1 icon-square-button cursor-pointer"
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
						Search
					</h5>
				</div>
				<div className="flex w-8 justify-end opacity-0">
					<div
						data-tooltip-id="default-tooltip"
						data-tooltip-content="Import your crypto"
					>
						<div className="flex ">
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
							spellCheck={false}
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				<div className="mt-4">
					<div className="infinite-scroll-component__outerdiv">
						<div
							style={{
								height: "382px",
								overflow: "auto",
							}}
							className="infinite-scroll-component tw-scrollbar"
						>
							<div className="flex flex-col space-y-5">
								<div
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex justify-between space-x-2 items-center">
										<div className="opacity-100">
											<div className="relative min-w-min">
												<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
													<div className="rounded-full overflow-hidden  ">
														<div className="w-9 h-9 flex items-center">
															<img
																alt="BNB Smart Chain"
																className="w-full h-full rounded-full"
																width="100%"
																height="100%"
																src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png"
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="flex-grow opacity-100">
											<div className="flex flex-row space-x-1 items-center ">
												<div>
													<p
														data-testid="asset-symbol"
														className="typography-subheader-16 text-utility-1-default font-medium   text-unset  "
													>
														BNB
													</p>
												</div>
												<div>
													<div
														data-testid="asset-type"
														className="flex items-center justify-center typography-caption-12 font-medium rounded-6 bg-utility-1-opacity-4 text-utility-1-default px-2 py-0.5 min-h-5 space-x-1"
													>
														BNB Smart Chain
													</div>
												</div>
											</div>
											<div className="flex flex-row space-x-1">
												<p
													data-testid="asset-blockchain"
													className="typography-body-14 text-utility-1-default font-normal   text-unset  "
												>
													BNB Smart Chain
												</p>
											</div>
										</div>
										<div className="opacity-100">
											<button
												data-testid="toggle-asset-switch"
												className="switch"
												id="headlessui-switch-«r1s»"
												role="switch"
												type="button"
												tabIndex={0}
												aria-checked="true"
												data-headlessui-state="checked"
												data-checked=""
											>
												<span className="sr-only">
													BNB Smart Chain
												</span>
												<span
													aria-hidden="true"
													className="switch__toggle"
												></span>
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
	);
}
