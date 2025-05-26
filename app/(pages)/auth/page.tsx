"use client";

import Input from "@/app/components/input";
import {
	authCreateWallet,
	authImportWallet,
	walletCreateProfile,
} from "@/app/utils/api";
import { _globalLoading_, _userAuth_ } from "@/app/utils/store";
import axios from "axios";
import clsx from "clsx";
import * as bip39 from "bip39";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

export default function AuthPage() {
	// help-improve по идее не нужна
	// enter-with-password тоже по идее не нужно
	const [tab, setTab] = useState<
		| "default"
		| "set-password"
		| "enter-with-password"
		| "confirm-password"
		| "verify-safety"
		| "help-improve"
		| "import-with-secret-phrase"
		| "create-with-secret-phrase"
		| "back-up-secret-phrase"
	>("default");

	const [account, setAccount] = useState<"newAccount" | "oldAccount" | null>(
		null
	);

	const [newWalletName, setNewWalletName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [isReadAndAgree, setIsReadAndAgree] = useState(false);

	const passwordConditions = useMemo(() => {
		const conditions = {
			isGoodLength: password.length >= 8,
			isOneOrMoreUppercase: /[A-Z]/.test(password),
			isOneOrMoreNumber: /[0-9]/.test(password),
			isOneOrMoreSpecialSymbol:
				/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
			isMatchPasswords: password === passwordConfirmation,
		};

		return {
			...conditions,
			isAllGood: Object.values(conditions).every(Boolean),
		};
	}, [password, passwordConfirmation]);

	const [verifyAccepts, setVerifyAccepts] = useState({
		onlyYouKnow: false,
		notGivenAnyone: false,
		stealYourFunds: false,
	});

	const [secretPhraseWords, setSecretPhraseWords] = useState<12 | 18 | 24>(
		12
	);
	const [secretPhraseDropdown, setSecretPhraseDropdown] = useState(false);

	const [secretWords, setSecretWords] = useState([
		...new Array(secretPhraseWords).fill(""),
	]);

	useEffect(() => {
		setSecretWords([...new Array(secretPhraseWords).fill("")]);
	}, [secretPhraseWords]);

	const setGlobalLoading = useSetAtom(_globalLoading_);
	const userAuth = useAtomValue(_userAuth_);

	useEffect(() => setGlobalLoading(false), []);

	const getConfirmPasswordError = useMemo(() => {
		return password &&
			passwordConfirmation &&
			password !== passwordConfirmation
			? "Passwords do not match"
			: undefined;
	}, [password, passwordConfirmation]);

	const handleEnterSecretPhrase = async () => {
		setGlobalLoading(true);

		const data = {
			password,
			password_confirmation: passwordConfirmation,
			seed_words: secretWords,
		};

		try {
			let res;

			if (userAuth) {
				await walletCreateProfile({
					name: newWalletName,
					password,
					method: "import",
					seed_words: secretWords.join(" "),
				});

				window.location.href = "/wallet";
			} else {
				if (account === "newAccount") {
					res = await authCreateWallet(data);
				}

				if (account === "oldAccount") {
					res = await authImportWallet(data);
				}

				if (res?.data) {
					const token = res.data.data.access_token;

					localStorage.setItem("token", token);

					window.location.href = "/wallet";
				} else {
					alert("Unknown error");
				}
			}
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				const message =
					err?.response?.data?.message ||
					err?.message ||
					"Unknown error";
				alert(message);
			} else {
				alert("Unknown error");
			}
		} finally {
			setGlobalLoading(false);
		}
	};

	const handleCreateWalletProfile = () => {
		setGlobalLoading(true);

		walletCreateProfile({
			name: newWalletName,
			password,
			method: "create",
		})
			.then(() => (window.location.href = "/wallet"))
			.catch(() => {
				setGlobalLoading(false);
				alert("Bad password");
			});
	};

	const secretWordsLength = useMemo(
		() => secretWords.filter(Boolean).length,
		[secretWords]
	);

	// if (tab === "back-up-secret-phrase") {
	// 	return (
	// 		<div className="relative flex flex-col flex-grow w-full h-full self-center pt-2 justify-center pt-0 md:max-w-[438px]">
	// 			<div className="bg-backgroundPrimary border border-line rounded p-6 mb-11">
	// 				<div className="flex justify-center my-4">
	// 					<svg
	// 						fill="none"
	// 						width="58"
	// 						height="66"
	// 						viewBox="0 0 58 66"
	// 						xmlns="http://www.w3.org/2000/svg"
	// 					>
	// 						<path
	// 							d="M0 9.38949L28.8907 0V65.0042C8.2545 56.3369 0 39.7248 0 30.3353V9.38949Z"
	// 							fill="#48FF91"
	// 						></path>
	// 						<path
	// 							d="M57.7822 9.38949L28.8915 0V65.0042C49.5277 56.3369 57.7822 39.7248 57.7822 30.3353V9.38949Z"
	// 							fill="url(#paint0_linear_896_19677)"
	// 						></path>
	// 						<defs>
	// 							<linearGradient
	// 								id="paint0_linear_896_19677"
	// 								x1="28.8911"
	// 								y1="73.5101"
	// 								x2="52.5376"
	// 								y2="-12.0198"
	// 								gradientUnits="userSpaceOnUse"
	// 							>
	// 								<stop
	// 									offset="0.264213"
	// 									stop-color="#48FF91"
	// 								></stop>
	// 								<stop
	// 									offset="0.662556"
	// 									stop-color="#0094FF"
	// 								></stop>
	// 								<stop
	// 									offset="0.800473"
	// 									stop-color="#0038FF"
	// 								></stop>
	// 								<stop
	// 									offset="0.888911"
	// 									stop-color="#0500FF"
	// 								></stop>
	// 							</linearGradient>
	// 						</defs>
	// 					</svg>
	// 				</div>
	// 				<div className="flex flex-col items-center text-center space-y-4 mt-4">
	// 					<h2
	// 						data-testid="onboarding-step-title"
	// 						className="screamer-text text-utility-1-default font-semibold   text-unset  "
	// 					>
	// 						Back Up Your Secret Phrase
	// 					</h2>
	// 					<div className="w-full mt-6 flex flex-col space-y-6">
	// 						<div className="rounded-4 bg-background-2 px-4 py-2  border-solid transition w-full">
	// 							<div className="flex items-center space-x-6 text-start">
	// 								<svg
	// 									fill="none"
	// 									width="96"
	// 									height="96"
	// 									viewBox="0 0 96 96"
	// 									xmlns="http://www.w3.org/2000/svg"
	// 								>
	// 									<path
	// 										d="M53.6914 38.2891L58.8418 37.6777C58.16 38.2791 58.004 39.5899 58.4896 40.6064L53.3392 41.2178C52.8536 40.2014 53.0121 38.8905 53.6914 38.2891Z"
	// 										fill="#1B1B1C"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M59.1797 42.0567L58.4878 40.6074L53.3374 41.2188L54.0293 42.6681C54.3765 43.3977 54.9603 43.7777 55.5138 43.7097L60.6642 43.0983C60.1107 43.1637 59.5269 42.7838 59.1797 42.0567Z"
	// 										fill="#48FF91"
	// 									></path>
	// 									<path
	// 										d="M62.3432 30.6374L67.4936 30.0234L58.8408 37.6773L53.6904 38.2887L62.3432 30.6374Z"
	// 										fill="#1B1B1C"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M62.9672 30.3458L68.1176 29.7344C67.8987 29.7595 67.6849 29.8551 67.4937 30.0262L62.3433 30.6376C62.5345 30.4665 62.7484 30.3735 62.9672 30.3458Z"
	// 										fill="#48FF91"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M63.0068 27.5973L68.1572 26.9859C69.1511 26.8676 70.2003 27.547 70.8243 28.8553L65.6739 29.4667C65.0499 28.1584 64.0007 27.479 63.0068 27.5973Z"
	// 										fill="#48FF91"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M78.6147 67.7682L83.7651 67.1543L86.1177 72.0833L80.9673 72.6972L78.6147 67.7682Z"
	// 										fill="#48FF91"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M80.969 72.6979L86.1194 72.084L75.7582 81.2475L70.6104 81.8589L80.969 72.6979Z"
	// 										fill="#0500FF"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M61.8862 28.1214C63.1065 27.042 64.8023 27.6459 65.6729 29.47L79.4937 58.4224C79.0357 61.3436 78.6382 67.4501 78.6156 67.7722L80.9681 72.7011L70.6069 81.8647L51.5552 41.9573C50.6847 40.1331 50.9665 37.7831 52.1868 36.7037L61.8837 28.1265L61.8862 28.1214ZM65.147 32.8391L64.4551 31.3898C63.9695 30.3733 63.0235 30.0387 62.3441 30.6375L53.6914 38.2889C53.0095 38.8902 52.8535 40.2011 53.3391 41.2176L54.031 42.6668C54.5166 43.6833 55.4602 44.0205 56.142 43.4191L64.7948 35.7678C65.4741 35.1664 65.6326 33.8556 65.147 32.8391Z"
	// 										fill="url(#paint0_linear_51_272591)"
	// 									></path>
	// 									<path
	// 										d="M65.6743 29.4694L70.8247 28.8555L84.6455 57.8079L79.4951 58.4193L65.6743 29.4694Z"
	// 										fill="#48FF91"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M79.4929 58.418L84.6432 57.8066C84.1853 60.7278 83.7878 66.8343 83.7651 67.1564L78.6147 67.7678C78.6349 67.4457 79.0349 61.3392 79.4929 58.418Z"
	// 										fill="#48FF91"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M82.0431 72.5695L79.6906 67.6405C79.6981 67.5097 79.8591 65.0389 80.1007 62.3945L88.5798 80.1555L78.9257 88.6925L74.437 79.2924L82.0406 72.567L82.0431 72.5695Z"
	// 										fill="url(#paint1_linear_51_272591)"
	// 									></path>
	// 									<path
	// 										d="M78.5415 75.666L80.4915 79.7496L79.6461 82.2506L81.596 86.3342"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M84.647 83.7914L83.3839 81.1445L81.751 82.4806L83.014 85.125"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M79.9902 74.3887L81.9377 78.4723L83.9832 78.4169L85.9332 82.5005"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M80.1021 62.3935L83.9667 61.9355L92.4459 79.6965L88.5812 80.1569L80.1021 62.3935Z"
	// 										fill="#FFAEFE"
	// 									></path>
	// 									<path
	// 										d="M85.3002 73.2805L87.5572 69.4561L83.9667 61.9355L80.1021 62.3935L85.3002 73.2805Z"
	// 										fill="#1B1B1C"
	// 									></path>
	// 									<path
	// 										d="M88.5808 80.1577L92.4455 79.6973L82.7939 88.2343L78.9292 88.6947L88.5808 80.1577Z"
	// 										fill="#0500FF"
	// 									></path>
	// 									<path
	// 										d="M88.4889 81.6118L90.5621 81.3652L84.4229 86.7949L82.3472 87.0415L88.4889 81.6118Z"
	// 										fill="#1B1B1C"
	// 									></path>
	// 									<path
	// 										d="M90.5633 81.3646L92.4479 79.6965L83.9687 61.9355L80.104 62.396C79.8625 65.0404 79.7015 67.5112 79.6939 67.642L82.0464 72.571L74.4429 79.2964L78.9315 88.6964L82.7962 88.236L87.3327 84.2229L90.5658 81.3646H90.5633Z"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M61.8862 28.1214C63.1065 27.042 64.8023 27.6459 65.6729 29.47L79.4937 58.4224C79.0357 61.3436 78.6382 67.4501 78.6156 67.7722L80.9681 72.7011L70.6069 81.8647L51.5552 41.9573C50.6847 40.1331 50.9665 37.7831 52.1868 36.7037L61.8837 28.1265L61.8862 28.1214ZM65.147 32.8391L64.4551 31.3898C63.9695 30.3733 63.0235 30.0387 62.3441 30.6375L53.6914 38.2889C53.0095 38.8902 52.8535 40.2011 53.3391 41.2176L54.031 42.6668C54.5166 43.6833 55.4602 44.0205 56.142 43.4191L64.7948 35.7678C65.4741 35.1664 65.6326 33.8556 65.147 32.8391Z"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M64.5782 32.5959L62.6458 34.3043C62.6156 34.3748 62.5829 34.4452 62.5402 34.5107C61.5815 35.9951 57.8225 35.1372 55.1027 33.3784C53.4722 32.3242 52.1614 31.0184 51.4116 29.6999C50.7876 28.6029 50.6442 27.6393 51.0166 27.0606C51.2279 26.7335 51.5751 26.5196 52.0179 26.4064C52.3627 25.7271 52.6671 25.0301 52.9313 24.3281C51.3336 24.3508 50.0353 24.8942 49.3358 25.9761C48.5307 27.2216 48.6489 28.8948 49.6705 30.6913C50.5762 32.2814 52.1186 33.8338 54.0132 35.0592C56.2575 36.5109 58.5924 37.2481 60.5097 37.2481C62.1577 37.2481 63.4988 36.7022 64.2133 35.5976C64.7593 34.7547 64.8549 33.7105 64.5706 32.5959H64.5782Z"
	// 										fill="#2D9FFF"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M57.5195 25.9437C57.3434 26.4142 57.1547 26.8797 56.9534 27.3426C56.9509 27.3502 56.9484 27.3552 56.9434 27.3628C57.4642 27.6093 57.9749 27.8886 58.453 28.1981C59.077 28.6032 59.6808 29.0762 60.2293 29.5844L61.7465 28.2434C61.0999 27.6345 60.3602 27.0508 59.5399 26.5199C58.9235 26.1223 58.302 25.7801 57.6831 25.4883C57.6302 25.6418 57.5749 25.7927 57.5195 25.9462V25.9437Z"
	// 										fill="#2D9FFF"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M42.813 33.0713L45.5656 34.0979C47.7948 34.9307 50.7587 33.4211 53.2069 30.0244L51.0506 28.1172C48.5018 32.1278 45.2284 33.9721 42.813 33.0713Z"
	// 										fill="#F4F4F7"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M43.7441 32.6439C42.7654 31.2726 42.3326 29.2497 42.403 26.9727C42.2747 27.0859 42.1363 27.1916 41.9778 27.2897C41.4645 27.6042 40.8607 27.7879 40.2342 27.8482C40.0933 30.9304 40.6493 33.6755 41.9678 35.5197C44.9015 39.626 50.5274 37.754 54.7569 31.3934L53.207 30.0221C50.0016 34.468 45.9155 35.6808 43.7466 32.6439H43.7441Z"
	// 										fill="#F4F4F7"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M37.4652 27.2969C37.4023 30.1853 37.9659 32.7442 39.2138 34.4928C39.8781 35.4238 40.6832 36.0478 41.579 36.3824L44.3315 37.409C43.4358 37.0743 42.6332 36.4503 41.9664 35.5194C40.6505 33.6751 40.0945 30.9301 40.2329 27.8479C39.2843 27.941 38.2829 27.7523 37.4652 27.2994V27.2969Z"
	// 										fill="#F4F4F7"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M43.2061 25.5269L42.8085 29.5828C42.879 28.8758 42.5771 28.1361 41.8927 27.5322C40.5441 26.3421 38.2243 26.1358 36.702 27.0693C35.9548 27.5297 35.5396 28.1788 35.4717 28.8632L35.8692 24.8073C35.9372 24.1229 36.3498 23.4738 37.0996 23.0134C38.6218 22.0774 40.9416 22.2862 42.2902 23.4763C42.9746 24.0802 43.274 24.8224 43.2061 25.5269Z"
	// 										fill="#1B1B1C"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M37.4332 41.8832L24.244 30.2287C23.8238 29.8589 23.6401 29.4035 23.6829 28.9707L23.2853 33.0266C23.2426 33.4594 23.4262 33.9148 23.8464 34.2846L37.0357 45.9391L37.4332 41.8832Z"
	// 										fill="#1B1B1C"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M57.5096 34.5879C57.4694 35.0081 57.2152 35.4056 56.7548 35.6899L45.5054 42.6066L45.1079 46.6625L56.3573 39.7458C56.8152 39.464 57.0693 39.064 57.1121 38.6438L57.5096 34.5879Z"
	// 										fill="#1B1B1C"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M45.5067 42.6069L45.1091 46.6628L37.0376 45.9432L37.4351 41.8848L45.5067 42.6069Z"
	// 										fill="#1B1B1C"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M56.9494 33.329L42.1474 20.2505L37.5077 19.8379L24.4393 27.8717C23.5058 28.4454 23.4203 29.5021 24.2455 30.2318L27.9014 33.4599L35.3464 40.0369L37.4373 41.8837L45.5088 42.6033L56.7582 35.6866C57.6916 35.1129 57.7772 34.0562 56.9519 33.3265L56.9494 33.329ZM41.9763 27.3207C40.4566 28.2541 38.1317 28.0478 36.7856 26.8577C36.0912 26.2438 35.7918 25.4915 35.8748 24.7769C35.9503 24.1051 36.3629 23.4661 37.1001 23.0132C38.6223 22.0772 40.9422 22.286 42.2908 23.4761C42.9852 24.09 43.2846 24.8423 43.2016 25.5594C43.1261 26.2312 42.7135 26.8703 41.9763 27.3232V27.3207Z"
	// 										fill="url(#paint2_linear_51_272591)"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M24.6578 43.8689L24.4339 46.1233L23.1406 44.981L23.3646 42.7266L24.6578 43.8689Z"
	// 										fill="#FFAEFE"
	// 									></path>
	// 									<path
	// 										d="M35.3404 40.0371L18.6966 50.27L18.4727 52.5244L35.1164 42.2915L35.3404 40.0371Z"
	// 										fill="#1B1B1C"
	// 									></path>
	// 									<path
	// 										d="M23.3637 42.7266L23.1398 44.981L4.83789 56.2303L5.06182 53.9759L23.3637 42.7266Z"
	// 										fill="#1B1B1C"
	// 									></path>
	// 									<path
	// 										d="M16.1335 50.0407L15.9096 52.2951L15.2881 51.7466L15.5145 49.4922L16.1335 50.0407Z"
	// 										fill="#FFAEFE"
	// 									></path>
	// 									<path
	// 										d="M18.6989 50.27L18.475 52.5244L15.9111 52.2954L16.1351 50.041L18.6989 50.27Z"
	// 										fill="#FFAEFE"
	// 									></path>
	// 									<path
	// 										d="M26.3694 45.5526L26.1455 47.8044L31.3538 44.604L31.5802 42.3496L26.3694 45.5526Z"
	// 										fill="#0500FF"
	// 									></path>
	// 									<path
	// 										d="M21.4529 43.9016L21.229 46.156L23.1412 44.981L23.3651 42.7266L21.4529 43.9016Z"
	// 										fill="#0500FF"
	// 									></path>
	// 									<path
	// 										d="M5.06286 53.9752L4.83893 56.2295L3.55322 55.0923L3.77715 52.8379L5.06286 53.9752Z"
	// 										fill="#FFAEFE"
	// 									></path>
	// 									<path
	// 										d="M35.3409 40.0367L18.6971 50.2696L16.1333 50.0406L15.5143 49.4921L24.6577 43.8687L23.3644 42.7264L5.06257 53.9757L3.77686 52.8385L4.16936 48.0454L31.0661 31.5098L34.0779 34.1718L32.6991 37.7043L35.3409 40.0367Z"
	// 										fill="url(#paint3_linear_51_272591)"
	// 									></path>
	// 									<path
	// 										d="M19.6626 46.9434L15.5161 49.4921L16.1351 50.0406L18.6989 50.2696L22.8555 47.7133L19.6626 46.9434Z"
	// 										fill="#F4F4F7"
	// 									></path>
	// 									<path
	// 										d="M17.3941 46.395L9.82574 44.5684L4.16962 48.0456L3.93311 50.9365L8.29345 51.9908L17.3941 46.395Z"
	// 										fill="#F4F4F7"
	// 									></path>
	// 									<path
	// 										d="M9.93213 46.9356L23.8586 38.3734L24.1529 35.7617"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M10.5575 47.4883C10.1675 47.7273 9.56868 47.6745 9.22398 47.37C9.04534 47.2115 8.96986 47.0178 8.98999 46.8341C9.01011 46.6605 9.11579 46.497 9.30449 46.3812C9.69449 46.1397 10.2933 46.195 10.638 46.4995C10.8167 46.658 10.8921 46.8517 10.872 47.0354C10.8519 47.209 10.7462 47.3726 10.5575 47.4883Z"
	// 										fill="#0500FF"
	// 									></path>
	// 									<path
	// 										d="M13.4779 45.6953C13.0879 45.9344 12.4891 45.8815 12.1444 45.5771C11.9657 45.4186 11.8903 45.2248 11.9104 45.0412C11.9305 44.8676 12.0362 44.704 12.2249 44.5883C12.6149 44.3467 13.2137 44.4021 13.5584 44.7065C13.7371 44.865 13.8125 45.0588 13.7924 45.2424C13.7723 45.4161 13.6666 45.5796 13.4779 45.6953Z"
	// 										fill="#0500FF"
	// 									></path>
	// 									<path
	// 										d="M16.3959 43.9004C16.0059 44.1394 15.4071 44.0866 15.0624 43.7822C14.8837 43.6237 14.8082 43.4299 14.8284 43.2462C14.8485 43.0726 14.9542 42.9091 15.1429 42.7933C15.5329 42.5518 16.1317 42.6072 16.4764 42.9116C16.655 43.0701 16.7305 43.2639 16.7104 43.4475C16.6903 43.6211 16.5846 43.7847 16.3959 43.9004Z"
	// 										fill="#0500FF"
	// 									></path>
	// 									<path
	// 										d="M35.3412 40.0367L32.6994 37.7043L34.0782 34.1718L31.0664 31.5098L4.16966 48.0454L3.77715 52.8385L3.55322 55.0929L4.83893 56.2301L15.4945 49.6808L15.2882 51.7465L15.9096 52.295L18.4735 52.524L35.1173 42.2911L35.3412 40.0367Z"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M55.6527 13.3871C55.1419 12.67 54.523 12.1894 53.8336 11.9328L51.081 10.9062C51.7704 11.1629 52.3868 11.6435 52.9001 12.3605C55.2375 15.6339 54.4651 22.5959 51.1791 27.9149C51.1363 27.9828 51.0936 28.0507 51.0508 28.1187L53.2071 30.0259C53.4536 29.6837 53.6952 29.3214 53.9317 28.9414C57.2202 23.6225 57.9901 16.6605 55.6527 13.3871Z"
	// 										fill="url(#paint4_linear_51_272591)"
	// 									></path>
	// 									<path
	// 										d="M44.2043 15.3212C47.5381 9.92671 51.8809 7.43078 55.0712 8.62088L52.3187 7.59432C49.1308 6.40422 44.7881 8.90016 41.4518 14.2946C38.9382 18.3606 37.5594 23.1663 37.4663 27.2977C38.284 27.7505 39.2854 27.9393 40.234 27.8462C40.4177 23.823 41.7864 19.2286 44.2018 15.3186L44.2043 15.3212Z"
	// 										fill="url(#paint5_linear_51_272591)"
	// 									></path>
	// 									<path
	// 										d="M41.4505 14.2949L42.7287 14.9189C41.8279 16.3757 41.0731 17.9281 40.4692 19.5082L41.8606 20.1347"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M57.4312 10.5072C54.3968 6.25755 48.474 8.41382 44.2017 15.3204C41.7838 19.2304 40.415 23.8247 40.2339 27.8479C40.8604 27.7875 41.4642 27.6039 41.9775 27.2894C42.136 27.1912 42.2744 27.0856 42.4027 26.9723C42.4984 23.8197 43.5576 20.179 45.4673 17.0917C48.7558 11.7728 53.3149 10.1147 55.6524 13.3856C57.9898 16.659 57.2174 23.6209 53.9314 28.9399C53.6949 29.3198 53.4533 29.6796 53.2067 30.0218L54.7566 31.3931C54.9051 31.1717 55.051 30.9427 55.1944 30.7112C59.4642 23.8046 60.4681 14.7593 57.4312 10.5097V10.5072Z"
	// 										fill="#2D9FFF"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<path
	// 										d="M57.4333 10.5079C56.7967 9.61472 56.0318 9.00583 55.1814 8.66365C55.0455 8.6083 53.3572 7.97928 52.3206 7.59432C49.1328 6.40422 44.79 8.90016 41.4537 14.2946C38.9402 18.3606 37.5614 23.1663 37.4683 27.2977C38.286 27.7505 39.2874 27.9393 40.2359 27.8462C40.8624 27.7858 41.4663 27.6021 41.9796 27.2876C42.1381 27.1895 42.2765 27.0838 42.4048 26.9706C42.5004 23.8179 43.5597 20.1772 45.4694 17.09C47.5476 13.7285 50.1367 11.8314 52.3483 11.7156C52.5445 11.9043 52.7307 12.1157 52.9018 12.3598C55.2393 15.6332 54.4668 22.5951 51.1808 27.9141C51.1381 27.982 51.0953 28.05 51.0525 28.1179L53.2088 30.0251L54.7587 31.3938C54.9071 31.1724 55.0531 30.9434 55.1965 30.712C59.4662 23.8054 60.4702 14.7601 57.4333 10.5104V10.5079Z"
	// 										stroke="#0500FF"
	// 										stroke-width="0.5"
	// 										stroke-linecap="round"
	// 										stroke-linejoin="round"
	// 									></path>
	// 									<defs>
	// 										<linearGradient
	// 											id="paint0_linear_51_272591"
	// 											x1="61.9827"
	// 											y1="72.2573"
	// 											x2="71.1308"
	// 											y2="35.029"
	// 											gradientUnits="userSpaceOnUse"
	// 										>
	// 											<stop stop-color="#48FF91"></stop>
	// 											<stop
	// 												offset="1"
	// 												stop-color="#FFF465"
	// 											></stop>
	// 										</linearGradient>
	// 										<linearGradient
	// 											id="paint1_linear_51_272591"
	// 											x1="77.7401"
	// 											y1="76.0095"
	// 											x2="86.1739"
	// 											y2="73.8408"
	// 											gradientUnits="userSpaceOnUse"
	// 										>
	// 											<stop stop-color="#FFAEFE"></stop>
	// 											<stop
	// 												offset="1"
	// 												stop-color="#FFF465"
	// 											></stop>
	// 										</linearGradient>
	// 										<linearGradient
	// 											id="paint2_linear_51_272591"
	// 											x1="51.451"
	// 											y1="32.3909"
	// 											x2="26.22"
	// 											y2="29.534"
	// 											gradientUnits="userSpaceOnUse"
	// 										>
	// 											<stop stop-color="#0502FF"></stop>
	// 											<stop
	// 												offset="0.18"
	// 												stop-color="#1131FF"
	// 											></stop>
	// 											<stop
	// 												offset="0.36"
	// 												stop-color="#1B59FF"
	// 											></stop>
	// 											<stop
	// 												offset="0.53"
	// 												stop-color="#2377FF"
	// 											></stop>
	// 											<stop
	// 												offset="0.69"
	// 												stop-color="#288DFF"
	// 											></stop>
	// 											<stop
	// 												offset="0.85"
	// 												stop-color="#2B9AFF"
	// 											></stop>
	// 											<stop
	// 												offset="1"
	// 												stop-color="#2D9FFF"
	// 											></stop>
	// 										</linearGradient>
	// 										<linearGradient
	// 											id="paint3_linear_51_272591"
	// 											x1="4.9359"
	// 											y1="41.2612"
	// 											x2="34.817"
	// 											y2="44.6446"
	// 											gradientUnits="userSpaceOnUse"
	// 										>
	// 											<stop stop-color="#FFAEFE"></stop>
	// 											<stop
	// 												offset="1"
	// 												stop-color="#FFF465"
	// 											></stop>
	// 										</linearGradient>
	// 										<linearGradient
	// 											id="paint4_linear_51_272591"
	// 											x1="51.6885"
	// 											y1="21.7431"
	// 											x2="55.1556"
	// 											y2="14.5367"
	// 											gradientUnits="userSpaceOnUse"
	// 										>
	// 											<stop stop-color="#F4F4F7"></stop>
	// 											<stop
	// 												offset="0.15"
	// 												stop-color="#F0F2F7"
	// 											></stop>
	// 											<stop
	// 												offset="0.29"
	// 												stop-color="#E4EDF7"
	// 											></stop>
	// 											<stop
	// 												offset="0.43"
	// 												stop-color="#D0E4F8"
	// 											></stop>
	// 											<stop
	// 												offset="0.57"
	// 												stop-color="#B5D9F9"
	// 											></stop>
	// 											<stop
	// 												offset="0.71"
	// 												stop-color="#91C9FA"
	// 											></stop>
	// 											<stop
	// 												offset="0.85"
	// 												stop-color="#65B7FC"
	// 											></stop>
	// 											<stop
	// 												offset="0.98"
	// 												stop-color="#33A1FE"
	// 											></stop>
	// 											<stop
	// 												offset="1"
	// 												stop-color="#2D9FFF"
	// 											></stop>
	// 										</linearGradient>
	// 										<linearGradient
	// 											id="paint5_linear_51_272591"
	// 											x1="44.026"
	// 											y1="19.2817"
	// 											x2="40.6673"
	// 											y2="25.5305"
	// 											gradientUnits="userSpaceOnUse"
	// 										>
	// 											<stop stop-color="#F4F4F7"></stop>
	// 											<stop
	// 												offset="0.15"
	// 												stop-color="#F0F2F7"
	// 											></stop>
	// 											<stop
	// 												offset="0.29"
	// 												stop-color="#E4EDF7"
	// 											></stop>
	// 											<stop
	// 												offset="0.43"
	// 												stop-color="#D0E4F8"
	// 											></stop>
	// 											<stop
	// 												offset="0.57"
	// 												stop-color="#B5D9F9"
	// 											></stop>
	// 											<stop
	// 												offset="0.71"
	// 												stop-color="#91C9FA"
	// 											></stop>
	// 											<stop
	// 												offset="0.85"
	// 												stop-color="#65B7FC"
	// 											></stop>
	// 											<stop
	// 												offset="0.98"
	// 												stop-color="#33A1FE"
	// 											></stop>
	// 											<stop
	// 												offset="1"
	// 												stop-color="#2D9FFF"
	// 											></stop>
	// 										</linearGradient>
	// 									</defs>
	// 								</svg>
	// 								<p className="subtitle-text text-utility-1-default font-normal   text-unset  ">
	// 									Back up safely these 12 words in a piece
	// 									of paper and never share it with anyone.
	// 								</p>
	// 							</div>
	// 						</div>
	// 						<div className="relative flex items-center justify-center">
	// 							<div className="w-full border border-line rounded bg-backgroundSecondary">
	// 								<div className="flex flex-col p-4 pointer-events-none blur-md">
	// 									<div>
	// 										<canvas
	// 											className="bg-backgroundSecondary mx-auto rounded"
	// 											width="600"
	// 											height="256"
	// 											style="width: 300px; height: 128px;"
	// 										></canvas>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>
	// 						<div className="flex w-full items-center justify-between mt-6 space-x-4">
	// 							<div
	// 								className="flex w-full"
	// 								data-tooltip-id="button-tooltip-50"
	// 								data-tooltip-place="top-end"
	// 								data-tooltip-role="tooltip"
	// 							>
	// 								<button
	// 									data-testid="backup-mnemonic-step-cancel-button"
	// 									type="button"
	// 									className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
	// 								>
	// 									<p className="title-text text-primary font-medium   text-unset  ">
	// 										Cancel
	// 									</p>
	// 								</button>
	// 							</div>
	// 							<div
	// 								className="flex w-full"
	// 								data-tooltip-id="button-tooltip-51"
	// 								data-tooltip-place="top-end"
	// 								data-tooltip-role="tooltip"
	// 							>
	// 								<button
	// 									data-testid="backup-mnemonic-step-proceed-button"
	// 									type="submit"
	// 									className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  "
	// 								>
	// 									Show
	// 								</button>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	if (tab === "confirm-password") {
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
						<h2 className="screamer-text text-utility-1-default font-semibold   text-unset  ">
							Confirm Password
						</h2>
						<p className="title-text text-textSecondary font-normal   text-unset  ">
							Please confirm your password for your wallet by
							re-entering it here.
						</p>
						<div className="w-full mt-6 flex flex-col space-y-6">
							<div className="space-y-6">
								<Input
									label="Enter your new wallet name"
									value={newWalletName}
									onChange={setNewWalletName}
									type="text"
								/>
								<Input
									label="Password"
									value={password}
									onChange={setPassword}
									type="password"
								/>

								<div className="flex w-full items-center justify-between mt-6 space-x-4">
									<div className="flex w-full">
										<button
											onClick={() => setTab("default")}
											type="button"
											className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
										>
											<p className="title-text text-primary font-medium   text-unset  ">
												Back
											</p>
										</button>
									</div>
									<div className="flex w-full">
										<button
											onClick={() => {
												if (account === "newAccount") {
													handleCreateWalletProfile();
												}

												if (account === "oldAccount") {
													setTab("verify-safety");
												}
											}}
											disabled={
												password.length <= 3 ||
												newWalletName.length < 3
											}
											className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  "
										>
											Next
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

	if (
		tab === "import-with-secret-phrase" ||
		tab === "create-with-secret-phrase"
	) {
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
						<h2 className="screamer-text text-utility-1-default font-semibold   text-unset  ">
							{account === "oldAccount"
								? "Import with Secret Phrase"
								: "Create with Secret Phrase"}
						</h2>
						<div className="w-full mt-6 flex flex-col space-y-6">
							<div className="space-y-6">
								<div className="flex flex-col items-center space-y-6">
									<div className="flex w-full max-w-[372px]">
										<div className="w-full">
											<div className="relative w-full mt-1">
												<button
													onClick={() =>
														setSecretPhraseDropdown(
															(prev) => !prev
														)
													}
													className="relative w-full input-field title-text font-medium h-12 cursor-pointer"
													id="headlessui-listbox-button-«r2»"
													type="button"
												>
													<span className="block truncate">
														I have a{" "}
														{secretPhraseWords} word
														Secret Phrase
													</span>
													<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
												{secretPhraseDropdown && (
													<ul
														className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-bg3 py-1 shadow-lg focus:outline-none"
														id="headlessui-listbox-options-«rl»"
														role="listbox"
														tabIndex={0}
													>
														{[12, 18, 24].map(
															(numberWords) => (
																<li
																	key={
																		numberWords
																	}
																	onClick={() => {
																		setSecretPhraseWords(
																			numberWords as
																				| 12
																				| 18
																				| 24
																		);
																		setSecretPhraseDropdown(
																			false
																		);
																	}}
																	className="relative cursor-pointer select-none px-4 py-2 hover:bg-white/5"
																	id="headlessui-listbox-option-«ro»"
																	role="option"
																	tabIndex={
																		-1
																	}
																	aria-selected="true"
																	data-headlessui-state="selected"
																	data-selected=""
																>
																	<div className="flex items-center space-x-2">
																		<div className="flex flex-1">
																			<p
																				className={clsx(
																					"title-text font-medium truncate  text-unset",
																					numberWords ===
																						secretPhraseWords
																						? "!text-accent"
																						: "!text-primary"
																				)}
																			>
																				I
																				have
																				a{" "}
																				{
																					numberWords
																				}{" "}
																				word
																				Secret
																				Phrase
																			</p>
																		</div>
																		{numberWords ===
																			secretPhraseWords && (
																			<div>
																				<svg
																					className="text-primary"
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
																					></path>
																				</svg>
																			</div>
																		)}
																	</div>
																</li>
															)
														)}
													</ul>
												)}
											</div>
										</div>
									</div>

									<div
										className={clsx(
											"grid gap-1",
											{
												12: "grid-cols-2",
												18: "grid-cols-3",
												24: "grid-cols-4",
											}[secretPhraseWords]
										)}
									>
										{[...new Array(secretPhraseWords)].map(
											(_, i) => (
												<Input
													type="password"
													value={secretWords[i]}
													onChange={(newValue) => {
														setSecretWords(
															(prev) => {
																const newArray =
																	[...prev];
																newArray[i] =
																	newValue;
																return newArray;
															}
														);
													}}
													placeholder={`Word #${
														i + 1
													}`}
													key={i}
												/>
											)
										)}
									</div>

									<div className="flex w-full">
										<button
											onClick={() => {
												setSecretWords([
													...new Array(
														secretPhraseWords
													).fill(""),
												]);
											}}
											type="button"
											disabled={secretWords.every(
												(word) => word === ""
											)}
											className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
										>
											<p className="title-text text-primary font-medium   text-unset  ">
												Clear all
											</p>
										</button>
									</div>
								</div>

								{secretWords.some((word) => word !== "") &&
									!bip39.validateMnemonic(
										secretWords.join(" ")
									) && (
										<div className="w-full text-start">
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
														fillRule="evenodd"
														clipRule="evenodd"
														d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.75 15.5V18H13.25V15.5H10.75ZM10.75 6V13H13.25V6H10.75Z"
														fill="currentColor"
													></path>
												</svg>

												<div className="text-utility-1-default typography-body-12 flex-1 text-start">
													{secretWordsLength !== 12 &&
														secretWordsLength !==
															18 &&
														secretWordsLength !==
															24 &&
														"Secret Phrases must contain 12, 18 or 24 words"}

													{!bip39.validateMnemonic(
														secretWords.join(" ")
													) &&
														"Invalid secret phrase"}
												</div>
											</div>
										</div>
									)}

								<div className="flex w-full items-center justify-between mt-6 space-x-4">
									<div className="flex w-full">
										<button
											onClick={() => {
												if (userAuth) {
													setTab("confirm-password");
												} else {
													setTab("set-password");
												}
											}}
											type="button"
											className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full  "
										>
											<p className="title-text text-primary font-medium   text-unset  ">
												Back
											</p>
										</button>
									</div>
									<div className="flex w-full">
										<button
											onClick={handleEnterSecretPhrase}
											disabled={
												secretWords.some(
													(word) => word === ""
												) ||
												!bip39.validateMnemonic(
													secretWords.join(" ")
												)
											}
											className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full "
										>
											Next
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

	if (tab === "enter-with-password") {
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
							<div className="flex flex-col w-full">
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
														data-tooltip-id="default-tooltip"
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
										data-tooltip-id="default-tooltip"
										data-tooltip-place="top-end"
										data-tooltip-role="tooltip"
									>
										<button className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full">
											Unlock
										</button>
									</div>
								</div>
							</div>
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
							data-tooltip-id="default-tooltip"
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
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M47.0391 12.9811L61.6448 67.5174L81.5904 34.6013L52.3958 12.0879L47.0391 12.9811Z"
										fill="#1B1B1C"
									></path>
									<path
										d="M76.8976 38.9995L62.2107 29.8457H40.2041L73.2294 45.4651"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M68.4274 53.7561L55.7986 45.8848H33.792L65.2604 59.2612"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M59.8123 68.423L49.3844 61.9238H28.4419L56.8945 72.4413"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M48.158 81.1971L42.9721 77.9629H25.3506L44.1006 83.9385"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M36.1377 87.3679C36.7033 79.5414 38.9183 67.0498 45.8991 49.8343L57.6319 20.8945"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M50.3125 79.1082C51.8106 72.9115 54.0927 65.5722 57.5341 57.0849L68.816 29.2539"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M42.2036 49.4608C44.9058 50.5837 44.9674 52.1826 43.9481 54.8539C44.9702 52.1826 46.1995 51.2221 48.854 52.289C46.1995 51.2221 45.8578 49.5504 47.0815 46.9238C45.995 49.6064 44.9086 50.5837 42.2064 49.4608H42.2036Z"
										fill="#48FF91"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M50.0254 69.9002C51.9771 70.6227 52.2711 71.9052 51.6887 73.8933C52.2711 71.9052 52.9012 70.9615 54.8165 71.6699C52.9012 70.9615 52.8844 69.9254 53.5368 67.9121C52.8844 69.9254 51.9799 70.6199 50.0282 69.9002H50.0254Z"
										fill="#48FF91"
										stroke="#48FF91"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M59.8073 54.853C65.3963 54.853 69.9271 50.3221 69.9271 44.7331C69.9271 39.1441 65.3963 34.6133 59.8073 34.6133C54.2183 34.6133 49.6875 39.1441 49.6875 44.7331C49.6875 50.3221 54.2183 54.853 59.8073 54.853Z"
										fill="#48FF91"
									></path>
									<path
										d="M58.4175 54.9116L65.8323 36.6152"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M54.0562 36.3945L69.8995 43.8878"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M60.7925 39.5807C63.4946 40.7036 63.4051 42.4397 62.3858 45.1139C63.4079 42.4425 64.7071 41.6249 67.3617 42.6889C64.7071 41.6221 64.3655 39.8355 65.5892 37.209C64.5027 39.8916 63.4974 40.7036 60.7925 39.5807Z"
										fill="#0500FF"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
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
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M62.3639 10.8622H47.8982L77.6752 33.1488C79.7418 34.6973 80.3214 37.5479 79.0221 39.7796L64.1308 65.3536C51.0764 87.769 35.0286 90.4936 28.4146 90.5776C36.1934 90.6644 57.0071 88.5614 70.5208 65.3536L85.7089 39.27C86.8766 37.265 86.5378 34.7225 84.8857 33.0928L62.3611 10.8594L62.3639 10.8622Z"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M28.4146 90.5776C26.4741 90.5552 25.3428 90.3984 25.3428 90.3984C25.3428 90.3984 26.4741 90.6 28.4146 90.5776Z"
										fill="white"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M64.1348 65.3547L79.0261 39.7807C80.3254 37.549 79.7458 34.6956 77.6792 33.1499L47.9021 10.8633L34.8869 42.9729C22.0145 74.7241 25.3467 90.4023 25.3467 90.4023C25.3467 90.4023 26.478 90.5591 28.4185 90.5815C35.0325 90.5003 51.0832 87.7757 64.1348 65.3575V65.3547Z"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M34.8834 42.9694L47.8986 10.8598L34.2954 5.68225C32.2681 4.9094 29.9943 5.90067 29.1767 7.91399L17.6287 36.403C4.75632 68.1542 25.3432 90.3988 25.3432 90.3988C25.3432 90.3988 22.011 74.7234 34.8834 42.9694Z"
										fill="url(#paint0_linear_51_272685)"
									></path>
									<path
										d="M79.0247 39.7807C80.324 37.549 79.7444 34.6956 77.6778 33.1499L47.9008 10.8633L47.0411 12.983L75.5525 34.2924C78.0643 36.1713 78.0307 37.0645 76.4458 39.8227L62.2125 64.5623C54.834 77.3899 42.1128 90.0103 25.0737 88.1845C25.1885 89.663 25.3454 90.4023 25.3454 90.4023C25.3454 90.4023 26.4766 90.5591 28.4171 90.5815C35.0312 90.5003 51.0818 87.7757 64.1334 65.3575L79.0247 39.7835V39.7807Z"
										fill="#F4F4F7"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M33.5269 5.42188L47.8974 10.8626H62.3631L39.9141 5.42188H33.5269Z"
										fill="#2D9FFF"
										stroke="#0500FF"
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
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
										strokeWidth="0.5"
										strokeLinecap="round"
										strokeLinejoin="round"
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
											<stop stopColor="#48FF91"></stop>
											<stop
												offset="1"
												stopColor="#2D9FFF"
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
									data-tooltip-id="default-tooltip"
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
									data-tooltip-id="default-tooltip"
									data-tooltip-place="top-end"
									data-tooltip-role="tooltip"
								>
									<button className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button  w-full  ">
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
								Verify safety
							</h2>
							<p className="title-text text-textSecondary font-normal text-unset">
								Check your secret phrase is safe
							</p>
							<div className="w-full flex flex-col space-y-6">
								<div className="m-auto">
									<svg
										width="120"
										height="120"
										viewBox="0 0 143 146"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g
											id="Frame"
											clipPath="url(#clip0_55864_111957)"
										>
											<g id="Group">
												<path
													id="Vector"
													d="M99.4004 98.047L105.682 53.5996C106.169 50.1425 104.318 45.5742 101.565 43.4495L65.1386 15.3097L57.2062 141.193L48.4238 145.186C48.4238 145.186 92.8003 144.716 99.3959 98.047H99.4004Z"
													fill="#48FF91"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<path
													id="Vector_2"
													d="M57.2109 141.194C57.2109 141.194 103.734 139.747 110.33 93.0818L116.611 48.6344C117.098 45.1773 115.248 40.609 112.495 38.4843L76.0682 10.3445L72.0046 67.3412C68.8661 111.324 57.2109 141.199 57.2109 141.199V141.194Z"
													fill="url(#paint0_linear_55864_111957)"
												></path>
												<path
													id="Vector_3"
													d="M69.2128 92.2224C68.9118 94.1746 68.6019 96.078 68.2832 97.9372L110.004 95.1484C110.119 94.4712 110.23 93.7806 110.327 93.0812L111.394 85.525L69.2084 92.2269L69.2128 92.2224Z"
													fill="#2D9FFF"
												></path>
												<path
													id="Vector_4"
													d="M67.7329 101.026C63.1868 125.873 57.2109 141.189 57.2109 141.189C57.2109 141.189 98.2941 139.905 108.719 101.026H67.7329Z"
													fill="#2D9FFF"
												></path>
												<path
													id="Vector_5"
													d="M74.6736 137.459C84.9786 133.74 97.3996 126.326 104.757 111.581L101.277 111.435C93.6592 124.701 81.6012 130.974 72.2832 133.926L74.678 137.459H74.6736Z"
													fill="#48FF91"
												></path>
												<g id="Vector_6">
													<path
														d="M57.2117 141.194C57.2117 141.194 68.8713 111.319 72.0054 67.3363L76.069 10.3396L21.3741 5.28005C17.1068 4.88609 13.6939 8.19717 13.6674 13.757L13.4638 57.8236C13.238 106.963 57.2073 141.194 57.2073 141.194"
														fill="#48FF91"
													></path>
													<path
														d="M57.2117 141.194C57.2117 141.194 68.8713 111.319 72.0054 67.3363L76.069 10.3396L21.3741 5.28005C17.1068 4.88609 13.6939 8.19717 13.6674 13.757L13.4638 57.8236C13.238 106.963 57.2073 141.194 57.2073 141.194"
														stroke="#0500FF"
														strokeWidth="0.454194"
														strokeMiterlimit="10"
													></path>
												</g>
												<path
													id="Vector_7"
													d="M17.1906 58.3644L17.3677 20.2781L13.6405 20.4817L13.4678 57.8244C13.4501 61.2505 13.6582 64.6015 14.0433 67.8727L17.6952 67.4168C17.3588 64.4642 17.1773 61.4453 17.1906 58.3644Z"
													fill="#F4F4F7"
												></path>
												<path
													id="Vector_8"
													d="M13.4682 57.8225L13.6719 13.7558C13.6896 9.73648 15.4823 6.89904 18.0852 5.77912L18.0763 5.77026L4.63278 11.5558L4.64163 11.5647C1.99011 12.7067 0.122091 15.5397 0.325714 19.5192L2.53901 62.7935C5.04445 111.845 48.4294 145.186 48.4294 145.186L57.2117 141.193C57.2117 141.193 13.2425 106.962 13.4682 57.8225Z"
													fill="#2D9FFF"
												></path>
												<path
													id="Vector_9"
													d="M57.2109 141.194C57.2109 141.194 103.734 139.747 110.33 93.0818L116.611 48.6344C117.098 45.1773 115.248 40.609 112.495 38.4843L76.0682 10.3445L72.0046 67.3412C68.8661 111.324 57.2109 141.199 57.2109 141.199V141.194Z"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<path
													id="Vector_10"
													d="M13.721 12.7654C13.814 11.6233 14.053 10.5875 14.4248 9.68005L0.923761 15.5099C0.574061 16.4085 0.361585 17.4266 0.326172 18.5509L13.721 12.7654Z"
													fill="#F4F4F7"
												></path>
												<path
													id="Vector_11"
													d="M19.1779 88.9201C18.2483 86.4146 17.4028 83.8384 16.668 81.1957L6.68164 85.5072C7.50056 88.1189 8.41686 90.6641 9.41284 93.1386L19.1779 88.9201Z"
													fill="#1B1B1C"
												></path>
												<path
													id="Vector_12"
													d="M48.4274 145.182L57.2097 141.189C57.2097 141.189 32.7307 122.129 20.3983 92.041L10.7129 96.2241C23.9572 126.369 48.4318 145.182 48.4318 145.182H48.4274Z"
													fill="#1B1B1C"
												></path>
												<path
													id="Vector_13"
													d="M13.4682 57.8225L13.6719 13.7558C13.6896 9.73648 15.4823 6.89904 18.0852 5.77912L18.0763 5.77026L4.63278 11.5558L4.64163 11.5647C1.99011 12.7067 0.122091 15.5397 0.325714 19.5192L2.53901 62.7935C5.04445 111.845 48.4294 145.186 48.4294 145.186L57.2117 141.193C57.2117 141.193 13.2425 106.962 13.4682 57.8225Z"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<path
													id="Vector_14"
													d="M58.8418 136.551C58.8418 136.551 101.718 135.085 107.897 91.3817L113.855 49.2229C114.311 45.9871 113.09 42.6893 110.509 40.7018L75.8089 13.8988"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<path
													id="Vector_15"
													d="M75.8159 13.8988L21.7364 8.89234C17.7392 8.52051 17.4027 11.8891 17.3806 17.0948L17.1903 58.3638C16.9778 104.383 58.8488 136.546 58.8488 136.546"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
											</g>
											<g id="Group_2">
												<g id="Group_3">
													<path
														id="Vector_16"
														d="M140.901 59.7843L137.988 60.8467C138.958 60.4926 139.613 59.3903 139.604 57.8632L142.517 56.8008C142.521 58.328 141.87 59.4346 140.901 59.7843Z"
														fill="#48FF91"
														stroke="#0500FF"
														strokeWidth="0.454194"
														strokeMiterlimit="10"
													></path>
													<path
														id="Vector_17"
														d="M63.6433 1.98953L136.337 27.0219L139.249 25.9595L66.556 0.92715C66.0027 0.736807 65.4848 0.741234 65.0377 0.905017L62.125 1.9674C62.5765 1.80361 63.0944 1.79919 63.6433 1.98953Z"
														fill="#48FF91"
														stroke="#0500FF"
														strokeWidth="0.454194"
														strokeMiterlimit="10"
													></path>
													<path
														id="Vector_18"
														d="M139.504 32.1522L142.417 31.0898L142.518 56.795L139.606 57.8574L139.504 32.1522Z"
														fill="#48FF91"
														stroke="#0500FF"
														strokeWidth="0.454194"
														strokeMiterlimit="10"
													></path>
													<path
														id="Vector_19"
														d="M136.338 27.0155L139.251 25.9531C140.99 26.5507 142.407 28.8481 142.416 31.0835L139.503 32.1459C139.494 29.9105 138.078 27.6131 136.338 27.0155Z"
														fill="#48FF91"
														stroke="#0500FF"
														strokeWidth="0.454194"
														strokeMiterlimit="10"
													></path>
												</g>
												<g id="Group_4">
													<path
														id="Vector_20"
														d="M104.161 27.9754C104.321 28.0285 104.48 28.1569 104.622 28.3517C104.94 28.7988 105.025 29.4185 104.803 29.7461C104.006 30.9324 103.413 32.3799 103.041 34.0443C103.002 34.2213 102.922 34.3409 102.816 34.4117C102.705 34.4825 102.572 34.4958 102.431 34.4471C102.351 34.4205 102.262 34.3718 102.178 34.301C101.806 33.9867 101.585 33.3714 101.687 32.9155C102.103 31.074 102.763 29.4672 103.643 28.1436C103.767 27.9622 103.958 27.9135 104.157 27.9799L104.161 27.9754Z"
														fill="#1B1B1C"
													></path>
													<path
														id="Vector_21"
														d="M101.849 36.0122C101.884 36.0255 101.92 36.0387 101.955 36.0609C102.34 36.2733 102.637 36.8621 102.615 37.3667C102.469 40.6601 103.053 44.2279 104.284 47.6718L102.765 47.1495C101.61 43.6038 101.065 39.9695 101.216 36.5965C101.238 36.1361 101.513 35.8971 101.849 36.0122Z"
														fill="#1B1B1C"
													></path>
													<path
														id="Vector_22"
														d="M117.422 22.5544C117.475 22.5721 117.529 22.5987 117.582 22.6341C119.985 24.1923 122.247 26.3303 124.306 28.9863C124.633 29.4112 124.74 30.0398 124.536 30.3895C124.496 30.4603 124.447 30.5134 124.385 30.5533C124.279 30.6241 124.142 30.633 124.005 30.5843C123.867 30.5356 123.708 30.4205 123.571 30.2434C121.685 27.8044 119.605 25.839 117.396 24.4048C117.011 24.1569 116.741 23.5593 116.794 23.0679C116.834 22.643 117.104 22.4394 117.422 22.55V22.5544Z"
														fill="#1B1B1C"
													></path>
													<path
														id="Vector_23"
														d="M113.68 20.6954C113.905 20.775 114.135 20.8591 114.361 20.9477C114.746 21.0982 115.078 21.6515 115.1 22.1827C115.114 22.497 115.012 22.7316 114.848 22.8378C114.742 22.9042 114.609 22.9219 114.463 22.8732C114.454 22.8732 114.445 22.8688 114.436 22.8644C114.233 22.7847 114.029 22.7094 113.821 22.6386C112.396 22.1473 111.001 21.9259 109.665 21.9879C109.603 21.9879 109.541 21.9791 109.479 21.9614C109.173 21.8551 108.872 21.4789 108.757 21.0229C108.616 20.474 108.797 20.0137 109.16 19.996C110.612 19.9296 112.121 20.1686 113.671 20.6998L113.68 20.6954Z"
														fill="#1B1B1C"
													></path>
													<g id="Group_5">
														<path
															id="Vector_24"
															d="M115.638 29.5484C115.669 29.5572 115.695 29.5705 115.726 29.5882C118.896 31.2349 121.875 34.5903 123.902 38.7955L125.872 42.8857C126.66 44.5235 127.395 46.2145 128.046 47.9187C128.231 48.4101 128.17 48.897 127.904 49.0696L127.824 49.1095C127.727 49.1449 127.621 49.1405 127.519 49.1095C127.262 49.0209 127.005 48.7421 126.859 48.3614C126.24 46.7501 125.549 45.1432 124.801 43.5939L122.831 39.5038C121.056 35.8253 118.453 32.8949 115.678 31.4518C115.293 31.2526 114.987 30.6727 115 30.1637C115.014 29.6945 115.288 29.4377 115.633 29.5572L115.638 29.5484Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_25"
															d="M112.639 28.5756C112.975 28.6907 113.298 29.1334 113.387 29.6292C113.458 30.0231 113.36 30.3463 113.157 30.4746C113.081 30.5278 112.989 30.5455 112.882 30.5322C111.935 30.4171 111.032 30.5056 110.204 30.8022C110.111 30.8376 110.005 30.8332 109.903 30.7978C109.646 30.7093 109.385 30.426 109.244 30.0453C109.04 29.5052 109.142 28.974 109.469 28.8545C110.421 28.5137 111.453 28.4074 112.533 28.5447C112.568 28.5491 112.603 28.5579 112.643 28.5712L112.639 28.5756Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_26"
															d="M115.128 41.3408C115.823 41.5799 116.54 42.2748 117.022 43.2752L118.997 47.3654C119.97 49.3839 120.776 51.4689 121.418 53.5715L119.926 53.058C119.373 51.3626 118.704 49.6894 117.921 48.0648L115.951 43.9746C115.779 43.6117 115.517 43.3638 115.269 43.2752C115.115 43.2221 114.964 43.231 114.836 43.3151C114.499 43.532 114.455 44.1827 114.734 44.767L116.513 48.4588C117.142 49.7558 117.686 51.0926 118.151 52.4427L116.615 51.9159C116.265 50.9819 115.876 50.0612 115.442 49.1626L113.663 45.4708C112.884 43.8551 113.007 42.0491 113.937 41.4471C114.291 41.2169 114.707 41.1903 115.137 41.3408H115.128Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_27"
															d="M113.979 24.8305C118.468 26.3753 123.089 30.8595 126.196 37.3046L128.166 41.3948C128.414 41.9082 128.374 42.4837 128.078 42.674C127.967 42.7493 127.83 42.7537 127.697 42.7094C127.476 42.6342 127.246 42.4129 127.095 42.0897L125.125 38.004C122.323 32.1963 118.162 28.1593 114.116 26.7649C111.637 25.9106 109.203 26.0522 107.153 27.389C106.972 27.5041 106.795 27.6325 106.618 27.7653C106.503 27.8583 106.356 27.8715 106.206 27.8228C105.998 27.752 105.781 27.5484 105.626 27.2562C105.361 26.7516 105.378 26.1673 105.662 25.9415C105.852 25.791 106.051 25.6494 106.25 25.521C108.526 24.0381 111.226 23.8832 113.979 24.8305Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_28"
															d="M114.843 37.215C116.49 37.7816 118.181 39.4239 119.319 41.7832L121.289 45.8734C122.665 48.7197 123.759 51.6766 124.56 54.6557L123.099 54.1511C122.369 51.5837 121.399 49.0295 120.213 46.5728L118.243 42.4826C117.411 40.7607 116.176 39.5611 114.976 39.145C114.241 38.8927 113.52 38.9325 112.909 39.3309C111.307 40.3756 111.099 43.483 112.44 46.2629L114.219 49.9547C114.436 50.3974 114.635 50.8489 114.826 51.3004L113.179 50.7338L113.144 50.6541L111.364 46.9623C109.527 43.1555 109.819 38.8927 112.01 37.4629C112.843 36.9228 113.834 36.8653 114.839 37.2106L114.843 37.215Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_29"
															d="M114.554 33.0858C117.148 33.9799 119.817 36.5651 121.61 40.2878L123.58 44.3736C125.351 48.0432 126.718 51.8766 127.657 55.7189L126.214 55.2231C125.333 51.7837 124.089 48.3619 122.504 45.0774L120.534 40.9872C119.047 37.9063 116.834 35.7594 114.687 35.0202C113.368 34.5687 112.075 34.6395 110.986 35.3522C108.118 37.2158 107.742 42.7844 110.141 47.7555L111.256 50.075L109.565 49.4907L109.065 48.4549C106.17 42.4524 106.626 35.7329 110.083 33.4842C111.398 32.6298 112.956 32.5369 114.55 33.0858H114.554Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_30"
															d="M107.476 30.3584C107.662 30.4248 107.857 30.593 108.007 30.8453C108.295 31.3278 108.322 31.9342 108.065 32.1998C106.511 33.789 105.63 36.3785 105.582 39.4993C105.533 42.5093 106.277 45.8071 107.666 48.8394L106.046 48.2816C104.789 45.152 104.13 41.8454 104.178 38.7999C104.236 35.2365 105.245 32.2706 107.02 30.4513C107.144 30.3274 107.308 30.3008 107.476 30.3584Z"
															fill="#1B1B1C"
														></path>
														<path
															id="Vector_31"
															d="M106.632 20.5495C106.888 20.638 107.149 20.9213 107.295 21.302C107.499 21.842 107.397 22.3732 107.07 22.4927C106.428 22.7229 105.808 23.0284 105.233 23.4046C102.108 25.4408 100.142 29.4469 99.6951 34.6836C99.3763 38.4329 99.8633 42.5275 101.072 46.5689L99.5932 46.0599C98.429 41.89 97.9731 37.6848 98.3007 33.8204C98.7832 28.1145 100.926 23.7543 104.33 21.5366C104.963 21.1249 105.636 20.7929 106.33 20.5406C106.423 20.5096 106.53 20.5141 106.632 20.5495Z"
															fill="#1B1B1C"
														></path>
													</g>
													<path
														id="Vector_32"
														d="M128.887 51.5333C129.171 51.6307 129.458 51.9671 129.587 52.3965C130.025 53.8484 130.41 55.3224 130.738 56.7832L129.294 56.2874C129.007 55.0569 128.684 53.8263 128.316 52.6045C128.152 52.0556 128.303 51.5687 128.653 51.5112C128.728 51.4979 128.808 51.5112 128.887 51.5333Z"
														fill="#1B1B1C"
													></path>
												</g>
												<path
													id="Vector_33"
													d="M139.247 25.9538C140.987 26.5514 142.408 28.8532 142.417 31.0886L142.519 56.7938C142.527 59.0292 141.124 60.3528 139.38 59.7552L66.6868 34.7228C64.9471 34.1252 63.5306 31.8278 63.5218 29.5924L63.42 3.88725C63.4111 1.65182 64.8143 0.323848 66.554 0.925864L139.247 25.9582V25.9538Z"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<path
													id="Vector_34"
													d="M139.383 59.7551L66.6894 34.7228C64.9497 34.1252 63.5332 31.8278 63.5244 29.5924L63.4225 3.8872C63.4181 2.36003 64.0688 1.25339 65.0382 0.903687L62.1256 1.96607C61.1561 2.32019 60.501 3.42241 60.5099 4.94958L60.6117 30.6548C60.6205 32.8902 62.037 35.1876 63.7767 35.7852L136.47 60.8175C137.023 61.0079 137.541 61.0034 137.988 60.8396L140.901 59.7773C140.45 59.941 139.932 59.9455 139.383 59.7551Z"
													fill="#2D9FFF"
												></path>
												<path
													id="Vector_35"
													d="M139.419 69.4975C141.159 70.0951 142.58 72.3969 142.589 74.6323L142.69 100.342C142.699 102.577 141.296 103.901 139.552 103.303L66.8587 78.271C65.119 77.6734 63.7025 75.376 63.6936 73.1406L63.5918 47.431C63.583 45.1955 64.9862 43.8675 66.7259 44.4696L139.419 69.5019V69.4975Z"
													fill="url(#paint1_linear_55864_111957)"
												></path>
												<path
													id="Vector_36"
													d="M139.419 69.4982L119.189 62.5352L106.812 92.0295L139.556 103.304C141.296 103.902 142.703 102.578 142.694 100.343L142.593 74.6374C142.584 72.402 141.163 70.1046 139.423 69.5026L139.419 69.4982Z"
													fill="#F4F4F7"
												></path>
												<path
													id="Vector_37"
													d="M139.555 103.303L66.8612 78.2706C65.1216 77.673 63.7051 75.3757 63.6962 73.1402L63.5944 47.4351C63.59 45.9079 64.2407 44.8012 65.2101 44.4515L62.2974 45.5139C61.328 45.868 60.6729 46.9703 60.6817 48.4974L60.7835 74.2026C60.7924 76.438 62.2089 78.7354 63.9485 79.333L136.642 104.365C137.195 104.556 137.713 104.551 138.16 104.387L141.073 103.325C140.621 103.489 140.104 103.493 139.555 103.303Z"
													fill="#FFAEFE"
												></path>
												<path
													id="Vector_38"
													d="M62.107 77.9339L65.0197 76.8715C64.5328 76.2562 64.1521 75.5081 63.9264 74.7113L61.0137 75.7737C61.2394 76.5705 61.6245 77.3186 62.107 77.9339Z"
													fill="#1B1B1C"
												></path>
												<path
													id="Vector_39"
													d="M136.645 104.363C137.198 104.553 137.716 104.549 138.163 104.385L141.076 103.322C140.624 103.486 140.106 103.491 139.557 103.3L66.8639 78.2723L63.9512 79.3347L136.645 104.367V104.363Z"
													fill="#1B1B1C"
												></path>
												<path
													id="Vector_40"
													d="M139.555 103.303L66.8612 78.2706C65.1216 77.6731 63.7051 75.3757 63.6962 73.1402L63.5944 47.4351C63.59 45.9079 64.2407 44.8012 65.2101 44.4515L62.2974 45.5139C61.328 45.868 60.6729 46.9703 60.6817 48.4974L60.7835 74.2026C60.7924 76.438 62.2089 78.7354 63.9485 79.333L136.642 104.365C137.195 104.556 137.713 104.551 138.16 104.387L141.073 103.325C140.621 103.489 140.104 103.493 139.555 103.303Z"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<g id="Group_6">
													<path
														id="Vector_41"
														d="M77.7822 60.8574L77.7911 63.3496L79.4643 62.6768L80.2877 64.7705L78.6144 65.4389L80.2965 67.2627L79.4909 68.7943L77.8088 66.9705L77.8176 69.4583L76.1887 68.9005L76.1798 66.4084L74.5021 67.0812L73.6788 64.9874L75.3565 64.319L73.6699 62.4953L74.48 60.9637L76.1621 62.7874L76.1532 60.2997L77.7822 60.8574Z"
														fill="#1B1B1C"
													></path>
													<path
														id="Vector_42"
														d="M88.9087 64.69L88.9219 67.1777L90.5908 66.5093L91.4141 68.5987L89.7409 69.2715L91.4274 71.0908L90.6217 72.6224L88.9352 70.8031L88.9441 73.2908L87.3151 72.7287L87.3062 70.2409L85.633 70.9093L84.8096 68.82L86.4873 68.1471L84.8008 66.3234L85.6064 64.7962L87.293 66.6155L87.2797 64.1278L88.9087 64.69Z"
														fill="#1B1B1C"
													></path>
													<path
														id="Vector_43"
														d="M114.701 84.8495L114.709 87.076L106.091 84.1058L106.082 81.8837L114.701 84.8495Z"
														fill="#1B1B1C"
													></path>
													<path
														id="Vector_44"
														d="M100.036 68.5194L100.045 71.0116L101.718 70.3387L102.542 72.4325L100.864 73.1009L102.555 74.9247L101.749 76.4563L100.058 74.6325L100.072 77.1203L98.4425 76.5625L98.4293 74.0704L96.756 74.7432L95.9327 72.6494L97.6148 71.981L95.9238 70.1573L96.7339 68.6257L98.416 70.4494L98.4071 67.9617L100.036 68.5194Z"
														fill="#1B1B1C"
													></path>
												</g>
												<path
													id="Vector_45"
													d="M139.419 69.4975C141.159 70.0951 142.58 72.3969 142.589 74.6323L142.69 100.342C142.699 102.577 141.296 103.901 139.552 103.303L66.8587 78.271C65.119 77.6734 63.7025 75.376 63.6936 73.1406L63.5918 47.431C63.583 45.1955 64.9862 43.8675 66.7259 44.4696L139.419 69.5019V69.4975Z"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
												<path
													id="Vector_46"
													d="M61.9371 34.3905L64.8498 33.3281C64.3629 32.7128 63.9822 31.9648 63.7564 31.168L60.8438 32.2303C61.0695 33.0271 61.4546 33.7752 61.9371 34.3905Z"
													fill="#1B1B1C"
												></path>
												<path
													id="Vector_47"
													d="M136.473 60.8172C137.026 61.0076 137.544 61.0031 137.991 60.8393L140.904 59.777C140.452 59.9408 139.934 59.9452 139.385 59.7548L66.692 34.7269L63.7793 35.7893L136.473 60.8216V60.8172Z"
													fill="#1B1B1C"
												></path>
												<path
													id="Vector_48"
													d="M139.383 59.7551L66.6894 34.7228C64.9497 34.1252 63.5332 31.8278 63.5244 29.5924L63.4225 3.8872C63.4181 2.36003 64.0688 1.25339 65.0382 0.903687L62.1256 1.96607C61.1561 2.32019 60.501 3.42241 60.5099 4.94958L60.6117 30.6548C60.6205 32.8902 62.037 35.1876 63.7767 35.7852L136.47 60.8175C137.023 61.0079 137.541 61.0034 137.988 60.8396L140.901 59.7773C140.45 59.941 139.932 59.9455 139.383 59.7551Z"
													stroke="#0500FF"
													strokeWidth="0.454194"
													strokeMiterlimit="10"
												></path>
											</g>
										</g>
										<defs>
											<linearGradient
												id="paint0_linear_55864_111957"
												x1="109.245"
												y1="85.4238"
												x2="55.0154"
												y2="73.1311"
												gradientUnits="userSpaceOnUse"
											>
												<stop stopColor="#48FF91"></stop>
												<stop
													offset="1"
													stopColor="#2D9FFF"
												></stop>
											</linearGradient>
											<linearGradient
												id="paint1_linear_55864_111957"
												x1="63.5918"
												y1="73.8842"
												x2="142.695"
												y2="73.8842"
												gradientUnits="userSpaceOnUse"
											>
												<stop stopColor="#FFAEFE"></stop>
												<stop
													offset="1"
													stopColor="#FFF465"
												></stop>
											</linearGradient>
											<clipPath id="clip0_55864_111957">
												<rect
													width="142.824"
													height="144.882"
													fill="white"
													transform="translate(0.0878906 0.55896)"
												></rect>
											</clipPath>
										</defs>
									</svg>
								</div>
								<div className="mt-6 flex flex-col space-y-4">
									{[
										{
											label: "Only you know this secret phrase.",
											state: verifyAccepts.onlyYouKnow,
											setState: () =>
												setVerifyAccepts((prev) => ({
													...prev,
													onlyYouKnow:
														!prev.onlyYouKnow,
												})),
										},
										{
											label: "This secret phrase was NOT given to you by anyone e.g. a Binance representative.",
											state: verifyAccepts.notGivenAnyone,
											setState: () =>
												setVerifyAccepts((prev) => ({
													...prev,
													notGivenAnyone:
														!prev.notGivenAnyone,
												})),
										},
										{
											label: "If someone else has seen it, they can and will steal your funds.",
											state: verifyAccepts.stealYourFunds,
											setState: () =>
												setVerifyAccepts((prev) => ({
													...prev,
													stealYourFunds:
														!prev.stealYourFunds,
												})),
										},
									].map(({ label, state, setState }) => (
										<div
											key={label}
											onClick={setState}
											className="flex flex-col rounded-xl bg-background-2 py-2 px-4 text-left cursor-pointer"
										>
											<div className="flex items-center space-x-2">
												<div className="relative w-5 h-5">
													<input
														readOnly
														checked={state}
														className="checkbox cursor-pointer"
														type="checkbox"
													/>
													<div className="absolute pointer-events-none flex items-center justify-center w-5 h-5">
														{state && (
															<svg
																className="text-background-1"
																fill="none"
																width="16"
																height="16"
																viewBox="0 0 20 20"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
																	fill="currentColor"
																></path>
															</svg>
														)}
													</div>
												</div>
												<div className="flex flex-1">
													<label className="text-textPrimary subtitle-text font-normal cursor-pointer">
														{label}
													</label>
												</div>
											</div>
										</div>
									))}

									<div className=" flex w-full items-center justify-between mt-6 space-x-4">
										<div className="h-[52px] flex w-full">
											<button
												onClick={() => {
													if (userAuth) {
														setTab(
															"confirm-password"
														);
													} else {
														setTab("set-password");
													}
												}}
												type="button"
												className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
											>
												<p className="title-text text-primary font-medium text-unset">
													Back
												</p>
											</button>
										</div>
										<div className="h-[52px] flex w-full">
											<button
												onClick={() =>
													setTab(
														"import-with-secret-phrase"
													)
												}
												disabled={
													!Object.values(
														verifyAccepts
													).every((i) => i)
												}
												className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full"
											>
												Next
											</button>
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
							<div className="space-y-6">
								<div className="flex flex-col space-y-2">
									<Input
										label="New password"
										value={password}
										onChange={setPassword}
										type="password"
									/>

									<ul className="space-y-2">
										{[
											{
												label: "8 or more characters",
												condition:
													passwordConditions.isGoodLength,
											},
											{
												label: "At least one upper case character",
												condition:
													passwordConditions.isOneOrMoreUppercase,
											},
											{
												label: "At least one digit",
												condition:
													passwordConditions.isOneOrMoreNumber,
											},
											{
												label: "At least one symbol",
												condition:
													passwordConditions.isOneOrMoreSpecialSymbol,
											},
										].map(({ label, condition }) => (
											<li
												key={label}
												className="flex items-center space-x-1"
											>
												<div
													className={clsx(
														"flex items-center justify-center w-5.5 h-5.5 rounded-full border border-textDisabled",
														condition && "bg-accent"
													)}
												>
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
													{label}
												</p>
											</li>
										))}
									</ul>
								</div>
								<div className="flex flex-col space-y-2">
									<Input
										label="Confirm new password"
										value={passwordConfirmation}
										onChange={setPasswordConfirmation}
										type="password"
										error={getConfirmPasswordError}
									/>
								</div>
								<div className="flex justify-center">
									<div className="flex items-center space-x-2 ">
										<div className="relative w-5 h-5">
											<input
												checked={isReadAndAgree}
												onClick={() =>
													setIsReadAndAgree(
														(prev) => !prev
													)
												}
												className="checkbox cursor-pointer"
												type="checkbox"
												readOnly
											/>
											<div className=" absolute pointer-events-none flex items-center justify-center w-5 h-5">
												{isReadAndAgree && (
													<svg
														className="text-background-1"
														fill="none"
														width="16"
														height="16"
														viewBox="0 0 20 20"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M5.86414 14.0099L5.8629 14.0111L7.63067 15.7789L7.6319 15.7776L7.63201 15.7777L9.39978 14.01L9.39967 14.0099L17.0588 6.35077L15.291 4.58301L7.6319 12.2421L4.68574 9.29593L2.91797 11.0637L5.86414 14.0099Z"
															fill="currentColor"
														></path>
													</svg>
												)}
											</div>
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
									<div className="flex w-full">
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
									<div className="flex w-full">
										<button
											onClick={() =>
												setTab("verify-safety")
											}
											disabled={
												!isReadAndAgree ||
												!passwordConditions.isAllGood
											}
											className="outline-none bg-primary-default text-on-primary hover:bg-primary-hover active:bg-primary-pressed disabled:bg-primary-pressed py-4 px-4 text-subheader-16 leading-subheader-16 default-button w-full h-[52px]"
										>
											Next
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

	if (tab === "default") {
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
							<h2 className="screamer-text text-utility-1-default font-semibold text-unset">
								Welcome
							</h2>
							<p className="title-text text-textSecondary font-normal  text-unset">
								The multi-chain wallet trusted by millions
							</p>
							<div className="w-full flex flex-col space-y-6">
								<div className="flex flex-col space-y-6">
									<div
										onClick={() => {
											setAccount("newAccount");
											if (userAuth) {
												setTab("confirm-password");
											} else {
												setTab("set-password");
											}
										}}
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
										onClick={() => {
											setAccount("oldAccount");
											if (userAuth) {
												setTab("confirm-password");
											} else {
												setTab("set-password");
											}
										}}
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
									{/* <div className="border-t border-utility-1-opacity-3 my-2"></div>
									<div
										role="button"
										className="outline-0 cursor-not-allowed opacity-65"
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
										role="button"
										className="outline-0 cursor-not-allowed opacity-65"
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
														Connect your Ledger
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
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
