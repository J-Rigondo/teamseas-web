import { atom } from "recoil";

interface IAuth {
  accessToken: string;
  user: { username: string };
}

export const authAtom = atom<IAuth | null>({
  key: "auth",
  default: null,
});
