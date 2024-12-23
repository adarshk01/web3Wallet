"use client";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { seedAtom } from "./SeedAtom";
import { useRecoilState } from "recoil";

// Polyfill Buffer for the browser environment
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

export function NewWallet() {
  // const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [seedPhrase, setSeedPhrase] = useRecoilState(seedAtom);
  // const [copyStatus, setCopyStatus] = useState("");
  const navigate = useNavigate();

  function updateSeedPhrase(c: string[]) {
    setSeedPhrase(c);
    localStorage.setItem("mnemonicsArr", JSON.stringify(c));
  }

  function handleClick() {
    navigate("/dashboard");
  }

  useEffect(
    function () {
      if (seedPhrase.length > 0) {
        console.log(seedPhrase);
      }
    },
    [seedPhrase]
  );
  useEffect(() => {
    try {
      // Generate the mnemonic and split it into an array of words
      const mnemonic = generateMnemonic(128).split(" ");
      // setSeedPhrase(mnemonic);
      updateSeedPhrase(mnemonic);
      console.log("Generated Mnemonic:", mnemonic.join(" "));

      const seed = mnemonicToSeedSync(mnemonic.join(" "));

      console.log("Generated Seed:", seed.toString("hex"));
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  }, []);

  async function clickToCopy() {
    try {
      await navigator.clipboard.writeText(seedPhrase.toString());
      // setCopyStatus("copied");
    } catch (error) {
      // setCopyStatus("Failed to copy!");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-center">
        {seedPhrase.map(function (i, index) {
          return (
            <div
              key={index}
              className="bg-stone-900 rounded-lg p-2 cursor-default"
            >
              {" "}
              {index + 1 + ". " + i + " "}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-5 gap-5">
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
        <Button
          className="py-5 px-5 bg-blue-700 hover:bg-blue-800"
          onClick={handleClick}
        >
          Create Wallet
        </Button>
      </div>
      <div className="text-xs mt-5 italic">{`(Store your seed phrase securely, preferably in a physical location and not online.)`}</div>
    </div>
  );
}
