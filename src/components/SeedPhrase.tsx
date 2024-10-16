import { useState } from "react";
import NavBar from "./NavBar";
import { Button } from "@/components/ui/button";
import { NewWallet } from "./NewWallet";
import { ImportWallet } from "./ImportWallet";

export default function SeedPhrase() {
  const [isVisible, setIsVisible] = useState(true);
  const [importWallet, setImportWallet] = useState(true);

  function handleImportWallet(newData: boolean) {
    setImportWallet(newData);
  }
  return (
    <div className=" relative">
      <div className="bg-gradient-to-b from-neutral-800 from-5% to-black to-95% h-screen ">
        <div>
          <NavBar />
        </div>
        <div className="flex justify-center items-center min-h-screen px-10">
          <div
            className={
              "   text-white w-full  max-w-md  p-[1px] bg-gradient-to-br from-neutral-500 from-10% to-transparent to-90% rounded-3xl"
            }
          >
            <div className="  text-white p-8 bg-neutral-800 rounded-3xl ">
              {isVisible && importWallet && (
                <div className="flex flex-col items-center space-y-6 ">
                  <div className="text-2xl font-bold mb-2">Wallet Options</div>
                  <Button
                    className="bg-blue-700  hover:bg-blue-800 w-full"
                    onClick={function () {
                      setIsVisible(false);
                    }}
                  >
                    Create New Wallet
                  </Button>

                  <div className=" flex items-center w-full ">
                    <div className="flex-grow h-0.5 w-20 bg-zinc-500 "></div>
                    <span className="px-4">or</span>
                    <div className="flex-grow h-0.5 w-20 bg-zinc-500   "></div>
                  </div>

                  <Button
                    className="bg-blue-700 hover:bg-blue-800 w-full"
                    onClick={function () {
                      setImportWallet(false);
                    }}
                  >
                    Import a Wallet
                  </Button>
                </div>
              )}
              {/* clicking the create new wallet button */}
              {!isVisible && (
                <div className="flex flex-col items-center space-y-6  ">
                  <div className=" flex w-full items-center justify-between relative">
                    <div
                      className=" flex items-center hover:bg-zinc-900 hover:rounded-full p-2 absolute"
                      onClick={function () {
                        setIsVisible(true);
                      }}
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
                          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-center flex-grow ">
                      Seed Phrase
                    </div>
                  </div>
                  <div>
                    <NewWallet />
                  </div>
                </div>
              )}
              {!importWallet && (
                <div className="flex flex-col items-center space-y-6  ">
                  <div>
                    <ImportWallet handleImportWallet={handleImportWallet} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
