"use client";

import { authLogout } from "@/app/utils/api";
import { _globalLoading_, _theme_ } from "@/app/utils/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function WalletSettingsPage() {
	const router = useRouter();

	const setGlobalLoading = useSetAtom(_globalLoading_);
	const theme = useAtomValue(_theme_);

	const handleLogout = () => {
		setGlobalLoading(true);

		authLogout()
			.then(() => {
				localStorage.removeItem("token");
				window.location.href = "/auth";
			})
			.catch(() => {
				setGlobalLoading(false);
				alert("Unknown error");
			});
	};

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] px-4 pt-4">
			<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
				<div className="flex w-8 justify-start"></div>
				<div className="flex-grow text-center overflow-hidden mx-4">
					<h5 className="typography-header-18 text-utility-1-default font-semibold truncate  text-unset  ">
						Settings
					</h5>
				</div>
				<div className="flex w-8 justify-end"></div>
			</div>

			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
				<div className="relative flex flex-1 w-full">
					<div className="absolute flex flex-1 flex-col w-full h-full top-0 left-0 overflow-y-auto scrollbar-hidden">
						{/* <div className="bg-background-2 rounded-4 [&amp; > *]:h-[52px] ">
							<div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div>
										<svg
											fill="none"
											width="36"
											height="36"
											viewBox="0 0 45 21"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												x="0.5"
												y="3.5"
												width="17"
												height="17"
												rx="8.5"
												fill="#0500FF"
											></rect>
											<mask
												id="path-2-inside-1_23913_25810"
												fill="white"
											>
												<path d="M9.12426 7.6317C9.12426 7.63381 9.1229 7.63568 9.12089 7.63633L5.94212 8.66499C5.52952 8.79851 5.25 9.18275 5.25 9.61641V11.7084C5.25 12.9668 6.35648 15.1893 9.12047 16.3601C9.12274 16.361 9.12426 16.3633 9.12426 16.3658C9.12426 16.3702 9.12873 16.3731 9.13278 16.3714C9.13406 16.3709 9.13534 16.3704 9.13662 16.3698C9.13884 16.3689 9.14133 16.3689 9.14354 16.3698C9.14482 16.3704 9.14611 16.3709 9.14739 16.3714C9.15144 16.3731 9.15591 16.3702 9.15591 16.3658C9.15591 16.3633 9.15743 16.361 9.1597 16.3601C11.9237 15.1893 13.0302 12.9668 13.0302 11.7084V9.61641C13.0302 9.18275 12.7506 8.79851 12.3381 8.66499L9.15928 7.63633C9.15727 7.63568 9.15591 7.63381 9.15591 7.6317C9.15591 7.62839 9.15268 7.62604 9.14953 7.62706L9.1431 7.62914C9.14114 7.62978 9.13903 7.62978 9.13707 7.62914L9.13063 7.62706C9.12749 7.62604 9.12426 7.62839 9.12426 7.6317Z"></path>
											</mask>
											<path
												d="M9.13063 7.62706L9.50009 6.48535L9.13063 7.62706ZM9.15928 7.63633L9.52874 6.49462L9.15928 7.63633ZM9.1597 16.3601L9.62776 17.465L9.1597 16.3601ZM9.14739 16.3714L9.61158 15.2648L9.14739 16.3714ZM9.13278 16.3714L8.66857 15.2649L9.13278 16.3714ZM9.12047 16.3601L8.65241 17.465L9.12047 16.3601ZM9.1431 7.62914L9.51256 8.77085L9.1431 7.62914ZM9.13707 7.62914L8.76761 8.77085L9.13707 7.62914ZM9.12089 7.63633L8.75143 6.49462L9.12089 7.63633ZM9.13662 16.3698L9.60137 17.4762L9.13662 16.3698ZM9.14354 16.3698L9.60827 15.2635L9.14354 16.3698ZM9.14953 7.62706L8.78007 6.48535L9.14953 7.62706ZM6.31158 9.8067L9.49035 8.77804L8.75143 6.49462L5.57266 7.52328L6.31158 9.8067ZM6.45 11.7084V9.61641H4.05V11.7084H6.45ZM9.58852 15.2551C7.19243 14.2401 6.45 12.4076 6.45 11.7084H4.05C4.05 13.526 5.52053 16.1384 8.65241 17.465L9.58852 15.2551ZM9.59699 17.478C9.59845 17.4774 9.59991 17.4768 9.60137 17.4762L8.67188 15.2635C8.67078 15.2639 8.66967 15.2644 8.66857 15.2649L9.59699 17.478ZM9.61158 15.2648C9.61048 15.2644 9.60937 15.2639 9.60827 15.2635L8.67881 17.4762C8.68027 17.4768 8.68174 17.4774 8.6832 17.478L9.61158 15.2648ZM9.62776 17.465C12.7596 16.1384 14.2302 13.526 14.2302 11.7084H11.8302C11.8302 12.4076 11.0877 14.2401 8.69164 15.2551L9.62776 17.465ZM14.2302 11.7084V9.61641H11.8302V11.7084H14.2302ZM12.7075 7.52328L9.52874 6.49462L8.78982 8.77804L11.9686 9.8067L12.7075 7.52328ZM9.51256 8.77085L9.51899 8.76877L8.78007 6.48535L8.77364 6.48744L9.51256 8.77085ZM9.50653 6.48744L9.50009 6.48535L8.76117 8.76877L8.76761 8.77085L9.50653 6.48744ZM9.50009 6.48535C8.72188 6.23352 7.92426 6.81375 7.92426 7.6317H10.3243C10.3243 8.44303 9.5331 9.01857 8.76117 8.76877L9.50009 6.48535ZM9.52874 6.49462C10.0219 6.65421 10.3559 7.11346 10.3559 7.6317H7.9559C7.9559 8.15416 8.29264 8.61715 8.78982 8.77804L9.52874 6.49462ZM14.2302 9.61641C14.2302 8.66235 13.6152 7.81702 12.7075 7.52328L11.9686 9.8067C11.8861 9.78 11.8302 9.70315 11.8302 9.61641H14.2302ZM10.3559 16.3658C10.3559 16.8558 10.0593 17.2822 9.62776 17.465L8.69164 15.2551C8.25558 15.4398 7.9559 15.8707 7.9559 16.3658H10.3559ZM8.6832 17.478C9.47895 17.8118 10.3559 17.2267 10.3559 16.3658H7.9559C7.9559 15.5136 8.82393 14.9344 9.61158 15.2648L8.6832 17.478ZM7.92426 16.3658C7.92426 17.2267 8.80123 17.8118 9.59699 17.478L8.66857 15.2649C9.45623 14.9344 10.3243 15.5136 10.3243 16.3658H7.92426ZM8.65241 17.465C8.2209 17.2822 7.92426 16.8558 7.92426 16.3658H10.3243C10.3243 15.8707 10.0246 15.4398 9.58852 15.2551L8.65241 17.465ZM8.77364 6.48744C9.01185 6.41035 9.26831 6.41035 9.50653 6.48744L8.76761 8.77085C9.00974 8.84921 9.27042 8.84921 9.51256 8.77085L8.77364 6.48744ZM9.49035 8.77804C9.98752 8.61715 10.3243 8.15416 10.3243 7.6317H7.92426C7.92426 7.11346 8.25828 6.65421 8.75143 6.49462L9.49035 8.77804ZM9.60137 17.4762C9.30633 17.6001 8.97384 17.6001 8.67881 17.4762L9.60827 15.2635C9.30882 15.1377 8.97134 15.1377 8.67188 15.2635L9.60137 17.4762ZM10.3559 7.6317C10.3559 6.81375 9.55829 6.23352 8.78007 6.48535L9.51899 8.76877C8.74707 9.01857 7.9559 8.44303 7.9559 7.6317H10.3559ZM5.57266 7.52328C4.66494 7.81702 4.05 8.66235 4.05 9.61641H6.45C6.45 9.70315 6.3941 9.78 6.31158 9.8067L5.57266 7.52328Z"
												fill="white"
												mask="url(#path-2-inside-1_23913_25810)"
											></path>
											<rect
												x="0.5"
												y="3.5"
												width="17"
												height="17"
												rx="8.5"
												stroke="#FAFAFA"
											></rect>
											<rect
												x="12.5"
												y="3.5"
												width="17"
												height="17"
												rx="8.5"
												fill="url(#paint0_linear_23913_25810)"
											></rect>
											<path
												d="M23.3 8L22.5 8.8L23.3 9.6L24.1 8.8L23.3 8Z"
												fill="white"
											></path>
											<path
												d="M18.1 14L17.5 14.6L18.1 15.2L18.7 14.6L18.1 14Z"
												fill="white"
											></path>
											<path
												d="M23.5 14L22.5 15L23.5 16L24.5 15L23.5 14Z"
												fill="white"
											></path>
											<path
												d="M20.5 9L17.5 12L20.5 15L23.5 12L20.5 9ZM19.5024 12L20.5 11.0024L21.4976 12L20.5 12.9976L19.5024 12Z"
												fill="white"
											></path>
											<rect
												x="12.5"
												y="3.5"
												width="17"
												height="17"
												rx="8.5"
												stroke="#FAFAFA"
											></rect>
											<rect
												x="24.5"
												y="3.5"
												width="17"
												height="17"
												rx="8.5"
												fill="#5E6673"
											></rect>
											<path
												d="M33.625 8.25H32.375V11.375H29.25V12.625H32.375V15.75H33.625V12.625H36.75V11.375L33.625 11.375V8.25Z"
												fill="white"
											></path>
											<rect
												x="24.5"
												y="3.5"
												width="17"
												height="17"
												rx="8.5"
												stroke="#FAFAFA"
											></rect>
											<circle
												cx="41.9167"
												cy="2.91667"
												r="2.91667"
												fill="#E33B54"
											></circle>
											<defs>
												<linearGradient
													id="paint0_linear_23913_25810"
													x1="21"
													y1="4"
													x2="21"
													y2="20"
													gradientUnits="userSpaceOnUse"
												>
													<stop
														offset="0.09375"
														stop-color="#2ECCFF"
													></stop>
													<stop
														offset="1"
														stop-color="#0500FF"
													></stop>
												</linearGradient>
											</defs>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Manage Wallets
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  ">
											View and edit all wallets
										</p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
						</div>
						<div className=" mt-5"></div>
						<div className="border-t border-utility-1-opacity-3 my-2"></div>
						<div className=" mt-5"></div> */}
						<div className="bg-background-2 rounded-4 [&amp; > *]:h-[52px] ">
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
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
												d="M11 4H4V11H11V9H13V9.40723L9.40723 13H4V20H11V18H13V20H20V13H13V16H11V14.2357L14.2357 11H20V4H13V7H11V4ZM8.5 6.5H6.5V8.5H8.5V6.5ZM8.5 15.5H6.5V17.5H8.5V15.5ZM15.5 6.5H17.5V8.5H15.5V6.5ZM17.5 15.5H15.5V17.5H17.5V15.5Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Network
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  ">
											Ethereum
										</p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-iconNormal ml-0.5"
											fill="none"
											width="24"
											height="24"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g id="ic/sub-account-f">
												<path
													id="Union"
													fillRule="evenodd"
													clipRule="evenodd"
													d="M10 7.08329C10 8.69412 8.69416 9.99996 7.08333 9.99996C5.4725 9.99996 4.16667 8.69412 4.16667 7.08329C4.16667 5.47246 5.4725 4.16663 7.08333 4.16663C8.69416 4.16663 10 5.47246 10 7.08329ZM2.5 14.6666C2.5 13.0098 3.84315 11.6666 5.5 11.6666H8.66667C10.3235 11.6666 11.6667 13.0098 11.6667 14.6666V16.6666H2.5V14.6666ZM17.5 4.16663H13.3333V6.66663H17.5V4.16663ZM17.5 8.33492H13.3333V10.8349H17.5V8.33492ZM13.3333 12.5032H17.5V15.0032H13.3333V12.5032Z"
													fill="currentColor"
												></path>
											</g>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Address Book
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "></p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
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
												d="M9 4H15V6H13.5V6.99985H20V11.4999H22V15.4999H20V20H4V15.4999H2V11.4999H4V6.99985H10.5V6H9V4ZM8.5 13.1315C9.32843 13.1315 10 12.46 10 11.6315C10 10.8031 9.32843 10.1315 8.5 10.1315C7.67157 10.1315 7 10.8031 7 11.6315C7 12.46 7.67157 13.1315 8.5 13.1315ZM15.5 13.1315C16.3284 13.1315 17 12.46 17 11.6315C17 10.8031 16.3284 10.1315 15.5 10.1315C14.6716 10.1315 14 10.8031 14 11.6315C14 12.46 14.6716 13.1315 15.5 13.1315ZM12 17.6324C13.3807 17.6324 14.5 16.5131 14.5 15.1324H9.5C9.5 16.5131 10.6193 17.6324 12 17.6324Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Developer settings
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "></p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.37918 8.50049L4.43987 10.4398C1.92109 12.9586 1.92108 17.0423 4.43987 19.5611C6.95865 22.0799 11.0424 22.0799 13.5612 19.5611L15.5005 17.6218L13.3792 15.5005L11.4399 17.4398C10.0927 18.787 7.9084 18.787 6.56119 17.4398C5.21398 16.0926 5.21398 13.9083 6.56119 12.5611L8.5005 10.6218L6.37918 8.50049Z"
												fill="currentColor"
											></path>
											<path
												d="M12.5612 6.56119C13.9084 5.21398 16.0926 5.21398 17.4398 6.56119C18.7871 7.9084 18.7871 10.0927 17.4398 11.4399L15.5005 13.3792L17.6218 15.5005L19.5612 13.5612C22.0799 11.0424 22.0799 6.95865 19.5612 4.43987C17.0424 1.92108 12.9586 1.92109 10.4398 4.43987L8.50052 6.37919L10.6218 8.50051L12.5612 6.56119Z"
												fill="currentColor"
											></path>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M9.81117 16.3112L7.68985 14.1898L14.1899 7.68984L16.3112 9.81116L9.81117 16.3112Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Connected dApps
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  ">
											0
										</p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												x="3"
												y="4"
												width="18"
												height="3"
												fill="currentColor"
											></rect>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M15 2H9V4H15V2ZM19 7H5V21H19V7ZM10.5 9H8V18H10.5V9ZM13.5 9H16V18H13.5V9Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Blocked dApps
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "></p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
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
												d="M15.2307 20.4027C18.2316 19.2481 20.4577 16.5321 20.9137 13.25H16.9718C16.8248 16.1102 16.1791 18.638 15.2307 20.4027ZM14.473 13.25C14.2952 17.3518 13.2556 20.5 11.9998 20.5C10.744 20.5 9.70447 17.3518 9.52667 13.25H14.473ZM14.473 10.75H9.52667C9.70447 6.64821 10.744 3.5 11.9998 3.5C13.2556 3.5 14.2952 6.64821 14.473 10.75ZM16.9718 10.75H20.9137C20.4577 7.46786 18.2316 4.75191 15.2307 3.59731C16.1791 5.36198 16.8248 7.88979 16.9718 10.75ZM7.03566 10.75C7.18282 7.88774 7.82928 5.35836 8.77882 3.59353C5.77291 4.74598 3.54249 7.46427 3.08594 10.75H7.03566ZM7.03566 13.25H3.08594C3.54249 16.5357 5.77291 19.254 8.77882 20.4065C7.82928 18.6416 7.18282 16.1123 7.03566 13.25Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Language
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  ">
											English
										</p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
							<div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.3363 8.57657C10.5672 8.72738 10.2354 9.13457 10.2354 9.72274C10.2354 10.2958 10.5672 10.5974 11.3363 10.8086V8.57657Z"
												fill="currentColor"
												fill-opacity="0.72"
											></path>
											<path
												d="M12.6785 15.3933C13.3873 15.1972 13.7191 14.7297 13.7191 14.1566C13.7191 13.7193 13.5382 13.2668 12.6785 13.0104V15.3933Z"
												fill="currentColor"
												fill-opacity="0.72"
											></path>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.8595 17.0522V18.5H11.1402V17.1125C9.61705 16.9768 8.60661 16.3585 7.85255 15.529L9.20985 14.2923C9.78294 14.8956 10.4918 15.3028 11.3363 15.4234V12.7088C9.07412 12.2413 8.15417 11.2459 8.15417 9.78306C8.15417 8.19954 9.19477 7.14385 11.1402 6.91763V5.5H12.8595V6.91763C14.066 7.05336 14.9558 7.52088 15.6194 8.27494L14.247 9.5116C13.885 9.10441 13.4024 8.77262 12.6785 8.60673V11.1102C14.7899 11.5928 15.8003 12.4524 15.8003 13.9907C15.8003 15.4687 14.8653 16.7204 12.8595 17.0522Z"
												fill="currentColor"
												fill-opacity="0.72"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Currency
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  ">
											USD
										</p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
							<div
								onClick={() =>
									router.push("/wallet/settings/color-mode")
								}
								className="flex items-center justify-between cursor-pointer my-2 py-4 px-4"
							>
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M20.9677 12.7676C19.84 13.5449 18.4732 13.9999 17 13.9999C13.134 13.9999 10 10.8659 10 6.99994C10 5.52678 10.4551 4.15991 11.2323 3.03223C6.62108 3.42175 3 7.28797 3 11.9999C3 16.9705 7.02944 20.9999 12 20.9999C16.712 20.9999 20.5782 17.3789 20.9677 12.7676Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Color Mode
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  ">
											{theme.charAt(0).toUpperCase() +
												theme.slice(1)}
										</p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
							{/* <div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M10.0002 2.5C6.7785 2.5 4.16683 5.11167 4.16683 8.33333V10.8333L3.3335 11.6667V13.3333H4.16683H15.8335H16.6668V11.6667L15.8335 10.8333L15.8335 8.33333C15.8335 5.11167 13.2218 2.5 10.0002 2.5ZM10.0001 17.5C8.29154 17.5 6.82314 16.4716 6.18018 15H13.8201C13.1771 16.4716 11.7087 17.5 10.0001 17.5Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Notifications
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "></p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div> */}
						</div>
						{/* <div className=" mt-2"></div>
						<div className="bg-background-2 rounded-4 [&amp; > *]:h-[52px] ">
							<div className="flex flex-row justify-between my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2.5 5H11.6667V15H2.5V5Z"
												fill="currentColor"
												fill-opacity="0.72"
											></path>
											<path
												d="M14.167 5H17.5003V15H14.167V5Z"
												fill="currentColor"
												fill-opacity="0.72"
											></path>
										</svg>
									</div>
									<div className="flex flex-row items-center space-x-1">
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Open in Side Panel
										</p>
									</div>
								</div>
								<div>
									<button
										data-testid="set-side-panel-switch"
										className="switch"
										id="headlessui-switch-«rs»"
										role="switch"
										type="button"
										tabIndex={0}
										aria-checked="false"
										data-headlessui-state=""
									>
										<span className="sr-only">
											Open in Side Panel
										</span>
										<span
											aria-hidden="true"
											className="switch__toggle"
										></span>
									</button>
								</div>
							</div>
							<div className="flex flex-row justify-between my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.2485 1.26339C10.2485 1.26762 10.2458 1.27136 10.2418 1.27266L3.19212 3.55395C2.77952 3.68747 2.5 4.07171 2.5 4.50537V9.41688C2.5 11.9335 4.71296 16.3785 10.2409 18.7202C10.2455 18.7221 10.2485 18.7266 10.2485 18.7315C10.2485 18.7403 10.2575 18.7463 10.2656 18.7429C10.2681 18.7418 10.2707 18.7407 10.2732 18.7396C10.2777 18.7378 10.2827 18.7378 10.2871 18.7396C10.2896 18.7407 10.2922 18.7418 10.2948 18.7429C10.3029 18.7463 10.3118 18.7403 10.3118 18.7315C10.3118 18.7266 10.3149 18.7221 10.3194 18.7202C15.8474 16.3785 18.0603 11.9335 18.0603 9.41688V4.50537C18.0603 4.07171 17.7808 3.68747 17.3682 3.55395L10.3186 1.27266C10.3145 1.27136 10.3118 1.26762 10.3118 1.26339C10.3118 1.25678 10.3054 1.25209 10.2991 1.25412L10.2862 1.25829C10.2823 1.25956 10.2781 1.25956 10.2741 1.25829L10.2613 1.25412C10.255 1.25209 10.2485 1.25678 10.2485 1.26339Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div className="flex flex-row items-center space-x-1">
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Enable Trust One Tap
										</p>
									</div>
								</div>
								<div>
									<button
										data-testid="set-side-panel-switch"
										className="switch"
										id="headlessui-switch-«rt»"
										role="switch"
										type="button"
										tabIndex={0}
										aria-checked="true"
										data-headlessui-state="checked"
										data-checked=""
									>
										<span className="sr-only">
											Enable Trust One Tap
										</span>
										<span
											aria-hidden="true"
											className="switch__toggle"
										></span>
									</button>
								</div>
							</div>
							<div className="flex flex-row justify-between my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
										<svg
											className="text-utility-1-opacity-1"
											fill="none"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.2485 1.26339C10.2485 1.26762 10.2458 1.27136 10.2418 1.27266L3.19212 3.55395C2.77952 3.68747 2.5 4.07171 2.5 4.50537V9.41688C2.5 11.9335 4.71296 16.3785 10.2409 18.7202C10.2455 18.7221 10.2485 18.7266 10.2485 18.7315C10.2485 18.7403 10.2575 18.7463 10.2656 18.7429C10.2681 18.7418 10.2707 18.7407 10.2732 18.7396C10.2777 18.7378 10.2827 18.7378 10.2871 18.7396C10.2896 18.7407 10.2922 18.7418 10.2948 18.7429C10.3029 18.7463 10.3118 18.7403 10.3118 18.7315C10.3118 18.7266 10.3149 18.7221 10.3194 18.7202C15.8474 16.3785 18.0603 11.9335 18.0603 9.41688V4.50537C18.0603 4.07171 17.7808 3.68747 17.3682 3.55395L10.3186 1.27266C10.3145 1.27136 10.3118 1.26762 10.3118 1.26339C10.3118 1.25678 10.3054 1.25209 10.2991 1.25412L10.2862 1.25829C10.2823 1.25956 10.2781 1.25956 10.2741 1.25829L10.2613 1.25412C10.255 1.25209 10.2485 1.25678 10.2485 1.26339Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div className="flex flex-row items-center space-x-1">
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Set As Default Wallet
										</p>
									</div>
								</div>
								<div>
									<button
										data-testid="set-default-wallet-switch"
										className="switch"
										id="headlessui-switch-«ru»"
										role="switch"
										type="button"
										tabIndex={0}
										aria-checked="true"
										data-headlessui-state="checked"
										data-checked=""
									>
										<span className="sr-only">
											Set As Default Wallet
										</span>
										<span
											aria-hidden="true"
											className="switch__toggle"
										></span>
									</button>
								</div>
							</div>
							<div className="flex flex-row justify-between my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
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
												d="M16.0293 8.00716L9.89682 1.87471L8.57337 3.19817L7.16328 1.78809L5.04196 3.90941L6.45205 5.31949L5.09883 6.67271L6.94764 8.52151C4.62367 10.9383 4.28408 15.5617 6.62171 17.9688C6.65838 18.0065 6.69541 18.0437 6.73277 18.0802H4.01562V21.0628H19.9852L19.9852 18.0802H11.5903C10.5548 18.0546 9.52646 17.6309 8.72823 16.8089C7.02192 15.0519 7.07504 12.165 8.78026 10.4068L8.80621 10.3801L11.2313 12.8051L16.0293 8.00716ZM19.2782 13.9939C19.2782 12.3371 17.9351 10.9939 16.2782 10.9939C14.6214 10.9939 13.2782 12.3371 13.2782 13.9939C13.2782 15.6508 14.6214 16.9939 16.2782 16.9939C17.9351 16.9939 19.2782 15.6508 19.2782 13.9939Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div className="flex flex-row items-center space-x-1">
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Share Product Analytics
										</p>
									</div>
								</div>
								<div>
									<button
										data-testid="share-product-analytics-switch"
										className="switch"
										id="headlessui-switch-«rv»"
										role="switch"
										type="button"
										tabIndex={0}
										aria-checked="true"
										data-headlessui-state="checked"
										data-checked=""
									>
										<span className="sr-only">
											Share Product Analytics
										</span>
										<span
											aria-hidden="true"
											className="switch__toggle"
										></span>
									</button>
								</div>
							</div>
						</div> 
						<div className=" mt-2"></div>
						<div className="bg-background-2 rounded-4 [&amp; > *]:h-[52px] ">
							<div className="flex items-center justify-between cursor-pointer my-2 py-4 px-4">
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
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
												d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM11.9999 8.26683C11.4109 8.26683 10.9335 8.74428 10.9335 9.33325V9.75981H8.80065V9.33325C8.80065 7.56635 10.233 6.13399 11.9999 6.13399C13.7668 6.13399 15.1992 7.56635 15.1992 9.33325C15.1992 10.2164 14.8399 11.0177 14.2621 11.5955L13.0663 12.7913V14.0255H10.9335V11.9078L12.754 10.0873C12.9481 9.89317 13.0663 9.62802 13.0663 9.33325C13.0663 8.74428 12.5889 8.26683 11.9999 8.26683ZM10.9335 17.8646V15.7318H13.0663V17.8646H10.9335Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Help &amp; Support
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "></p>
									</div>
								</div>
								<div>
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
											d="M12.2886 11.9993L8.3996 8.11035L10.1674 6.34258L15.8242 11.9994L14.0565 13.7672L14.0563 13.7671L10.1672 17.6562L8.39941 15.8885L12.2886 11.9993Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
							</div>
						</div> */}
						<div className="mt-2"></div>
						<div className="bg-background-2 rounded-4 [&amp; > *]:h-[52px] ">
							<div
								onClick={handleLogout}
								className="flex items-center justify-between cursor-pointer my-2 py-4 px-4"
							>
								<div className="flex items-center flex-row space-x-4">
									<div className="bg-utility-1-opacity-5 rounded-full p-2">
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
												d="M7 8V10L5 10V21H19V10L17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8ZM14.5 10V8C14.5 6.61929 13.3807 5.5 12 5.5C10.6193 5.5 9.5 6.61929 9.5 8V10H14.5ZM13.5 18V13H10.5V18H13.5Z"
												fill="currentColor"
											></path>
										</svg>
									</div>
									<div>
										<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
											Logout
										</p>
										<p className="typography-body-14 text-utility-1-opacity-1 font-normal   text-unset  "></p>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-2"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
