export default function WalletItemPage() {
	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
			<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
				<div className="flex w-8 justify-start">
					<div
						className="flex "
						data-tooltip-id="default-tooltip"
						data-tooltip-place="top-end"
						data-tooltip-role="tooltip"
					>
						<button
							data-testid="back-navigation-button"
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
						BNB
					</h5>
				</div>
				<div className="flex w-8 justify-end"></div>
			</div>

			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
				<div className="infinite-scroll-component__outerdiv">
					<div
						className="infinite-scroll-component tw-scrollbar pb-4"
						style={{
							height: "484px",
							overflow: "auto",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div className="flex flex-col space-y-6">
							<div className="flex flex-col items-center">
								<div className="flex w-full"></div>
								<div className="mt-2 mb-4">
									<div className="relative min-w-min">
										<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
											<div className="rounded-full overflow-hidden  ">
												<div className="w-12 h-12 flex items-center">
													<img
														alt="BNB Smart Chain"
														className="w-full h-full rounded-full"
														src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<h2
									data-testid="asset-amount"
									className="typography-header-32 text-utility-1-default font-semibold   text-unset  "
								>
									0
								</h2>
								{/* <number-flow-react
									className="typography-body-14 text-utility-1-opacity-2"
									data-testid="asset-fiat"
								></number-flow-react> */}
							</div>
							<div className="w-full flex items-center justify-between px-5">
								<div className="flex flex-col space-y-2 items-center">
									<div
										data-tooltip-id="default-tooltip"
										data-tooltip-place="top"
										data-tooltip-role="tooltip"
									>
										<div
											className="flex "
											data-tooltip-id="default-tooltip"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												data-testid="asset-send-btn"
												type="button"
												className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
											>
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
														d="M10.002 2.49903L15.8945 8.39158L14.4214 9.86472L11.0426 6.48597L11.0426 17.4998L8.95931 17.4998L8.95931 6.48697L5.58156 9.86472L4.10842 8.39158L10.001 2.49903L10.0015 2.49953L10.002 2.49903Z"
														fill="currentColor"
													></path>
												</svg>
											</button>
										</div>
									</div>
									<div>
										<p className="body-text text-utility-1-default font-medium   text-unset  ">
											Send
										</p>
									</div>
								</div>
								<div className="flex flex-col space-y-2 items-center">
									<div
										data-tooltip-id="default-tooltip"
										data-tooltip-place="top"
										data-tooltip-role="tooltip"
									>
										<div
											className="flex "
											data-tooltip-id="default-tooltip"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												data-testid="asset-receive-btn"
												type="button"
												className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
											>
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
														d="M9.99803 17.4993L4.10547 11.6067L5.57861 10.1336L8.95736 13.5123L8.95736 2.49845L11.0407 2.49845L11.0407 13.5113L14.4184 10.1336L15.8916 11.6067L9.99902 17.4993L9.99852 17.4988L9.99803 17.4993Z"
														fill="currentColor"
													></path>
												</svg>
											</button>
										</div>
									</div>
									<div>
										<p className="body-text text-utility-1-default font-medium   text-unset  ">
											Receive
										</p>
									</div>
								</div>
								<div className="flex flex-col space-y-2 items-center">
									<div
										data-tooltip-id="default-tooltip"
										data-tooltip-place="top"
										data-tooltip-role="tooltip"
									>
										<div
											className="flex "
											data-tooltip-id="default-tooltip"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												data-testid="asset-buy-btn"
												type="button"
												className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
											>
												<svg
													className="text-utility-1-opacity-1"
													fill="none"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M21 5H3V8H21V5ZM21 10.5H3V19H21V10.5ZM6 13H11V15.5H6V13ZM15.5 13H13V15.5H15.5V13Z"
														fill="currentColor"
													></path>
												</svg>
											</button>
										</div>
									</div>
									<div>
										<p className="body-text text-utility-1-default font-medium   text-unset  ">
											Buy
										</p>
									</div>
								</div>
								<div className="flex flex-col space-y-2 items-center">
									<div
										data-tooltip-id="default-tooltip"
										data-tooltip-place="top"
										data-tooltip-role="tooltip"
									>
										<div
											className="flex "
											data-tooltip-id="default-tooltip"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												data-testid="asset-swap-btn"
												type="button"
												className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
											>
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
														d="M2.49984 7.50016L2.49984 5.00016L13.7498 5.00016V2.0835L17.9165 6.25016L13.7498 10.4168V7.50016L2.49984 7.50016ZM17.4998 15.0002V12.5002L5.83317 12.5002L5.83317 9.5835L1.6665 13.7502L5.83317 17.9168L5.83317 15.0002L17.4998 15.0002Z"
														fill="currentColor"
													></path>
												</svg>
											</button>
										</div>
									</div>
									<div>
										<p className="body-text text-utility-1-default font-medium   text-unset  ">
											Swap
										</p>
									</div>
								</div>
								<div className="flex flex-col space-y-2 items-center">
									<div
										data-tooltip-id="default-tooltip"
										data-tooltip-place="top"
										data-tooltip-role="tooltip"
									>
										<div
											className="flex "
											data-tooltip-id="default-tooltip"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												data-testid="asset-sell-btn"
												type="button"
												className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
											>
												<svg
													className="text-utility-1-opacity-1"
													fill="none"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M12 3L4 8V11H6V16H4V20H20V16H18V11H20V8L12 3ZM15.5 11H13.25V16H15.5V11ZM10.75 11H8.5V16H10.75V11Z"
														fill="currentColor"
													></path>
												</svg>
											</button>
										</div>
									</div>
									<div>
										<p className="body-text text-utility-1-default font-medium   text-unset  ">
											Sell
										</p>
									</div>
								</div>
							</div>
							<div className="border-utility-1-opacity-5 relative overflow-hidden bg-background-2 border rounded-4 w-full">
								<svg
									className="text-primary-default absolute pointer-events-none"
									fill="none"
									width="152"
									height="96"
									viewBox="0 0 152 96"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.8"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M7.75 23.5V0H8.25V23.5H31.75V0H32.25V23.5H55.75V0H56.25V23.5H79.75V0H80.25V23.5H103.75V0H104.25V23.5H127.75V0H128.25V23.5H152V24H128.25V47.5H152V48H128.25V71.5H152V72H128.25V96H127.75V72H104.25V96H103.75V72H80.25V96H79.75V72H56.25V96H55.75V72H32.25V96H31.75V72H8.25V96H7.75V72H-16V71.5H7.75V48H-16V47.5H7.75V24H-16V23.5H7.75ZM8.25 71.5H31.75V48H8.25V71.5ZM32.25 71.5H55.75V48H32.25V71.5ZM56.25 71.5H79.75V48H56.25V71.5ZM80.25 71.5H103.75V48H80.25V71.5ZM104.25 71.5H127.75V48H104.25V71.5ZM127.75 24V47.5H104.25V24H127.75ZM103.75 24V47.5H80.25V24H103.75ZM79.75 24V47.5H56.25V24H79.75ZM55.75 24V47.5H32.25V24H55.75ZM31.75 24V47.5H8.25V24H31.75Z"
										fill="url(#paint0_radial_4077_44372)"
										fillOpacity="0.24"
									></path>
									<defs>
										<radialGradient
											id="paint0_radial_4077_44372"
											cx="0"
											cy="0"
											r="1"
											gradientUnits="userSpaceOnUse"
											gradientTransform="translate(68 48) scale(84 147)"
										>
											<stop stopColor="currentColor"></stop>
											<stop
												offset="1"
												stopColor="currentColor"
												stopOpacity="0"
											></stop>
										</radialGradient>
									</defs>
								</svg>
								<div className="p-0">
									<div
										role="button"
										className="outline-0  cursor-pointer"
										tabIndex={0}
									>
										<div className="flex items-center justify-between space-x-2 px-4 py-3">
											<div className="flex flex-col space-y-0.5">
												<p className="typography-subheader-14 text-utility-1-opacity-1 font-medium   text-unset  ">
													Native staking
												</p>
												<p className="typography-subheader-18 text-utility-1-default font-medium   text-unset  ">
													0 BNB
												</p>
												<small className="typography-caption-12 text-primary-default font-normal   text-unset  ">
													Get up to 2.24% APR
												</small>
											</div>
											<div>
												<div
													className="flex w-full"
													data-tooltip-id="default-tooltip"
													data-tooltip-place="top-end"
													data-tooltip-role="tooltip"
												>
													<button
														type="button"
														className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  "
													>
														Get started
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 mb-2">
							<div className="border-t border-utility-1-opacity-3 "></div>
						</div>

						<div className="flex items-center justify-center w-full h-full flex-1 flex-row">
							<div className="flex flex-col space-y-2 items-center">
								<svg
									width="160"
									height="160"
									viewBox="0 0 160 160"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_278_20219)">
										<path
											d="M93.2076 53.0217L88.2721 64.4405C87.1306 67.0813 89.0668 70.0275 91.9437 70.0275L120.65 70.0275C124.147 70.0275 126.47 73.6464 125.015 76.8257L107.925 114.153"
											stroke="#48FF91"
											stroke-width="0.4"
											stroke-dasharray="2.23 2.23"
										></path>
										<path
											d="M89.2353 78.9805L53.0853 11.0792C52.1723 9.36926 51.0196 8.51617 49.8879 8.51925C47.9484 8.52452 46.8502 9.91609 45.6979 11.9072L17.643 73.4087L54.6468 144.479L89.239 78.9768L89.2353 78.9805Z"
											fill="#1B1B1C"
											stroke="#48FF91"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<mask
											id="mask0_278_20219"
											maskUnits="userSpaceOnUse"
											x="17"
											y="8"
											width="73"
											height="137"
											style={{
												maskType: "alpha",
											}}
										>
											<path
												d="M89.2334 78.9786L53.0833 11.0773C52.1703 9.36731 51.0177 8.51422 49.886 8.51729C47.9464 8.52257 46.8483 9.91414 45.6959 11.9052L17.6411 73.4067L54.6448 144.477L89.2371 78.9748L89.2334 78.9786Z"
												fill="#1B1B1C"
												stroke="#48FF91"
												stroke-width="0.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</mask>
										<g mask="url(#mask0_278_20219)">
											<path
												d="M20.6006 91.2384L59.6084 5.92188"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M30.4209 95.7267L69.4287 10.4102"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M40.2412 100.215L79.249 14.8984"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M50.0615 104.705L89.0693 19.3887"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M59.8808 109.194L98.8887 23.877"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M86.501 93.2282L42.042 10.6211"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M81.2959 104.615L36.8369 22.0078"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M76.0908 116.002L31.6318 33.3945"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M70.8838 127.39L26.4248 44.7832"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
											<path
												d="M65.6777 138.779L21.2188 56.1719"
												stroke="#48FF91"
												stroke-width="0.4"
											></path>
										</g>
										<path
											d="M47.9995 42.8262C50.8518 48.0768 50.8515 50.8282 49.4434 53.9952C50.8546 50.8317 52.2437 50.6923 55.0496 55.7901C52.2437 50.6923 52.0936 47.6355 53.7218 44.799C52.2385 47.9005 50.8548 48.0803 48.0026 42.8297L47.9995 42.8262Z"
											fill="#48FF91"
											stroke="#48FF91"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M141.642 141.609L108.867 80.0459C107.011 76.559 102.26 73.7166 98.3143 73.7273L46.5835 73.868C44.7966 73.8728 43.0419 73.4086 41.4946 72.5193L37.9338 70.474C36.3864 69.5848 34.6317 69.1205 32.8448 69.1253L26.0472 69.1438L20.7772 73.7818L59.3855 146.233C60.1444 147.415 61.6057 148.144 63.5788 148.139L136.968 147.962L140.16 149.904L142.078 145.796L142.07 145.796C142.592 144.67 142.502 143.207 141.649 141.605L141.642 141.609Z"
											fill="#2D9FFF"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M93.5209 77.8407L95.4382 73.733"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-miterlimit="10"
										></path>
										<path
											d="M106.95 84.1563C105.094 80.6694 100.344 77.827 96.3978 77.8377L21.4148 78.0193C19.2966 78.0251 17.7717 77.1841 17.0645 75.8496L56.743 150.353C57.502 151.535 58.9633 152.264 60.9363 152.259L135.919 152.077C139.869 152.066 141.581 149.206 139.725 145.723L106.95 84.16L106.95 84.1563Z"
											fill="url(#paint0_linear_278_20219)"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M111.354 100.692L103.152 85.2795C101.988 83.09 99.3286 81.1093 96.8902 81.1159L22.6367 81.2285"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M58.5854 149.048L132.999 148.854C135.474 148.847 136.144 147.274 135.171 145.441L127.919 131.817"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M27.9064 69.9854C28.4863 71.0745 27.3593 72.8124 25.3891 73.8601C23.4189 74.9079 21.3527 74.8763 20.769 73.7834C20.1853 72.6905 21.316 70.9563 23.2862 69.9086C24.2416 69.3997 25.22 69.1476 26.0427 69.1454C26.9138 69.143 27.607 69.424 27.9064 69.9854Z"
											fill="#48FF91"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M25.8183 71.1014L25.8201 71.1009C25.9036 71.2601 25.8809 71.5044 25.6878 71.8017C25.4982 72.0937 25.1668 72.3953 24.7337 72.6257C24.3007 72.8561 23.8652 72.9625 23.5169 72.9567C23.1606 72.9509 22.9446 72.8323 22.8598 72.6731C22.775 72.5139 22.797 72.2688 22.9909 71.9701C23.1805 71.6782 23.5119 71.3765 23.945 71.1462L23.9451 71.1461C24.3634 70.9232 24.7854 70.8171 25.1313 70.8162C25.5065 70.8152 25.731 70.9349 25.8183 71.1014Z"
											fill="#1B1B1C"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M44.7358 11.2816L17.2173 71.5047C16.4549 73.1709 16.4554 74.6935 17.0653 75.8459C17.0653 75.8459 17.9982 78.0249 21.4156 78.0156C24.8331 78.0063 29.1329 78.0206 29.1329 78.0206L30.2073 76.1079L22.5161 76.1028C19.5416 76.1109 17.9248 74.306 19.1608 71.6L46.7275 11.2724C47.5638 9.44602 48.7154 8.52337 49.888 8.52018C49.888 8.52018 46.1384 8.21022 44.7358 11.2779L44.7358 11.2816Z"
											fill="#48FF91"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M125.896 125.726L128.817 125.234L136.579 132.108L129.66 119.112L123.338 120.365L125.896 125.726Z"
											fill="#1B1B1C"
										></path>
										<path
											d="M127.012 130.118C125.04 126.412 125.257 124.103 129.631 122.692C131.981 121.933 134.111 120.703 135.935 119.038L139.949 115.371C143.428 112.193 144.462 106.189 142.251 102.03C140.035 97.87 135.376 97.0674 131.9 100.245L127.024 104.699C125.372 106.212 123.267 107.141 121.038 107.359C116.497 107.799 114.592 106.781 112.501 102.851L111.424 106.529L123.922 130.13L127.015 130.122L127.012 130.118Z"
											fill="url(#paint1_linear_278_20219)"
										></path>
										<path
											d="M127.01 130.119C125.038 126.413 125.256 124.104 129.63 122.693C131.98 121.934 134.11 120.704 135.934 119.039L139.948 115.372C143.427 112.194 144.461 106.19 142.249 102.031C140.034 97.871 135.375 97.0684 131.899 100.246L127.023 104.7C125.371 106.213 123.266 107.142 121.037 107.36C116.496 107.8 114.591 106.782 112.5 102.852"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-miterlimit="10"
										></path>
										<path
											d="M137.651 101.404C135.539 100.736 133.013 102.768 132.005 105.946C130.997 109.124 131.892 112.242 134.005 112.91L136.489 113.628L139.978 102.091L137.651 101.404Z"
											fill="#1B1B1C"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M141.8 108.979C142.807 105.801 141.912 102.684 139.801 102.015C137.69 101.346 135.163 103.379 134.156 106.556C133.149 109.733 134.044 112.851 136.155 113.52C138.266 114.189 140.793 112.156 141.8 108.979Z"
											fill="#48FF91"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M78.0385 120.939C76.434 120.944 74.5099 119.791 73.7541 118.375L58.7268 90.149C57.9746 88.7326 58.6677 87.573 60.2721 87.5686L92.2577 87.4705C93.8622 87.4661 95.7862 88.6186 96.5421 90.035L111.569 118.261C112.321 119.677 111.628 120.837 110.024 120.841L78.0385 120.939Z"
											fill="#1B1B1C"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M78.8893 119.457C77.2848 119.462 75.3608 118.309 74.6049 116.893L59.5776 88.6669C59.4092 88.3472 59.3153 88.0422 59.2848 87.7594C58.4222 88.1452 58.1566 89.0728 58.7291 90.1472L73.7564 118.373C74.5086 119.789 76.4364 120.942 78.0408 120.938L110.026 120.839C111.266 120.836 111.96 120.138 111.861 119.167C111.589 119.29 111.258 119.358 110.871 119.359L78.8856 119.457L78.8893 119.457Z"
											fill="url(#paint2_linear_278_20219)"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<mask
											id="mask1_278_20219"
											maskUnits="userSpaceOnUse"
											x="58"
											y="87"
											width="55"
											height="35"
											style={{
												maskType: "alpha",
											}}
										>
											<path
												d="M78.8874 119.459C77.2829 119.464 75.3588 118.311 74.603 116.895L59.5757 88.6689C59.4073 88.3492 59.3134 88.0442 59.2828 87.7613C58.4202 88.1471 58.1547 89.0748 58.7272 90.1491L73.7545 118.375C74.5066 119.791 76.4344 120.944 78.0389 120.939L110.024 120.841C111.264 120.838 111.958 120.14 111.859 119.169C111.587 119.292 111.256 119.36 110.869 119.361L78.8836 119.459L78.8874 119.459Z"
												fill="url(#paint3_linear_278_20219)"
												stroke="#0500FF"
												stroke-width="0.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</mask>
										<g mask="url(#mask1_278_20219)">
											<path
												d="M80.4626 117.445L78.3099 121.355C77.8492 122.192 76.8298 122.544 75.9507 122.171L69.2088 119.303C68.7478 119.107 68.3853 118.733 68.2033 118.266L57.0344 89.6322C56.6146 88.556 57.2664 87.3613 58.3985 87.1316L60.5482 86.6956C61.3021 86.5427 62.0724 86.8693 62.4866 87.5174L80.4004 115.545C80.7674 116.119 80.7913 116.848 80.4626 117.445Z"
												fill="#0500FF"
											></path>
										</g>
										<path
											d="M78.7486 136.496L77.4165 133.998C76.9001 133.024 75.5727 132.235 74.4745 132.238L69.8136 132.25L67.8828 128.622C67.3664 127.648 66.0427 126.859 64.9408 126.862L60.9947 126.873C60.3991 126.874 59.9902 127.11 59.8163 127.479L58.8725 129.499L60.7768 130.224L61.8694 132.276L57.2085 132.288C56.6129 132.29 56.204 132.526 56.0301 132.895L55.0863 134.915L56.9419 135.55L57.4808 136.561C57.9971 137.535 59.3246 138.325 60.4228 138.322L65.0836 138.309L67.0144 141.937C67.5308 142.911 68.8545 143.7 69.9565 143.697L71.5758 143.693L74.1372 145.104L75.081 143.084C75.2253 142.771 75.2019 142.361 74.9624 141.915L73.0316 138.287L75.6561 138.28L77.9308 139.689L78.8746 137.668C79.0227 137.355 78.9955 136.946 78.7561 136.5L78.7486 136.496Z"
											fill="#1B1B1C"
										></path>
										<path
											d="M77.6238 138.612L77.624 138.612C77.8625 139.057 77.8521 139.422 77.7069 139.665C77.5617 139.909 77.2453 140.091 76.7399 140.093L72.079 140.105C72.0089 140.106 71.944 140.142 71.908 140.203C71.872 140.263 71.8701 140.337 71.903 140.399L73.8337 144.027C74.0709 144.475 74.0604 144.84 73.9155 145.083C73.7709 145.325 73.4556 145.507 72.95 145.508L69.0039 145.519C68.4976 145.521 67.9265 145.339 67.4165 145.034C66.9064 144.729 66.4762 144.312 66.2391 143.865L66.239 143.865L64.3082 140.237C64.2734 140.171 64.2052 140.131 64.1311 140.131L59.4702 140.143C58.9658 140.145 58.3948 139.963 57.8841 139.658C57.3735 139.353 56.9425 138.936 56.7054 138.489L56.7052 138.489L55.3731 135.991L55.3729 135.991C55.1344 135.546 55.1449 135.181 55.2901 134.937C55.4353 134.694 55.7517 134.511 56.2571 134.51L60.9179 134.497C60.988 134.497 61.0529 134.46 61.089 134.4C61.125 134.34 61.1269 134.265 61.0939 134.203L59.1633 130.576C59.1632 130.576 59.1632 130.575 59.1631 130.575C58.9261 130.128 58.9366 129.763 59.0814 129.52C59.226 129.278 59.5413 129.096 60.047 129.094L63.9931 129.084C64.4992 129.082 65.0702 129.265 65.5804 129.57C66.0906 129.876 66.5209 130.292 66.758 130.738L68.6888 134.366C68.7236 134.432 68.7918 134.472 68.8659 134.472L73.5267 134.459C74.0311 134.458 74.6022 134.64 75.1128 134.945C75.6235 135.25 76.0545 135.666 76.2915 136.113L76.2917 136.114L77.6238 138.612Z"
											fill="#1B1B1C"
											stroke="#0500FF"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M73.3442 105.471C72.9056 105.472 72.3799 105.156 72.1735 104.769L71.3142 103.262C71.1088 102.874 71.2984 102.558 71.737 102.557L77.5017 102.542C77.9402 102.541 78.4659 102.856 78.6723 103.243L79.5316 104.751C79.737 105.138 79.5474 105.455 79.1088 105.456L73.3442 105.471Z"
											fill="#0500FF"
											stroke="#1B1B1C"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M82.9535 105.451C82.515 105.452 81.9892 105.137 81.7829 104.75L80.9235 103.242C80.7182 102.855 80.9078 102.538 81.3464 102.537L87.111 102.522C87.5496 102.521 88.0753 102.836 88.2817 103.224L89.141 104.731C89.3464 105.118 89.1567 105.435 88.7182 105.436L82.9535 105.451Z"
											fill="#0500FF"
											stroke="#1B1B1C"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M92.5668 105.43C92.1283 105.431 91.6025 105.115 91.3962 104.728L90.5368 103.221C90.3315 102.833 90.5211 102.517 90.9597 102.516L96.7243 102.501C97.1629 102.5 97.6886 102.815 97.895 103.202L98.7543 104.71C98.9596 105.097 98.77 105.414 98.3315 105.415L92.5668 105.43Z"
											fill="#0500FF"
											stroke="#1B1B1C"
											stroke-width="0.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M96.9616 43.437C97.0151 43.6629 96.939 43.9172 96.7331 44.1507C96.5277 44.3838 96.2036 44.5812 95.8067 44.6753C95.4097 44.7693 95.0315 44.7384 94.7433 44.6223C94.4546 44.506 94.2724 44.313 94.2189 44.0871C94.1653 43.8612 94.2415 43.607 94.4473 43.3734C94.6528 43.1403 94.9768 42.9429 95.3738 42.8489C95.7707 42.7548 96.1489 42.7857 96.4371 42.9018C96.7259 43.0181 96.908 43.2111 96.9616 43.437Z"
											fill="#2D9FFF"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M91.5503 49.0524L93.7485 46.6714L94.1096 44.8281C92.3577 44.6137 89.9753 45.9665 88.01 46.8962C87.8091 46.9913 87.7666 47.2606 87.9306 47.4107L89.8046 49.1259C90.3075 49.5861 91.0878 49.5533 91.5503 49.0524Z"
											fill="url(#paint4_linear_278_20219)"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M93.4581 46.5666C93.2805 45.5957 93.8844 44.6112 94.1791 44.1877C95.1036 44.7914 96.1568 44.5792 96.5973 44.4502C96.7461 45.243 96.2849 46.4079 96.0357 46.8913C97.9284 51.982 94.6818 53.736 92.8219 53.9766C90.1124 50.7581 92.117 47.6956 93.4581 46.5666Z"
											fill="url(#paint5_linear_278_20219)"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M98.509 49.9221C97.6964 48.3461 97.1836 46.6034 96.1255 46.041C96.0267 45.9885 95.9917 45.8559 96.0689 45.7748C96.4359 45.3891 96.5858 45.3871 96.6239 44.9479C98.9879 44.8488 100.902 46.1334 102.53 47.4202C102.609 47.4824 102.612 47.5995 102.535 47.6636C102.008 48.1005 100.175 49.5759 98.8611 50.0643C98.7247 50.115 98.5757 50.0515 98.509 49.9221Z"
											fill="url(#paint6_linear_278_20219)"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M97.4544 49.6457C97.5085 49.8731 97.7064 50.1647 97.8858 50.4426C98.0802 50.7436 98.4824 50.9309 98.8226 50.8185L99.6576 50.5428"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M96.0952 47.01C95.4898 46.5613 94.4955 45.497 93.1976 46.803"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M86.9212 46.9564C86.9088 46.823 86.9666 46.5083 87.297 46.3169C87.6273 46.1256 88.6807 45.5694 89.1661 45.3152"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
										<path
											d="M86.1882 46.4029C86.1758 46.2695 86.2336 45.9548 86.5639 45.7635C86.8942 45.5721 86.6438 45.6901 87.1292 45.4359"
											stroke="#0500FF"
											stroke-width="0.4"
										></path>
									</g>
									<defs>
										<linearGradient
											id="paint0_linear_278_20219"
											x1="78.6704"
											y1="75.6821"
											x2="78.8786"
											y2="152.232"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0598417"
												stopColor="#FFF465"
											></stop>
											<stop
												offset="0.777316"
												stopColor="#48FF91"
											></stop>
										</linearGradient>
										<linearGradient
											id="paint1_linear_278_20219"
											x1="127.392"
											y1="96.6488"
											x2="120.017"
											y2="130.714"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0598417"
												stopColor="#FFF465"
											></stop>
											<stop
												offset="0.777316"
												stopColor="#48FF91"
											></stop>
										</linearGradient>
										<linearGradient
											id="paint2_linear_278_20219"
											x1="85.1029"
											y1="87.6892"
											x2="85.1933"
											y2="120.918"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0598417"
												stopColor="#FFF465"
											></stop>
											<stop
												offset="0.777316"
												stopColor="#48FF91"
											></stop>
										</linearGradient>
										<linearGradient
											id="paint3_linear_278_20219"
											x1="85.101"
											y1="87.6911"
											x2="85.1913"
											y2="120.92"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0598417"
												stopColor="#FFF465"
											></stop>
											<stop
												offset="0.777316"
												stopColor="#48FF91"
											></stop>
										</linearGradient>
										<linearGradient
											id="paint4_linear_278_20219"
											x1="90.6998"
											y1="45.6173"
											x2="92.2719"
											y2="49.2916"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0598417"
												stopColor="#FFF465"
											></stop>
											<stop
												offset="0.777316"
												stopColor="#48FF91"
											></stop>
										</linearGradient>
										<linearGradient
											id="paint5_linear_278_20219"
											x1="89.2504"
											y1="49.4568"
											x2="92.2068"
											y2="53.2581"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0457846"
												stopColor="#2ECCFF"
											></stop>
											<stop
												offset="1"
												stopColor="#0500FF"
											></stop>
										</linearGradient>
										<linearGradient
											id="paint6_linear_278_20219"
											x1="98.8848"
											y1="44.5271"
											x2="99.8866"
											y2="49.9078"
											gradientUnits="userSpaceOnUse"
										>
											<stop
												offset="0.0598417"
												stopColor="#FFF465"
											></stop>
											<stop
												offset="0.777316"
												stopColor="#48FF91"
											></stop>
										</linearGradient>
										<clipPath id="clip0_278_20219">
											<rect
												width="160"
												height="160"
												fill="white"
											></rect>
										</clipPath>
									</defs>
								</svg>
								<h4 className="typography-header-20 text-utility-1-default font-semibold   text-unset  ">
									No transactions found
								</h4>
							</div>
						</div>
					</div>
				</div>

				<div
					data-testid="asset-chart"
					className=" h-14 relative -mx-2 -mb-2 p-2 pb-0 flex flex-col border-line border-t"
				>
					<div className="flex justify-between">
						<div className="flex">
							<div className="flex flex-col">
								<div role="status">
									<div className="">
										<small className="caption-text text-textThird font-normal   text-unset  ">
											BNB
										</small>
									</div>
								</div>
								<div role="status">
									<div className="">
										<div className="flex items-center space-x-2 h-5">
											<p
												data-testid="asset-fiat-price"
												className="body-text text-utility-1-default font-medium   text-unset  "
											>
												$ 596.34
											</p>
											<small
												data-testid="asset-fiat-percentage-change"
												className="caption-text text-success-1-default font-normal   text-unset  "
											>
												+0.98%
											</small>
										</div>
									</div>
								</div>
							</div>
							<div className="h-15 w-[90px] mt-[-5px] mx-2">
								<canvas
									role="img"
									height="60"
									width="78"
									style={{
										display: "block",
										boxSizing: "border-box",
										height: "60px",
										width: "78px",
									}}
								></canvas>
							</div>
						</div>
						<div className="flex items-start gap-2">
							<div
								className="relative w-[90px] mt-[-5px] cursor-pointer"
								data-testid="market-sentiment-gauge"
							>
								<div>
									<svg viewBox="-1.2 -1.2 2.4 1.4">
										<path
											d="M-0.893,-0.013A0.1,0.1,0,0,1,-0.992,-0.125A1,1,0,0,1,-0.605,-0.797A0.1,0.1,0,0,1,-0.458,-0.767L-0.458,-0.767A0.1,0.1,0,0,1,-0.484,-0.637A0.8,0.8,0,0,0,-0.794,-0.1A0.1,0.1,0,0,1,-0.893,-0.013Z"
											fill="#FF2121"
										></path>
										<path
											d="M-0.435,-0.78A0.1,0.1,0,0,1,-0.388,-0.922A1,1,0,0,1,0.388,-0.922A0.1,0.1,0,0,1,0.435,-0.78L0.435,-0.78A0.1,0.1,0,0,1,0.31,-0.737A0.8,0.8,0,0,0,-0.31,-0.737A0.1,0.1,0,0,1,-0.435,-0.78Z"
											fill="#F0B90B"
										></path>
										<path
											d="M0.458,-0.767A0.1,0.1,0,0,1,0.605,-0.797A1,1,0,0,1,0.992,-0.125A0.1,0.1,0,0,1,0.893,-0.013L0.893,-0.013A0.1,0.1,0,0,1,0.794,-0.1A0.8,0.8,0,0,0,0.484,-0.637A0.1,0.1,0,0,1,0.458,-0.767Z"
											fill="#03A66D"
										></path>
										<circle
											cx="0.895"
											cy="-0.09999999999999999"
											r="0.14"
											stroke-width="0.08"
											fill="white"
											stroke="#03A66D"
										></circle>
									</svg>
								</div>
								<div className="absolute top-[20px] left-[50%] -translate-x-1/2 w-min">
									<div className="flex flex-col items-center text-[11px]/[13px]">
										<span className="text-textSecondary">
											100%
										</span>
										<span className="text-textSecondary ">
											Positive
										</span>
									</div>
								</div>
							</div>
							<div
								className="flex w-auto"
								data-tooltip-id="default-tooltip"
								data-tooltip-place="top-end"
								data-tooltip-role="tooltip"
							>
								<button
									type="button"
									className="outline-none bg-transparent text-background-1  tiny-button !p-0 w-auto  "
								>
									<span className="rotate-180 transition duration-200 ease-in-out">
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
												d="M9.99976 10.2397L6.75895 6.99885L5.28581 8.47199L9.99986 13.186L11.473 11.7129L11.4729 11.7128L14.7139 8.47183L13.2407 6.99869L9.99976 10.2397Z"
												fill="currentColor"
											></path>
										</svg>
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
