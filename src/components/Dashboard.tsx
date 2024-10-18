import nacl from "tweetnacl";
import { useRecoilValue } from "recoil";
import NavBar from "./NavBar";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { seedAtom } from "./SeedAtom";
import { useEffect, useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Button } from "./ui/button";

export function Dashboard() {
  const [walletNu, setWalletNu] = useState(0);
  const mnemonicsArr = useRecoilValue(seedAtom);
  const [currWallet, setCurrWallet] = useState("");
  const [walletArr, setWalletArr] = useState<string[]>([]);

  useEffect(() => {
    const mnemonics = mnemonicsArr.join(" ");
    const seed = mnemonicToSeedSync(mnemonics);
    const path = `m/44'/501'/${walletNu}'/0'`; // Derivation path for Solana
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // console.log(Buffer.from(secret).toString("base64"));
    // console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setCurrWallet(Keypair.fromSecretKey(secret).publicKey.toBase58());
    const newWallet = Keypair.fromSecretKey(secret).publicKey.toBase58();
    setWalletArr((prevWalletArr) => {
      // Only add if the wallet isn't already in the array to avoid duplicates
      if (!prevWalletArr.includes(newWallet)) {
        return [...prevWalletArr, newWallet];
      }
      return prevWalletArr; // Return as is if the wallet is already present
    });
  }, [walletNu]);

  return (
    <div>
      <div className="bg-gradient-to-b from-neutral-800 from-5% to-black to-95% h-screen ">
        <div>
          <NavBar />
        </div>
        <div className="grid grid-cols-12  min-h-screen pb-16 pt-24 ">
          <div className="col-span-3 h-full bg-gradient-to-br from-neutral-800 from-25% to-black to-100% lg:ml-36 rounded-xl border border-zinc-700">
            <div className="text-white p-5 font-semibold text-lg">Wallets</div>
            <div className="mx-5">
              {walletArr.map(function (i, index) {
                return (
                  <div className="bg-white px-5 mb-4 w-full rounded-lg font-bold text-md py-2 cursor-pointer ">
                    Wallet{` ${index + 1}`}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-6 h-full bg-gradient-to-br from-neutral-800 from-25% to-black to-100%  mx-5  rounded-xl border border-zinc-700">
            <div className="flex justify-center gap-5">
              <div className="flex justify-center items-start mt-10 font-bold text-8xl text-white">
                $0.00
              </div>
              <div className="mt-24 font-bold text-4xl text-stone-400">SOL</div>
            </div>
            <div className="flex justify-center mt-10 gap-5">
              <Button className="bg-white text-black gap-2 text-lg hover:bg-zinc-400">
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </Button>
              <Button className="bg-white text-black gap-2 text-lg hover:bg-zinc-400">
                Receive
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </Button>
            </div>
            <div className="  border border-zinc-500 mt-10  mx-24"></div>
          </div>

          <div className="col-span-3 h-min bg-gradient-to-br from-neutral-800 from-25% to-black to-100%  border border-zinc-700 rounded-xl mr-36">
            <div className="text-white p-5 font-semibold text-lg flex justify-center">
              Add Wallets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
