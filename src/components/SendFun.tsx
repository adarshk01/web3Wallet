import { Input } from "./ui/input";

export function SendFun() {
  return (
    <div className="w-full ">
      <div className="text-white font-semibold text-4xl flex justify-center">
        Send SOL
      </div>
      <div className="px-10  mt-10">
        <Input
          type="email"
          placeholder="Recipient's Solana address"
          className="bg-zinc-700 border-zinc-700  text-white "
        />
        <Input
          type="number"
          placeholder="Amount"
          className="bg-zinc-700 border-zinc-700  text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}
