import { atom } from "recoil";

const initialSeedPhrase = JSON.parse(
  localStorage.getItem("mnemonicsArr") || "[]"
);

export const seedAtom = atom<string[]>({
  key: "seedAtom",
  default: initialSeedPhrase,
});
