import { atom } from "recoil";

interface IAuth {
  accessToken: string;
  user: { name: string };
}

export const authAtom = atom<IAuth>({
  key: "auth",
  default: {
    accessToken: "",
    user: {
      name: "",
    },
  },
});
