import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";

type sendFunType = {
  setDashRender: (value: boolean) => void;
  setSendFun: (value: boolean) => void;
};

export function SendFun(props: sendFunType) {
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
      <div className="px-10  mt-10">
        <Input
          type="email"
          placeholder="Recipient's Solana address"
          className="bg-zinc-700 border-zinc-700  text-white "
        />
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
