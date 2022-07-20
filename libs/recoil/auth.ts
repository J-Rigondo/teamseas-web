import { atom } from "recoil";

interface IAuth {
  accessToken: string;
  user: { username: string };
}

export const authAtom = atom<IAuth>({
  key: "auth",
  default: {
    accessToken: "",
    user: {
      username: "",
    },
  },
});
