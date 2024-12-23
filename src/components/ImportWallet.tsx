import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// interface ChildProps {
//   handleImportWallet: (newData: boolean) => void;
// }

export function ImportWallet({ handleImportWallet }: any) {
  return (
    <div>
      <div className=" flex w-full items-center justify-between relative">
        <div
          className=" flex items-center hover:bg-zinc-900 hover:rounded-full p-2 absolute"
          onClick={function () {
            handleImportWallet(true);
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
        <div className="text-2xl font-bold text-center flex-grow mb-5">
          Write your Seed
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {Array(12)
          .fill("")
          .map(function (_, index) {
            return (
              <div key={index} className="flex">
                <Input
                  type="email"
                  placeholder={`${index + 1}. Seed`}
                  className="bg-zinc-700 border-slate-900 w-20 "
                />
              </div>
            );
          })}
        <div>
          {" "}
          <Button className="bg-blue-700 hover:bg-blue-800 w-full">
            Add a Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
