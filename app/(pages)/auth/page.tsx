"use client";

import { useState } from "react";

export default function AuthPage() {
	const [tab, setTab] = useState<
		| "default"
		| "set-password"
		| "set-password-again"
		| "verify-safety"
		| "help-improve"
	>("default");

	if (tab === "set-password-again") {
		return (
			<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
				<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 md:max-w-[438px]">
					<div className="flex items-center justify-center w-full h-full flex-1 flex-col">
						<div className="max-w-xs flex items-center flex-col">
							<svg
								fill="none"
								width="58"
								height="66"
								viewBox="0 0 58 66"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0 9.38949L28.8907 0V65.0042C8.2545 56.3369 0 39.7248 0 30.3353V9.38949Z"
									fill="#48FF91"
								/>
								<path
									d="M57.7822 9.38949L28.8915 0V65.0042C49.5277 56.3369 57.7822 39.7248 57.7822 30.3353V9.38949Z"
									fill="url(#paint0_linear_896_19677)"
								/>
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
											stopColor="#48FF91"
										/>
										<stop
											offset="0.662556"
											stopColor="#0094FF"
										/>
										<stop
											offset="0.800473"
											stopColor="#0038FF"
										/>
										<stop
											offset="0.888911"
											stopColor="#0500FF"
										/>
									</linearGradient>
								</defs>
							</svg>
							<div className="pt-4 pb-6 text-center">
								<p className="title-text text-utility-1-default font-medium text-unset">
									Secure and trusted multi-chain crypto wallet
								</p>
							</div>
							<form className="flex flex-col w-full">
								<div className="flex flex-col space-y-2">
									<div
										data-testid="password-field-input-group"
										className="text-start"
									>
										<div className="mb-3">
											<div>
												<p
													data-testid="input-label"
													className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset"
												>
													Password
												</p>
											</div>
										</div>
										<div className="input-field space-x-1 h-14 border-primary">
											<input
												data-testid="password-field"
												className="ph-no-capture w-full block flex-1 outline-none bg-transparent typography-subheader-16 font-medium text-left"
												spellCheck="false"
												type="password"
												value="misterX0418."
											/>
											<div className="flex space-x-2">
												<div className="flex items-center">
													<div
														className="flex w-full"
														data-tooltip-id="button-tooltip-4"
														data-tooltip-place="top-end"
														data-tooltip-role="tooltip"
													>
														<button
															data-testid="input-action-show-password"
															type="button"
															className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
															tabIndex={-1}
														>
															<svg
																className="text-primary-default"
																fill="none"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M2.93933 5.06077L18.9393 21.0608L21.0606 18.9395L18.6138 16.4926L23 12L17.4447 6.30998C14.7539 3.55392 10.5671 3.26407 7.56164 5.44044L5.06065 2.93945L2.93933 5.06077ZM9.68714 7.56594C10.3788 7.20443 11.1655 7 12 7C14.7614 7 17 9.23858 17 12C17 12.8345 16.7956 13.6212 16.4341 14.3129L9.68714 7.56594Z"
																	fill="currentColor"
																/>
																<path
																	d="M1 12L3.29029 9.65416L13.4882 19.8521C11.0565 20.3404 8.43922 19.6197 6.55528 17.69L1 12Z"
																	fill="currentColor"
																/>
															</svg>
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<small
												data-testid="input-subtitle"
												className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
											></small>
										</div>
									</div>
								</div>
								<div className="pt-6 pb-4 w-full flex flex-col gap-4">
									<div
										className="flex w-full"
										data-tooltip-id="button-tooltip-5"
										data-tooltip-place="top-end"
										data-tooltip-role="tooltip"
									>
										<button
											type="submit"
											className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full"
										>
											Unlock
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="flex flex-col items-center justify-end text-center w-full border-t-line border-t pt-4">
						<div className="w-10/12">
							<p className="body-text text-textSecondary font-normal text-unset">
								Can{"'"}t login? You can erase your current
								wallet and set up a new one
							</p>
						</div>
						<div
							className="flex w-full"
							data-tooltip-id="button-tooltip-6"
							data-tooltip-place="top-end"
							data-tooltip-role="tooltip"
						>
							<button
								type="button"
								className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full"
							>
								<p className="body-text text-primary font-medium text-unset">
									Reset wallet
								</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (tab === "help-improve") {
		return (
			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 justify-center pt-0 md:max-w-[438px]">
				<div className="bg-backgroundPrimary border border-line rounded p-6 mb-11">
					<div className="flex justify-center my-4">
						<svg
							fill="none"
							width="58"
							height="66"
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
					</div>
					<div className="flex flex-col items-center text-center space-y-4 mt-4">
						<h2
							data-testid="onboarding-step-title"
							className="screamer-text text-utility-1-default font-semibold   text-unset  "
						>
							Improve Trust Wallet
						</h2>
						<p className="title-text text-textSecondary font-normal   text-unset  ">
							Help improve Trust Wallet by sharing usage patterns
							with us
						</p>
						<div className="w-full mt-6 flex flex-col space-y-6">
							<div className="mx-auto">
								<svg
									fill="none"
									width="96"
									height="96"
									viewBox="0 0 96 96"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M45.4522 9.35742L62.2701 14.6974L82.9242 37.7008L57.3138 77.9589C57.3138 77.9589 40.3195 91.1142 25.2489 89.4621L19.293 75.45L45.4522 9.35742Z"
										fill="#0500FF"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M47.0391 12.9811L61.6448 67.5174L81.5904 34.6013L52.3958 12.0879L47.0391 12.9811Z"
										fill="#1B1B1C"
									></path>
									<path
										d="M76.8976 38.9995L62.2107 29.8457H40.2041L73.2294 45.4651"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M68.4274 53.7561L55.7986 45.8848H33.792L65.2604 59.2612"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M59.8123 68.423L49.3844 61.9238H28.4419L56.8945 72.4413"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M48.158 81.1971L42.9721 77.9629H25.3506L44.1006 83.9385"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M36.1377 87.3679C36.7033 79.5414 38.9183 67.0498 45.8991 49.8343L57.6319 20.8945"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M50.3125 79.1082C51.8106 72.9115 54.0927 65.5722 57.5341 57.0849L68.816 29.2539"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M42.2036 49.4608C44.9058 50.5837 44.9674 52.1826 43.9481 54.8539C44.9702 52.1826 46.1995 51.2221 48.854 52.289C46.1995 51.2221 45.8578 49.5504 47.0815 46.9238C45.995 49.6064 44.9086 50.5837 42.2064 49.4608H42.2036Z"
										fill="#48FF91"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M50.0254 69.9002C51.9771 70.6227 52.2711 71.9052 51.6887 73.8933C52.2711 71.9052 52.9012 70.9615 54.8165 71.6699C52.9012 70.9615 52.8844 69.9254 53.5368 67.9121C52.8844 69.9254 51.9799 70.6199 50.0282 69.9002H50.0254Z"
										fill="#48FF91"
										stroke="#48FF91"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M59.8073 54.853C65.3963 54.853 69.9271 50.3221 69.9271 44.7331C69.9271 39.1441 65.3963 34.6133 59.8073 34.6133C54.2183 34.6133 49.6875 39.1441 49.6875 44.7331C49.6875 50.3221 54.2183 54.853 59.8073 54.853Z"
										fill="#48FF91"
									></path>
									<path
										d="M58.4175 54.9116L65.8323 36.6152"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M54.0562 36.3945L69.8995 43.8878"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M60.7925 39.5807C63.4946 40.7036 63.4051 42.4397 62.3858 45.1139C63.4079 42.4425 64.7071 41.6249 67.3617 42.6889C64.7071 41.6221 64.3655 39.8355 65.5892 37.209C64.5027 39.8916 63.4974 40.7036 60.7925 39.5807Z"
										fill="#0500FF"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M28.4146 90.5776C26.4741 90.5552 25.3428 90.3984 25.3428 90.3984C25.3428 90.3984 26.4741 90.6 28.4146 90.5776Z"
										fill="white"
									></path>
									<path
										d="M62.3639 10.8622H47.8982L77.6752 33.1488C79.7418 34.6973 80.3214 37.5479 79.0221 39.7796L64.1308 65.3536C51.0764 87.769 35.0286 90.4936 28.4146 90.5776C36.1934 90.6644 57.0071 88.5614 70.5208 65.3536L85.7089 39.27C86.8766 37.265 86.5378 34.7225 84.8857 33.0928L62.3611 10.8594L62.3639 10.8622Z"
										fill="#F4F4F7"
									></path>
									<path
										d="M70.52 65.3536L85.7081 39.27C86.1141 38.5699 86.3354 37.8083 86.383 37.041L79.7073 37.363C79.6849 38.1891 79.4637 39.0207 79.0241 39.7796L64.1328 65.3536C51.0783 87.769 35.0305 90.4936 28.4165 90.5776C36.1954 90.6644 57.0091 88.5615 70.5228 65.3536H70.52Z"
										fill="#1B1B1C"
									></path>
									<path
										d="M85.7077 39.27C86.1137 38.5699 86.3349 37.8083 86.3825 37.041L79.7069 37.363C79.6845 38.1891 79.4633 39.0207 79.0237 39.7796L68.229 58.3168L76.0639 55.8302L85.7077 39.2672V39.27Z"
										fill="#2D9FFF"
									></path>
									<path
										d="M65.2842 63.3743L73.1191 60.8906L74.5696 58.3984L66.7347 60.885L65.2842 63.3743Z"
										fill="#2D9FFF"
									></path>
									<path
										d="M28.4146 90.5776C26.4741 90.5552 25.3428 90.3984 25.3428 90.3984C25.3428 90.3984 26.4741 90.6 28.4146 90.5776Z"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M62.3639 10.8622H47.8982L77.6752 33.1488C79.7418 34.6973 80.3214 37.5479 79.0221 39.7796L64.1308 65.3536C51.0764 87.769 35.0286 90.4936 28.4146 90.5776C36.1934 90.6644 57.0071 88.5614 70.5208 65.3536L85.7089 39.27C86.8766 37.265 86.5378 34.7225 84.8857 33.0928L62.3611 10.8594L62.3639 10.8622Z"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M28.4146 90.5776C26.4741 90.5552 25.3428 90.3984 25.3428 90.3984C25.3428 90.3984 26.4741 90.6 28.4146 90.5776Z"
										fill="white"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M64.1348 65.3547L79.0261 39.7807C80.3254 37.549 79.7458 34.6956 77.6792 33.1499L47.9021 10.8633L34.8869 42.9729C22.0145 74.7241 25.3467 90.4023 25.3467 90.4023C25.3467 90.4023 26.478 90.5591 28.4185 90.5815C35.0325 90.5003 51.0832 87.7757 64.1348 65.3575V65.3547Z"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M34.8834 42.9694L47.8986 10.8598L34.2954 5.68225C32.2681 4.9094 29.9943 5.90067 29.1767 7.91399L17.6287 36.403C4.75632 68.1542 25.3432 90.3988 25.3432 90.3988C25.3432 90.3988 22.011 74.7234 34.8834 42.9694Z"
										fill="url(#paint0_linear_51_272685)"
									></path>
									<path
										d="M79.0247 39.7807C80.324 37.549 79.7444 34.6956 77.6778 33.1499L47.9008 10.8633L47.0411 12.983L75.5525 34.2924C78.0643 36.1713 78.0307 37.0645 76.4458 39.8227L62.2125 64.5623C54.834 77.3899 42.1128 90.0103 25.0737 88.1845C25.1885 89.663 25.3454 90.4023 25.3454 90.4023C25.3454 90.4023 26.4766 90.5591 28.4171 90.5815C35.0312 90.5003 51.0818 87.7757 64.1334 65.3575L79.0247 39.7835V39.7807Z"
										fill="#F4F4F7"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M33.5269 5.42188L47.8974 10.8626H62.3631L39.9141 5.42188H33.5269Z"
										fill="#2D9FFF"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M28.4438 61.9236L14.4933 46.6738C9.10299 72.8471 25.3412 90.3986 25.3412 90.3986C25.3412 90.3986 23.3447 80.9676 28.441 61.9376V61.9264L28.4438 61.9236Z"
										fill="#2D9FFF"
									></path>
									<path
										d="M15.5747 42.3183L28.8672 60.3878L29.7576 57.4364L17.63 36.4043L15.5747 42.3183Z"
										fill="#2D9FFF"
									></path>
									<path
										d="M34.8834 42.9694L47.8986 10.8598L34.2954 5.68225C32.2681 4.9094 29.9943 5.90067 29.1767 7.91399L17.6287 36.403C4.75632 68.1542 25.3432 90.3988 25.3432 90.3988C25.3432 90.3988 22.011 74.7234 34.8834 42.9694Z"
										stroke="#0500FF"
										stroke-width="0.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<defs>
										<linearGradient
											id="paint0_linear_51_272685"
											x1="30.8568"
											y1="42.2022"
											x2="9.66782"
											y2="10.1317"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#48FF91"></stop>
											<stop
												offset="1"
												stop-color="#2D9FFF"
											></stop>
										</linearGradient>
									</defs>
								</svg>
							</div>
							<ul className="space-y-4">
								<li className="flex flex-col space-y-1 text-start !text-textSecondary title-text">
									<p className="title-text text-utility-1-default font-medium   text-unset  ">
										1. Relevant
									</p>{" "}
									We only collect specific data to improve the
									user experience.
								</li>
								<li className="flex flex-col space-y-1 text-start !text-textSecondary title-text">
									<p className="title-text text-utility-1-default font-medium   text-unset  ">
										2. Anonymous
									</p>{" "}
									Your identity and exact location will not be
									collected.
								</li>
								<li className="flex flex-col space-y-1 text-start !text-textSecondary title-text">
									<p className="title-text text-utility-1-default font-medium   text-unset  ">
										3. Optional
									</p>{" "}
									This is your choice and can be changed at
									any time via settings.
								</li>
							</ul>
							<a
								data-test="privacy-policy-link"
								href="https://trustwallet.com/privacy-policy"
								target="_blank"
								rel="noreferrer"
								className="subtitle-text text-primary"
							>
								Privacy Policy
							</a>
							<div className="flex w-full items-center justify-between mt-6 space-x-4">
								<div
									className="flex w-full"
									data-tooltip-id="button-tooltip-24"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button
										type="button"
										className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
									>
										<p className="title-text text-primary font-medium   text-unset  ">
											No thanks
										</p>
									</button>
								</div>
								<div
									className="flex w-full"
									data-tooltip-id="button-tooltip-25"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button
										type="submit"
										className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  "
									>
										Share data
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (tab === "verify-safety") {
		return (
			<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
				<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 justify-center pt-0 md:max-w-[438px]">
					<div className="bg-backgroundPrimary border border-line rounded p-6 mb-11">
						<div className="flex justify-center my-4">
							<svg
								fill="none"
								width="58"
								height="66"
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
											stopColor="#48FF91"
										></stop>
										<stop
											offset="0.662556"
											stopColor="#0094FF"
										></stop>
										<stop
											offset="0.800473"
											stopColor="#0038FF"
										></stop>
										<stop
											offset="0.888911"
											stopColor="#0500FF"
										></stop>
									</linearGradient>
								</defs>
							</svg>
						</div>
						<div className="flex flex-col items-center text-center space-y-4 mt-4">
							<h2
								data-testid="onboarding-step-title"
								className="screamer-text text-utility-1-default font-semibold text-unset"
							>
								Verify safety
							</h2>
							<p className="title-text text-textSecondary font-normal text-unset">
								Check your secret phrase is safe
							</p>
							<div className="w-full mt-6 flex flex-col space-y-6">
								<div className="m-auto">
									<svg
										width="120"
										height="120"
										viewBox="0 0 143 146"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										{/* ... (остальная часть SVG) ... */}
									</svg>
								</div>
								<form className="flex flex-col space-y-4">
									<div className="flex flex-col rounded-xl bg-background-2 py-2 px-4 text-left">
										<div className="flex items-center space-x-2">
											<div className="relative w-5 h-5">
												<input
													id="g7o9y"
													className="checkbox"
													type="checkbox"
												/>
												<div className="absolute pointer-events-none flex items-center justify-center w-5 h-5"></div>
											</div>
											<div className="flex flex-1">
												<label
													htmlFor="g7o9y"
													className="text-textPrimary subtitle-text font-normal"
												>
													Only you know this secret
													phrase.
												</label>
											</div>
										</div>
									</div>
									<div className="flex flex-col rounded-xl bg-background-2 py-2 px-4 text-left">
										<div className="flex items-center space-x-2">
											<div className="relative w-5 h-5">
												<input
													id="s4r1f"
													className="checkbox"
													type="checkbox"
												/>
												<div className="absolute pointer-events-none flex items-center justify-center w-5 h-5"></div>
											</div>
											<div className="flex flex-1">
												<label
													htmlFor="s4r1f"
													className="text-textPrimary subtitle-text font-normal"
												>
													This secret phrase was NOT
													given to you by anyone e.g.
													a Binance representative.
												</label>
											</div>
										</div>
									</div>
									<div className="flex flex-col rounded-xl bg-background-2 py-2 px-4 text-left">
										<div className="flex items-center space-x-2">
											<div className="relative w-5 h-5">
												<input
													id="e1zb6"
													className="checkbox"
													type="checkbox"
												/>
												<div className="absolute pointer-events-none flex items-center justify-center w-5 h-5"></div>
											</div>
											<div className="flex flex-1">
												<label
													htmlFor="e1zb6"
													className="text-textPrimary subtitle-text font-normal"
												>
													If someone else has seen it,
													they can and will steal your
													funds.
												</label>
											</div>
										</div>
									</div>
									<div className=" flex w-full items-center justify-between mt-6 space-x-4">
										<div
											className="h-[52px] flex w-full"
											data-tooltip-id="button-tooltip-5"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												type="button"
												className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
											>
												<p className="title-text text-primary font-medium text-unset">
													Back
												</p>
											</button>
										</div>
										<div
											className="h-[52px] flex w-full"
											data-tooltip-id="button-tooltip-6"
											data-tooltip-place="top-end"
											data-tooltip-role="tooltip"
										>
											<button
												type="submit"
												disabled
												className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full"
											>
												Next
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (tab === "set-password") {
		return (
			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 justify-center md:max-w-[438px]">
				<div className="bg-backgroundPrimary border border-line rounded p-6 mb-11">
					<div className="flex justify-center my-4">
						<svg
							fill="none"
							width="58"
							height="66"
							viewBox="0 0 58 66"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 9.38949L28.8907 0V65.0042C8.2545 56.3369 0 39.7248 0 30.3353V9.38949Z"
								fill="#48FF91"
							/>
							<path
								d="M57.7822 9.38949L28.8915 0V65.0042C49.5277 56.3369 57.7822 39.7248 57.7822 30.3353V9.38949Z"
								fill="url(#paint0_linear_896_19677)"
							/>
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
										stopColor="#48FF91"
									/>
									<stop
										offset="0.662556"
										stopColor="#0094FF"
									/>
									<stop
										offset="0.800473"
										stopColor="#0038FF"
									/>
									<stop
										offset="0.888911"
										stopColor="#0500FF"
									/>
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div className="flex flex-col items-center text-center space-y-4 mt-4">
						<h2
							data-testid="onboarding-step-title"
							className="screamer-text text-utility-1-default font-semibold text-unset"
						>
							Set Password
						</h2>
						<p className="title-text text-textSecondary font-normal text-unset">
							This password is used to protect your wallet and
							provide access to the browser extension. It cannot
							be reset and is separate from your mobile wallet.
						</p>
						<div className="w-full mt-6 flex flex-col space-y-6">
							<form className="space-y-6">
								<div className="flex flex-col space-y-2">
									<div
										data-testid="password-field-input-group"
										className="text-start"
									>
										<div className="mb-3">
											<div>
												<p
													data-testid="input-label"
													className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset"
												>
													New password
												</p>
											</div>
										</div>
										<div className="input-field space-x-1 h-14">
											<input
												data-testid="password-field"
												className="ph-no-capture w-full block flex-1 outline-none bg-transparent typography-subheader-16 font-medium text-left"
												spellCheck="false"
												type="password"
												value=""
											/>
											<div className="flex space-x-2">
												<div className="flex items-center">
													<div
														className="flex w-full"
														data-tooltip-id="button-tooltip-48"
														data-tooltip-place="top-end"
														data-tooltip-role="tooltip"
													>
														<button
															data-testid="input-action-show-password"
															type="button"
															className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
															tabIndex={-1}
														>
															<svg
																className="text-primary-default"
																fill="none"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M2.93933 5.06077L18.9393 21.0608L21.0606 18.9395L18.6138 16.4926L23 12L17.4447 6.30998C14.7539 3.55392 10.5671 3.26407 7.56164 5.44044L5.06065 2.93945L2.93933 5.06077ZM9.68714 7.56594C10.3788 7.20443 11.1655 7 12 7C14.7614 7 17 9.23858 17 12C17 12.8345 16.7956 13.6212 16.4341 14.3129L9.68714 7.56594Z"
																	fill="currentColor"
																/>
																<path
																	d="M1 12L3.29029 9.65416L13.4882 19.8521C11.0565 20.3404 8.43922 19.6197 6.55528 17.69L1 12Z"
																	fill="currentColor"
																/>
															</svg>
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<small
												data-testid="input-subtitle"
												className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
											></small>
										</div>
									</div>
									<ul className="space-y-2">
										<li className="flex items-center space-x-1">
											<div className="flex items-center justify-center w-5.5 h-5.5 rounded-full border border-textDisabled">
												<svg
													className="text-backgroundPrimary"
													fill="none"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
														fill="currentColor"
													/>
												</svg>
											</div>
											<p className="subtitle-text text-textSecondary font-normal text-unset">
												8 or more characters
											</p>
										</li>
										<li className="flex items-center space-x-1">
											<div className="flex items-center justify-center w-5.5 h-5.5 rounded-full border border-textDisabled">
												<svg
													className="text-backgroundPrimary"
													fill="none"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
														fill="currentColor"
													/>
												</svg>
											</div>
											<p className="subtitle-text text-textSecondary font-normal text-unset">
												At least one upper case
												character
											</p>
										</li>
										<li className="flex items-center space-x-1">
											<div className="flex items-center justify-center w-5.5 h-5.5 rounded-full border border-textDisabled">
												<svg
													className="text-backgroundPrimary"
													fill="none"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
														fill="currentColor"
													/>
												</svg>
											</div>
											<p className="subtitle-text text-textSecondary font-normal text-unset">
												At least one digit
											</p>
										</li>
										<li className="flex items-center space-x-1">
											<div className="flex items-center justify-center w-5.5 h-5.5 rounded-full border border-textDisabled">
												<svg
													className="text-backgroundPrimary"
													fill="none"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
														fill="currentColor"
													/>
												</svg>
											</div>
											<p className="subtitle-text text-textSecondary font-normal text-unset">
												At least one symbol
											</p>
										</li>
									</ul>
								</div>
								<div className="flex flex-col space-y-2">
									<div
										data-testid="password-field-input-group"
										className="text-start"
									>
										<div className="mb-3">
											<div>
												<p
													data-testid="input-label"
													className="typography-subheader-14 text-utility-1-opacity-1 font-medium text-unset"
												>
													Confirm new password
												</p>
											</div>
										</div>
										<div className="input-field space-x-1 h-14">
											<input
												data-testid="password-field"
												className="ph-no-capture w-full block flex-1 outline-none bg-transparent typography-subheader-16 font-medium text-left"
												spellCheck="false"
												type="password"
												value=""
											/>
											<div className="flex space-x-2">
												<div className="flex items-center">
													<div
														className="flex w-full"
														data-tooltip-id="button-tooltip-45"
														data-tooltip-place="top-end"
														data-tooltip-role="tooltip"
													>
														<button
															data-testid="input-action-show-password"
															type="button"
															className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
															tabIndex={-1}
														>
															<svg
																className="text-primary-default"
																fill="none"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M2.93933 5.06077L18.9393 21.0608L21.0606 18.9395L18.6138 16.4926L23 12L17.4447 6.30998C14.7539 3.55392 10.5671 3.26407 7.56164 5.44044L5.06065 2.93945L2.93933 5.06077ZM9.68714 7.56594C10.3788 7.20443 11.1655 7 12 7C14.7614 7 17 9.23858 17 12C17 12.8345 16.7956 13.6212 16.4341 14.3129L9.68714 7.56594Z"
																	fill="currentColor"
																/>
																<path
																	d="M1 12L3.29029 9.65416L13.4882 19.8521C11.0565 20.3404 8.43922 19.6197 6.55528 17.69L1 12Z"
																	fill="currentColor"
																/>
															</svg>
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<small
												data-testid="input-subtitle"
												className="typography-caption-12 text-utility-1-opacity-1 font-normal text-unset"
											></small>
										</div>
									</div>
								</div>
								<div className="flex justify-center">
									<div className="flex items-center space-x-2">
										<div className="relative w-5 h-5">
											<input
												data-testid="checkbox-terms-of-service"
												id="mnvix"
												className="checkbox"
												type="checkbox"
											/>
											<div className="absolute pointer-events-none flex items-center justify-center w-5 h-5"></div>
										</div>
										<div className="flex flex-1">
											<label
												htmlFor="mnvix"
												className="text-textPrimary subtitle-text font-normal"
											>
												I have read and agree to the{" "}
												<a
													href="https://trustwallet.com/terms-of-services"
													target="_blank"
													rel="noreferrer"
													className="text-primary"
												>
													Terms of Service
												</a>
												.
											</label>
										</div>
									</div>
								</div>
								<div className="flex w-full items-center justify-between mt-6 space-x-4">
									<div
										className="flex w-full"
										data-tooltip-id="button-tooltip-46"
										data-tooltip-place="top-end"
										data-tooltip-role="tooltip"
									>
										<button
											onClick={() => setTab("default")}
											type="button"
											className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full h-[52px]"
										>
											<p className="title-text text-primary font-medium text-unset">
												Back
											</p>
										</button>
									</div>
									<div
										className="flex w-full"
										data-tooltip-id="button-tooltip-47"
										data-tooltip-place="top-end"
										data-tooltip-role="tooltip"
									>
										<button
											type="submit"
											disabled
											className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full h-[52px]"
										>
											Next
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 justify-center md:max-w-[438px]">
				<div className="bg-backgroundPrimary border border-line rounded p-6 mb-11">
					<div className="flex justify-center my-4">
						<svg
							fill="none"
							width="58"
							height="66"
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
										stopColor="#48FF91"
									></stop>
									<stop
										offset="0.662556"
										stopColor="#0094FF"
									></stop>
									<stop
										offset="0.800473"
										stopColor="#0038FF"
									></stop>
									<stop
										offset="0.888911"
										stopColor="#0500FF"
									></stop>
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div className="flex flex-col items-center text-center space-y-4 mt-4">
						<h2
							data-testid="onboarding-step-title"
							className="screamer-text text-utility-1-default font-semibold text-unset"
						>
							Welcome to the Trust Wallet Extension
						</h2>
						<p className="title-text text-textSecondary font-normal  text-unset">
							The multi-chain wallet trusted by millions
						</p>
						<div className="w-full flex flex-col space-y-6">
							<div className="flex flex-col space-y-6">
								<div
									onClick={() => setTab("set-password")}
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex items-center justify-between py-4 pl-3 pr-4 gap-1">
										<div className="flex items-center text-start space-x-4">
											<div className="flex w-6 h-6">
												<svg
													className="text-iconNormal"
													fill="none"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10.75 13.25V18H13.25V13.25H18V10.75H13.25V6H10.75V10.75H6V13.25H10.75Z"
														fill="currentColor"
													></path>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="title-text text-utility-1-default font-medium   text-unset  ">
													Create a new wallet
												</p>
												<p className="title-text text-textSecondary font-normal   text-unset  ">
													Start fresh with a new
													wallet
												</p>
											</div>
										</div>
										<svg
											className="text-iconNormal"
											fill="none"
											width="24"
											height="24"
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
								<div className="border-t border-utility-1-opacity-3 my-2"></div>
								<div
									onClick={() => setTab("set-password")}
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex items-center justify-between py-4 pl-3 pr-4 gap-1">
										<div className="flex items-center text-start space-x-4">
											<div className="flex w-6 h-6">
												<svg
													className="text-iconNormal"
													fill="none"
													width="20"
													height="22"
													viewBox="0 0 20 22"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M0 3.17778L9.99992 0V22C2.85712 19.0667 0 13.4444 0 10.2667V3.17778ZM20 3.17778L10.0001 0V1.82357L9.99997 1.82354V20.2132C10 20.2132 10 20.2132 10.0001 20.2132V22C17.1429 19.0667 20 13.4444 20 10.2667V3.17778ZM10.0001 20.2132C15.9706 17.7612 18.3588 13.0617 18.3588 10.4054V4.47982L10.0001 1.82357V20.2132Z"
														fill="currentColor"
													></path>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="title-text text-utility-1-default font-medium   text-unset  ">
													Recover with mnemonic
												</p>
												<p className="title-text text-textSecondary font-normal   text-unset  ">
													Restore access with your
													secret phrase
												</p>
											</div>
										</div>
										<svg
											className="text-iconNormal"
											fill="none"
											width="24"
											height="24"
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
								<div className="border-t border-utility-1-opacity-3 my-2"></div>
								<div
									onClick={() => setTab("set-password")}
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex items-center justify-between py-4 pl-3 pr-4 gap-1">
										<div className="flex items-center text-start space-x-4">
											<div className="flex w-6 h-6">
												<svg
													className="text-iconNormal"
													fill="none"
													width="20"
													height="22"
													viewBox="0 0 20 22"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M0 3.17778L9.99992 0V22C2.85712 19.0667 0 13.4444 0 10.2667V3.17778ZM20 3.17778L10.0001 0V1.82357L9.99997 1.82354V20.2132C10 20.2132 10 20.2132 10.0001 20.2132V22C17.1429 19.0667 20 13.4444 20 10.2667V3.17778ZM10.0001 20.2132C15.9706 17.7612 18.3588 13.0617 18.3588 10.4054V4.47982L10.0001 1.82357V20.2132Z"
														fill="currentColor"
													></path>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="title-text text-utility-1-default font-medium   text-unset  ">
													Recover with private key
												</p>
												<p className="title-text text-textSecondary font-normal   text-unset  ">
													Use your private key to
													regain access
												</p>
											</div>
										</div>
										<svg
											className="text-iconNormal"
											fill="none"
											width="24"
											height="24"
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
								<div className="border-t border-utility-1-opacity-3 my-2"></div>
								<div
									onClick={() => setTab("set-password")}
									role="button"
									className="outline-0  cursor-pointer"
									tabIndex={0}
								>
									<div className="flex items-center justify-between py-4 pl-3 pr-4 gap-1">
										<div className="flex items-center text-start space-x-4">
											<div className="flex w-6 h-6">
												<svg
													className="text-iconNormal"
													fill="none"
													width="16"
													height="16"
													viewBox="0 0 16 16"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M13.0868 0.491219H6.22266V9.75402H15.4855V2.88989C15.4862 2.57467 15.4248 2.2624 15.3045 1.97102C15.1842 1.67964 15.0076 1.41489 14.7847 1.192C14.5618 0.969103 14.297 0.792448 14.0057 0.672186C13.7143 0.551923 13.402 0.490423 13.0868 0.491219Z"
														fill="currentColor"
													></path>
													<path
														d="M4.0799 0.491305H2.90018C2.58242 0.488487 2.26727 0.548997 1.97315 0.669302C1.67903 0.789607 1.41182 0.967297 1.18712 1.192C0.962414 1.4167 0.784724 1.68391 0.66442 1.97803C0.544115 2.27216 0.483605 2.5873 0.486422 2.90506V4.08479H4.0799V0.491305Z"
														fill="currentColor"
													></path>
													<path
														d="M4.08035 6.20898H0.501953V9.78738H4.08035V6.20898Z"
														fill="currentColor"
													></path>
													<path
														d="M11.9395 15.4719H13.1222C13.44 15.4747 13.7551 15.4142 14.0492 15.2939C14.3433 15.1736 14.6106 14.9959 14.8353 14.7712C15.06 14.5465 15.2377 14.2793 15.358 13.9851C15.4783 13.691 15.5388 13.3759 15.536 13.0581V11.9297H11.9395V15.4719Z"
														fill="currentColor"
													></path>
													<path
														d="M9.80105 11.9297H6.22266V15.5081H9.80105V11.9297Z"
														fill="currentColor"
													></path>
													<path
														d="M0.502047 11.9297V13.1124C0.49923 13.4302 0.559739 13.7453 0.680044 14.0395C0.800349 14.3336 0.978039 14.6008 1.20274 14.8255C1.42744 15.0502 1.69465 15.2279 1.98878 15.3482C2.2829 15.4685 2.59804 15.529 2.91581 15.5262H4.09553V11.9297H0.502047Z"
														fill="currentColor"
													></path>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="title-text text-utility-1-default font-medium   text-unset  ">
													Ledger
												</p>
												<p className="title-text text-textSecondary font-normal   text-unset  ">
													Connect your Ledger wallet
												</p>
											</div>
										</div>
										<svg
											className="text-iconNormal"
											fill="none"
											width="24"
											height="24"
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
				</div>
			</div>
		</div>
	);
}
