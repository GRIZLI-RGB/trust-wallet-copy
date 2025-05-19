export default function WalletSwapPage() {
	return (
		<div
			className="relative flex flex-col flex-1 w-full h-full self-center 
    bg-backgroundSecondary
     p-4"
		>
			<div className="relative flex flex-1 w-full">
				<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
					<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined ">
						<div className="flex my-11 justify-center">
							<div
								role="button"
								className="outline-0  cursor-pointer"
								tabIndex={0}
							>
								<svg
									fill="none"
									width="62"
									height="87"
									viewBox="0 0 62 87"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_26161_83707)">
										<path
											d="M-0.00195312 26.9479L30.5756 16.9648V86.0759C8.73428 76.8606 -0.00195312 59.1989 -0.00195312 49.2159V26.9465V26.9479Z"
											fill="#48FF91"
										></path>
										<path
											d="M61.1556 26.9479L30.5781 16.9648V86.0759C52.4194 76.8606 61.1556 59.1989 61.1556 49.2172V26.9479Z"
											fill="url(#paint0_linear_26161_83707)"
										></path>
										<path
											d="M12.0561 0.34082H16.3227V2.73096C17.7214 0.582458 19.33 0.34082 21.6857 0.34082V4.56603H20.6128C17.7905 4.56603 16.4387 5.89434 16.4387 8.52474V13.0151H12.0547V0.34082H12.0561Z"
											fill="#48FF91"
										></path>
										<path
											d="M35.9252 13.0137H31.5413V11.8055C30.5844 12.917 29.2795 13.3989 27.6709 13.3989C24.6166 13.3989 22.8906 11.5887 22.8906 8.25687V0.34082H27.2746V7.2696C27.2746 8.83818 28.0437 9.75502 29.3486 9.75502C30.6534 9.75502 31.5413 8.86165 31.5413 7.34141V0.34082H35.9252V13.0151V13.0137Z"
											fill="#48FF91"
										></path>
										<path
											d="M36.9961 9.10059H41.1012C41.289 10.0174 41.9172 10.4027 43.4319 10.4027C44.6677 10.4027 45.3913 10.1141 45.3913 9.58249C45.3913 9.17101 45.0406 8.9059 44.0395 8.68912L40.7284 7.94073C38.5136 7.43536 37.3938 6.15538 37.3938 4.10215C37.3938 1.39719 39.3752 -0.00292969 43.2221 -0.00292969C47.0689 -0.00292969 48.9578 1.36129 49.2851 4.28303H45.2049C45.1358 3.51117 44.3419 3.03894 43.037 3.03894C41.989 3.03894 41.3124 3.37585 41.3124 3.88398C41.3124 4.31755 41.7543 4.65584 42.6421 4.87539L46.1162 5.72043C48.4 6.27412 49.4977 7.43398 49.4977 9.31738C49.4977 11.9257 47.236 13.4708 43.3905 13.4708C39.545 13.4708 37.0016 11.8056 37.0016 9.10059H36.9975H36.9961Z"
											fill="#48FF91"
										></path>
										<path
											d="M61.17 4.28158V0.34082H50.3516V4.28435H53.5798V13.0137H57.9404V4.28158H61.17Z"
											fill="#48FF91"
										></path>
										<path
											d="M10.8366 4.28158V0.34082H0.0195312V4.28435H3.24781V13.0137H7.60833V4.28158H10.8366Z"
											fill="#48FF91"
										></path>
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
												stop-color="#48FF91"
											></stop>
											<stop
												offset="0.66"
												stop-color="#0094FF"
											></stop>
											<stop
												offset="0.8"
												stop-color="#0038FF"
											></stop>
											<stop
												offset="0.89"
												stop-color="#0500FF"
											></stop>
										</linearGradient>
										<clipPath id="clip0_26161_83707">
											<rect
												width="61.1691"
												height="86.0768"
												fill="white"
											></rect>
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
						<div className="flex flex-1 flex-col flex-grow-0 self-center bg-backgroundPrimary border border-line rounded p-0 lg-max:min-h-auto lg-max:w-min lg-max:mb-6 lg-min:h-[540px] lg-min:max-w-[925px] sm-max:!w-full">
							<div className="flex h-15 border-b border-line space-x-8 px-6">
								<div
									data-testid="buy-option"
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex flex-col h-15 space-y-2 justify-end">
										<p className="title-text text-utility-1-default font-medium   text-unset  ">
											Buy
										</p>
										<div className="flex self-center w-6 h-0.75 bg-primary"></div>
									</div>
								</div>
								<div
									data-testid="sell-option"
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex flex-col h-15 space-y-2 justify-end">
										<p className="title-text text-textSecondary font-medium   text-unset  ">
											Sell
										</p>
										<div className="flex self-center w-6 h-0.75 bg-transparent"></div>
									</div>
								</div>
							</div>
							<div className="flex justify-evenly lg-max:flex-col lg-min:h-[540px]">
								<div className="flex flex-col p-6 space-y-4">
									<div className="flex flex-col space-y-1">
										<div className="rounded-4 bg-background-2 px-4 py-2  border-solid transition w-full">
											<div className="flex flex-col space-y-3 lg-max:w-full lg-min:w-[342px]">
												<div className="flex flex-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														I want to spend
													</small>
												</div>
												<div className="flex items-center space-x-2">
													<div className="flex items-center space-x-2.5">
														<svg
															fill="none"
															width="40"
															height="40"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
																fill="#F0B90B"
															></path>
															<path
																d="M12.8169 19.6851V18.1451C15.0744 17.8651 16.3519 16.5001 16.3519 14.6276C16.3519 12.8076 15.2494 11.8276 12.7119 11.2676V7.6801C13.7094 7.8376 14.4094 8.3276 14.9169 8.9926L16.2119 7.9251C15.4069 6.8926 14.3044 6.2626 12.8169 6.1226V4.6001H11.3294V6.1226C9.2119 6.3501 7.8819 7.4876 7.8819 9.3426C7.8819 11.1101 8.9494 12.1601 11.4519 12.7026V16.6226C10.3494 16.4826 9.5094 15.9226 8.7919 15.0476L7.5144 16.2026C8.3894 17.2526 9.5619 18.0401 11.3294 18.1801V19.6851H12.8169ZM14.5144 14.7501C14.5144 15.7126 13.8494 16.4126 12.7119 16.6051V12.9651C14.0769 13.3151 14.5144 13.8751 14.5144 14.7501ZM9.7019 9.2551C9.7019 8.3801 10.3494 7.8201 11.4519 7.6626V10.9876C10.2619 10.6551 9.7019 10.2176 9.7019 9.2551Z"
																fill="#14151A"
															></path>
														</svg>
														<div
															data-testid="input-currency"
															role="button"
															className="outline-0  cursor-pointer"
															tabIndex={0}
														>
															<div className="flex items-center space-x-1">
																<p className="title-text text-utility-1-default font-semibold   text-unset  ">
																	USD
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
																		clip-rule="evenodd"
																		d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
														</div>
													</div>
													<div className="flex flex-col w-full items-end space-y-1">
														<input
															data-testid="input-amount"
															className="w-full h-8 text-right p-0 border-0 outline-none bg-transparent text-headline6 leading-headline6 font-semibold text-textPrimary"
															placeholder="0"
															spellCheck={false}
															type="text"
															value="150"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-col space-y-1">
										<div className="rounded-4 bg-background-2 px-4 py-2  border-solid transition w-full">
											<div className="flex flex-col space-y-3 lg-max:w-full lg-min:w-[342px]">
												<div className="flex flex-1">
													<small className="caption-text text-textSecondary font-normal   text-unset  ">
														I will buy
													</small>
												</div>
												<div className="flex items-center space-x-2">
													<div className="flex items-center space-x-2.5">
														<div className="relative min-w-min">
															<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																<div className="rounded-full overflow-hidden  ">
																	<div className="w-10 h-10 flex items-center">
																		<img
																			alt="Ethereum"
																			className="w-full h-full rounded-full"
																			width="100%"
																			height="100%"
																			src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div
															data-testid="output-currency"
															role="button"
															className="outline-0  cursor-pointer"
															tabIndex={0}
														>
															<div className="flex items-center space-x-1">
																<p className="title-text text-utility-1-default font-semibold   text-unset  ">
																	ETH
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
																		clip-rule="evenodd"
																		d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
															<div className="flex whitespace-nowrap">
																<small className="caption-text text-textSecondary font-normal   text-unset  ">
																	Ethereum
																</small>
															</div>
														</div>
													</div>
													<div className="flex flex-col w-full items-end space-y-1"></div>
												</div>
											</div>
										</div>
										<p className="body-text text-error-1-default font-medium   text-unset  "></p>
									</div>
									<div className="flex items-center justify-between p-4 rounded-xl bg-gradient-primary from-startGradient/8 to-finishGradient/8">
										<div className="flex items-center space-x-2">
											<svg
												fill="none"
												width="18"
												height="21"
												viewBox="0 0 58 66"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M0 9.38949L28.8907 0V65.0042C8.2545 56.3369 0 39.7248 0 30.3353V9.38949Z"
													fill="#48FF91"
												></path>
												<path
													d="M57.7822 9.38949L28.8915 0V65.0042C49.5277 56.3369 57.7822 39.7248 57.7822 30.3353V9.38949Z"
													fill="url(#paint0_linear_896_19677)"
												></path>
												<defs>
													<linearGradient
														id="paint0_linear_896_19677"
														x1="28.8911"
														y1="73.5101"
														x2="52.5376"
														y2="-12.0198"
														gradientUnits="userSpaceOnUse"
													>
														<stop
															offset="0.264213"
															stop-color="#48FF91"
														></stop>
														<stop
															offset="0.662556"
															stop-color="#0094FF"
														></stop>
														<stop
															offset="0.800473"
															stop-color="#0038FF"
														></stop>
														<stop
															offset="0.888911"
															stop-color="#0500FF"
														></stop>
													</linearGradient>
												</defs>
											</svg>
											<div className="-ml-1">
												<div className="relative min-w-min">
													<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
														<div className="rounded-full overflow-hidden  ">
															<div className="w-6 h-6 flex items-center">
																<img
																	alt="a"
																	className="w-full h-full rounded-full"
																	width="100%"
																	height="100%"
																	src="images/BINANCE_CONNECT.1cb1a0f9fcac68d2.png"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
											<span className="text-textPrimary body-text font-medium">
												Try Binance P2P for better
												quotes
											</span>
										</div>
										<div className="flex">
											<div
												className="flex w-full"
												data-tooltip-id="default-tooltip"
												data-tooltip-place="top-end"
												data-tooltip-role="tooltip"
											>
												<button
													type="button"
													className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
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
															d="M6.69611 5.07538L4.57479 7.1967L9.87809 12.5L4.57479 17.8033L6.69611 19.9246L11.9994 14.6213L17.3027 19.9246L19.424 17.8033L14.1207 12.5L19.424 7.1967L17.3027 5.07538L11.9994 10.3787L6.69611 5.07538Z"
															fill="currentColor"
														></path>
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="h-100 border-r border-line"></div>
								<div className="flex p-6 pb-0">
									<div className="flex flex-col w-[438px] space-y-4 relative">
										<div className="flex items-center justify-between">
											<p className="subtitle-text text-utility-1-default font-normal   text-unset  ">
												Pay with
											</p>
											<p className="subtitle-text text-textSecondary font-normal   text-unset  ">
												Quotes refresh in 4...
											</p>
										</div>
										<div data-headlessui-state="">
											<button
												className="outline-none border-line w-full border px-3 py-3 rounded"
												type="button"
												aria-expanded="false"
												data-headlessui-state=""
												id="headlessui-popover-button-«r16t»"
											>
												<div className="flex justify-between">
													<div className="flex items-center">
														<div>
															<img
																width="24"
																height="24"
																src="images/CREDIT_CARD.9dcddf38b5641691.png"
															/>
														</div>
														<div className="pl-2">
															<p
																data-testid="selected-payment-provider"
																className="body-text text-utility-1-default font-medium   text-unset  "
															>
																Credit Card
															</p>
														</div>
													</div>
													<div>
														<svg
															className="text-iconNormal transition-transform rotate-0"
															fill="none"
															width="24"
															height="24"
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
										</div>
										<div className="overflow-auto lg-min:h-[320px]">
											<ul
												data-testid="fiat-quote-list"
												className="flex flex-col space-y-6 mr-2.5 mb-6 mt-2"
											>
												<li className="my-2 flex flex-col space-y-4">
													<div
														data-testid="fiat-quote-item"
														role="button"
														className="outline-0  cursor-pointer"
														tabIndex={0}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-2">
																<div className="relative min-w-min">
																	<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																		<div className="rounded-full overflow-hidden  ">
																			<div className="w-10 h-10 flex items-center">
																				<img
																					alt="Mercuryo"
																					className="w-full h-full rounded-full"
																					width="100%"
																					height="100%"
																					src="https://trustwallet.com/assets/images/payments/mercuryo.png"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="flex items-center space-x-1">
																	<div className="flex-col space-y-1">
																		<p
																			data-testid="fiat-quote-item-provider-name"
																			className="title-text text-utility-1-default font-medium   text-unset  "
																		>
																			Mercuryo
																		</p>
																	</div>
																	<span className="inline-block caption-text px-0.75 py-0.5 font-medium rounded bg-backgroundSecondary text-textThird">
																		Best
																		rate
																	</span>
																</div>
															</div>
															<div className="flex items-center space-x-3">
																<p
																	data-testid="fiat-quote-item-provider-rate"
																	className="title-text text-textSecondary font-medium   text-unset  "
																>
																	≈ 0.080716
																	ETH
																</p>
																<svg
																	className="text-iconNormal"
																	fill="none"
																	width="22"
																	height="22"
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
																		clip-rule="evenodd"
																		d="M16.9822 5.23223L8.49695 13.7175L10.2647 15.4853L18.75 7L17.8661 6.11612L16.9822 5.23223Z"
																		fill="currentColor"
																	></path>
																	<path
																		d="M20 12L20 4L12 4L20 12Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
														</div>
													</div>
													<div
														data-testid="fiat-quote-item"
														role="button"
														className="outline-0  cursor-pointer"
														tabIndex={0}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-2">
																<div className="relative min-w-min">
																	<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																		<div className="rounded-full overflow-hidden  ">
																			<div className="w-10 h-10 flex items-center">
																				<img
																					alt="Transak"
																					className="w-full h-full rounded-full"
																					width="100%"
																					height="100%"
																					src="https://trustwallet.com/assets/images/payments/transak.png"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="flex items-center space-x-1">
																	<div className="flex-col space-y-1">
																		<p
																			data-testid="fiat-quote-item-provider-name"
																			className="title-text text-utility-1-default font-medium   text-unset  "
																		>
																			Transak
																		</p>
																	</div>
																</div>
															</div>
															<div className="flex items-center space-x-3">
																<p
																	data-testid="fiat-quote-item-provider-rate"
																	className="title-text text-textSecondary font-medium   text-unset  "
																>
																	≈ 0.079685
																	ETH
																</p>
																<svg
																	className="text-iconNormal"
																	fill="none"
																	width="22"
																	height="22"
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
																		clip-rule="evenodd"
																		d="M16.9822 5.23223L8.49695 13.7175L10.2647 15.4853L18.75 7L17.8661 6.11612L16.9822 5.23223Z"
																		fill="currentColor"
																	></path>
																	<path
																		d="M20 12L20 4L12 4L20 12Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
														</div>
													</div>
													<div
														data-testid="fiat-quote-item"
														role="button"
														className="outline-0  cursor-pointer"
														tabIndex={0}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-2">
																<div className="relative min-w-min">
																	<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																		<div className="rounded-full overflow-hidden  ">
																			<div className="w-10 h-10 flex items-center">
																				<img
																					alt="Binance Connect"
																					className="w-full h-full rounded-full"
																					width="100%"
																					height="100%"
																					src="https://trustwallet.com/assets/images/payments/binanceconnect.png"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="flex items-center space-x-1">
																	<div className="flex-col space-y-1">
																		<p
																			data-testid="fiat-quote-item-provider-name"
																			className="title-text text-utility-1-default font-medium   text-unset  "
																		>
																			Binance
																			Connect
																		</p>
																	</div>
																</div>
															</div>
															<div className="flex items-center space-x-3">
																<p
																	data-testid="fiat-quote-item-provider-rate"
																	className="title-text text-textSecondary font-medium   text-unset  "
																>
																	≈ 0.079501
																	ETH
																</p>
																<svg
																	className="text-iconNormal"
																	fill="none"
																	width="22"
																	height="22"
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
																		clip-rule="evenodd"
																		d="M16.9822 5.23223L8.49695 13.7175L10.2647 15.4853L18.75 7L17.8661 6.11612L16.9822 5.23223Z"
																		fill="currentColor"
																	></path>
																	<path
																		d="M20 12L20 4L12 4L20 12Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
														</div>
													</div>
													<div
														data-testid="fiat-quote-item"
														role="button"
														className="outline-0  cursor-pointer"
														tabIndex={0}
													>
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-2">
																<div className="relative min-w-min">
																	<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
																		<div className="rounded-full overflow-hidden  ">
																			<div className="w-10 h-10 flex items-center">
																				<img
																					alt="AlchemyPay"
																					className="w-full h-full rounded-full"
																					width="100%"
																					height="100%"
																					src="https://trustwallet.com/assets/images/payments/alchemypay.png"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="flex items-center space-x-1">
																	<div className="flex-col space-y-1">
																		<p
																			data-testid="fiat-quote-item-provider-name"
																			className="title-text text-utility-1-default font-medium   text-unset  "
																		>
																			AlchemyPay
																		</p>
																	</div>
																</div>
															</div>
															<div className="flex items-center space-x-3">
																<p
																	data-testid="fiat-quote-item-provider-rate"
																	className="title-text text-textSecondary font-medium   text-unset  "
																>
																	≈ 0.078767
																	ETH
																</p>
																<svg
																	className="text-iconNormal"
																	fill="none"
																	width="22"
																	height="22"
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
																		clip-rule="evenodd"
																		d="M16.9822 5.23223L8.49695 13.7175L10.2647 15.4853L18.75 7L17.8661 6.11612L16.9822 5.23223Z"
																		fill="currentColor"
																	></path>
																	<path
																		d="M20 12L20 4L12 4L20 12Z"
																		fill="currentColor"
																	></path>
																</svg>
															</div>
														</div>
													</div>
												</li>
											</ul>
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
