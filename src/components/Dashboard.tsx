import NavBar from "./NavBar";

export function Dashboard() {
  return (
    <div>
      <div className="bg-gradient-to-b from-neutral-800 from-5% to-black to-95% h-screen ">
        <div>
          <NavBar />
        </div>
        <div className="grid grid-cols-12  min-h-screen pb-16 pt-24 ">
          <div className="col-span-3 h-full bg-gradient-to-br from-neutral-800 from-5% to-black to-95% lg:ml-36 rounded-xl border border-zinc-700">
            <div className="text-white">Wallets</div>
          </div>
          <div className="col-span-9 h-full bg-gradient-to-br from-neutral-800 from-5% to-black to-95%  mx-12 rounded-xl border border-zinc-700">
            hello
          </div>
        </div>
      </div>
    </div>
  );
}
