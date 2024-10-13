import { atom } from "recoil";

export const searchTermAtom = atom<string>({
  key: "searchTermAtom",
  default: "",
});

export const popUpAtom = atom<boolean>({
  key: "popUpAtom",
  default: false,
});

export const openTabAtom = atom<string>({
  key: "openTabAtom",
  default: "",
});

export const currentSignupTabAtom = atom<string>({
  key: "currentSignupTabAtom",
  default: "",
});

export const currentSigninTabAtom = atom<string>({
  key: "currentSigninTabAtom",
  default: "",
});

export const titleAtom = atom<string>({
  key: "titleAtom",
  default: "",
});

export const descAtom = atom<string>({
  key: "descAtom",
  default: "",
});

export const contentAtom = atom<string>({
  key: "contentAtom",
  default: "",
});

export const publishConfirmationAtom = atom<boolean>({
  key: "publishConfirmationAtom",
  default: false,
});

export const isCommentPopupAtom = atom<boolean>({
  key: "isCommentPopupAtom",
  default: false,
});
