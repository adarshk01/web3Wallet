import { atom } from "recoil";

export const seedAtom = atom<string[]>({
  key: "seedAtom",
  default: [],
});
