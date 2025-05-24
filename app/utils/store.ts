import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const _userLoading_ = atom<boolean>(true);
export const _globalLoading_ = atom<boolean>(true);

export const _userAuth_ = atom<boolean>(false);
export const _userApproved_ = atom<boolean>(false);

export const _theme_ = atomWithStorage<"light" | "dark">("theme", "dark");
