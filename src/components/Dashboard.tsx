import nacl from "tweetnacl";
import { useRecoilValue } from "recoil";
import NavBar from "./NavBar";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { seedAtom } from "./SeedAtom";
import { useEffect, useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Button } from "./ui/button";
import { SendFun } from "./SendFun";

export function Dashboard() {
  const [walletNu, setWalletNu] = useState(0);
  const mnemonicsArr = useRecoilValue(seedAtom);
  const [dashRender, setDashRender] = useState(true);
  const [currPubKey, setCurrPubKey] = useState("");
  const [currPriKey, setCurrPriKey] = useState("");
  const [walletArr, setWalletArr] = useState<string[]>([]);
  const [showPriKey, setShowPriKey] = useState(false);
  const [showPriKeyTxt, setShowPriKeyTxt] = useState(false);
  const [sendFun, setSendFun] = useState(false);
  async function clickToCopy() {
    await navigator.clipboard.writeText(currPriKey.toString());
  }

  function HandleClick() {
    setTimeout(() => {
      setDashRender(false);
    }, 400);
  }

  useEffect(() => {
    const mnemonics = mnemonicsArr.join(" ");
    const seed = mnemonicToSeedSync(mnemonics);
    const path = `m/44'/501'/${walletNu}'/0'`; // Derivation path for Solana
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // console.log(Buffer.from(secret).toString("base64"));
    // console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setCurrPubKey(Keypair.fromSecretKey(secret).publicKey.toBase58());
    setCurrPriKey(Buffer.from(secret).toString("base64"));
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
    <div className="relative   min-h-screen bg-black">
      <div
        className={`bg-gradient-to-b from-neutral-800 from-5% to-black to-95% h-screen absolute inset-0  ${
          showPriKey ? " blur-sm " : ""
        }`}
      >
        <div>
          <NavBar />
        </div>
        <div className="grid grid-cols-12  min-h-screen pb-16 pt-24 ">
          <div className="  col-span-3 h-full   bg-gradient-to-br from-neutral-800 from-25% to-black to-100% lg:ml-36 rounded-xl border border-zinc-700 ">
            <div className="text-white p-5 font-semibold text-lg ">Wallets</div>

            <div
              className="ml-5 h-full overflow-y-auto  scrollbar scrollbar-thumb-zinc-700 rounded-scrollbar no-scroll-buttons pr-3 mr-2 "
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              {walletArr.map(function (i, index) {
                return (
                  <div
                    className={`select-none  px-2 mb-4 w-full rounded-lg font-bold text-md py-2 cursor-pointer flex justify-start gap-2  transition-all duration-300 ease-out  
                    ${walletNu == index ? "bg-white" : "bg-zinc-400"} `}
                    onClick={function () {
                      setWalletNu(index);
                    }}
                  >
                    <div>
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
                          d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                        />
                      </svg>
                    </div>
                    <div>Wallet{` ${index + 1}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-6 h-full bg-gradient-to-br from-neutral-800 from-25% to-black to-100%  mx-5  rounded-xl border border-zinc-700 overflow-hidden relative">
            {dashRender ? (
              <div
                className={`  duration-300 ease-out transition-all   ${
                  sendFun
                    ? "opacity-0  translate-y-1"
                    : "opacity-100  translate-y-0"
                }`}
              >
                <div className="mt-5 font-bold text-6xl text-stone-400 flex justify-center">
                  SOL
                </div>
                <div className="flex justify-center items-start mt-2 font-bold text-5xl text-white">
                  $0.00
                </div>

                <div className="flex justify-center mt-10 gap-5">
                  <Button
                    className="bg-white text-black gap-2 text-lg hover:bg-zinc-400"
                    onClick={function () {
                      setSendFun(true);
                      HandleClick();
                    }}
                  >
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
                <div className="  w-full h-px   bg-gradient-to-r from-transparent via-zinc-500 to-transparent mt-10   "></div>
                <div className="m-10">
                  <div className="bg-white w-full  px-5 h-max py-3 rounded-lg text-wrap">
                    <div className="font-bold text-lg">Sol</div>
                    <div className="font-semibold">
                      Public Key: {currPubKey}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`flex  justify-center  transition-all  duration-300 ease-in  mt-10 w-full ${
                  sendFun ? "opacity-100  " : "opacity-0  "
                }`}
              >
                <SendFun />
              </div>
            )}
          </div>

          <div className="col-span-3 h-max bg-gradient-to-br from-neutral-800 from-25% to-black to-100%  border border-zinc-700 rounded-xl mr-36">
            <div className="">
              <div className="flex  p-5 gap-3">
                <div className="text-white font-semibold text-lg flex justify-center">
                  Add Wallets
                </div>
                <div
                  className="cursor-pointer "
                  onClick={function () {
                    setWalletNu(walletArr.length);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="size-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="  w-full h-px   bg-gradient-to-r from-transparent via-zinc-500 to-transparent  "></div>
              <div className="flex p-5 gap-3">
                <div className="text-white font-semibold text-lg ">
                  Private Key
                </div>
                <div
                  className=""
                  onClick={function () {
                    setShowPriKey(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="size-7 cursor-pointer"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPriKey && (
        <div className="flex justify-center items-center h-full absolute w-full select-none">
          <div className="bg-gradient-to-br from-neutral-800 from-55% to-black to-100% h-max w-max  py-10 px-16 rounded-xl border border-zinc-700  ">
            <div className="flex justify-end">
              <div className="   hover:rounded-full hover:bg-neutral-600 h-10 w-10  flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="grey "
                  className="size-8 cursor-pointer hover:stroke-white"
                  onClick={function () {
                    setShowPriKey(false);
                    setShowPriKeyTxt(false);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="text-white font-semibold text-lg ">
              Private Key:
            </div>
            <div className="flex  mt-5 gap-5">
              <div className=" bg-white h-max w-max p-2 rounded-lg">
                <div className={showPriKeyTxt ? `font-semibold` : ``}>
                  {showPriKeyTxt ? currPriKey : `●`.repeat(currPriKey.length)}{" "}
                </div>
              </div>
              <div
                className="flex items-center"
                onClick={function (c) {
                  setShowPriKeyTxt(!showPriKeyTxt);
                }}
              >
                {!showPriKeyTxt && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="size-6 cursor-pointer"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {showPriKeyTxt && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="size-6 cursor-pointer"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-10 ">
              <Button
                onClick={clickToCopy}
                className="flex gap-2 py-5 bg-white text-black font-bold hover:bg-zinc-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
                Click to Copy
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 text-white left-36 mb-3 flex gap-1">
        <div>Designed and Developed by</div>
        <a
          href="https://adarshnow.xyz" // Replace with your URL
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold cursor-pointer"
        >
          {" "}
          Adarsh
        </a>
      </div>
    </div>
  );
}
