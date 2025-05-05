const stakingOptions = [
	{
		symbol: "ETH",
		name: "Ethereum",
		logo: "https://assets-cdn.trustwallet.com/blockchains/ethereum/info/logo.png",
		apr: "3.06",
	},
	{
		symbol: "BNB",
		name: "BNB Smart Chain",
		logo: "https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png",
		apr: "2.24",
	},
	{
		symbol: "SOL",
		name: "Solana",
		logo: "https://assets-cdn.trustwallet.com/blockchains/solana/info/logo.png",
		apr: "4.55",
	},
	{
		symbol: "TRX",
		name: "TRON",
		logo: "https://assets-cdn.trustwallet.com/blockchains/tron/info/logo.png",
		apr: "5.06",
	},
	{
		symbol: "DOT",
		name: "Polkadot",
		logo: "https://assets-cdn.trustwallet.com/blockchains/polkadot/info/logo.png",
		apr: "14.59",
	},
	{
		symbol: "ATOM",
		name: "Cosmos",
		logo: "https://assets-cdn.trustwallet.com/blockchains/cosmos/info/logo.png",
		apr: "14.55",
	},
	{
		symbol: "INJ",
		name: "NativeInjective",
		logo: "https://assets-cdn.trustwallet.com/blockchains/nativeinjective/info/logo.png",
		apr: "14.60",
	},
	{
		symbol: "NEAR",
		name: "NEAR Protocol",
		logo: "https://assets-cdn.trustwallet.com/blockchains/near/info/logo.png",
		apr: "7.52",
	},
	{
		symbol: "SUI",
		name: "Sui",
		logo: "https://assets-cdn.trustwallet.com/blockchains/sui/info/logo.png",
		apr: "2.44",
	},
	{
		symbol: "OSMO",
		name: "Osmosis",
		logo: "https://assets-cdn.trustwallet.com/blockchains/osmosis/info/logo.png",
		apr: "9.88",
	},
	{
		symbol: "LUNC",
		name: "Terra Classic",
		logo: "https://assets-cdn.trustwallet.com/blockchains/terra/info/logo.png",
		apr: "15.00",
	},
	{
		symbol: "ZETA",
		name: "Native ZetaChain",
		logo: "https://assets-cdn.trustwallet.com/blockchains/zetachain/info/logo.png",
		apr: "5.54",
	},
	{
		symbol: "ADA",
		name: "Cardano",
		logo: "https://assets-cdn.trustwallet.com/blockchains/cardano/info/logo.png",
		apr: "4.69",
	},
	{
		symbol: "EVMOS",
		name: "Native Evmos",
		logo: "https://assets-cdn.trustwallet.com/blockchains/nativeevmos/info/logo.png",
		apr: "1.24",
	},
	{
		symbol: "STARS",
		name: "Stargaze",
		logo: "https://assets-cdn.trustwallet.com/blockchains/stargaze/info/logo.png",
		apr: "23.99",
	},
	{
		symbol: "CRO",
		name: "Cronos",
		logo: "https://assets-cdn.trustwallet.com/blockchains/cryptoorg/info/logo.png",
		apr: "7.15",
	},
	{
		symbol: "KAVA",
		name: "Kava",
		logo: "https://assets-cdn.trustwallet.com/blockchains/kava/info/logo.png",
		apr: "7.82",
	},
	{
		symbol: "KSM",
		name: "Kusama",
		logo: "https://assets-cdn.trustwallet.com/blockchains/kusama/info/logo.png",
		apr: "15.20",
	},
	{
		symbol: "STRD",
		name: "Stride",
		logo: "https://assets-cdn.trustwallet.com/blockchains/stride/info/logo.png",
		apr: "1.52",
	},
	{
		symbol: "XTZ",
		name: "Tezos",
		logo: "https://assets-cdn.trustwallet.com/blockchains/tezos/info/logo.png",
		apr: "3.01",
	},
	{
		symbol: "JUNO",
		name: "Juno",
		logo: "https://assets-cdn.trustwallet.com/blockchains/juno/info/logo.png",
		apr: "22.19",
	},
	{
		symbol: "AKT",
		name: "Akash Network",
		logo: "https://assets-cdn.trustwallet.com/blockchains/akash/info/logo.png",
		apr: "8.74",
	},
	{
		symbol: "BLD",
		name: "Agoric",
		logo: "https://assets-cdn.trustwallet.com/blockchains/agoric/info/logo.png",
		apr: "10.36",
	},
	{
		symbol: "AXL",
		name: "Axelar",
		logo: "https://assets-cdn.trustwallet.com/blockchains/axelar/info/logo.png",
		apr: "6.49",
	},
	{
		symbol: "SEI",
		name: "Sei",
		logo: "https://assets-cdn.trustwallet.com/blockchains/sei/info/logo.png",
		apr: "3.27",
	},
];

export default function WalletEarnPage() {
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
					<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 tw-scrollbar">
						<div className="flex flex-col space-y-5">
							<ul className="space-y-5">
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
												{/* SVG paths remain the same */}
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
							</ul>
							<ul className="space-y-5 pb-5">
								{stakingOptions.map((option, index) => (
									<li key={index}>
										<div
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
																			option.symbol
																		}
																		className="w-full h-full rounded-full border-1"
																		width="100%"
																		height="100%"
																		src={
																			option.logo
																		}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="flex flex-col">
														<p className="title-text text-utility-1-default font-medium text-unset">
															{option.symbol}
														</p>
														<div className="flex items-center space-x-2">
															<p className="subtitle-text text-utility-1-default font-normal text-unset">
																{option.name}
															</p>
														</div>
													</div>
												</div>
												<div>
													<p className="subtitle-text text-textSecondary font-normal text-unset">
														APR +
														<span className="body-text text-primary font-medium">
															{option.apr}
														</span>
														%
													</p>
												</div>
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
