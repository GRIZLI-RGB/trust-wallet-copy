export default function WalletPage() {
	const assets = [
		{
			id: 1,
			symbol: "TRX",
			name: "Tron",
			logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/info/logo.png",
			price: "$ 0.24",
			change: "-0.07%",
			changeType: "error",
			balance: "5.766",
		},
		{
			id: 2,
			symbol: "BNB",
			name: "BNB Smart Chain",
			logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png",
			price: "$ 592.46",
			change: "-0.34%",
			changeType: "error",
			balance: "0",
		},
		{
			id: 3,
			symbol: "BTC",
			name: "Bitcoin",
			logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
			price: "$ 94,510.43",
			change: "-1.18%",
			changeType: "error",
			balance: "0",
		},
		{
			id: 4,
			symbol: "ETH",
			name: "Ethereum",
			logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
			price: "$ 1,826.62",
			change: "-0.22%",
			changeType: "error",
			balance: "0",
		},
		{
			id: 5,
			symbol: "POL",
			name: "Polygon",
			logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
			price: "$ 0.23",
			change: "+2.18%",
			changeType: "success",
			balance: "0",
		},
		{
			id: 6,
			symbol: "TWT",
			name: "Trust Wallet",
			logo: "https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x4B0F1812e5Df2A09796481Ff14017e6005508003/logo.png",
			networkLogo:
				"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png",
			networkName: "BNB Smart Chain",
			price: "$ 0.78",
			change: "+0.33%",
			changeType: "success",
			balance: "0",
		},
		{
			id: 7,
			symbol: "USDT",
			name: "Tether",
			logo: "https://assets-cdn.trustwallet.com/blockchains/tron/assets/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/logo.png",
			networkLogo:
				"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/info/logo.png",
			networkName: "Tron",
			price: "$ 1.00",
			change: "<+1.00%",
			changeType: "error",
			balance: "0",
		},
	];

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] px-4 pt-4">
			<div className="flex flex-col space-y-2">
				<div className="relative flex justify-between items-center mb-2">
					<div data-headlessui-state="">
						<button
							data-testid="wallet-select-button"
							className="outline-none"
							type="button"
							aria-expanded="false"
							data-headlessui-state=""
							id="headlessui-popover-button-«r2»"
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
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M5.6666 2.66675C4.00975 2.66675 2.6666 4.00989 2.6666 5.66675L2.66656 8.65552H4.22578V10.2148H2.66654L2.6665 11.7741H4.22575L4.22578 10.2148L5.78502 10.2148V11.7741L4.22575 11.7741L4.22578 13.3334L13.3333 13.3334V2.66675H5.6666ZM11.3333 4.66675H5.6666C5.11431 4.66675 4.6666 5.11446 4.6666 5.66675C4.6666 6.21903 5.11431 6.66675 5.6666 6.66675H11.3333V4.66675ZM11.3333 8.66675H8.6666V11.3334H11.3333V8.66675Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
								<div className="pl-1 max-w-[100px]">
									<p
										data-testid="selected-wallet-name"
										className="typography-subheader-14 text-utility-1-default font-medium truncate  text-unset  "
									>
										Mnemonic 1
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
					</div>
					<div className="flex items-center space-x-2">
						<div data-headlessui-state="">
							<button
								className="outline-none flex pr-[2px]"
								type="button"
								aria-expanded="false"
								data-headlessui-state=""
								id="headlessui-popover-button-«r6»"
							>
								<div
									data-tooltip-id="selected-network-button-7"
									data-tooltip-content="We will show you your connected dApps here"
								>
									<div className="ml-4 rounded-full p-1.5 border border-utility-1-opacity-3 border-dashed">
										<div>
											<div className="rounded-full overflow-hidden border-2 border-backgroundPrimary ">
												<div className="w-2.5 h-2.5 bg-utility-1-opacity-3"></div>
											</div>
										</div>
									</div>
								</div>
							</button>
						</div>
						<div data-headlessui-state="">
							<button
								data-testid="network-select-button"
								className="outline-none flex"
								type="button"
								aria-expanded="false"
								data-headlessui-state=""
								id="headlessui-popover-button-«ra»"
							>
								<div
									className="rounded-3 p-1.5 bg-utility-1-opacity-5"
									data-tooltip-id="filtering-network-button-8"
									data-tooltip-content="Filter networks"
								>
									<div className="">
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
								</div>
							</button>
						</div>
						<div>
							<div
								className="flex w-full"
								data-tooltip-id="button-tooltip-9"
								data-tooltip-content="Your addresses"
								data-tooltip-place="top-end"
								data-tooltip-role="tooltip"
							>
								<button
									data-testid="wallet-header-addresses-button"
									type="button"
									className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
								>
									<div className="rounded-3 p-1.5 bg-utility-1-opacity-5">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
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
						<div>
							<div
								className="flex w-full"
								data-tooltip-id="button-tooltip-10"
								data-tooltip-content="Search"
								data-tooltip-place="top-end"
								data-tooltip-role="tooltip"
							>
								<button
									data-testid="wallet-header-manage-crypto-button"
									type="button"
									className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
								>
									<div className="rounded-3 p-1.5 bg-utility-1-opacity-5">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M9.16667 5C11.4679 5 13.3333 6.86548 13.3333 9.16667C13.3333 11.4679 11.4679 13.3333 9.16667 13.3333C6.86548 13.3333 5 11.4679 5 9.16667C5 6.86548 6.86548 5 9.16667 5ZM9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667C15.8333 10.3256 15.5376 11.4154 15.0175 12.3649L17.5763 14.9238L16.2505 16.2496L14.9248 17.5753L12.3663 15.0167C11.4166 15.5373 10.3262 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
								</button>
							</div>
						</div>
						<div className="relative" data-headlessui-state="">
							<button
								data-testid="popover-show-action"
								className="outline-none flex"
								type="button"
								aria-expanded="false"
								data-headlessui-state=""
								id="headlessui-popover-button-«re»"
							>
								<div className="rounded-3 p-1.5 bg-utility-1-opacity-5">
									<svg
										className="text-utility-1-opacity-1"
										fill="none"
										width="20"
										height="20"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8.33203 8.33325H11.6654V11.6666H8.33203V8.33325Z"
											fill="currentColor"
										></path>
										<path
											d="M14.168 8.33325H17.5013V11.6666H14.168V8.33325Z"
											fill="currentColor"
										></path>
										<path
											d="M2.5 8.33325H5.83333V11.6666H2.5V8.33325Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col space-y-4 pb-3">
				<div className="flex items-center space-x-2">
					<div className="">
						<h2 className="typography-header-32 text-utility-1 font-semibold transition-all ease-in-out duration-300">
							$11.42
						</h2>
					</div>
					<div>
						<div
							data-tooltip-id="refresh-balance-tooltip-11"
							data-tooltip-content="Refresh"
						>
							<div
								className="flex "
								data-tooltip-id="button-tooltip-12"
								data-tooltip-place="top-end"
								data-tooltip-role="tooltip"
							>
								<button
									data-testid="refresh-wallet-button"
									type="button"
									className="outline-none bg-transparent text-background-1 p-1.5 icon-circle-button !p-0   "
								>
									<svg
										className="text-utility-1-opacity-2  -scale-100"
										fill="none"
										width="20"
										height="20"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M16.6631 10.1751C16.6646 10.1169 16.6654 10.0585 16.6654 9.99992C16.6654 9.94134 16.6646 9.88294 16.6631 9.82472V10.1751ZM12.944 12.9475L10.7705 10.774H16.6631V16.6666L14.7116 14.7151C13.5053 15.9209 11.8391 16.6666 9.9987 16.6666C6.89226 16.6666 4.28207 14.5419 3.54203 11.6665H6.1791C6.82204 13.1381 8.29047 14.1666 9.9991 14.1666C11.149 14.1666 12.1901 13.7008 12.944 12.9475ZM16.4553 8.33325C15.7153 5.45787 13.1051 3.33325 9.9987 3.33325C8.15802 3.33325 6.49156 4.07923 5.28518 5.28535L3.33308 3.33325V9.22581H9.22564L7.05315 7.05332C7.80714 6.29949 8.84867 5.83325 9.9991 5.83325C11.7077 5.83325 13.1761 6.86166 13.8191 8.33325H16.4553ZM3.33203 9.99992C3.33203 9.95686 3.33244 9.91391 3.33325 9.87105V10.1288C3.33244 10.0859 3.33203 10.043 3.33203 9.99992Z"
											fill="currentColor"
										></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div
						data-testid="dashboard-wallet-board"
						className="flex items-center justify-between"
					>
						<div className="flex flex-col space-y-2 items-center">
							<div
								data-tooltip-id="circle-action-tooltip-34"
								data-tooltip-place="top"
								data-tooltip-role="tooltip"
							>
								<div
									className="flex "
									data-tooltip-id="button-tooltip-35"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button
										data-testid="wallet-board-send-button"
										type="button"
										className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
									>
										<svg
											className="text-utility-1-default"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
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
								data-tooltip-id="circle-action-tooltip-36"
								data-tooltip-place="top"
								data-tooltip-role="tooltip"
							>
								<div
									className="flex "
									data-tooltip-id="button-tooltip-37"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button
										data-testid="wallet-board-receive-button"
										type="button"
										className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
									>
										<svg
											className="text-utility-1-default"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
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
								data-tooltip-id="circle-action-tooltip-38"
								data-tooltip-place="top"
								data-tooltip-role="tooltip"
							>
								<div
									className="flex "
									data-tooltip-id="button-tooltip-39"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button
										data-testid="wallet-board-swap-button"
										type="button"
										className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
									>
										<svg
											className="text-utility-1-default"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
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
								data-tooltip-id="circle-action-tooltip-40"
								data-tooltip-place="top"
								data-tooltip-role="tooltip"
							>
								<div
									className="flex "
									data-tooltip-id="button-tooltip-41"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button
										data-testid="wallet-board-buy-sell-button"
										type="button"
										className="outline-none bg-utility-1-opacity-6 text-utility-1-default hover:bg-utility-1-opacity-5 active:bg-utility-1-opacity-4 p-2.5 icon-circle-button    "
									>
										<svg
											className="text-utility-1-default"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M21 5H3V8H21V5ZM21 10.5H3V19H21V10.5ZM6 13H11V15.5H6V13ZM15.5 13H13V15.5H15.5V13Z"
												fill="currentColor"
											></path>
										</svg>
									</button>
								</div>
							</div>
							<div>
								<p className="body-text text-utility-1-default font-medium   text-unset  ">
									Buy &amp; Sell
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="grid grid-cols-2 gap-6 h-10 px-4 -mx-4 justify-center border-b border-b-utility-1-opacity-5"
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
				<button
					data-testid="tab-1"
					className="outline-none flex flex-col items-center justify-center"
					id="headlessui-tabs-tab-«ri»"
					role="tab"
					type="button"
					aria-selected="false"
					tabIndex={-1}
					data-headlessui-state=""
					aria-controls="headlessui-tabs-panel-«rm»"
				>
					<div className="flex items-center h-full">
						<p className="typography-subheader-16 text-utility-1-opacity-2 font-medium   text-unset  ">
							NFTs
						</p>
					</div>
					<div
						data-selected="false"
						className="w-full h-1 rounded-full data-[selected='true']:bg-primary"
					></div>
				</button>
			</div>

			<div className="flex flex-1 pt-4">
				<div
					className="flex w-full outline-none"
					role="tabpanel"
					tabIndex={0}
				>
					<div className="relative flex flex-1 w-full">
						<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
							{assets.map((asset) => (
								<div
									key={asset.id}
									data-testid="asset-row"
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
																className="w-full h-full rounded-full border-1"
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
																		className="w-full h-full rounded-full border-1"
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
													className="typography-body-16 text-utility-1-default font-normal"
												>
													{asset.balance}
												</p>
											</div>
											<div>
												<div
													className="text-textSecondary typography-body-14"
													data-testid="asset-fiat-balance"
												></div>
											</div>
										</div>
									</div>
								</div>
							))}

							<div className="pb-5">
								<div
									className="flex w-full"
									data-tooltip-id="button-tooltip-21"
									data-tooltip-place="top-end"
								>
									<button
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
		</div>
	);
}
