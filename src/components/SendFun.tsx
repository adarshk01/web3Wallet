import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";

type sendFunType = {
  setDashRender: (value: boolean) => void;
  setSendFun: (value: boolean) => void;
};

export function SendFun(props: sendFunType) {
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <div className="w-full relative">
      <div>
        <div
          className=" flex   hover:bg-zinc-900 hover:rounded-full p-2 absolute cursor-pointer ml-10 mt-[-10px] group"
          onClick={function () {
            props.setSendFun(false);
            props.setDashRender(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="size-5  group-hover:stroke-white  "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <div className="text-white font-semibold text-4xl flex justify-center">
          Send SOL
        </div>
      </div>
      <div className="px-10  mt-10 relative">
        <div className="relative w-full">
          <Input
            type="email"
            placeholder="Recipient's Solana address"
            className="bg-zinc-700 border-zinc-700  text-white "
          />
          <div
            className="rounded-full bg-zinc-800 h-7 w-7  absolute flex items-center justify-center inset-y-0 right-0  mr-7 mt-1.5 cursor-pointer"
            onClick={function () {
              setOpenDropDown(!openDropDown);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-5   stroke-white  "
            >
              <path
                fillRule="evenodd"
                d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
                clipRule="evenodd"
                stroke-width="0.5"
              />
            </svg>
          </div>

          <div
            style={{
              transformOrigin: "top",
              transition: "transform 200ms ease-out, opacity 200ms ease-out",
            }}
            className={`text-white absolute h-24 bg-zinc-800 w-full rounded-md mt-1 border border-zinc-700  ${
              openDropDown ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
          >
            hello
          </div>
        </div>
      </div>
      <div className="px-10  mt-5">
        <Input
          type="number"
          placeholder="Amount"
          className="bg-zinc-700 border-zinc-700  text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <div className="flex justify-center mt-10 gap-10">
        <Button
          className="bg-white text-black text-sm hover:bg-zinc-400"
          onClick={function () {
            props.setSendFun(false);
            props.setDashRender(true);
          }}
        >
          Cancel
        </Button>
        <Button className="bg-white text-black  text-sm hover:bg-zinc-400">
          Next
        </Button>
      </div>
    </div>
  );
}
