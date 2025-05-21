"use client";

import Modal from "@/app/components/modal";
import { getWalletReceiveList } from "@/app/utils/api";
import { _globalLoading_ } from "@/app/utils/store";
import { BaseEntityType, CryptoType } from "@/app/utils/types";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ReceiveItem = BaseEntityType & {
	wallet_i: number;
	crypto_id: number;
	balance: string;
	address: string;
	crypto: CryptoType;
};

export default function WalletReceivePage() {
	const router = useRouter();

	const setGlobalLoading = useSetAtom(_globalLoading_);

	const [receiveList, setReceiveList] = useState<ReceiveItem[]>();

	useEffect(() => {
		setGlobalLoading(true);

		getWalletReceiveList()
			.then((res) => setReceiveList(res.data.data))
			.finally(() => setGlobalLoading(false));
	}, []);

	const [search, setSearch] = useState("");

	const [isOpenQr, setIsOpenQr] = useState(false);
	const [selectedCrypto, setSelectedCrypto] = useState<ReceiveItem>();

	return (
		<>
			<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
				<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
					<div className="flex w-8 justify-start">
						<div className="flex ">
							<button
								onClick={() => router.back()}
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
							Select asset to receive
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
					<div>
						<div className="search-field ">
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

					{/* <div className="mt-4">
					<div data-headlessui-state="">
						<button
							data-testid="network-select-button"
							className="outline-none rounded-full bg-background-2 p-2"
							type="button"
							aria-expanded="false"
							data-headlessui-state=""
							id="headlessui-popover-button-«r1q»"
						>
							<div
								className="flex items-center"
								data-tooltip-id="default-tooltip"
								data-tooltip-content="Filter networks"
							>
								<div className="pr-2">
									<svg
										fill="none"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="12"
											cy="12"
											r="12"
											fill="#EAECEF"
										></circle>
										<circle
											cx="7.95"
											cy="7.95012"
											r="2.7"
											fill="#242426"
										></circle>
										<circle
											cx="7.95"
											cy="16.0501"
											r="2.7"
											fill="#242426"
										></circle>
										<circle
											cx="16.0501"
											cy="7.95"
											r="2.7"
											fill="#242426"
										></circle>
										<circle
											cx="16.0501"
											cy="16.0501"
											r="2.7"
											fill="#242426"
										></circle>
									</svg>
								</div>
								<div className="flex items-center">
									<div>
										<p className="typography-subheader-14 text-utility-1-default font-medium   text-unset  ">
											All Networks
										</p>
									</div>
									<div className="pl-1">
										<svg
											className="text-utility-1-opacity-1 transition-transform rotate-0"
											fill="none"
											width="18"
											height="18"
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
							</div>
						</button>
					</div>
				</div> */}

					<div className="mt-4">
						<div>
							<div className="infinite-scroll-component overflow-y-auto scrollbar-hidden">
								<div className="flex flex-col space-y-5">
									{(receiveList || []).map((item) => (
										<div
											onClick={() => {
												setSelectedCrypto(item);
												setIsOpenQr(true);
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
															<p
																data-testid="asset-symbol"
																className="typography-subheader-16 text-utility-1-default font-medium   text-unset  "
															>
																{
																	item.crypto
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
																	item.crypto
																		.network_name
																}
															</div>
														</div>
													</div>
													<div className="flex flex-row space-x-1">
														<p
															data-testid="asset-blockchain"
															className="typography-body-14 text-utility-1-default font-normal   text-unset  "
														>
															{
																item.crypto
																	.full_name
															}
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
															{
																item.crypto
																	.full_name
															}
														</span>
														<span
															aria-hidden="true"
															className="switch__toggle"
														></span>
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal open={isOpenQr} onClose={() => setIsOpenQr(false)}>
				<div className="pt-4 max-w-[452px]">
					<div className="mt-4">
						<div>
							<h3 className="text-[24px] text-utility-1-default font-semibold   text-center  ">
								Receive {selectedCrypto?.crypto.symbol}
							</h3>
						</div>

						<div className="mt-8">
							<div className="warning-alert space-x-2 items-start">
								<svg
									className="text-warning-1-default"
									fill="none"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.75 15.5V18H13.25V15.5H10.75ZM10.75 6V13H13.25V6H10.75Z"
										fill="currentColor"
									></path>
								</svg>
								<div className="text-utility-1-default typography-body-12 flex-1 text-start">
									Send only {selectedCrypto?.crypto.full_name}{" "}
									({selectedCrypto?.crypto.symbol}) to this
									address. Sending any other coins may result
									in permanent loss.
								</div>
							</div>
						</div>

						<div className="my-3 text-center mx-auto">
							<img
								src={`${process.env.NEXT_PUBLIC_SITE_URL}/${selectedCrypto?.crypto?.qr_code}`}
								alt=""
							/>
						</div>

						<div>
							<div>
								<div
									data-tooltip-id="default-tooltip"
									data-tooltip-content="Copy"
									data-tooltip-place="top-end"
								>
									<div className="flex w-full">
										<button
											onClick={() => {
												navigator.clipboard
													.writeText(
														selectedCrypto?.address ||
															""
													)
													.then(() => {
														alert("Скопировано!");
													})
													.catch(() => {
														alert(
															"Ошибка копирования:"
														);
													});
											}}
											type="button"
											className="outline-none bg-accent/10 !text-accent hover:bg-accent/20 disabled:bg-primary-opacity-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  overflow-hidden"
										>
											<div className="flex items-center space-x-1 overflow-hidden">
												<div className="overflow-hidden break-words">
													<p className="typography-subheader-14 text-accent font-medium   text-unset  ">
														{
															selectedCrypto?.address
														}
													</p>
												</div>
												<svg
													className="shrink-0 "
													fill="none"
													width="16"
													height="16"
													viewBox="0 0 25 25"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M9.45557 3.89441H20.4556V16.8944H17.4556V6.89441H9.45557V3.89441ZM4.45557 8.89441V21.8944H15.4556V8.91477L4.45557 8.89441Z"
														fill="currentColor"
													></path>
												</svg>
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
