"use client";

import { walletSetTheme } from "@/app/utils/api";
import { _globalLoading_, _theme_ } from "@/app/utils/store";
import { ThemeType } from "@/app/utils/types";
import clsx from "clsx";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function WalletSettingsColorMode() {
	const router = useRouter();

	const [theme, setTheme] = useAtom(_theme_);
	const setGlobalLoading = useSetAtom(_globalLoading_);

	const handleSetTheme = (newTheme: ThemeType) => {
		setGlobalLoading(true);

		walletSetTheme(newTheme)
			.then(() => setTheme(newTheme))
			.finally(() => setGlobalLoading(false));
	};

	return (
		<div className="relative flex flex-col flex-1 w-full h-full self-center md:max-w-[438px] p-4">
			<div className="flex items-center w-full h-full self-center pb-4 md:max-w-[438px]">
				<div className="flex w-8 justify-start">
					<div className="flex">
						<button
							onClick={() => router.back()}
							type="button"
							className="outline-none cursor-pointer bg-transparent text-background-1 p-1.5 icon-square-button !p-0   "
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
									clip-rule="evenodd"
									d="M3.00001 12.2722L10.0711 5.20117L11.8388 6.96894L7.78434 11.0234L21.001 11.0234L21.001 13.5234L7.78554 13.5234L11.8388 17.5767L10.0711 19.3445L3.00001 12.2734L3.00061 12.2728L3.00001 12.2722Z"
									fill="currentColor"
								></path>
							</svg>
						</button>
					</div>
				</div>
				<div className="flex-grow text-center overflow-hidden mx-4">
					<h5 className="typography-header-18 text-utility-1-default font-semibold truncate  text-unset  ">
						Color Mode
					</h5>
				</div>
				<div className="flex w-8 justify-end"></div>
			</div>
			<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 undefined md:max-w-[438px]">
				{["Light", "Dark"].map((maybeTheme) => (
					<div
						onClick={() =>
							handleSetTheme(
								maybeTheme.toLowerCase() as ThemeType
							)
						}
						key={maybeTheme}
						className="flex items-center justify-between cursor-pointer my-2 py-4"
					>
						<div>
							<p className="typography-subheader-16 text-utility-1-default font-medium   text-unset  ">
								{maybeTheme}
							</p>
						</div>

						<div
							className={clsx(
								"rounded-full w-5 h-5  border-2 p-[3px]",
								theme === maybeTheme.toLowerCase()
									? "border-accent"
									: "border-[#535355]"
							)}
						>
							{theme === maybeTheme.toLowerCase() && (
								<div className="w-full h-full bg-accent rounded-full" />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
